'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Lock, Mail, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AdminSignUpPage() {
  const [hasAdmins, setHasAdmins] = useState<boolean | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Check if any admins exist
  useEffect(() => {
    const checkForAdmins = async () => {
      try {
        const { data, error } = await supabase
          .rpc('has_admin_users')

        if (!error && data !== null) {
          setHasAdmins(data)
        }
      } catch (error) {
        console.error('Error checking for admins:', error)
      }
    }

    checkForAdmins()
  }, [supabase])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate inputs
    if (!email || !password || !fullName) {
      toast.error('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)

    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/tools/aeromedia/admin`,
        }
      })

      if (error) {
        console.error('Signup error:', error)
        console.error('Error details:', {
          message: error.message,
          status: error.status,
          code: error.code,
          name: error.name
        })

        // Show more specific error messages
        if (error.message.includes('Database error')) {
          toast.error('Database error during signup. Please contact support.')
          console.error('Database error - check debug_logs table in Supabase')
        } else if (error.message.includes('already registered')) {
          toast.error('This email is already registered. Please sign in instead.')
        } else {
          toast.error(error.message || 'An error occurred during signup')
        }

        setIsLoading(false)
        return
      }

      if (data.user) {
        // Complete the user profile
        try {
          const { error: profileError } = await supabase.rpc('complete_user_profile', {
            user_id: data.user.id,
            username: email.split('@')[0],
            full_name: fullName
          })

          if (profileError) {
            console.error('Profile completion error:', profileError)
            // Don't block signup, just log the error
          }
        } catch (err) {
          console.error('Error completing profile:', err)
        }

        const isFirstUser = hasAdmins === false

        // Redirect to email confirmation page
        router.push(`/tools/aeromedia/admin/confirm-email${isFirstUser ? '?firstUser=true' : ''}`)
      }
    } catch (error) {
      console.error('Sign up error:', error)
      toast.error('An error occurred during sign up')
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
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/tools/aeromedia"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-gelica mb-2">Create Account</h1>
              <p className="text-gray-400">
                {hasAdmins === false
                  ? 'Create the first admin account'
                  : 'Sign up for AeroMedia Admin'
                }
              </p>
            </div>
            <div className="w-5" /> {/* Spacer for centering */}
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
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
              <p className="text-xs text-gray-400">Minimum 6 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link
                href="/tools/aeromedia/admin/login"
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                Sign In
              </Link>
            </p>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">Or</span>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => router.push('/tools/aeromedia')}
              className="w-full text-gray-400 hover:text-white border-white/10 hover:bg-white/10"
            >
              Back to AeroMedia
            </Button>
          </div>

          {hasAdmins !== false && (
            <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <p className="text-sm text-orange-400 text-center">
                <strong>Note:</strong> After signing up, contact an administrator to grant access to AeroMedia admin features.
              </p>
            </div>
          )}
          {hasAdmins === false && (
            <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-sm text-green-400 text-center">
                <strong>Welcome!</strong> As the first user, you&apos;ll automatically receive admin access after confirming your email.
              </p>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  )
}