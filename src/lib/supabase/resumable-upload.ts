import * as tus from 'tus-js-client'
import { createClient } from '@/lib/supabase/client'

interface ResumableUploadOptions {
  file: File
  bucket: string
  path: string
  onProgress?: (percentage: number) => void
  onError?: (error: Error) => void
  onSuccess?: () => void
  metadata?: Record<string, string>
}

interface UploadInstance {
  upload: tus.Upload
  abort: () => void
  resume: () => void
}

const activeUploads = new Map<string, UploadInstance>()

export async function createResumableUpload({
  file,
  bucket,
  path,
  onProgress,
  onError,
  onSuccess,
  metadata = {}
}: ResumableUploadOptions): Promise<UploadInstance> {
  const supabase = createClient()
  
  // Get the session for authentication
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    throw new Error('Not authenticated')
  }

  // Get the project URL
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const uploadUrl = `${projectUrl}/storage/v1/upload/resumable`

  // Create unique upload key for tracking
  const uploadKey = `${bucket}/${path}`
  
  // Check if upload already exists
  const existingUpload = activeUploads.get(uploadKey)
  if (existingUpload) {
    existingUpload.abort()
    activeUploads.delete(uploadKey)
  }

  // Configure the upload
  const upload = new tus.Upload(file, {
    endpoint: uploadUrl,
    retryDelays: [0, 3000, 5000, 10000, 20000],
    metadata: {
      bucketName: bucket,
      objectName: path,
      contentType: file.type || 'application/octet-stream',
      cacheControl: '3600',
      // Add file size to metadata - required for TUS
      fileSize: file.size.toString(),
      ...metadata
    },
    headers: {
      authorization: `Bearer ${session.access_token}`,
      'x-upsert': 'false' // Don't overwrite existing files
    },
    uploadSize: file.size, // Explicitly set the upload size
    chunkSize: 6 * 1024 * 1024, // 6MB chunks
    removeFingerprintOnSuccess: true,
    storeFingerprintForResuming: true,
    onError: (error) => {
      console.error('Upload error:', error)
      activeUploads.delete(uploadKey)
      
      // Check for 413 error (file too large)
      const errorMessage = String(error)
      if (errorMessage.includes('413') || errorMessage.includes('Maximum size exceeded')) {
        onError?.(new Error('File size exceeds the maximum allowed limit. Please contact support to increase your storage limits.'))
      } else {
        onError?.(error instanceof Error ? error : new Error(errorMessage))
      }
    },
    onProgress: (bytesUploaded, bytesTotal) => {
      const percentage = (bytesUploaded / bytesTotal) * 100
      onProgress?.(percentage)
    },
    onSuccess: () => {
      console.log('Upload finished:', upload.url)
      activeUploads.delete(uploadKey)
      onSuccess?.()
    },
    onShouldRetry: (error, retryAttempt, options) => {
      const status = (error as any).originalResponse?.getStatus?.()
      
      // Don't retry on 4xx errors except 409 (conflict)
      if (status && status >= 400 && status < 500 && status !== 409) {
        return false
      }
      
      // Retry up to 5 times
      return retryAttempt < 5
    }
  })

  // Find previous uploads and resume if possible
  upload.findPreviousUploads().then((previousUploads) => {
    if (previousUploads.length > 0) {
      // Resume the most recent upload
      upload.resumeFromPreviousUpload(previousUploads[0])
    }
    
    // Start the upload
    upload.start()
  })

  const uploadInstance: UploadInstance = {
    upload,
    abort: () => {
      upload.abort()
      activeUploads.delete(uploadKey)
    },
    resume: () => {
      upload.start()
    }
  }

  activeUploads.set(uploadKey, uploadInstance)
  
  return uploadInstance
}

// Clean up any active uploads when the page is unloaded
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    // Don't abort uploads on page unload - they can be resumed
    activeUploads.clear()
  })
}

// Get all active uploads
export function getActiveUploads(): Map<string, UploadInstance> {
  return new Map(activeUploads)
}

// Abort all active uploads
export function abortAllUploads(): void {
  activeUploads.forEach((upload) => {
    upload.abort()
  })
  activeUploads.clear()
}