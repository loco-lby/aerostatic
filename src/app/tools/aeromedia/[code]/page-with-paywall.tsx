'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  Download, 
  Calendar, 
  Users, 
  Image as ImageIcon, 
  Video, 
  Plane,
  Film,
  Share2,
  ChevronLeft,
  Check,
  Lock,
  Clock,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { MediaViewerWithPaywall } from './media-viewer-with-paywall'
import { BulkDownloadDialog } from '@/components/bulk-download-dialog'
import { MediaPreview } from '@/components/aeromedia/watermark-overlay'

interface MediaItem {
  id: string
  file_url: string
  file_type: 'reel' | 'photo' | 'video' | 'drone'
  file_name: string
  file_size: number
  thumbnail_url?: string
  width: number | null
  height: number | null
  duration: number | null
  download_count: number
}

interface MediaPackage {
  id: string
  access_code: string
  flight_date: string
  passenger_names: string[]
  created_at: string
  expires_at: string
  is_active: boolean
  access_count: number
  last_accessed_at: string | null
  price_cents: number | null
  requires_purchase: boolean
  is_comp: boolean
  operator_id: string | null
}

export default function MediaGalleryWithPaywall() {
  const params = useParams()
  const router = useRouter()
  const accessCode = params.code as string
  
  const [packageData, setPackageData] = useState<MediaPackage | null>(null)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [activeFilter, setActiveFilter] = useState<'all' | 'reel' | 'photo' | 'video' | 'drone'>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [showBulkDownload, setShowBulkDownload] = useState(false)
  const [hasAccess, setHasAccess] = useState(true) // Always grant access since checkout is removed

  const supabase = createClient()

  useEffect(() => {
    loadPackageData()
  }, [accessCode])

  const loadPackageData = async () => {
    try {
      // Fetch package details
      const { data: pkg, error: pkgError } = await supabase
        .from('media_packages')
        .select('*')
        .eq('access_code', accessCode)
        .single()

      if (pkgError || !pkg) {
        toast.error('Invalid access code')
        router.push('/tools/aeromedia')
        return
      }

      // Check if package is expired
      if (new Date(pkg.expires_at) < new Date()) {
        setPackageData(pkg)
        setIsLoading(false)
        return
      }

      setPackageData(pkg)

      // Always grant access since checkout is removed
      setHasAccess(true)

      // Fetch media items
      const { data: items, error: itemsError } = await supabase
        .from('media_items')
        .select('*')
        .eq('package_id', pkg.id)
        .order('created_at', { ascending: false })

      if (itemsError) {
        console.error('Error fetching media:', itemsError)
        toast.error('Failed to load media')
      } else {
        setMediaItems(items || [])
      }

      // Track page view
      await supabase.rpc('track_event', {
        p_package_id: pkg.id,
        p_event_type: 'package_viewed',
        p_metadata: { access_code: accessCode }
      })

    } catch (error) {
      console.error('Error loading package:', error)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }




  const filteredMedia = mediaItems.filter(item => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'drone') return item.file_type === 'drone'
    return item.file_type === activeFilter
  })

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric', 
      year: 'numeric'
    })
  }

  const getDaysRemaining = () => {
    if (!packageData) return 0
    const expiry = new Date(packageData.expires_at)
    const now = new Date()
    const days = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(0, days)
  }

  const isExpired = packageData && new Date(packageData.expires_at) < new Date()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading your memories...</p>
        </div>
      </div>
    )
  }

  if (isExpired) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Package Expired</h2>
          <p className="text-white/60 mb-6">
            This media package expired on {formatDate(packageData!.expires_at)}. 
            Please contact your operator for assistance.
          </p>
          <Link href="/tools/aeromedia">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Access Page
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/tools/aeromedia">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-green-500/50 text-green-500">
                <Check className="w-3 h-3 mr-1" />
                Full Access
              </Badge>
              <Button
                onClick={() => setShowBulkDownload(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Package Info */}
      <div className="bg-gradient-to-b from-black to-slate-900/50 border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your Flight Memories
            </h1>
            <div className="flex items-center justify-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(packageData!.flight_date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{packageData!.passenger_names.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{getDaysRemaining()} days remaining</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-2">
          {[
            { value: 'all', label: 'All Media', icon: null },
            { value: 'photo', label: 'Photos', icon: ImageIcon },
            { value: 'video', label: 'Videos', icon: Video },
            { value: 'drone', label: 'Drone', icon: Plane },
            { value: 'reel', label: 'Reels', icon: Film }
          ].map(filter => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter.value as any)}
              className={activeFilter === filter.value 
                ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                : 'border-white/20 text-white hover:bg-white/10'}
            >
              {filter.icon && <filter.icon className="w-4 h-4 mr-2" />}
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="container mx-auto px-4 pb-12">

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredMedia.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="relative group cursor-pointer rounded-lg overflow-hidden bg-slate-900"
                onClick={() => setSelectedMedia(item)}
              >
                <div className="aspect-square relative">
                  <MediaPreview
                    src={item.thumbnail_url || item.file_url}
                    alt={item.file_name}
                    type={item.file_type === 'photo' || item.file_type === 'drone' ? 'photo' : 'video'}
                    showWatermark={false}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Media type badge */}
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-black/60 backdrop-blur-sm text-white border-0">
                      {item.file_type === 'video' && <Video className="w-3 h-3 mr-1" />}
                      {item.file_type === 'photo' && <ImageIcon className="w-3 h-3 mr-1" />}
                      {item.file_type === 'drone' && <Plane className="w-3 h-3 mr-1" />}
                      {item.file_type === 'reel' && <Film className="w-3 h-3 mr-1" />}
                      {item.file_type}
                    </Badge>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Media Viewer Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <MediaViewerWithPaywall
            media={selectedMedia}
            allMedia={filteredMedia}
            packageData={packageData!}
            hasAccess={true}
            userEmail={''}
            onClose={() => setSelectedMedia(null)}
            onPurchase={() => {}}
          />
        )}
      </AnimatePresence>

      {/* Bulk Download Dialog */}
      {showBulkDownload && packageData && (
        <BulkDownloadDialog
          isOpen={showBulkDownload}
          mediaItems={mediaItems}
          packageCode={accessCode}
          flightDate={packageData.flight_date}
          onClose={() => setShowBulkDownload(false)}
          onDownloadComplete={() => {
            toast.success('Download completed!')
          }}
        />
      )}
    </div>
  )
}