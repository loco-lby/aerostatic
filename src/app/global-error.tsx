'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-4">
              Critical Error
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-lg mx-auto">
              A critical error occurred. Please refresh the page.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}