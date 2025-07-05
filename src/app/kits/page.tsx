"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, FileText, MapPin } from "lucide-react";
import Link from "next/link";
import { useContent } from "@/hooks/useContent";

export default function KitsPage() {
    const content = useContent();
    const kitsPillar = content.home.pillars.find(p => p.id === 'kits');

    return (
        <div className="min-h-screen bg-black">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6">
                        05
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-gelica font-bold text-white mb-6">
                        {kitsPillar?.title}
                    </h1>
                    <p className="text-2xl md:text-3xl text-orange-400 font-medium mb-8">
                        {kitsPillar?.description}
                    </p>
                    <p className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
                        {kitsPillar?.content}
                    </p>
                </div>
            </section>

            {/* Kits Preview Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Adventure Resources
                        </h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Downloadable, editable, shareable. Everything we wish we had when we started.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                            <CardHeader>
                                <div className="aspect-square bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-lg mb-4 flex items-center justify-center">
                                    <MapPin className="w-12 h-12 text-orange-400" />
                                </div>
                                <CardTitle className="text-white">Route Packs</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-white/70">
                                    Pre-planned routes with waypoints, hazards, and local knowledge.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                            <CardHeader>
                                <div className="aspect-square bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-lg mb-4 flex items-center justify-center">
                                    <FileText className="w-12 h-12 text-orange-400" />
                                </div>
                                <CardTitle className="text-white">Field Notes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-white/70">
                                    Templates and checklists for documenting your adventures.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                            <CardHeader>
                                <div className="aspect-square bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-lg mb-4 flex items-center justify-center">
                                    <Download className="w-12 h-12 text-orange-400" />
                                </div>
                                <CardTitle className="text-white">Van-Life Hacks</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-white/70">
                                    Space-saving solutions and gear lists from the road.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="text-center bg-white/5 border border-white/10 rounded-2xl p-12">
                        <h3 className="text-2xl font-gelica font-bold text-white mb-4">
                            Pay What You Want
                        </h3>
                        <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                            Name your price or grab the free starters. Every download helps fund the next expedition.
                        </p>
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                            asChild
                        >
                            <Link href="/#kits">
                                {kitsPillar?.cta}
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