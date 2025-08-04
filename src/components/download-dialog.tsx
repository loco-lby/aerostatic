'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'

interface DownloadDialogProps {
  isOpen: boolean
  onClose: () => void
  fileName: string
  fileUrl: string
  fileSize: number
  onDownloadComplete?: () => void
  onDownloadError?: (error: Error) => void
}

export function DownloadDialog({
  isOpen,
  onClose,
  fileName,
  fileUrl,
  fileSize,
  onDownloadComplete,
  onDownloadError
}: DownloadDialogProps) {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [downloadedBytes, setDownloadedBytes] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const abortControllerRef = useRef<AbortController | null>(null)
  const preventNavigationRef = useRef<((e: BeforeUnloadEvent) => void) | null>(null)

  const startDownload = useCallback(async () => {
    try {
      setDownloadState('downloading')
      setProgress(0)
      setDownloadedBytes(0)

      // Create abort controller for cancellation
      abortControllerRef.current = new AbortController()

      // Add navigation prevention
      preventNavigationRef.current = (e: BeforeUnloadEvent) => {
        e.preventDefault()
        e.returnValue = ''
      }
      window.addEventListener('beforeunload', preventNavigationRef.current)

      // Fetch with progress tracking
      const response = await fetch(fileUrl, {
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        throw new Error(`Failed to download: ${response.statusText}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('Failed to initialize download')
      }

      const contentLength = parseInt(response.headers.get('content-length') || String(fileSize))
      const chunks: Uint8Array[] = []
      let receivedLength = 0

      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break

        chunks.push(value)
        receivedLength += value.length
        setDownloadedBytes(receivedLength)
        
        const percentComplete = Math.round((receivedLength / contentLength) * 100)
        setProgress(percentComplete)
      }

      // Combine chunks into blob
      const blob = new Blob(chunks, { type: response.headers.get('content-type') || 'application/octet-stream' })

      // Create download link
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = fileName
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

      setDownloadState('success')
      onDownloadComplete?.()

      // Auto close after success
      setTimeout(() => {
        onClose()
      }, 2000)

    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setErrorMessage('Download was cancelled')
        } else {
          setErrorMessage(error.message)
        }
        setDownloadState('error')
        onDownloadError?.(error)
      }

      // Remove navigation prevention on error
      if (preventNavigationRef.current) {
        window.removeEventListener('beforeunload', preventNavigationRef.current)
      }
    }
  }, [fileUrl, fileName, fileSize, onDownloadComplete, onDownloadError, onClose])

  useEffect(() => {
    if (isOpen && downloadState === 'idle') {
      startDownload()
    }
  }, [isOpen, downloadState, startDownload])

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
    startDownload()
  }

  const formatBytes = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(1)} KB`
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {downloadState === 'downloading' && 'Downloading...'}
            {downloadState === 'success' && 'Download Complete!'}
            {downloadState === 'error' && 'Download Failed'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* File Info */}
          <div className="space-y-1">
            <p className="text-sm font-medium truncate">{fileName}</p>
            <p className="text-xs text-muted-foreground">
              {downloadState === 'downloading' 
                ? `${formatBytes(downloadedBytes)} / ${formatBytes(fileSize)}`
                : formatBytes(fileSize)
              }
            </p>
          </div>

          {/* Progress/Status */}
          <div className="space-y-3">
            {downloadState === 'downloading' && (
              <>
                <Progress value={progress} className="w-full" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{progress}%</span>
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Downloading...</span>
                  </div>
                </div>
              </>
            )}

            {downloadState === 'success' && (
              <div className="flex items-center justify-center gap-2 py-4 text-green-600">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Download completed successfully!</span>
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

          {/* Actions */}
          <div className="flex justify-end gap-2">
            {downloadState === 'downloading' && (
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