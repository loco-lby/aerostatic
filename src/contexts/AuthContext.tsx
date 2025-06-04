'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { User as UserProfile } from '@/lib/supabase'

interface AuthContextType {
    user: User | null
    session: Session | null
    userProfile: UserProfile | null
    loading: boolean
    signOut: () => Promise<void>
    refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    userProfile: null,
    loading: true,
    signOut: async () => { },
    refreshProfile: async () => { },
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchUserProfile = async (userId: string) => {
        try {
            const { data: profile, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single()

            if (!error) {
                setUserProfile(profile)
            }
        } catch (error) {
            console.error('Error fetching user profile:', error)
        }
    }

    const refreshProfile = async () => {
        if (user) {
            await fetchUserProfile(user.id)
        }
    }

    const signOut = async () => {
        try {
            await supabase.auth.signOut()
            setUser(null)
            setSession(null)
            setUserProfile(null)
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    useEffect(() => {
        // Get initial session
        const getInitialSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession()

                if (error) {
                    console.error('Error getting session:', error)
                } else {
                    setSession(session)
                    setUser(session?.user ?? null)

                    if (session?.user) {
                        await fetchUserProfile(session.user.id)
                    }
                }
            } catch (error) {
                console.error('Error in getInitialSession:', error)
            } finally {
                setLoading(false)
            }
        }

        getInitialSession()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('Auth state change:', event, session?.user?.email)

                setSession(session)
                setUser(session?.user ?? null)

                if (session?.user) {
                    await fetchUserProfile(session.user.id)
                } else {
                    setUserProfile(null)
                }

                setLoading(false)
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            session,
            userProfile,
            loading,
            signOut,
            refreshProfile,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
} 