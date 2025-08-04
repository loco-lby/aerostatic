'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Shield, Mail, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function RequestAccessPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [requested, setRequested] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          router.push('/tools/aeromedia/admin/login')
          return
        }

        setUser(user)

        // Check if already an admin
        const { data: adminUser } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', user.id)
          .single()

        if (adminUser) {
          router.push('/tools/aeromedia/admin')
          return
        }

        // Check if already requested
        const { data: request } = await supabase
          .from('admin_access_requests')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (request) {
          setRequested(true)
        }
      } catch (error) {
        console.error('Error checking user:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [router, supabase])

  const handleRequestAccess = async () => {
    if (!user) return

    try {
      // Create access request (this table would need to be created)
      const { error } = await supabase
        .from('admin_access_requests')
        .insert({
          user_id: user.id,
          email: user.email,
          requested_at: new Date().toISOString(),
          status: 'pending'
        })

      if (error) {
        // If the table doesn't exist, just show a manual message
        toast.info('Please contact an administrator at info@aerostatic.io to request access')
      } else {
        setRequested(true)
        toast.success('Access request submitted!')
      }
    } catch (error) {
      console.error('Error requesting access:', error)
      toast.error('Failed to submit request')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 bg-white/5 border-white/10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-orange-400" />
            </div>
            <h1 className="text-3xl font-gelica mb-2">Admin Access Required</h1>
            <p className="text-gray-400">
              You need administrator privileges to access this area
            </p>
          </div>

          {!requested ? (
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-sm text-white/70">
                  Your account ({user?.email}) doesn&apos;t have admin access to AeroMedia.
                  Request access to manage media packages and view analytics.
                </p>
              </div>

              <Button
                onClick={handleRequestAccess}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                Request Admin Access
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">
                  Or contact us directly at
                </p>
                <a
                  href="mailto:info@aerostatic.io"
                  className="text-orange-400 hover:text-orange-300 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  info@aerostatic.io
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-green-400 font-medium mb-1">
                      Access Request Submitted
                    </p>
                    <p className="text-sm text-white/70">
                      We&apos;ve received your request. An administrator will review it shortly
                      and you&apos;ll receive an email at {user?.email} once approved.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">
                  Need immediate access? Contact us at
                </p>
                <a
                  href="mailto:info@aerostatic.io"
                  className="text-orange-400 hover:text-orange-300 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  info@aerostatic.io
                </a>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={() => router.push('/tools/aeromedia')}
              className="w-full text-gray-400 hover:text-white border-white/10 hover:bg-white/10"
            >
              Back to AeroMedia
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                await supabase.auth.signOut()
                router.push('/tools/aeromedia/admin/login')
              }}
              className="w-full text-gray-400 hover:text-white"
            >
              Sign Out
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}