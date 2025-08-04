'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Settings, LogIn } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AeromediaLandingPage() {
  const [accessCode, setAccessCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          // Check if user is an admin
          const { data: adminUser } = await supabase
            .from('admin_users')
            .select('*')
            .eq('id', user.id)
            .single()
          
          if (adminUser) {
            setIsAdmin(true)
          }
        }
      } catch (error) {
        console.error('Error checking admin status:', error)
      } finally {
        setCheckingAuth(false)
      }
    }

    checkAdminStatus()
  }, [supabase])

  const handleAccessCode = async () => {
    if (accessCode.length !== 6) {
      toast.error('Please enter a valid 6-digit access code')
      return
    }

    setIsLoading(true)
    
    try {
      // Check if access code exists and is valid
      const { data, error } = await supabase
        .from('media_packages')
        .select('*')
        .eq('access_code', accessCode)
        .eq('is_active', true)
        .gte('expires_at', new Date().toISOString())
        .single()

      if (error || !data) {
        toast.error('Invalid or expired access code')
        setIsLoading(false)
        return
      }

      // Update access count
      await supabase
        .from('media_packages')
        .update({ 
          access_count: data.access_count + 1,
          last_accessed_at: new Date().toISOString()
        })
        .eq('id', data.id)

      // Navigate to gallery
      router.push(`/tools/aeromedia/${accessCode}`)
    } catch (error) {
      console.error('Error accessing media package:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setAccessCode(value)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && accessCode.length === 6) {
      handleAccessCode()
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header with Logo and Admin Button */}
      <header className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-10 w-auto">
              <Image
                src="/images/logo2.svg"
                alt="Aerostatic"
                width={150}
                height={40}
                className="object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </Link>
        </motion.div>

        {/* Admin Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {!checkingAuth && (
            <Link href="/tools/aeromedia/admin">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 hover:border-orange-500 transition-all duration-300"
              >
                {isAdmin ? (
                  <>
                    <Settings className="w-4 h-4 mr-2" />
                    Admin Dashboard
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Admin Access
                  </>
                )}
              </Button>
            </Link>
          )}
        </motion.div>
      </header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex items-center justify-center px-4 py-16"
      >
        <div className="max-w-4xl w-full mx-auto text-center space-y-12">
          {/* Logo/Brand */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="font-gelica text-7xl md:text-8xl lg:text-9xl tracking-tight mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                Aeromedia
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-400 font-light">
              Your memories are one step away
            </p>
          </motion.div>

          {/* Access Code Input */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-md mx-auto space-y-6"
          >
            <div className="relative">
              <Input
                type="text"
                value={accessCode}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter 6-digit code"
                className="h-20 text-center text-3xl md:text-4xl font-mono tracking-[0.5em] bg-white/5 border-white/10 focus:border-orange-500 focus:ring-orange-500/20 placeholder:tracking-normal placeholder:text-gray-600"
                maxLength={6}
                disabled={isLoading}
              />
              <div className="absolute inset-0 -z-10 bg-orange-500/20 blur-3xl rounded-full" />
            </div>

            <Button
              onClick={handleAccessCode}
              disabled={accessCode.length !== 6 || isLoading}
              size="lg"
              className="w-full h-14 text-lg font-medium bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 transition-all duration-200 hover:scale-[1.02]"
            >
              {isLoading ? 'Accessing...' : 'Access Your Flight'}
            </Button>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="max-w-2xl mx-auto space-y-4"
          >
            <p className="text-gray-400 text-lg leading-relaxed">
              Relive the magic of your balloon adventure. Access your professional photos, 
              stunning drone footage, and memorable moments from your flight with Aerostatic.
            </p>
            <div className="flex items-center justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">30</div>
                <div className="text-sm text-gray-500">Days Access</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">HD</div>
                <div className="text-sm text-gray-500">Quality Media</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">∞</div>
                <div className="text-sm text-gray-500">Downloads</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Bottom Brand */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="pb-8 text-center"
      >
        <p className="text-gray-600 text-sm">
          Powered by{' '}
          <span className="text-orange-500 font-medium">Aerostatic</span>
        </p>
      </motion.footer>
    </div>
  )
}