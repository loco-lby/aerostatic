"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Camera, Handshake } from "lucide-react";
import Link from "next/link";
import { useContent } from "@/hooks/useContent";

export default function CollabsPage() {
    const content = useContent();
    const collabsPillar = content.home.pillars.find(p => p.id === 'collabs');

    return (
        <div className="min-h-screen bg-black">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6">
                        06
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-gelica font-bold text-white mb-6">
                        {collabsPillar?.title}
                    </h1>
                    <p className="text-2xl md:text-3xl text-orange-400 font-medium mb-8">
                        {collabsPillar?.description}
                    </p>
                    <p className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
                        {collabsPillar?.content}
                    </p>
                </div>
            </section>

            {/* Collaboration Types Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Let&apos;s Build Together
                        </h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            We bring the lift and the lens. You bring the vision.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                            <CardHeader>
                                <div className="aspect-square bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-lg mb-4 flex items-center justify-center">
                                    <Handshake className="w-12 h-12 text-orange-400" />
                                </div>
                                <CardTitle className="text-white">Brand Partnerships</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-white/70">
                                    Elevated partnerships that lift both banners. Strategic alliances with purpose.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                            <CardHeader>
                                <div className="aspect-square bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-lg mb-4 flex items-center justify-center">
                                    <Camera className="w-12 h-12 text-orange-400" />
                                </div>
                                <CardTitle className="text-white">Film Projects</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-white/70">
                                    Craft in motion. Collaborative storytelling that captures the spirit of adventure.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                            <CardHeader>
                                <div className="aspect-square bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-lg mb-4 flex items-center justify-center">
                                    <Users className="w-12 h-12 text-orange-400" />
                                </div>
                                <CardTitle className="text-white">Cause Collaborations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-white/70">
                                    Adventures with purpose. Supporting causes that align with our mission.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="text-center bg-white/5 border border-white/10 rounded-2xl p-12">
                        <h3 className="text-2xl font-gelica font-bold text-white mb-4">
                            Ready to Collaborate?
                        </h3>
                        <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                            Pitch us your cause, product, or film idea. Let&apos;s create something worth watching together.
                        </p>
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                            asChild
                        >
                            <Link href="/#collabs">
                                {collabsPillar?.cta}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
} 