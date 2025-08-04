'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export interface DownloadItem {
  id: string
  fileName: string
  status: 'pending' | 'downloading' | 'completed' | 'error' | string
  progress?: number
  error?: string
}

interface PendingDownloadsProps {
  downloads: DownloadItem[]
  onClose: () => void
  onRemove: (id: string) => void
}

export function PendingDownloads({ downloads, onClose, onRemove }: PendingDownloadsProps) {
  if (downloads.length === 0) return null

  const pendingCount = downloads.filter(d => d.status === 'pending' || d.status === 'downloading').length
  const completedCount = downloads.filter(d => d.status === 'completed').length
  const errorCount = downloads.filter(d => d.status === 'error').length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]"
    >
      <Card className="bg-black/90 backdrop-blur-xl border-white/10 shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-orange-500" />
            <h3 className="font-medium">Downloads</h3>
            {pendingCount > 0 && (
              <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
                {pendingCount} active
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="max-h-60 overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {downloads.map((download) => (
              <motion.div
                key={download.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-3 border-b border-white/5 last:border-0"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {download.status === 'pending' && (
                      <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                    )}
                    {download.status === 'downloading' && (
                      <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                    )}
                    {download.status === 'completed' && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                    {download.status === 'error' && (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{download.fileName}</p>
                    <p className="text-xs text-gray-400">
                      {download.status === 'pending' && 'Waiting...'}
                      {download.status === 'downloading' && 'Downloading...'}
                      {download.status === 'completed' && 'Complete'}
                      {download.status === 'error' && (download.error || 'Failed')}
                    </p>
                  </div>

                  {(download.status === 'completed' || download.status === 'error') && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(download.id)}
                      className="h-6 w-6 hover:bg-white/10"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {(completedCount > 0 || errorCount > 0) && (
          <div className="p-3 border-t border-white/10 text-xs text-gray-400">
            {completedCount > 0 && <span>{completedCount} completed</span>}
            {completedCount > 0 && errorCount > 0 && <span> • </span>}
            {errorCount > 0 && <span className="text-red-400">{errorCount} failed</span>}
          </div>
        )}
      </Card>
    </motion.div>
  )
}