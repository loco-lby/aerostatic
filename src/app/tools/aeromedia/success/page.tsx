'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle, Download, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isVerifying, setIsVerifying] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [packageData, setPackageData] = useState<any>(null)
  const [accessCode, setAccessCode] = useState<string>('')
  
  const sessionId = searchParams.get('session_id')
  const packageId = searchParams.get('package')
  const codeFromUrl = searchParams.get('code')
  
  const supabase = createClient()

  useEffect(() => {
    if (!sessionId || !packageId) {
      router.push('/tools/aeromedia')
      return
    }

    // Set access code if provided in URL
    if (codeFromUrl) {
      setAccessCode(codeFromUrl)
    }

    verifyPayment()
  }, [sessionId, packageId, codeFromUrl])

  const verifyPayment = async () => {
    try {
      // Wait a moment for webhook to process
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Check if purchase exists
      const { data: purchase, error } = await supabase
        .from('purchases')
        .select('*')
        .eq('stripe_session_id', sessionId)
        .eq('status', 'succeeded')
        .single()

      if (purchase) {
        setIsSuccess(true)
        
        // Store email for future access
        if (purchase.email) {
          localStorage.setItem(`aeromedia_email_${packageId}`, purchase.email)
        }

        // Fetch package details
        const { data: pkg } = await supabase
          .from('media_packages')
          .select('*')
          .eq('id', packageId)
          .single()

        setPackageData(pkg)
        
        // If we don't have access code from URL, get it from package
        if (!accessCode && pkg?.access_code) {
          setAccessCode(pkg.access_code)
        }

        // Track success page view
        await supabase.rpc('track_event', {
          p_package_id: packageId,
          p_event_type: 'payment_success_viewed',
          p_email: purchase.email,
          p_metadata: { session_id: sessionId }
        })

        toast.success('Payment successful! You now have full access.')
      } else {
        // Payment may still be processing
        setTimeout(() => verifyPayment(), 3000)
      }
    } catch (error) {
      console.error('Verification error:', error)
    } finally {
      setIsVerifying(false)
    }
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Processing Payment...</h2>
          <p className="text-white/60">Please wait while we confirm your purchase</p>
        </div>
      </div>
    )
  }

  if (!isSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Confirming Payment...</h2>
          <p className="text-white/60">This may take a moment</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-lg p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-white/80 mb-6">
            Thank you for your purchase. You now have full access to download 
            all photos and videos from your balloon flight.
          </p>

          {packageData && (
            <div className="bg-black/30 rounded-lg p-4 mb-6">
              <div className="text-sm text-white/60 space-y-2">
                <p>
                  <span className="font-medium text-white">Flight Date:</span>{' '}
                  {new Date(packageData.flight_date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium text-white">Access Valid Until:</span>{' '}
                  {new Date(packageData.expires_at).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium text-white">Passengers:</span>{' '}
                  {packageData.passenger_names?.join(', ')}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {accessCode ? (
              <Link href={`/tools/aeromedia/${accessCode}`} className="block">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Go to Your Media Gallery
                </Button>
              </Link>
            ) : (
              <Link href="/tools/aeromedia" className="block">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Enter Your Access Code
                </Button>
              </Link>
            )}

            <p className="text-xs text-white/40">
              A confirmation email has been sent to your email address
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            Need help? Contact support at{' '}
            <a href="mailto:support@aerostatic.io" className="text-orange-500 hover:underline">
              support@aerostatic.io
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}