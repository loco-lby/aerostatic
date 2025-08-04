'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

function ConfirmEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isFirstUser = searchParams.get('firstUser') === 'true'

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 bg-white/5 border-white/10 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="text-3xl font-gelica mb-2">Check Your Email</h1>
            <p className="text-gray-400">
              We&apos;ve sent you a confirmation email. Please click the link in the email to verify your account.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <p className="text-sm text-orange-400">
                <strong>Note:</strong> The confirmation email may take a few minutes to arrive. Please check your spam folder if you don&apos;t see it.
              </p>
            </div>

            <div className="text-left space-y-2 text-sm text-gray-400">
              <p><strong>What happens next?</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Click the confirmation link in your email</li>
                <li>You&apos;ll be redirected back to the login page</li>
                <li>Sign in with your credentials</li>
                {isFirstUser && (
                  <li className="text-orange-400">As the first user, you&apos;ll automatically have admin access!</li>
                )}
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => router.push('/tools/aeromedia/admin/login')}
              className="w-full text-gray-400 hover:text-white border-white/10 hover:bg-white/10"
            >
              Go to Login
            </Button>

            <p className="text-sm text-gray-500">
              Didn&apos;t receive an email?{' '}
              <Link
                href="/tools/aeromedia/admin/signup"
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                Try signing up again
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-gray-400">Loading...</div>
      </div>
    }>
      <ConfirmEmailContent />
    </Suspense>
  )
}