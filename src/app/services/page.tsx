"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ServicesPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to homepage with services section
        router.replace('/#services');
    }, [router]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-white/70">Redirecting to our services...</p>
            </div>
        </div>
    );
} 