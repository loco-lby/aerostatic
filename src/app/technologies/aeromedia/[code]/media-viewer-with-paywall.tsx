'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { X, Download, ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MediaPreview } from '@/components/aeromedia/watermark-overlay'
import { toast } from 'sonner'

interface MediaItem {
  id: string
  file_url: string
  file_type: 'reel' | 'photo' | 'video' | 'drone'
  file_name: string
  file_size: number
  width: number | null
  height: number | null
  duration: number | null
  thumbnail_url?: string
}

interface MediaPackage {
  id: string
  access_code: string
  price_cents: number | null
  requires_purchase: boolean
  is_comp: boolean
  passenger_names: string[]
  flight_date: string
}

interface MediaViewerWithPaywallProps {
  media: MediaItem
  allMedia: MediaItem[]
  packageData: MediaPackage
  hasAccess: boolean
  userEmail?: string
  onClose: () => void
  onPurchase: () => void
}


export function MediaViewerWithPaywall({ 
  media, 
  allMedia, 
  packageData,
  hasAccess,
  userEmail,
  onClose, 
  onPurchase
}: MediaViewerWithPaywallProps) {
  const [currentIndex, setCurrentIndex] = useState(allMedia.findIndex(m => m.id === media.id))
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const currentMedia = allMedia[currentIndex]

  const navigatePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : allMedia.length - 1))
  }, [allMedia.length])

  const navigateNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < allMedia.length - 1 ? prev + 1 : 0))
  }, [allMedia.length])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') navigatePrevious()
      if (e.key === 'ArrowRight') navigateNext()
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [navigatePrevious, navigateNext, onClose])

  const handleDownload = async () => {

    setIsLoading(true)
    try {
      // Track download event
      await fetch('/api/aeromedia/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: packageData.id,
          mediaItemId: currentMedia.id,
          eventType: 'download_started',
          email: ''
        })
      })

      // Generate signed URL
      const response = await fetch('/api/aeromedia/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mediaItemId: currentMedia.id,
          packageId: packageData.id,
          accessCode: packageData.access_code,
          email: userEmail
        })
      })

      if (!response.ok) {
        throw new Error('Download failed')
      }

      const { url } = await response.json()

      // Create download link
      const a = document.createElement('a')
      a.href = url
      a.download = currentMedia.file_name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      // Track completion
      await fetch('/api/aeromedia/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: packageData.id,
          mediaItemId: currentMedia.id,
          eventType: 'download_completed',
          email: userEmail
        })
      })

      toast.success('Download started')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download file')
    } finally {
      setIsLoading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  const isVideo = currentMedia.file_type === 'video' || currentMedia.file_type === 'reel' || currentMedia.file_type === 'drone'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
              <div className="text-white">
                <p className="text-sm opacity-80">
                  {currentIndex + 1} / {allMedia.length}
                </p>
                <p className="text-xs opacity-60">
                  {currentMedia.file_name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                disabled={isLoading}
                className="border-white/20 text-white hover:bg-white/20"
              >
                <Download className="h-4 w-4 mr-2" />
                Download ({formatFileSize(currentMedia.file_size)})
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-white hover:bg-white/20"
              >
                <Expand className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Media Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative max-w-full max-h-full">
            <MediaPreview
              src={currentMedia.file_url}
              thumbnail={currentMedia.thumbnail_url}
              alt={currentMedia.file_name}
              type={isVideo ? 'video' : 'photo'}
              showWatermark={false}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>

        {/* Navigation */}
        <Button
          variant="ghost"
          size="icon"
          onClick={navigatePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-20"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={navigateNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-20"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        {/* Bottom info bar */}
        {!hasAccess && packageData.requires_purchase && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="text-center text-white">
              <p className="text-sm opacity-80">
                Preview Only • Purchase to download original quality
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}