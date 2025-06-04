"use client"

import { useState } from "react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { CheckCircle, Mail, Globe, ArrowRight, Camera, MapPin, Compass } from "lucide-react"
import Link from "next/link"

export default function ConfirmationPage() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [hasSignedUp, setHasSignedUp] = useState(false)

    const handleNewsletterSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsSubmitting(true)

        try {
            const supabase = createClient()

            const { error } = await supabase
                .from('newsletter_signups')
                .insert({
                    email: email,
                    source: 'hire-confirmation'
                })

            if (error) {
                if (error.code === '23505') { // Unique constraint violation
                    toast.success("You&apos;re already on our list!")
                } else {
                    console.error("Error signing up for newsletter:", error)
                    toast.error("Failed to sign up. Please try again.")
                }
            } else {
                toast.success("Thanks for signing up! We&apos;ll keep you posted.")
                setHasSignedUp(true)
            }
        } catch (error) {
            console.error("Error:", error)
            toast.error("An unexpected error occurred. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-black">
            <Header />

            <div className="container mx-auto px-6 py-32">
                <div className="max-w-5xl mx-auto">
                    {/* Success Message */}
                    <div className="text-center mb-20">
                        <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 cinematic-glow">
                            <CheckCircle className="w-16 h-16 text-white" />
                        </div>
                        <h1 className="text-6xl md:text-7xl font-gelica font-bold text-white mb-8">
                            Request Received!
                        </h1>
                        <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
                            We&apos;ve received your inquiry and will be in touch within 24 hours to discuss your vision.
                        </p>

                        {/* Process Steps */}
                        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 cinematic-glow">
                                    <span className="text-white font-bold">1</span>
                                </div>
                                <div>
                                    <h3 className="font-gelica text-xl text-white mb-2">We&apos;ll Review Your Request</h3>
                                    <p className="text-white/70">We&apos;ll review your project details and prepare a custom proposal.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 cinematic-glow">
                                    <span className="text-white font-bold">2</span>
                                </div>
                                <div>
                                    <h3 className="font-gelica text-xl text-white mb-2">Custom Proposal</h3>
                                    <p className="text-white/70">You&apos;ll receive a detailed proposal with pricing and timeline</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Adventure Map Teaser - Main Feature */}
                    <Card className="glass hover:glass-warm smooth-transition mb-16 overflow-hidden">
                        <CardHeader className="text-center pb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-glow-pulse">
                                <Compass className="w-10 h-10 text-white" />
                            </div>
                            <CardTitle className="text-4xl md:text-5xl font-gelica text-white mb-4">
                                Something Bigger Is in the Works
                            </CardTitle>
                            <CardDescription className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                                Follow our adventures as we bring ballooning to the world through an immersive platform
                                for adventure storytellers everywhere.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            {/* Map Preview Placeholder */}
                            <div className="relative aspect-[16/9] bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-2xl overflow-hidden mb-8 group">
                                <div className="absolute inset-0 bg-black/40"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <MapPin className="w-16 h-16 text-orange-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                        <h3 className="text-2xl font-gelica text-white mb-2">The Adventure Map</h3>
                                        <p className="text-white/70">Coming Soon</p>
                                    </div>
                                </div>
                                {/* Animated dots representing global adventures */}
                                <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                                <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-red-500 rounded-full animate-pulse delay-300"></div>
                                <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-amber-500 rounded-full animate-pulse delay-700"></div>
                            </div>

                            <div className="text-center">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-lg px-10 py-4 cinematic-glow"
                                    asChild
                                >
                                    <Link href="/adventures">
                                        Follow Our Adventures
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Newsletter Signup */}
                    <Card className="glass hover:glass-warm smooth-transition mb-16">
                        <CardHeader className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Globe className="w-8 h-8 text-white" />
                            </div>
                            <CardTitle className="text-3xl font-gelica text-white mb-4">Stay Connected</CardTitle>
                            <CardDescription className="text-white/70 text-lg">
                                Get behind-the-scenes content, adventure updates, and early access to new features.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {!hasSignedUp ? (
                                <form onSubmit={handleNewsletterSignup} className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <Label htmlFor="newsletter-email" className="sr-only">Email</Label>
                                            <Input
                                                type="email"
                                                id="newsletter-email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email"
                                                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 h-12"
                                                required
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            size="lg"
                                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 px-8"
                                        >
                                            {isSubmitting ? "..." : "Sign Up"}
                                        </Button>
                                    </div>
                                    <p className="text-sm text-white/50 text-center">
                                        Join our community of adventure enthusiasts and balloon lovers.
                                    </p>
                                </form>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 cinematic-glow">
                                        <Mail className="w-8 h-8 text-white" />
                                    </div>
                                    <p className="text-green-400 font-gelica text-xl mb-2">You&apos;re all set!</p>
                                    <p className="text-white/70">We&apos;ll keep you posted on our journey.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Secondary Actions */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <Card className="glass hover:glass-warm smooth-transition hover-lift group">
                            <CardHeader>
                                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Camera className="w-7 h-7 text-white" />
                                </div>
                                <CardTitle className="text-2xl font-gelica text-white">Recent Adventures</CardTitle>
                                <CardDescription className="text-white/70 text-base">
                                    Check out our latest balloon adventures and cinematic captures from around the world.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    variant="outline"
                                    asChild
                                    className="w-full border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                                >
                                    <Link href="/adventures">
                                        Explore Adventures
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="glass hover:glass-warm smooth-transition hover-lift group">
                            <CardHeader>
                                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <MapPin className="w-7 h-7 text-white" />
                                </div>
                                <CardTitle className="text-2xl font-gelica text-white">Share Your Story</CardTitle>
                                <CardDescription className="text-white/70 text-base">
                                    Have an adventure story to tell? Join our growing community of explorers and storytellers.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    variant="ghost"
                                    asChild
                                    className="w-full text-white/70 hover:text-white hover:bg-white/10"
                                >
                                    <Link href="/submit">
                                        Submit an Adventure
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center">
                        <p className="text-white/70 mb-6 text-lg">
                            Have questions about your request?
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Button
                                variant="outline"
                                asChild
                                className="border-white/20 text-white hover:bg-white/10"
                            >
                                <Link href="/about">Learn More About Us</Link>
                            </Button>
                            <Button
                                variant="ghost"
                                asChild
                                className="text-white/70 hover:text-white hover:bg-white/10"
                            >
                                <Link href="/hire-us">Submit Another Request</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
} 