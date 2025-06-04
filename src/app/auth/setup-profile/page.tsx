'use client';

import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SetupProfilePage() {
    const { user, userProfile, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // If we're not loading and there's no user, redirect to home
        if (!loading && !user) {
            router.push('/');
            return;
        }

        // If we have both user and profile, redirect to home
        if (!loading && user && userProfile) {
            router.push('/');
            return;
        }
    }, [user, userProfile, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-xl font-medium text-slate-200">Setting up your profile...</h2>
                    <p className="text-slate-400 mt-2">This will only take a moment.</p>
                </div>
            </div>
        );
    }

    // If we get here and don't have a user, show error
    if (!user) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-medium text-red-500 mb-4">Authentication Error</h2>
                    <p className="text-slate-400 mb-6">Unable to verify your authentication status.</p>
                    <Button onClick={() => router.push('/')}>Return Home</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-xl font-medium text-slate-200">Creating your profile...</h2>
                <p className="text-white/70 mb-8">
                    Let&apos;s set up your profile to get started with Aerostatic Adventures.
                </p>
            </div>
        </div>
    );
} 