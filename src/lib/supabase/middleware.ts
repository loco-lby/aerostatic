import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'
import { type Database } from '@/lib/supabase'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          // Set cookie in the request
          request.cookies.set({ name, value, ...options })
          // Set cookie in the response
          response.cookies.set({ name, value, ...options })
        },
        remove(name, options) {
          // Remove cookie from the request
          request.cookies.delete(name)
          // Remove cookie from the response
          response.cookies.delete(name)
        },
      },
    }
  )

  // Refresh session if expired
  await supabase.auth.getUser()

  return response
} 