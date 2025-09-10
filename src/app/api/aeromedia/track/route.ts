import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { 
      packageId, 
      mediaItemId, 
      eventType, 
      email, 
      metadata = {} 
    } = await request.json();

    if (!eventType) {
      return NextResponse.json(
        { error: 'Event type is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get IP and user agent
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               null;
    const userAgent = request.headers.get('user-agent') || null;

    // Track event using the database function
    const { data: eventId, error } = await supabase.rpc('track_event', {
      p_package_id: packageId || null,
      p_media_item_id: mediaItemId || null,
      p_event_type: eventType,
      p_email: email || null,
      p_ip_address: ip,
      p_user_agent: userAgent,
      p_metadata: metadata
    });

    if (error) {
      console.error('Tracking error:', error);
      // Don't fail the request for tracking errors
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({ 
      success: true,
      eventId 
    });
  } catch (error) {
    console.error('Track event error:', error);
    // Don't fail the request for tracking errors
    return NextResponse.json({ success: false });
  }
}