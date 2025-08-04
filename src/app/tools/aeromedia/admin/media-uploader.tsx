'use client'

import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Check, AlertCircle, FileVideo, FileImage, Loader2, Pause, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { createResumableUpload } from '@/lib/supabase/resumable-upload'
import { motion, AnimatePresence } from 'framer-motion'

interface MediaUploaderProps {
  packageId: string
  onComplete: () => void
}

interface UploadFile {
  file: File
  type: 'reel' | 'photo' | 'video' | 'drone'
  status: 'pending' | 'uploading' | 'complete' | 'error'
  progress: number
  error?: string
  uploadInstance?: any // TUS upload instance
}

const ALLOWED_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'video/mp4': ['.mp4'],
  'video/quicktime': ['.mov'],
}

const MAX_FILE_SIZE = 1073741824 // 1GB
const WARNING_FILE_SIZE = 262144000 // 250MB

export function MediaUploader({ packageId, onComplete }: MediaUploaderProps) {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [autoUpload, setAutoUpload] = useState(true)
  const [uploadStartTime, setUploadStartTime] = useState<number | null>(null)
  const supabase = createClient()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles: File[] = []
    const largeFiles: File[] = []
    const errors: string[] = []

    acceptedFiles.forEach(file => {
      if (!Object.keys(ALLOWED_TYPES).includes(file.type)) {
        errors.push(`${file.name}: File type not allowed`)
        return
      }
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: File too large (max 1GB)`)
        return
      }
      if (file.size > WARNING_FILE_SIZE) {
        largeFiles.push(file)
      } else {
        validFiles.push(file)
      }
    })

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error))
    }

    // Handle large files with confirmation
    if (largeFiles.length > 0) {
      const largeFileNames = largeFiles.map(f => `${f.name} (${formatFileSize(f.size)})`).join('\n')
      const confirmed = confirm(`The following files are larger than 250MB:\n\n${largeFileNames}\n\nLarge files may take a while to upload. Continue?`)

      if (confirmed) {
        validFiles.push(...largeFiles)
      }
    }

    if (validFiles.length > 0) {
      const newFiles = validFiles.map(file => {
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

        return {
          file,
          type,
          status: 'pending' as const,
          progress: 0,
        }
      })

      setFiles(prev => [...(prev || []), ...newFiles])
      toast.success(`Added ${validFiles.length} file${validFiles.length > 1 ? 's' : ''} to upload queue`)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: ALLOWED_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: true,
    noClick: false,
    noKeyboard: false,
    useFsAccessApi: false, // Disable for better compatibility
  })

  const updateFileType = (index: number, type: UploadFile['type']) => {
    setFiles(prev => (prev || []).map((f, i) =>
      i === index ? { ...f, type } : f
    ))
  }

  const removeFile = (index: number) => {
    setFiles(prev => (prev || []).filter((_, i) => i !== index))
  }

  const uploadFiles = useCallback(async () => {
    setIsUploading(true)
    setUploadStartTime(Date.now())

    for (let i = 0; i < (files || []).length; i++) {
      const uploadFile = (files || [])[i]
      if (uploadFile.status !== 'pending') continue

      try {
        // Update status
        setFiles(prev => (prev || []).map((f, idx) =>
          idx === i ? { ...f, status: 'uploading' } : f
        ))

        // Generate unique filename
        const timestamp = Date.now()
        const filename = `${packageId}/${timestamp}_${uploadFile.file.name}`

        // Use resumable upload for files over 6MB
        if (uploadFile.file.size > 6 * 1024 * 1024) {
          try {
            // Create resumable upload
            const uploadInstance = await createResumableUpload({
              file: uploadFile.file,
              bucket: 'aeromedia-media',
              path: filename,
              onProgress: (percentage) => {
                setFiles(prev => (prev || []).map((f, idx) =>
                  idx === i ? { ...f, progress: percentage } : f
                ))
              },
              onError: (error) => {
                console.error('Resumable upload error:', error)
                setFiles(prev => (prev || []).map((f, idx) =>
                  idx === i ? { ...f, status: 'error', error: error.message } : f
                ))
              },
              onSuccess: async () => {
                // Get public URL
                const { data: urlData } = supabase.storage
                  .from('aeromedia-media')
                  .getPublicUrl(filename)

                // For videos, we'll use a placeholder thumbnail for now
                const thumbnailUrl = uploadFile.file.type.startsWith('video/')
                  ? null
                  : urlData.publicUrl

                // Create database entry
                const { error: dbError } = await supabase
                  .from('media_items')
                  .insert({
                    package_id: packageId,
                    file_url: urlData.publicUrl,
                    file_type: uploadFile.type,
                    file_size: uploadFile.file.size,
                    file_name: uploadFile.file.name,
                    mime_type: uploadFile.file.type,
                    thumbnail_url: thumbnailUrl,
                  })

                if (dbError) {
                  console.error('Database error:', dbError)
                  setFiles(prev => (prev || []).map((f, idx) =>
                    idx === i ? { ...f, status: 'error', error: 'Failed to save to database' } : f
                  ))
                } else {
                  // Update status
                  setFiles(prev => (prev || []).map((f, idx) =>
                    idx === i ? { ...f, status: 'complete', progress: 100 } : f
                  ))
                }
              }
            })

            // Store upload instance for potential pause/resume
            setFiles(prev => (prev || []).map((f, idx) =>
              idx === i ? { ...f, uploadInstance } : f
            ))
          } catch (resumableError) {
            console.error('Resumable upload failed, falling back to standard upload:', resumableError)

            // If resumable upload fails (e.g., due to file size limits), try standard upload
            toast.warning('Resumable upload not available, using standard upload. Large files may timeout.')

            // Fall through to standard upload
          }
        }

        // Use standard upload for smaller files or as fallback
        if (uploadFile.file.size <= 6 * 1024 * 1024 || !files[i].uploadInstance) {
          // Use standard upload for smaller files
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('aeromedia-media')
            .upload(filename, uploadFile.file, {
              upsert: false
            })

          if (uploadError) throw uploadError

          // Get public URL
          const { data: urlData } = supabase.storage
            .from('aeromedia-media')
            .getPublicUrl(filename)

          // For videos, we'll use a placeholder thumbnail for now
          const thumbnailUrl = uploadFile.file.type.startsWith('video/')
            ? null
            : urlData.publicUrl

          // Create database entry
          const { error: dbError } = await supabase
            .from('media_items')
            .insert({
              package_id: packageId,
              file_url: urlData.publicUrl,
              file_type: uploadFile.type,
              file_size: uploadFile.file.size,
              file_name: uploadFile.file.name,
              mime_type: uploadFile.file.type,
              thumbnail_url: thumbnailUrl,
            })

          if (dbError) throw dbError

          // Update status
          setFiles(prev => (prev || []).map((f, idx) =>
            idx === i ? { ...f, status: 'complete', progress: 100 } : f
          ))
        }
      } catch (error) {
        console.error('Upload error:', error)
        setFiles(prev => (prev || []).map((f, idx) =>
          idx === i ? { ...f, status: 'error', error: 'Upload failed' } : f
        ))
      }
    }

    setIsUploading(false)

    const allSuccess = (files || []).every(f => f.status === 'complete')
    if (allSuccess) {
      toast.success('All files uploaded successfully!')
      setTimeout(onComplete, 1000)
    }
  }, [files, packageId, supabase, onComplete])

  // Auto-upload effect
  useEffect(() => {
    if (autoUpload && files.some(f => f.status === 'pending') && !isUploading) {
      uploadFiles()
    }
  }, [files, autoUpload, isUploading, uploadFiles])

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-orange-500 bg-orange-500/10' : 'border-white/20 hover:border-white/40'}
        `}
      >
        <input {...getInputProps()} multiple />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg mb-2">
          {isDragActive ? 'Drop files here' : 'Drag & drop files or folders here'}
        </p>
        <p className="text-sm text-gray-400">or click to select files</p>
        <p className="text-xs text-gray-500 mt-2">
          Accepted: JPG, PNG, WebP, MP4, MOV (max 1GB per file)
        </p>
        <p className="text-xs text-gray-400 mt-1">
          💡 Drop your entire edited folder - we&apos;ll auto-detect reels and videos
        </p>
        <p className="text-xs text-gray-400 mt-1">
          🏷️ You can tag each file as Reel, Photo, Video, or Drone after adding
        </p>
        <p className="text-xs text-gray-400 mt-1">
          ✨ Large files support resumable uploads - you can leave and come back!
        </p>
      </div>

      {/* File List */}
      <AnimatePresence>
        {(files || []).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-2"
          >
            {/* Upload Stats */}
            {isUploading && (
              <div className="mb-4 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-orange-400">
                    Uploading {files.filter(f => f.status === 'uploading').length} of {files.length} files
                  </span>
                  <span className="text-xs text-gray-400">
                    {files.filter(f => f.status === 'complete').length} completed
                  </span>
                </div>
                <Progress
                  value={(files.filter(f => f.status === 'complete').length / files.length) * 100}
                  className="h-2"
                />
              </div>
            )}

            {(files || []).map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  flex items-center gap-4 p-4 rounded-lg transition-all
                  ${file.status === 'uploading' ? 'bg-orange-500/10 border border-orange-500/20' : 'bg-white/5'}
                  ${file.status === 'complete' ? 'opacity-75' : ''}
                `}
              >
                {/* File Icon */}
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10">
                  {file.file.type.startsWith('video/') ? (
                    <FileVideo className="w-5 h-5 text-orange-400" />
                  ) : (
                    <FileImage className="w-5 h-5 text-orange-400" />
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-medium">{file.file.name}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{formatFileSize(file.file.size)}</span>
                    {file.status === 'uploading' && file.progress > 0 && (
                      <span>{Math.round(file.progress)}%</span>
                    )}
                  </div>
                  {file.status === 'uploading' && (
                    <Progress value={file.progress} className="mt-2 h-1" />
                  )}
                  {file.error && (
                    <p className="text-sm text-red-500 mt-1">{file.error}</p>
                  )}
                </div>

                {/* Type selector - more prominent and accessible */}
                <div className="flex items-center gap-2">
                  <Select
                    value={file.type}
                    onValueChange={(v) => updateFileType(index, v as any)}
                    disabled={file.status !== 'pending'}
                  >
                    <SelectTrigger className={`w-32 ${file.status === 'pending' ? 'bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20' : 'bg-white/5 border-white/10'}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reel">🎬 Reel</SelectItem>
                      <SelectItem value="photo">📸 Photo</SelectItem>
                      <SelectItem value="video">🎥 Video</SelectItem>
                      <SelectItem value="drone">✈️ Drone</SelectItem>
                    </SelectContent>
                  </Select>
                  {file.status === 'pending' && (
                    <span className="text-xs text-orange-400">← Select type</span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {file.status === 'pending' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      className="hover:bg-red-500/20"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                  {file.status === 'uploading' && file.uploadInstance && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        file.uploadInstance.abort()
                        setFiles(prev => (prev || []).map((f, idx) =>
                          idx === index ? { ...f, status: 'pending' as const, progress: 0 } : f
                        ))
                      }}
                      className="hover:bg-orange-500/20"
                      title="Pause upload"
                    >
                      <Pause className="w-4 h-4" />
                    </Button>
                  )}
                  {file.status === 'uploading' && !file.uploadInstance && (
                    <Loader2 className="w-5 h-5 animate-spin text-orange-400" />
                  )}
                  {file.status === 'complete' && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                  {file.status === 'error' && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Controls */}
      {(files || []).length > 0 && !autoUpload && (
        <div className="flex gap-2">
          <Button
            onClick={uploadFiles}
            disabled={isUploading || (files || []).every(f => f.status !== 'pending')}
            className="flex-1 bg-orange-500 hover:bg-orange-600"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading {files.filter(f => f.status === 'uploading').length} files...
              </>
            ) : (
              `Upload ${(files || []).filter(f => f.status === 'pending').length} Files`
            )}
          </Button>
        </div>
      )}
    </div>
  )
}