'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Package, Calendar, Users, Download, Plus, LogOut, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
import { format } from 'date-fns'
import { createClient } from '@/lib/supabase/client'
import { NewPackageForm } from './new-package-form'
import { MediaUploader } from './media-uploader'
import { PackageCard } from './package-card'
import { MediaManager } from './media-manager'
import { useRouter } from 'next/navigation'

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

interface AdminDashboardProps {
  recentPackages: MediaPackage[]
  stats: any
}

export function AdminDashboard({ recentPackages, stats }: AdminDashboardProps) {
  const [showNewPackage, setShowNewPackage] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<MediaPackage | null>(null)
  const [managingPackage, setManagingPackage] = useState<MediaPackage | null>(null)
  const [packages, setPackages] = useState(recentPackages)
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/tools/aeromedia')
  }

  const handlePackageCreated = (newPackage: MediaPackage) => {
    setPackages([newPackage, ...(packages || [])])
    setShowNewPackage(false)
    setSelectedPackage(newPackage)
    toast.success('Package created successfully!')
  }

  const copyAccessCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success('Access code copied to clipboard')
  }

  const handleDeletePackage = async (packageId: string) => {
    setIsDeleting(true)
    try {
      // First, get all media items for this package to delete from storage
      const { data: mediaItems, error: fetchError } = await supabase
        .from('media_items')
        .select('file_url, file_name')
        .eq('package_id', packageId)

      if (fetchError) throw fetchError

      // Delete files from storage
      if (mediaItems && mediaItems.length > 0) {
        const deletePromises = mediaItems.map(async (item) => {
          // Extract the path from the file URL
          // Format: https://[project].supabase.co/storage/v1/object/public/aeromedia-media/[path]
          const urlParts = item.file_url.split('/aeromedia-media/')
          if (urlParts.length > 1) {
            const filePath = urlParts[1]
            const { error: storageError } = await supabase.storage
              .from('aeromedia-media')
              .remove([filePath])
            
            if (storageError) {
              console.error(`Failed to delete file ${filePath}:`, storageError)
            }
          }
        })

        await Promise.all(deletePromises)
      }

      // Now delete the package (this will cascade delete media_items and download_tracking)
      const { error: deleteError } = await supabase
        .from('media_packages')
        .delete()
        .eq('id', packageId)

      if (deleteError) throw deleteError

      setPackages((packages || []).filter(pkg => pkg.id !== packageId))
      toast.success('Package and all associated media deleted successfully')
    } catch (error) {
      console.error('Error deleting package:', error)
      toast.error('Failed to delete package')
    } finally {
      setIsDeleting(false)
      setDeleteConfirmId(null)
    }
  }

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const sendAccessCode = async (packageData: MediaPackage) => {
    // Placeholder for email integration
    const emailBody = `
Hello ${packageData.passenger_names.join(' and ')},

Thank you for flying with Aerostatic! Your professional photos and videos from your balloon flight on ${format(new Date(packageData.flight_date), 'MMMM d, yyyy')} are now ready.

Access your memories here:
https://aerostatic.io/tools/aeromedia

Your access code is: ${packageData.access_code}

This gallery will be available for 30 days. We recommend downloading your favorites soon!

Best regards,
The Aerostatic Team
    `.trim()

    navigator.clipboard.writeText(emailBody)
    toast.success('Email template copied to clipboard')
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-gelica">Aeromedia Admin</h1>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-white/5 border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Packages</p>
                <p className="text-3xl font-bold">{stats?.total_packages || 0}</p>
              </div>
              <Package className="w-8 h-8 text-orange-500" />
            </div>
          </Card>
          <Card className="p-6 bg-white/5 border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Media</p>
                <p className="text-3xl font-bold">{stats?.total_media || 0}</p>
              </div>
              <Upload className="w-8 h-8 text-orange-500" />
            </div>
          </Card>
          <Card className="p-6 bg-white/5 border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Downloads</p>
                <p className="text-3xl font-bold">{stats?.total_downloads || 0}</p>
              </div>
              <Download className="w-8 h-8 text-orange-500" />
            </div>
          </Card>
          <Card className="p-6 bg-white/5 border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Packages</p>
                <p className="text-3xl font-bold">{stats?.active_packages || 0}</p>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
          </Card>
        </div>
      </section>

      {/* Actions */}
      <section className="container mx-auto px-4 pb-8">
        <Button
          onClick={() => setShowNewPackage(true)}
          className="gap-2 bg-orange-500 hover:bg-orange-600"
        >
          <Plus className="w-4 h-4" />
          Create New Package
        </Button>
      </section>

      {/* Recent Packages */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-gelica">Recent Packages</h2>
          <p className="text-sm text-gray-400">💡 Drag and drop files directly onto packages for quick upload</p>
        </div>
        <div className="grid gap-4">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              onCopyCode={copyAccessCode}
              onSendEmail={sendAccessCode}
              onUploadClick={setSelectedPackage}
              onDelete={setDeleteConfirmId}
              onManageMedia={setManagingPackage}
            />
          ))}
        </div>
      </section>

      {/* New Package Dialog */}
      <Dialog open={showNewPackage} onOpenChange={setShowNewPackage}>
        <DialogContent className="bg-black border-white/10">
          <DialogHeader>
            <DialogTitle className="font-gelica text-2xl">Create New Media Package</DialogTitle>
          </DialogHeader>
          <NewPackageForm onSuccess={handlePackageCreated} />
        </DialogContent>
      </Dialog>

      {/* Media Upload Dialog */}
      <Dialog open={!!selectedPackage} onOpenChange={() => setSelectedPackage(null)}>
        <DialogContent className="bg-black border-white/10 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-gelica text-2xl">
              Upload Media - {selectedPackage?.access_code}
            </DialogTitle>
          </DialogHeader>
          {selectedPackage && (
            <MediaUploader 
              packageId={selectedPackage.id} 
              onComplete={() => {
                setSelectedPackage(null)
                toast.success('Media uploaded successfully!')
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Media Manager Dialog */}
      <Dialog open={!!managingPackage} onOpenChange={() => setManagingPackage(null)}>
        <DialogContent className="bg-black border-white/10 max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-gelica text-2xl">
              Manage Media - {managingPackage?.access_code}
            </DialogTitle>
          </DialogHeader>
          {managingPackage && (
            <MediaManager 
              packageId={managingPackage.id} 
              packageCode={managingPackage.access_code}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => !isDeleting && setDeleteConfirmId(null)}>
        <AlertDialogContent className="bg-black border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Media Package</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              <p>Are you sure you want to delete this media package?</p>
              <p className="mt-2">This will permanently delete:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>The package and access code</li>
                <li>All media files from storage</li>
                <li>All download tracking data</li>
              </ul>
              <p className="mt-3 font-semibold text-orange-400">This action cannot be undone.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteConfirmId) {
                  handleDeletePackage(deleteConfirmId)
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Package'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}