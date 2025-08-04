import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminDashboard } from './admin-dashboard'

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

  // Fetch recent packages
  const { data: recentPackages } = await supabase
    .from('media_packages')
    .select(`
      *,
      media_items (count)
    `)
    .order('created_at', { ascending: false })
    .limit(10)

  // Fetch statistics
  const { data: stats } = await supabase
    .rpc('get_aeromedia_stats')

  return <AdminDashboard recentPackages={recentPackages || []} stats={stats} />
}