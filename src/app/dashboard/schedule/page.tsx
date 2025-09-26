'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, CalendarClock, Clock } from 'lucide-react'

interface ScheduleItem {
  id: string
  scheduled_at: string
  platform: string
  status: string
  video: {
    id: string
    title: string
    brand: {
      name: string
      color: string
    }
  }
}

export default function SchedulePage() {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSchedule()
  }, [])

  const fetchSchedule = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('schedule_items')
      .select(`
        *,
        video:videos(
          id,
          title,
          brand:brands(name, color)
        )
      `)
      .order('scheduled_at')

    if (data) {
      setScheduleItems(data)
    }
    setLoading(false)
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
          <p className="text-sm text-muted-foreground">Loading schedule...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Schedule</h1>
        <p className="text-muted-foreground mt-1">
          Manage your publishing calendar
        </p>
      </div>

      <div className="grid gap-4">
        {scheduleItems.map((item) => {
          const scheduledDate = new Date(item.scheduled_at)
          const isToday = new Date().toDateString() === scheduledDate.toDateString()
          const isTomorrow = new Date(Date.now() + 86400000).toDateString() === scheduledDate.toDateString()

          return (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {platformEmojis[item.platform] || '📱'}
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {item.video?.title || 'Untitled'}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: item.video?.brand?.color }}
                        />
                        <CardDescription>
                          {item.video?.brand?.name} · {item.platform}
                        </CardDescription>
                      </div>
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
              </CardHeader>
            </Card>
          )
        })}
      </div>

      {scheduleItems.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No scheduled posts</h3>
            <p className="text-muted-foreground">
              Schedule content from your video pages
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}