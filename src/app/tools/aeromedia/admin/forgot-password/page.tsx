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
import { Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error('Please enter your email')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/tools/aeromedia/admin/reset-password`,
      })

      if (error) {
        toast.error(error.message)
      } else {
        setIsSubmitted(true)
        toast.success('Password reset link sent!')
      }
    } catch (error) {
      console.error('Password reset error:', error)
      toast.error('An error occurred. Please try again.')
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
              href="/tools/aeromedia/admin/login"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-gelica mb-2">Reset Password</h1>
              <p className="text-gray-400">We&apos;ll send you a reset link</p>
            </div>
            <div className="w-5" /> {/* Spacer for centering */}
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleResetPassword} className="space-y-6">
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

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                <Mail className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Check Your Email
                </h3>
                <p className="text-white/70">
                  We&apos;ve sent a password reset link to <span className="text-orange-400">{email}</span>
                </p>
              </div>

              <p className="text-sm text-gray-400">
                Didn&apos;t receive the email? Check your spam folder or{' '}
                <button
                  onClick={() => {
                    setIsSubmitted(false)
                    setEmail('')
                  }}
                  className="text-orange-400 hover:text-orange-300 transition-colors"
                >
                  try again
                </button>
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/tools/aeromedia/admin/login"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}