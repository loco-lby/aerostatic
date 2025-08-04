import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { MediaGallery } from './media-gallery'

interface PageProps {
  params: Promise<{ code: string }>
}

export default async function GalleryPage({ params }: PageProps) {
  const { code } = await params
  const supabase = await createClient()

  // Fetch media package
  const { data: mediaPackage, error: packageError } = await supabase
    .from('media_packages')
    .select('*')
    .eq('access_code', code)
    .eq('is_active', true)
    .gte('expires_at', new Date().toISOString())
    .single()

  if (packageError || !mediaPackage) {
    notFound()
  }

  // Fetch media items
  const { data: mediaItems, error: itemsError } = await supabase
    .from('media_items')
    .select('*')
    .eq('package_id', mediaPackage.id)
    .order('created_at', { ascending: true })

  if (itemsError) {
    notFound()
  }

  // Ensure mediaItems is an array (could be null if no items exist)
  const items = mediaItems || []

  // Group media by type
  const groupedMedia = {
    reel: items.filter(item => item.file_type === 'reel') || [],
    photos: items.filter(item => item.file_type === 'photo') || [],
    videos: items.filter(item => item.file_type === 'video') || [],
    drone: items.filter(item => item.file_type === 'drone') || [],
  }

  return (
    <MediaGallery 
      mediaPackage={mediaPackage} 
      groupedMedia={groupedMedia}
      accessCode={code}
    />
  )
}