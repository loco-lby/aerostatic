'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  ArrowRight,
  TrendingUp,
  Video,
  Calendar,
  Target,
  Sparkles,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Edit3,
  CalendarClock,
  Zap,
  Palette,
  Plane
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { calculateGScore, getScoreColor, getScoreEmoji } from '@/lib/g-score'

interface DashboardStats {
  totalBrands: number
  totalVideos: number
  videosInProgress: number
  scheduledPosts: number
  averageGScore: number
  topPerformingBrand: {
    id: string
    name: string
    color: string
    videoCount: number
  } | null
}

interface RecentVideo {
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
  hook_text: string
  created_at: string
}

interface UpcomingPost {
  id: string
  scheduled_at: string
  platform: string
  video: {
    id: string
    title: string
    brand: {
      name: string
      color: string
      slug: string
    }
  }
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBrands: 0,
    totalVideos: 0,
    videosInProgress: 0,
    scheduledPosts: 0,
    averageGScore: 0,
    topPerformingBrand: null
  })
  const [recentVideos, setRecentVideos] = useState<RecentVideo[]>([])
  const [upcomingPosts, setUpcomingPosts] = useState<UpcomingPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)

    // Fetch brands
    const { data: brands } = await supabase
      .from('brands')
      .select('*')

    // Fetch videos with brand info
    const { data: videos } = await supabase
      .from('videos')
      .select(`
        *,
        brand:brands(*),
        video_checklists(*)
      `)
      .order('created_at', { ascending: false })

    // Fetch schedule items
    const { data: scheduleItems } = await supabase
      .from('schedule_items')
      .select(`
        *,
        video:videos(
          id,
          title,
          brand:brands(name, color, slug)
        )
      `)
      .gte('scheduled_at', new Date().toISOString())
      .order('scheduled_at')
      .limit(5)

    if (brands && videos) {
      // Calculate stats
      const videosInProgress = videos.filter(v =>
        ['planning', 'editing', 'scheduled'].includes(v.status)
      ).length

      // Calculate average G-Score
      let totalScore = 0
      let scoredVideos = 0
      videos.forEach(video => {
        if (video.hook_text) {
          const score = calculateGScore(video.game_type, {
            hook: video.hook_text,
            title: video.title,
            checklist: video.video_checklists?.[0]
          })
          totalScore += score.score
          scoredVideos++
        }
      })

      // Find top performing brand
      const brandStats = brands.map(brand => ({
        ...brand,
        videoCount: videos.filter(v => v.brand_id === brand.id).length
      }))
      const topBrand = brandStats.sort((a, b) => b.videoCount - a.videoCount)[0]

      setStats({
        totalBrands: brands.length,
        totalVideos: videos.length,
        videosInProgress,
        scheduledPosts: scheduleItems?.length || 0,
        averageGScore: scoredVideos > 0 ? Math.round(totalScore / scoredVideos) : 0,
        topPerformingBrand: topBrand ? {
          id: topBrand.id,
          name: topBrand.name,
          color: topBrand.color,
          videoCount: topBrand.videoCount
        } : null
      })

      // Set recent videos
      setRecentVideos(videos.slice(0, 5).map(v => ({
        id: v.id,
        title: v.title || 'Untitled',
        game_type: v.game_type,
        status: v.status,
        brand: v.brand,
        hook_text: v.hook_text,
        created_at: v.created_at
      })))
    }

    if (scheduleItems) {
      setUpcomingPosts(scheduleItems)
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

  const platformEmojis: Record<string, string> = {
    tiktok: '🎵',
    instagram: '📸',
    youtube: '📺',
    x: '🐦',
    linkedin: '💼'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground">Loading Aerostatic dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Plane className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Aerostatic Productions</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Content management and production dashboard
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/schedule">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/brands">
              <Zap className="mr-2 h-4 w-4" />
              Create Content
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Brands</CardTitle>
            <Palette className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBrands}</div>
            <p className="text-xs text-muted-foreground">
              Brands in system
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVideos}</div>
            <p className="text-xs text-muted-foreground">
              Across all stages
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.videosInProgress}</div>
            <p className="text-xs text-muted-foreground">
              Videos being worked on
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.scheduledPosts}</div>
            <p className="text-xs text-muted-foreground">
              Ready to publish
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg G-Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={cn("text-2xl font-bold", getScoreColor(stats.averageGScore))}>
              {stats.averageGScore} {getScoreEmoji(stats.averageGScore)}
            </div>
            <p className="text-xs text-muted-foreground">
              Content quality score
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Brand Highlight - Now featuring Aerostatic */}
      {stats.topPerformingBrand && (
        <Card className="border-2" style={{ borderColor: stats.topPerformingBrand.color + '40' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stats.topPerformingBrand.color }}
                />
                <CardTitle>Top Performing Brand</CardTitle>
              </div>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {stats.topPerformingBrand.name}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-3xl font-bold">{stats.topPerformingBrand.videoCount}</p>
                <p className="text-sm text-muted-foreground">Videos created</p>
              </div>
              <Button variant="outline" asChild>
                <Link href={`/dashboard/brands/${stats.topPerformingBrand.id}`}>
                  View Brand
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Videos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Videos</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/videos">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <CardDescription>Latest content in production</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentVideos.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No videos yet. Create your first video!
              </p>
            ) : (
              recentVideos.map(video => (
                <Link
                  key={video.id}
                  href={`/dashboard/brands/${video.brand.id}/videos/${video.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer block"
                >
                  <div
                    className="w-1 h-12 rounded-full"
                    style={{ backgroundColor: video.brand.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{video.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={video.game_type === 'awareness' ? 'default' : 'secondary'} className="text-xs">
                        {video.game_type === 'awareness' ? 'A' : 'C'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{video.brand.name}</span>
                    </div>
                  </div>
                  <Badge className={cn("gap-1", getStatusColor(video.status))}>
                    {getStatusIcon(video.status)}
                    {video.status}
                  </Badge>
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        {/* Upcoming Posts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Posts</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/schedule">
                  View Calendar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <CardDescription>Next scheduled publications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingPosts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No posts scheduled. Schedule your content!
              </p>
            ) : (
              upcomingPosts.map(post => {
                const scheduledDate = new Date(post.scheduled_at)
                const isToday = new Date().toDateString() === scheduledDate.toDateString()
                const isTomorrow = new Date(Date.now() + 86400000).toDateString() === scheduledDate.toDateString()

                return (
                  <div
                    key={post.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="text-2xl">
                      {platformEmojis[post.platform] || '📱'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{post.video.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: post.video.brand.color }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {post.video.brand.name}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={isToday ? 'default' : 'outline'}>
                        {isToday ? 'Today' : isTomorrow ? 'Tomorrow' : scheduledDate.toLocaleDateString()}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/dashboard/brands/new">
                <Target className="mr-2 h-4 w-4" />
                Add Brand
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/dashboard/videos">
                <Video className="mr-2 h-4 w-4" />
                View Videos
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/dashboard/schedule">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Post
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/dashboard/brands">
                <Edit3 className="mr-2 h-4 w-4" />
                Manage Brands
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}