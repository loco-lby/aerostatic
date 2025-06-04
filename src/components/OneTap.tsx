'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

// Declare global types for Google One Tap
declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (config: {
                        client_id: string
                        callback: (response: { credential: string }) => void
                        nonce: string
                        auto_select?: boolean
                    }) => void
                    prompt: (callback?: (notification: any) => void) => void
                    renderButton: (parent: HTMLElement, options: any) => void
                    disableAutoSelect: () => void
                    storeCredential: (credential: any, callback: () => void) => void
                    cancel: () => void
                    revoke: (accessToken: string, callback: () => void) => void
                }
            }
        }
    }
}

function generateNonce(length: number = 16): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    const values = new Uint8Array(length)
    crypto.getRandomValues(values)
    values.forEach(value => {
        result += charset[value % charset.length]
    })
    return result
}

export default function OneTapComponent() {
    useEffect(() => {
        const initializeGoogleOneTap = async () => {
            // Check if we already have a session
            const { data: { session } } = await supabase.auth.getSession()
            if (session) return

            const nonce = generateNonce()

            window.google?.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
                callback: async (response: { credential: string }) => {
                    if (!response.credential) return

                    const { error } = await supabase.auth.signInWithIdToken({
                        provider: 'google',
                        token: response.credential,
                        nonce: nonce,
                    })

                    if (error) {
                        console.error('Error signing in with Google:', error)
                    }
                },
                nonce: nonce,
                auto_select: false,
            })

            window.google?.accounts.id.prompt()
        }

        initializeGoogleOneTap()

        return () => {
            // Cleanup
            window.google?.accounts.id.cancel()
        }
    }, [])

    return (
        <Script
            src="https://accounts.google.com/gsi/client"
            strategy="afterInteractive"
            onLoad={() => {
                console.log('Google One Tap script loaded')
            }}
        />
    )
} 