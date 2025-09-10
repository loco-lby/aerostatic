import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { mediaItemId, packageId, accessCode, email } = await request.json();

    if (!mediaItemId || !packageId || !accessCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Verify package and media item exist
    const { data: mediaItem, error: mediaError } = await supabase
      .from('media_items')
      .select('*, media_packages!inner(*)')
      .eq('id', mediaItemId)
      .eq('package_id', packageId)
      .single();

    if (mediaError || !mediaItem) {
      return NextResponse.json(
        { error: 'Media item not found' },
        { status: 404 }
      );
    }

    const packageData = mediaItem.media_packages;

    // Check if package is expired
    if (new Date(packageData.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Package has expired' },
        { status: 403 }
      );
    }

    // Check access using the database function
    const { data: hasAccess } = await supabase.rpc('check_download_access', {
      p_package_id: packageId,
      p_email: email || null,
      p_access_code: accessCode
    });

    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Access denied. Please purchase this package to download.' },
        { status: 403 }
      );
    }

    // Generate signed URL for download
    // For MVP, we'll use the Supabase storage signed URL
    const filePathParts = mediaItem.file_url.split('/');
    const fileName = filePathParts[filePathParts.length - 1];
    const filePath = `${packageId}/${fileName}`;

    const { data: signedUrlData, error: signedUrlError } = await supabase
      .storage
      .from('aeromedia-media')
      .createSignedUrl(filePath, 3600); // 1 hour expiry

    if (signedUrlError || !signedUrlData) {
      // Fallback to direct URL if signed URL fails
      return NextResponse.json({ url: mediaItem.file_url });
    }

    // Update download count
    await supabase
      .from('media_items')
      .update({ download_count: (mediaItem.download_count || 0) + 1 })
      .eq('id', mediaItemId);

    // Track download in analytics
    await supabase
      .from('download_tracking')
      .insert({
        media_item_id: mediaItemId,
        package_id: packageId,
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        user_agent: request.headers.get('user-agent')
      });

    return NextResponse.json({ url: signedUrlData.signedUrl });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to generate download link' },
      { status: 500 }
    );
  }
}

// Bulk download endpoint
export async function PUT(request: NextRequest) {
  try {
    const { packageId, accessCode, email, mediaItemIds } = await request.json();

    if (!packageId || !accessCode || !mediaItemIds || !Array.isArray(mediaItemIds)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check access
    const { data: hasAccess } = await supabase.rpc('check_download_access', {
      p_package_id: packageId,
      p_email: email || null,
      p_access_code: accessCode
    });

    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Access denied. Please purchase this package to download.' },
        { status: 403 }
      );
    }

    // Fetch all media items
    const { data: mediaItems, error: mediaError } = await supabase
      .from('media_items')
      .select('*')
      .eq('package_id', packageId)
      .in('id', mediaItemIds);

    if (mediaError || !mediaItems || mediaItems.length === 0) {
      return NextResponse.json(
        { error: 'Media items not found' },
        { status: 404 }
      );
    }

    // Generate signed URLs for all items
    const downloadUrls = await Promise.all(
      mediaItems.map(async (item) => {
        const filePathParts = item.file_url.split('/');
        const fileName = filePathParts[filePathParts.length - 1];
        const filePath = `${packageId}/${fileName}`;

        const { data: signedUrlData } = await supabase
          .storage
          .from('aeromedia-media')
          .createSignedUrl(filePath, 3600);

        return {
          id: item.id,
          name: item.file_name,
          url: signedUrlData?.signedUrl || item.file_url,
          size: item.file_size
        };
      })
    );

    // Track bulk download
    await supabase.rpc('track_event', {
      p_package_id: packageId,
      p_event_type: 'bulk_download_prepared',
      p_email: email || null,
      p_metadata: {
        item_count: downloadUrls.length,
        total_size: mediaItems.reduce((sum, item) => sum + item.file_size, 0)
      }
    });

    return NextResponse.json({ downloads: downloadUrls });
  } catch (error) {
    console.error('Bulk download error:', error);
    return NextResponse.json(
      { error: 'Failed to prepare downloads' },
      { status: 500 }
    );
  }
}