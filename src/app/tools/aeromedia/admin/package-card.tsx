'use client'

import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Users, Upload, Trash2, Copy, Send, Loader2, FileVideo, FileImage, Settings } from 'lucide-react'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { createResumableUpload } from '@/lib/supabase/resumable-upload'
import { Progress } from '@/components/ui/progress'

interface MediaPackage {
  id: string
  access_code: string
  flight_date: string
  passenger_names: string[]
  created_at: string
  expires_at: string
  is_active: boolean
  access_count: number
  media_items?: { count: number }[]
}

interface PackageCardProps {
  pkg: MediaPackage
  onCopyCode: (code: string) => void
  onSendEmail: (pkg: MediaPackage) => void
  onUploadClick: (pkg: MediaPackage) => void
  onDelete: (id: string) => void
  onManageMedia: (pkg: MediaPackage) => void
}

interface UploadingFile {
  name: string
  progress: number
  status: 'uploading' | 'complete' | 'error'
}

const ALLOWED_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'video/mp4': ['.mp4'],
  'video/quicktime': ['.mov'],
}

export function PackageCard({ pkg, onCopyCode, onSendEmail, onUploadClick, onDelete, onManageMedia }: PackageCardProps) {
  const [isDragActive, setIsDragActive] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [formattedDate, setFormattedDate] = useState<string>('')
  const supabase = createClient()

  // Format date on client side to avoid hydration mismatch
  useEffect(() => {
    setFormattedDate(format(new Date(pkg.flight_date), 'MMM d, yyyy'))
  }, [pkg.flight_date])

  const uploadFile = useCallback(async (file: File, type: string) => {
    const fileName = file.name
    
    // Add to uploading files
    setUploadingFiles(prev => [...prev, { name: fileName, progress: 0, status: 'uploading' }])

    try {
      // Generate unique filename with proper sanitization
      const timestamp = Date.now()
      const randomSuffix = Math.random().toString(36).substring(2, 8)
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const filename = `${pkg.id}/${timestamp}_${randomSuffix}_${sanitizedName}`

      // Use resumable upload for files over 6MB
      if (file.size > 6 * 1024 * 1024) {
        await createResumableUpload({
          file,
          bucket: 'aeromedia-media',
          path: filename,
          onProgress: (percentage) => {
            setUploadingFiles(prev => prev.map(f => 
              f.name === fileName ? { ...f, progress: percentage } : f
            ))
          },
          onError: (error) => {
            console.error('Resumable upload error:', error)
            setUploadingFiles(prev => prev.map(f => 
              f.name === fileName ? { ...f, status: 'error' } : f
            ))
          },
          onSuccess: async () => {
            // Get public URL
            const { data: urlData } = supabase.storage
              .from('aeromedia-media')
              .getPublicUrl(filename)

            // Create database entry
            const { error: dbError } = await supabase
              .from('media_items')
              .insert({
                package_id: pkg.id,
                file_url: urlData.publicUrl,
                file_type: type,
                file_size: file.size,
                file_name: file.name,
                mime_type: file.type,
              })

            if (dbError) {
              // Check if it's a duplicate entry error
              if (dbError.code === '23505' || dbError.message?.includes('duplicate')) {
                console.log('Media item already exists in database, treating as success')
                setUploadingFiles(prev => prev.map(f => 
                  f.name === fileName ? { ...f, status: 'complete', progress: 100 } : f
                ))
              } else {
                console.error('Database error:', dbError)
                setUploadingFiles(prev => prev.map(f => 
                  f.name === fileName ? { ...f, status: 'error' } : f
                ))
              }
            } else {
              setUploadingFiles(prev => prev.map(f => 
                f.name === fileName ? { ...f, status: 'complete', progress: 100 } : f
              ))
            }
          }
        })
      } else {
        // Use standard upload for smaller files
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('aeromedia-media')
          .upload(filename, file)

        if (uploadError) throw uploadError

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('aeromedia-media')
          .getPublicUrl(filename)

        // Create database entry
        const { error: dbError } = await supabase
          .from('media_items')
          .insert({
            package_id: pkg.id,
            file_url: urlData.publicUrl,
            file_type: type,
            file_size: file.size,
            file_name: file.name,
            mime_type: file.type,
          })

        if (dbError) {
          // Check if it's a duplicate entry error
          if (dbError.code === '23505' || dbError.message?.includes('duplicate')) {
            console.log('Media item already exists in database, treating as success')
          } else {
            throw dbError
          }
        }

        // Update status
        setUploadingFiles(prev => prev.map(f => 
          f.name === fileName ? { ...f, status: 'complete', progress: 100 } : f
        ))
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadingFiles(prev => prev.map(f => 
        f.name === fileName ? { ...f, status: 'error' } : f
      ))
    }
  }, [pkg.id, supabase])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      if (!Object.keys(ALLOWED_TYPES).includes(file.type)) {
        toast.error(`${file.name}: File type not allowed`)
        return false
      }
      if (file.size > 1073741824) { // 1GB
        toast.error(`${file.name}: File too large (max 1GB)`)
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    setIsUploading(true)
    toast.success(`Uploading ${validFiles.length} files to ${pkg.access_code}`)

    // Upload all files
    for (const file of validFiles) {
      // Auto-detect file type based on mime type and file name
      let type: 'reel' | 'photo' | 'video' | 'drone' = 'photo'
      
      if (file.type.startsWith('video/')) {
        // Check if filename contains 'reel' or similar
        const filename = file.name.toLowerCase()
        if (filename.includes('reel') || filename.includes('short') || filename.includes('vertical')) {
          type = 'reel'
        } else {
          type = 'video'
        }
      }
      
      await uploadFile(file, type)
    }

    setIsUploading(false)
    
    // Clear completed uploads after delay
    setTimeout(() => {
      setUploadingFiles([])
    }, 3000)
  }, [pkg, uploadFile])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ALLOWED_TYPES,
    multiple: true,
    noClick: true,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div {...getRootProps()}>
      <input {...getInputProps()} />
      
      <Card className={`
        p-6 bg-white/5 border-white/10 transition-all
        ${isDragActive ? 'border-orange-500 bg-orange-500/10 scale-[1.02]' : 'hover:border-orange-500/50'}
      `}>
        {/* Drag Overlay */}
        <AnimatePresence>
          {isDragActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-orange-500/20 backdrop-blur-sm"
            >
              <div className="text-center">
                <Upload className="w-12 h-12 mx-auto mb-2 text-orange-400" />
                <p className="text-lg font-medium text-white">Drop files here</p>
                <p className="text-sm text-orange-400">Quick upload to {pkg.access_code}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xl">{pkg.access_code}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCopyCode(pkg.access_code)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formattedDate || pkg.flight_date}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {pkg.passenger_names.join(', ')}
              </div>
              <div>
                {pkg.media_items?.[0]?.count || 0} media items
              </div>
              <div>
                {pkg.access_count} views
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSendEmail(pkg)}
            >
              <Send className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUploadClick(pkg)}
              title="Upload media"
            >
              <Upload className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onManageMedia(pkg)}
              title="Manage media"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(pkg.id)}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              title="Delete package"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Upload Progress */}
        <AnimatePresence>
          {uploadingFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-white/10 space-y-2"
            >
              {uploadingFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    {file.status === 'uploading' && (
                      <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
                    )}
                    {file.status === 'complete' && (
                      <div className="w-4 h-4 rounded-full bg-green-500" />
                    )}
                    {file.status === 'error' && (
                      <div className="w-4 h-4 rounded-full bg-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{file.name}</p>
                    {file.status === 'uploading' && (
                      <Progress value={file.progress} className="h-1 mt-1" />
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {file.status === 'uploading' && `${Math.round(file.progress)}%`}
                    {file.status === 'complete' && 'Done'}
                    {file.status === 'error' && 'Failed'}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
      </div>
    </motion.div>
  )
}