'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-gelica font-bold text-white mb-4">
          Something went wrong
        </h1>
        <p className="text-xl text-white/70 mb-8 max-w-lg mx-auto">
          An unexpected error occurred. We apologize for the inconvenience.
        </p>
        <Button
          onClick={reset}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
        >
          Try again
        </Button>
      </div>
    </div>
  )
}