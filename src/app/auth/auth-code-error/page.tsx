'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthErrorPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="max-w-md w-full mx-auto p-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4 text-red-500">Authentication Error</h1>
                    <p className="text-slate-300 mb-8">
                        There was an error processing your authentication request. This could happen if:
                    </p>
                    <ul className="text-left text-slate-400 mb-8 space-y-2">
                        <li>• The authentication link has expired</li>
                        <li>• The link has already been used</li>
                        <li>• There was a problem with the OAuth provider</li>
                    </ul>
                    <div className="space-y-4">
                        <Button asChild className="w-full">
                            <Link href="/">Return Home</Link>
                        </Button>
                        <Button variant="outline" asChild className="w-full">
                            <Link href="/auth/signin">Try Again</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
} 