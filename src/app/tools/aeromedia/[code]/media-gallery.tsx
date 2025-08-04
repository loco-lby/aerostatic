'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Share2, Calendar, Users, Image as ImageIcon, Video, Plane, ChevronLeft, Send, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { format } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { MediaViewer } from './media-viewer'
import JSZip from 'jszip'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

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

interface MediaPackage {
  id: string
  access_code: string
  flight_date: string
  passenger_names: string[]
  created_at: string
  expires_at: string
  is_active: boolean
  access_count: number
  last_accessed_at: string | null
  social_media_permission?: boolean
}

interface GroupedMedia {
  reel: MediaItem[]
  photos: MediaItem[]
  videos: MediaItem[]
  drone: MediaItem[]
}

interface MediaGalleryProps {
  mediaPackage: MediaPackage
  groupedMedia: GroupedMedia
  accessCode: string
}

export function MediaGallery({ mediaPackage, groupedMedia, accessCode }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [activeTab, setActiveTab] = useState<'all' | 'reel' | 'photos' | 'videos' | 'drone'>('all')
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [socialMediaPermission, setSocialMediaPermission] = useState(mediaPackage.social_media_permission ?? true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    services: [] as string[],
    message: ''
  })
  const supabase = createClient()

  const allMedia = [
    ...(groupedMedia.reel || []),
    ...(groupedMedia.photos || []),
    ...(groupedMedia.videos || []),
    ...(groupedMedia.drone || []),
  ]

  const getFilteredMedia = () => {
    switch (activeTab) {
      case 'reel':
        return groupedMedia.reel || []
      case 'photos':
        return groupedMedia.photos || []
      case 'videos':
        return groupedMedia.videos || []
      case 'drone':
        return groupedMedia.drone || []
      default:
        return allMedia
    }
  }

  const trackDownload = async (mediaItemId: string) => {
    try {
      await supabase.from('download_tracking').insert({
        media_item_id: mediaItemId,
        package_id: mediaPackage.id,
      })
    } catch (error) {
      console.error('Error tracking download:', error)
    }
  }

  const downloadSingleFile = async (item: MediaItem) => {
    await trackDownload(item.id)

    try {
      // Fetch the file as a blob to force download
      const response = await fetch(item.file_url)
      const blob = await response.blob()

      // Create blob URL
      const blobUrl = window.URL.createObjectURL(blob)

      // Create download link
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = item.file_name
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()

      // Cleanup
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download file')
    }
  }


  const shareGallery = async () => {
    const url = `${window.location.origin}/tools/aeromedia/${accessCode}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Aerostatic Balloon Flight',
          text: `View photos and videos from my amazing balloon flight on ${format(new Date(mediaPackage.flight_date), 'MMMM d, yyyy')}`,
          url: url,
        })
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          copyToClipboard(url)
        }
      }
    } else {
      copyToClipboard(url)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Link copied to clipboard')
  }

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  const handleDenyPermission = async () => {
    try {
      const { error } = await supabase
        .from('media_packages')
        .update({ social_media_permission: false })
        .eq('id', mediaPackage.id)

      if (error) throw error

      setSocialMediaPermission(false)
      toast.success('Your preference has been saved')
    } catch (error) {
      console.error('Error updating permission:', error)
      toast.error('Failed to update preference')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('memory_enhancement_requests')
        .insert([{
          ...formData,
          services: formData.services.join(', '),
          media_package_id: mediaPackage.id,
          created_at: new Date().toISOString()
        }])

      if (error) throw error

      toast.success('Request submitted! We\'ll be in touch soon.')

      // Reset form
      setFormData({
        name: '',
        email: '',
        services: [],
        message: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredMedia = getFilteredMedia()

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative h-8 w-auto">
                  <Image
                    src="/images/logo2.svg"
                    alt="Aerostatic"
                    width={120}
                    height={32}
                    className="object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </Link>
              <Link href="/tools/aeromedia">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Enter New Code
                </Button>
              </Link>
            </div>
            <Button
              onClick={shareGallery}
              variant="outline"
              size="sm"
              className="gap-2 border-white/10"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="font-gelica text-5xl md:text-6xl lg:text-7xl">
            Your Flight Memories
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span>{format(new Date(mediaPackage.flight_date), 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" />
              <span>{mediaPackage.passenger_names.join(', ')}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <Button
              onClick={async () => {
                setIsDownloading(true)

                // Check if on mobile
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

                if (isMobile) {
                  // On mobile, download files individually
                  toast.info(`Downloading ${allMedia.length} files...`)

                  try {
                    for (const item of allMedia) {
                      await downloadSingleFile(item)
                      // Add delay between downloads to prevent browser blocking
                      await new Promise(resolve => setTimeout(resolve, 500))
                    }
                    toast.success('All media downloaded successfully!')
                  } catch (error) {
                    toast.error('Error downloading files')
                  }
                } else {
                  // On desktop, create a zip file
                  toast.info('Creating zip file...')

                  try {
                    const zip = new JSZip()
                    const flightDate = format(new Date(mediaPackage.flight_date), 'yyyy-MM-dd')
                    const folderName = `Aerostatic_${flightDate}_${mediaPackage.access_code}`

                    // Track all downloads
                    const downloadPromises = allMedia.map(item => trackDownload(item.id))
                    await Promise.all(downloadPromises)

                    // Fetch all files and add to zip
                    for (let i = 0; i < allMedia.length; i++) {
                      const item = allMedia[i]
                      toast.info(`Processing ${i + 1} of ${allMedia.length} files...`)

                      try {
                        const response = await fetch(item.file_url)
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
                        console.error(`Error processing ${item.file_name}:`, error)
                      }
                    }

                    // Generate zip file
                    toast.info('Generating zip file...')
                    const zipBlob = await zip.generateAsync({
                      type: 'blob',
                      compression: 'DEFLATE',
                      compressionOptions: { level: 6 }
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

                    toast.success('Zip file downloaded successfully!')
                  } catch (error) {
                    console.error('Zip error:', error)
                    toast.error('Error creating zip file')
                  }
                }

                setIsDownloading(false)
              }}
              disabled={isDownloading || allMedia.length === 0}
              className="gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              size="lg"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? 'Preparing Download...' : 'Download All Media'}
            </Button>

            {/* Social Media Tagging Request */}
            <div className="text-center space-y-2 mt-4">
              <p className="text-lg text-white/80">
                📸 Sharing your adventure? We&apos;d love to see it!
              </p>
              <p className="text-base text-white/70">
                Please tag <span className="text-orange-400 font-semibold">@nvaloft</span> and <span className="text-orange-400 font-semibold">@aerostatic.io</span> on your socials
              </p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <p className="text-xs text-white/40">
                  {socialMediaPermission
                    ? "By downloading, you grant us permission to share your flight content on our social media channels"
                    : "You have opted out of social media sharing"
                  }
                </p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-white/10">
                      <Info className="h-3 w-3 text-white/40" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-black/90 border-white/20 text-white">
                    <div className="space-y-3">
                      <p className="text-sm">
                        We love showcasing our passengers&apos; amazing experiences! Your content helps inspire others to take flight.
                      </p>
                      {socialMediaPermission ? (
                        <>
                          <p className="text-sm text-white/70">
                            If you prefer not to have your content shared on our social media channels, you can opt out below.
                          </p>
                          <Button
                            onClick={handleDenyPermission}
                            variant="outline"
                            size="sm"
                            className="w-full border-white/20 hover:bg-white/10"
                          >
                            Deny Permission
                          </Button>
                        </>
                      ) : (
                        <p className="text-sm text-orange-400">
                          You have opted out of social media sharing. Your content will not be shared on our channels.
                        </p>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Media Tabs */}
      <section className="container mx-auto px-4 pb-4">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 p-1 bg-white/5 rounded-lg">
            {[
              { id: 'all', label: 'All Media', count: allMedia.length },
              { id: 'reel', label: 'Reel', count: (groupedMedia.reel || []).length, icon: Video },
              { id: 'photos', label: 'Photos', count: (groupedMedia.photos || []).length, icon: ImageIcon },
              { id: 'videos', label: 'Videos', count: (groupedMedia.videos || []).length, icon: Video },
              { id: 'drone', label: 'Drone', count: (groupedMedia.drone || []).length, icon: Plane },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200
                  ${activeTab === tab.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {tab.icon && <tab.icon className="w-4 h-4" />}
                <span>{tab.label}</span>
                <span className="text-sm opacity-70">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="container mx-auto px-4 pb-16">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredMedia.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  className="group relative overflow-hidden bg-white/5 border-white/10 hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedMedia(item)}
                >
                  <div className="aspect-square relative">
                    {(item.file_type === 'video' || item.file_type === 'reel') ? (
                      <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-red-600/20 flex flex-col items-center justify-center">
                        <Video className="w-16 h-16 text-orange-400 mb-2" />
                        <p className="text-xs text-white/60 font-medium capitalize">{item.file_type}</p>
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                        <p className="text-sm font-medium truncate">{item.file_name}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{formatFileSize(item.file_size)}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 gap-1 text-orange-500 hover:text-orange-400"
                            onClick={(e) => {
                              e.stopPropagation()
                              downloadSingleFile(item)
                            }}
                          >
                            <Download className="w-3 h-3" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Type Badge */}
                    {item.file_type === 'drone' && (
                      <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                        <Plane className="w-3 h-3" />
                        Drone
                      </div>
                    )}
                    {item.file_type === 'reel' && (
                      <div className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                        Reel
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredMedia.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            No media found in this category
          </div>
        )}
      </section>

      {/* Enhance Your Memories Section */}
      <section className="container mx-auto px-4 py-16 border-t border-white/10">
        <h2 className="font-gelica text-3xl md:text-4xl text-center mb-12">
          Enhance Your Memories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {[
            {
              title: 'Professional Prints',
              description: 'Museum-quality prints of your favorite moments',
              icon: '🖼️',
              id: 'prints'
            },
            {
              title: 'Extended Highlights',
              description: 'Professionally edited video with music',
              icon: '🎬',
              id: 'highlights'
            },
            {
              title: 'Anniversary Package',
              description: 'Celebrate your flight anniversary in style',
              icon: '🎉',
              id: 'anniversary'
            },
            {
              title: 'Custom Photo Book',
              description: 'Beautiful hardcover book of your journey',
              icon: '📚',
              id: 'photobook'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card
                className="p-6 bg-white/5 border-white/10 hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
                onClick={() => {
                  handleServiceToggle(item.id)
                  const formElement = document.getElementById('enhancement-form')
                  formElement?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{item.description}</p>
                <p className="text-orange-500 font-medium">Click to inquire</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <div id="enhancement-form" className="max-w-2xl mx-auto">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-8">
              <h3 className="text-2xl font-gelica mb-6 text-center">
                Interested in these services?
              </h3>
              <p className="text-gray-400 text-center mb-8">
                Let us know which enhancements you&apos;d like and we&apos;ll get back to you with pricing and details.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/10 focus:border-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/10 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Services Interested In</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { value: 'prints', label: 'Professional Prints' },
                      { value: 'highlights', label: 'Extended Highlights' },
                      { value: 'anniversary', label: 'Anniversary Package' },
                      { value: 'photobook', label: 'Custom Photo Book' }
                    ].map((service) => (
                      <div key={service.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={service.value}
                          checked={formData.services.includes(service.value)}
                          onCheckedChange={() => handleServiceToggle(service.value)}
                        />
                        <Label
                          htmlFor={service.value}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {service.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Details</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us more about what you're looking for..."
                    className="bg-white/5 border-white/10 focus:border-orange-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Request
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Media Viewer Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <MediaViewer
            media={selectedMedia}
            allMedia={filteredMedia}
            onClose={() => setSelectedMedia(null)}
            onDownload={(media) => {
              // Find the full media item from our data
              const fullMediaItem = filteredMedia.find(item => item.id === media.id)
              if (fullMediaItem) {
                downloadSingleFile(fullMediaItem)
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}