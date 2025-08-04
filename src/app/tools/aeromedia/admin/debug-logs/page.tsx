import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card } from '@/components/ui/card'

export default async function DebugLogsPage() {
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

  // Fetch debug logs
  const { data: logs, error } = await supabase
    .from('debug_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-gelica mb-6">Debug Logs</h1>
        
        {error && (
          <Card className="p-4 bg-red-500/10 border-red-500/30 mb-6">
            <p className="text-red-400">Error loading logs: {error.message}</p>
          </Card>
        )}

        <div className="space-y-4">
          {logs?.map((log) => (
            <Card key={log.id} className="p-4 bg-white/5 border-white/10">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-orange-400">{log.function_name}</h3>
                <span className="text-xs text-gray-500">
                  {new Date(log.created_at).toLocaleString()}
                </span>
              </div>
              
              {log.error_message && (
                <div className="mb-2">
                  <p className="text-red-400 font-medium">Error: {log.error_message}</p>
                  {log.error_detail && (
                    <p className="text-red-300 text-sm">Detail: {log.error_detail}</p>
                  )}
                  {log.error_hint && (
                    <p className="text-yellow-400 text-sm">Hint: {log.error_hint}</p>
                  )}
                </div>
              )}
              
              {log.context && (
                <pre className="text-xs text-gray-400 overflow-x-auto bg-black/50 p-2 rounded">
                  {JSON.stringify(log.context, null, 2)}
                </pre>
              )}
            </Card>
          ))}

          {!logs || logs.length === 0 && !error && (
            <Card className="p-6 bg-white/5 border-white/10 text-center">
              <p className="text-gray-400">No debug logs found</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}