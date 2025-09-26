'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Video, Clock, CheckCircle, AlertCircle, Sparkles, Edit3, CalendarClock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VideoData {
  id: string
  title: string
  game_type: 'awareness' | 'conversion'
  status: string
  brand: {
    id: string
    name: string
    color: string
    slug: string
  }
  created_at: string
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('videos')
      .select(`
        *,
        brand:brands(*)
      `)
      .order('created_at', { ascending: false })

    if (data) {
      setVideos(data)
    }
    setLoading(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'idea': return <Sparkles className="h-4 w-4" />
      case 'planning': return <Edit3 className="h-4 w-4" />
      case 'editing': return <Video className="h-4 w-4" />
      case 'scheduled': return <CalendarClock className="h-4 w-4" />
      case 'posted': return <CheckCircle className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idea': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20'
      case 'planning': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20'
      case 'editing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20'
      case 'scheduled': return 'bg-green-100 text-green-800 dark:bg-green-900/20'
      case 'posted': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20'
      default: return ''
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground">Loading videos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Videos</h1>
        <p className="text-muted-foreground mt-1">
          All your video content across brands
        </p>
      </div>

      <div className="grid gap-4">
        {videos.map((video) => (
          <Card key={video.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-8 rounded-full"
                    style={{ backgroundColor: video.brand.color }}
                  />
                  <div>
                    <CardTitle className="text-lg">{video.title || 'Untitled'}</CardTitle>
                    <CardDescription>{video.brand.name}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={video.game_type === 'awareness' ? 'default' : 'secondary'}>
                    {video.game_type === 'awareness' ? 'Awareness' : 'Conversion'}
                  </Badge>
                  <Badge className={cn("gap-1", getStatusColor(video.status))}>
                    {getStatusIcon(video.status)}
                    {video.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {videos.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No videos yet</h3>
            <p className="text-muted-foreground">
              Start creating content from the Brands page
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}