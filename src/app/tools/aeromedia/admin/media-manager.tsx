'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image as ImageIcon, Video, Trash2, Edit2, Loader2, X, Check, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'

interface MediaItem {
  id: string
  package_id: string
  file_url: string
  file_type: 'reel' | 'photo' | 'video' | 'drone'
  thumbnail_url: string | null
  file_size: number
  file_name: string
  mime_type: string
  width: number | null
  height: number | null
  duration: number | null
  download_count: number
  created_at: string
}

interface MediaManagerProps {
  packageId: string
  packageCode: string
}

export function MediaManager({ packageId, packageCode }: MediaManagerProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [editingType, setEditingType] = useState<MediaItem['file_type']>('photo')
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const supabase = createClient()

  const fetchMediaItems = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('media_items')
        .select('*')
        .eq('package_id', packageId)
        .order('created_at', { ascending: false })

      if (error) throw error

      setMediaItems(data || [])
    } catch (error) {
      console.error('Error fetching media:', error)
      toast.error('Failed to load media items')
    } finally {
      setIsLoading(false)
    }
  }, [packageId, supabase])

  useEffect(() => {
    fetchMediaItems()
  }, [fetchMediaItems])

  const handleEditStart = (item: MediaItem) => {
    setEditingItem(item.id)
    setEditingName(item.file_name)
    setEditingType(item.file_type)
  }

  const handleEditSave = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('media_items')
        .update({
          file_name: editingName,
          file_type: editingType
        })
        .eq('id', itemId)

      if (error) throw error

      setMediaItems(items => 
        items.map(item => 
          item.id === itemId 
            ? { ...item, file_name: editingName, file_type: editingType }
            : item
        )
      )
      
      setEditingItem(null)
      toast.success('Media updated successfully')
    } catch (error) {
      console.error('Error updating media:', error)
      toast.error('Failed to update media')
    }
  }

  const handleDelete = async (itemId: string) => {
    try {
      // First get the item to find the storage path
      const item = mediaItems.find(i => i.id === itemId)
      if (!item) return

      // Extract the path from the URL
      const urlParts = item.file_url.split('/storage/v1/object/public/aeromedia-media/')
      if (urlParts.length > 1) {
        const filePath = urlParts[1]
        
        // Delete from storage
        const { error: storageError } = await supabase.storage
          .from('aeromedia-media')
          .remove([filePath])

        if (storageError) {
          console.error('Storage deletion error:', storageError)
        }
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('media_items')
        .delete()
        .eq('id', itemId)

      if (dbError) throw dbError

      setMediaItems(items => items.filter(item => item.id !== itemId))
      toast.success('Media deleted successfully')
    } catch (error) {
      console.error('Error deleting media:', error)
      toast.error('Failed to delete media')
    }
  }

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  const downloadFile = async (item: MediaItem) => {
    try {
      const response = await fetch(item.file_url)
      const blob = await response.blob()
      
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = item.file_name
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download file')
    }
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Media Items ({mediaItems.length})
          </h3>
          <Button
            onClick={fetchMediaItems}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Loader2 className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-400" />
          </div>
        ) : mediaItems.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No media items uploaded yet
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {mediaItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-white/5 border-white/10 overflow-hidden">
                    {/* Thumbnail */}
                    <div className="aspect-video relative bg-white/5">
                      {(item.file_type === 'video' || item.file_type === 'reel') ? (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                          <Video className="w-12 h-12 text-orange-400 mb-2" />
                          <p className="text-xs text-white/60 capitalize">{item.file_type}</p>
                          {item.duration && (
                            <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs">
                              {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
                            </span>
                          )}
                        </div>
                      ) : (
                        <Image
                          src={item.thumbnail_url || item.file_url}
                          alt={item.file_name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      )}
                      
                      {/* Type Badge */}
                      <div className={`absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 ${
                        item.file_type === 'drone' ? 'bg-orange-500 text-white' :
                        item.file_type === 'reel' ? 'bg-purple-500 text-white' :
                        item.file_type === 'video' ? 'bg-blue-500 text-white' :
                        'bg-gray-500 text-white'
                      }`}>
                        {item.file_type === 'drone' ? '✈️' : 
                         item.file_type === 'reel' ? '🎬' :
                         item.file_type === 'video' ? '🎥' : '📸'}
                        {item.file_type}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 space-y-3">
                      {editingItem === item.id ? (
                        <div className="space-y-2">
                          <Input
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="bg-white/5 border-white/10"
                            placeholder="File name"
                          />
                          <Select value={editingType} onValueChange={(v) => setEditingType(v as any)}>
                            <SelectTrigger className="bg-white/5 border-white/10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="reel">🎬 Reel</SelectItem>
                              <SelectItem value="photo">📸 Photo</SelectItem>
                              <SelectItem value="video">🎥 Video</SelectItem>
                              <SelectItem value="drone">✈️ Drone</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleEditSave(item.id)}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingItem(null)}
                              className="border-white/10"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="font-medium truncate" title={item.file_name}>
                            {item.file_name}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <span>{formatFileSize(item.file_size)}</span>
                            <span>{item.download_count} downloads</span>
                          </div>
                        </>
                      )}

                      {/* Actions */}
                      {editingItem !== item.id && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadFile(item)}
                            className="flex-1 border-white/10"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditStart(item)}
                            className="flex-1 border-white/10"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDeleteConfirmId(item.id)}
                            className="flex-1 border-white/10 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent className="bg-black border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Media Item</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this media item? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteConfirmId) {
                  handleDelete(deleteConfirmId)
                  setDeleteConfirmId(null)
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}