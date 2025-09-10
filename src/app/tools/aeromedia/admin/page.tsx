import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { UnifiedStoriesDashboard } from './unified-stories-dashboard'

export default async function AdminPage() {
  const supabase = await createClient()
  
  // Check authentication
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/tools/aeromedia/admin/login')
  }

  // Check if user is admin
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!adminUser) {
    redirect('/tools/aeromedia/admin/request-access')
  }

  // Fetch all projects with their packages and analytics
  const { data: projects } = await supabase
    .from('projects')
    .select(`
      *,
      client_packages (
        id,
        published_at,
        access_type,
        price_cents,
        share_url
      )
    `)
    .order('updated_at', { ascending: false })

  // Fetch legacy packages (ones not yet linked to projects)
  const { data: legacyPackages } = await supabase
    .from('media_packages')
    .select('*')
    .is('project_id', null)
    .order('created_at', { ascending: false })

  // Fetch recent analytics for quick stats
  const projectIds = projects?.map(p => p.id) || []
  const { data: recentAnalytics } = await supabase
    .from('analytics_events')
    .select('package_id, event_type')
    .in('package_id', projectIds)
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

  // Process analytics into stats
  const stats = projects?.map(project => {
    const events = recentAnalytics?.filter(e => 
      project.client_packages?.some((pkg: any) => pkg.id === e.package_id)
    ) || []
    
    return {
      projectId: project.id,
      views: events.filter(e => e.event_type === 'view').length,
      downloads: events.filter(e => e.event_type === 'download').length,
      revenue: project.client_packages?.reduce((sum: number, pkg: any) => 
        sum + (pkg.price_cents || 0), 0) / 100 || 0
    }
  }) || []

  // Get aggregated stats
  const totalStats = {
    totalProjects: projects?.length || 0,
    totalViews: stats.reduce((sum, s) => sum + s.views, 0),
    totalDownloads: stats.reduce((sum, s) => sum + s.downloads, 0),
    totalRevenue: stats.reduce((sum, s) => sum + s.revenue, 0),
    activeProjects: projects?.filter(p => p.current_stage !== 'track').length || 0,
    publishedProjects: projects?.filter(p => p.client_packages?.length > 0).length || 0
  }

  return (
    <UnifiedStoriesDashboard 
      projects={projects || []}
      analytics={stats}
      totalStats={totalStats}
      legacyPackages={legacyPackages || []}
    />
  )
}