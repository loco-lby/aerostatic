'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AuthButton() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        const getSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user) {
                    // Get user profile
                    const { data: userProfile } = await supabase
                        .from('users')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    setUser(userProfile);
                }
            } catch (error) {
                console.error('Error getting session:', error);
            } finally {
                setLoading(false);
            }
        };

        getSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === 'SIGNED_IN' && session?.user) {
                    // Get or create user profile
                    const { data: userProfile } = await supabase
                        .from('users')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    if (userProfile) {
                        setUser(userProfile);
                    } else {
                        // Create new user profile
                        const newUser = {
                            id: session.user.id,
                            email: session.user.email!,
                            full_name: session.user.user_metadata?.full_name || session.user.email!.split('@')[0],
                            avatar_url: session.user.user_metadata?.avatar_url,
                            role: 'adventurer' as const,
                            bio: '',
                            location: '',
                            website_url: '',
                            social_links: {},
                            adventure_count: 0,
                            total_adventure_score: 0,
                            encouragements_given: 0,
                            encouragements_received: 0,
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString(),
                        };

                        const { data: createdUser } = await supabase
                            .from('users')
                            .insert(newUser)
                            .select()
                            .single();

                        if (createdUser) {
                            setUser(createdUser);
                        }
                    }
                } else if (event === 'SIGNED_OUT') {
                    setUser(null);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (loading) {
        return (
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        );
    }

    if (user) {
        return (
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    {user.avatar_url ? (
                        <Image
                            src={user.avatar_url || '/default-avatar.png'}
                            alt={user.full_name || 'User'}
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                            <UserIcon className="w-4 h-4 text-slate-300" />
                        </div>
                    )}
                    <span className="text-sm text-slate-300 hidden sm:block">
                        {user.full_name}
                    </span>
                </div>
                <Button
                    onClick={signOut}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:block">Sign Out</span>
                </Button>
            </div>
        );
    }

    return (
        <Button
            onClick={signInWithGoogle}
            className="flex items-center gap-2"
        >
            <LogIn className="w-4 h-4" />
            Sign In with Google
        </Button>
    );
} 