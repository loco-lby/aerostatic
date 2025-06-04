import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/auth/setup-profile'

  try {
    const supabase = await createClient()

    if (code) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      console.log('Exchange code response:', { data, error })

      if (error) {
        console.error('Error exchanging code:', error)
        return NextResponse.redirect(`${origin}/auth/auth-code-error`)
      }

      // Check if the session was created successfully
      if (!data.session) {
        console.error('No session created')
        return NextResponse.redirect(`${origin}/auth/auth-code-error`)
      }

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.session.user.id)
        .single()

      console.log('User profile:', { profile, profileError })

      // Redirect based on environment
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      const redirectUrl = isLocalEnv
        ? `${origin}${next}`
        : forwardedHost
        ? `https://${forwardedHost}${next}`
        : `${origin}${next}`

      return NextResponse.redirect(redirectUrl)
    }

    if (token_hash && type) {
      const { data, error } = await supabase.auth.verifyOtp({
        type: type as any,
        token_hash,
      })
      console.log('Verify OTP response:', { data, error })

      if (error) {
        console.error('Error verifying OTP:', error)
        return NextResponse.redirect(`${origin}/auth/auth-code-error`)
      }

      // Check if the session was created successfully
      if (!data.session) {
        console.error('No session created from OTP')
        return NextResponse.redirect(`${origin}/auth/auth-code-error`)
      }

      // Redirect based on environment
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      const redirectUrl = isLocalEnv
        ? `${origin}${next}`
        : forwardedHost
        ? `https://${forwardedHost}${next}`
        : `${origin}${next}`

      return NextResponse.redirect(redirectUrl)
    }

    console.error('No code or token_hash provided')
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  } catch (error) {
    console.error('Unexpected error in callback:', error)
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }
} 