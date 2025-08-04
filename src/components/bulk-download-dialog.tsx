'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, AlertCircle, CheckCircle2, Loader2, FileArchive } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import JSZip from 'jszip'
import { format } from 'date-fns'

interface MediaItem {
  id: string
  file_url: string
  file_type: 'reel' | 'photo' | 'video' | 'drone'
  file_name: string
  file_size: number
}

interface BulkDownloadDialogProps {
  isOpen: boolean
  onClose: () => void
  mediaItems: MediaItem[]
  packageCode: string
  flightDate: string
  onDownloadComplete?: () => void
  onTrackDownload?: (mediaItemId: string) => Promise<void>
}

export function BulkDownloadDialog({
  isOpen,
  onClose,
  mediaItems,
  packageCode,
  flightDate,
  onDownloadComplete,
  onTrackDownload
}: BulkDownloadDialogProps) {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'zipping' | 'success' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [currentFile, setCurrentFile] = useState('')
  const [processedFiles, setProcessedFiles] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const abortControllerRef = useRef<AbortController | null>(null)
  const preventNavigationRef = useRef<((e: BeforeUnloadEvent) => void) | null>(null)

  const startBulkDownload = useCallback(async () => {
    try {
      setDownloadState('downloading')
      setProgress(0)
      setProcessedFiles(0)

      // Create abort controller for cancellation
      abortControllerRef.current = new AbortController()

      // Add navigation prevention
      preventNavigationRef.current = (e: BeforeUnloadEvent) => {
        e.preventDefault()
        e.returnValue = ''
      }
      window.addEventListener('beforeunload', preventNavigationRef.current)

      const zip = new JSZip()
      const formattedDate = format(new Date(flightDate), 'yyyy-MM-dd')
      const folderName = `Aerostatic_${formattedDate}_${packageCode}`

      // Track all downloads
      if (onTrackDownload) {
        const trackPromises = mediaItems.map(item => onTrackDownload(item.id))
        await Promise.all(trackPromises)
      }

      // Download all files
      const totalFiles = mediaItems.length
      const failedFiles: string[] = []

      for (let i = 0; i < totalFiles; i++) {
        const item = mediaItems[i]
        setCurrentFile(item.file_name)
        setProcessedFiles(i + 1)
        
        // Update progress
        const percentComplete = Math.round(((i + 1) / totalFiles) * 90) // Reserve 10% for zipping
        setProgress(percentComplete)

        try {
          const response = await fetch(item.file_url, {
            signal: abortControllerRef.current.signal
          })

          if (!response.ok) {
            throw new Error(`Failed to download ${item.file_name}`)
          }

          const blob = await response.blob()

          // Organize files by type in folders
          let subfolder = ''
          switch (item.file_type) {
            case 'reel':
              subfolder = 'Reels/'
              break
            case 'video':
              subfolder = 'Videos/'
              break
            case 'drone':
              subfolder = 'Drone/'
              break
            default:
              subfolder = 'Photos/'
          }

          zip.file(`${folderName}/${subfolder}${item.file_name}`, blob)
        } catch (error) {
          if (error instanceof Error && error.name === 'AbortError') {
            throw error // Re-throw abort errors to stop the process
          }
          console.error(`Error downloading ${item.file_name}:`, error)
          failedFiles.push(item.file_name)
        }
      }

      // Generate zip file
      setDownloadState('zipping')
      setCurrentFile('Creating zip file...')
      setProgress(95)

      const zipBlob = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 },
        streamFiles: true
      }, (metadata) => {
        // Update progress during zip generation
        const zipProgress = 90 + (metadata.percent / 100 * 10)
        setProgress(Math.round(zipProgress))
      })

      // Create download link
      const blobUrl = window.URL.createObjectURL(zipBlob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `${folderName}.zip`
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()

      // Cleanup
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)

      // Remove navigation prevention
      if (preventNavigationRef.current) {
        window.removeEventListener('beforeunload', preventNavigationRef.current)
      }

      setProgress(100)
      setDownloadState('success')
      
      if (failedFiles.length > 0) {
        toast.warning(`Download completed with ${failedFiles.length} failed files`)
      }
      
      onDownloadComplete?.()

      // Auto close after success
      setTimeout(() => {
        onClose()
      }, 3000)

    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setErrorMessage('Download was cancelled')
        } else {
          setErrorMessage(error.message)
        }
        setDownloadState('error')
      }

      // Remove navigation prevention on error
      if (preventNavigationRef.current) {
        window.removeEventListener('beforeunload', preventNavigationRef.current)
      }
    }
  }, [mediaItems, packageCode, flightDate, onTrackDownload, onDownloadComplete, onClose])

  useEffect(() => {
    if (isOpen && downloadState === 'idle') {
      startBulkDownload()
    }
  }, [isOpen, downloadState, startBulkDownload])

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (preventNavigationRef.current) {
        window.removeEventListener('beforeunload', preventNavigationRef.current)
      }
    }
  }, [])

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    onClose()
  }

  const handleRetry = () => {
    setDownloadState('idle')
    setErrorMessage('')
    startBulkDownload()
  }

  const totalSize = mediaItems.reduce((sum, item) => sum + item.file_size, 0)
  const formatBytes = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(1)} KB`
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileArchive className="w-5 h-5" />
            {downloadState === 'downloading' && 'Downloading Media...'}
            {downloadState === 'zipping' && 'Creating Zip File...'}
            {downloadState === 'success' && 'Download Complete!'}
            {downloadState === 'error' && 'Download Failed'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary Info */}
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {downloadState === 'success' 
                ? `Downloaded ${mediaItems.length} files`
                : `Downloading ${mediaItems.length} files (${formatBytes(totalSize)})`
              }
            </p>
            {(downloadState === 'downloading' || downloadState === 'zipping') && (
              <p className="text-xs text-muted-foreground truncate">
                {currentFile}
              </p>
            )}
          </div>

          {/* Progress/Status */}
          <div className="space-y-3">
            {(downloadState === 'downloading' || downloadState === 'zipping') && (
              <>
                <Progress value={progress} className="w-full" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {downloadState === 'downloading' 
                      ? `${processedFiles} / ${mediaItems.length} files`
                      : 'Creating zip file...'
                    }
                  </span>
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{progress}%</span>
                  </div>
                </div>
              </>
            )}

            {downloadState === 'success' && (
              <div className="flex items-center justify-center gap-2 py-4 text-green-600">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">All media downloaded successfully!</span>
              </div>
            )}

            {downloadState === 'error' && (
              <div className="space-y-3">
                <div className="flex items-start gap-2 py-4 text-destructive">
                  <AlertCircle className="w-5 h-5 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium">Download failed</p>
                    <p className="text-sm text-muted-foreground">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Warning message */}
          {(downloadState === 'downloading' || downloadState === 'zipping') && (
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 text-sm text-orange-600">
              <p className="font-medium mb-1">Please don&apos;t close this window</p>
              <p className="text-xs opacity-80">Your download is in progress. Closing this window will cancel the download.</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            {(downloadState === 'downloading' || downloadState === 'zipping') && (
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
            )}
            {downloadState === 'error' && (
              <>
                <Button onClick={onClose} variant="outline">
                  Close
                </Button>
                <Button onClick={handleRetry}>
                  <Download className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </>
            )}
            {downloadState === 'success' && (
              <Button onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}