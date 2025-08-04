'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { AlertCircle, Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <div className="mb-8">
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-4xl font-gelica mb-4">Access Code Not Found</h1>
          <p className="text-gray-400 text-lg">
            The access code you entered is invalid or has expired. 
            Please check your code and try again.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/tools/aeromedia">
            <Button className="gap-2 bg-orange-500 hover:bg-orange-600">
              <Home className="w-4 h-4" />
              Back to Aeromedia
            </Button>
          </Link>
          
          <p className="text-sm text-gray-500">
            Access codes expire after 30 days. If you believe this is an error, 
            please contact support.
          </p>
        </div>
      </motion.div>
    </div>
  )
}