'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { X, Download, ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface MediaItem {
  id: string
  file_url: string
  file_type: 'reel' | 'photo' | 'video' | 'drone'
  file_name: string
  file_size: number
  width: number | null
  height: number | null
  duration: number | null
}

interface MediaViewerProps {
  media: MediaItem
  allMedia: MediaItem[]
  onClose: () => void
  onDownload: (media: MediaItem) => void
}

export function MediaViewer({ media, allMedia, onClose, onDownload }: MediaViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(allMedia.findIndex(m => m.id === media.id))
  const [isFullscreen, setIsFullscreen] = useState(false)
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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                toggleFullscreen()
              }}
              className="text-white hover:bg-white/10"
            >
              <Expand className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                onDownload(currentMedia)
              }}
              className="text-white hover:bg-white/10"
            >
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Media Info */}
        <div className="text-center mt-4">
          <h3 className="text-white font-medium">{currentMedia.file_name}</h3>
          <p className="text-gray-400 text-sm">
            {formatFileSize(currentMedia.file_size)}
            {currentMedia.width && currentMedia.height && ` • ${currentMedia.width}×${currentMedia.height}`}
            {currentMedia.duration && ` • ${Math.floor(currentMedia.duration / 60)}:${(currentMedia.duration % 60).toString().padStart(2, '0')}`}
          </p>
        </div>
      </div>

      {/* Media Display */}
      <div className="absolute inset-0 flex items-center justify-center p-16" onClick={(e) => e.stopPropagation()}>
        {(currentMedia.file_type === 'video' || currentMedia.file_type === 'reel') ? (
          <video
            src={currentMedia.file_url}
            controls
            className="max-w-full max-h-full rounded-lg"
            autoPlay
          />
        ) : (
          <Image
            src={currentMedia.file_url}
            alt={currentMedia.file_name}
            width={1920}
            height={1080}
            className="max-w-full max-h-full object-contain rounded-lg"
            style={{ width: 'auto', height: 'auto' }}
          />
        )}
      </div>

      {/* Navigation */}
      {allMedia.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigatePrevious()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigateNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 rounded-full text-white text-sm">
        {currentIndex + 1} / {allMedia.length}
      </div>
    </motion.div>
  )
}