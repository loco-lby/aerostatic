'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Lock, Mail } from 'lucide-react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error('Invalid credentials')
        return
      }

      // Check if user is admin
      console.log('Checking admin status for user:', data.user.id, data.user.email)

      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', data.user.id)
        .single()

      console.log('Admin check result:', { adminUser, adminError })

      if (adminError || !adminUser) {
        console.error('Admin check failed:', adminError)
        await supabase.auth.signOut()
        toast.error('Access denied. Admin privileges required.')
        return
      }

      // Update last login
      await supabase
        .from('admin_users')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', data.user.id)

      toast.success('Welcome back!')
      router.push('/tools/aeromedia/admin')
    } catch (error) {
      console.error('Login error:', error)
      toast.error('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
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
            <h1 className="text-3xl font-gelica mb-2">Aeromedia Admin</h1>
            <p className="text-gray-400">Sign in to manage media packages</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="info@aerostatic.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="text-right">
              <Link
                href="/tools/aeromedia/admin/forgot-password"
                className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={() => router.push('/tools/aeromedia')}
              className="w-full text-gray-400 hover:text-white border-white/10 hover:bg-white/10"
            >
              Back to AeroMedia
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}