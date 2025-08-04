"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ArrowRight,
    Smartphone,
    Users,
    Calendar,
    MessageSquare,
    Shield,
    Cloud,
    Download,
    Github,
    ExternalLink,
    Clock,
    Settings,
    Database,
    Video,
    Film,
    FolderOpen,
    Zap,
    FileText,
    Workflow
} from "lucide-react";
import Link from "next/link";
import { useContent } from "@/hooks/useContent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ToolsPage() {
    const content = useContent();

    return (
        <div className="min-h-screen bg-black">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6">
                        FIELD-TESTED SOFTWARE
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-gelica font-bold text-white mb-6">
                        Tools That Work
                    </h1>
                    <p className="text-2xl md:text-3xl text-orange-400 font-medium mb-8">
                        Built in the field, not the boardroom
                    </p>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto">
                        Two flagship tools. One for coordinating chaos. One for turning footage into stories.
                        Both tested at 4AM launches, equipment failures, and real operations.
                    </p>
                </div>
            </section>

            {/* AeroStatus Section */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6">
                                TEAM COORDINATION
                            </Badge>
                            <h2 className="text-4xl md:text-6xl font-gelica font-bold text-white mb-6">
                                AeroStatus
                            </h2>
                            <p className="text-2xl text-orange-400 font-medium mb-8">
                                Operations software that survives reality
                            </p>
                            <p className="text-lg text-white/70 leading-relaxed mb-8">
                                Not another app pitched by consultants. AeroStatus was born from pre-dawn launches,
                                chase crew chaos, and the real needs of working operations. Every feature
                                exists because we needed it ourselves.
                            </p>

                            <div className="space-y-4 mb-12">
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                                    <span className="text-white">Real-time crew coordination with offline mode</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                                    <span className="text-white">Equipment tracking that actually gets used</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                                    <span className="text-white">Digital checklists that don&apos;t slow you down</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                                >
                                    Request Beta Access
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white/20 text-white hover:bg-white/10 px-8 py-4"
                                >
                                    View Documentation
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Card className="bg-white/5 border-white/10">
                                <CardHeader>
                                    <MessageSquare className="w-8 h-8 text-orange-400 mb-2" />
                                    <CardTitle className="text-white text-lg">Live Ops Log</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white/60 text-sm">Centralized communication with role-based messaging</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white/5 border-white/10">
                                <CardHeader>
                                    <Calendar className="w-8 h-8 text-orange-400 mb-2" />
                                    <CardTitle className="text-white text-lg">Crew Scheduling</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white/60 text-sm">Automated notifications and assignments</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white/5 border-white/10">
                                <CardHeader>
                                    <Shield className="w-8 h-8 text-orange-400 mb-2" />
                                    <CardTitle className="text-white text-lg">Safety First</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white/60 text-sm">Digital checklists for compliance</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white/5 border-white/10">
                                <CardHeader>
                                    <Cloud className="w-8 h-8 text-orange-400 mb-2" />
                                    <CardTitle className="text-white text-lg">Works Offline</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white/60 text-sm">Critical features work without signal</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mt-16 p-6 bg-white/5 border border-white/10 rounded-xl">
                        <h3 className="text-lg font-bold text-white mb-4">Built With:</h3>
                        <div className="flex flex-wrap gap-3">
                            <Badge variant="outline" className="text-white/70 border-white/30">React Native</Badge>
                            <Badge variant="outline" className="text-white/70 border-white/30">TypeScript</Badge>
                            <Badge variant="outline" className="text-white/70 border-white/30">Supabase</Badge>
                            <Badge variant="outline" className="text-white/70 border-white/30">Expo</Badge>
                            <Badge variant="outline" className="text-white/70 border-white/30">Offline-First</Badge>
                        </div>
                    </div>
                </div>
            </section>

            {/* AeroMedia Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="bg-white/5 border-white/10">
                                    <CardHeader>
                                        <Film className="w-8 h-8 text-orange-400 mb-2" />
                                        <CardTitle className="text-white text-lg">Auto-Organize</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-white/60 text-sm">Smart folders and metadata tagging</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-white/5 border-white/10">
                                    <CardHeader>
                                        <Workflow className="w-8 h-8 text-orange-400 mb-2" />
                                        <CardTitle className="text-white text-lg">Quick Edits</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-white/60 text-sm">Timeline-based rough cut tools</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-white/5 border-white/10">
                                    <CardHeader>
                                        <FileText className="w-8 h-8 text-orange-400 mb-2" />
                                        <CardTitle className="text-white text-lg">Story Templates</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-white/60 text-sm">Field-tested narrative structures</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-white/5 border-white/10">
                                    <CardHeader>
                                        <Zap className="w-8 h-8 text-orange-400 mb-2" />
                                        <CardTitle className="text-white text-lg">One-Click Export</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-white/60 text-sm">Optimized for every platform</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6">
                                MEDIA ENGINE
                            </Badge>
                            <h2 className="text-4xl md:text-6xl font-gelica font-bold text-white mb-6">
                                AeroMedia
                            </h2>
                            <p className="text-2xl text-orange-400 font-medium mb-8">
                                Turn chaos into stories worth telling
                            </p>
                            <p className="text-lg text-white/70 leading-relaxed mb-8">
                                You shoot hundreds of clips. Most die on a hard drive. AeroMedia helps you organize,
                                edit, and publish faster than ever. Built for creators who work while they create.
                            </p>

                            <div className="space-y-4 mb-12">
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                                    <span className="text-white">Auto-import and smart organization</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                                    <span className="text-white">Story templates that actually work</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                                    <span className="text-white">Export optimized for every platform</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                                >
                                    Join Waitlist
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white/20 text-white hover:bg-white/10 px-8 py-4"
                                >
                                    Watch Demo
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mt-16 p-6 bg-white/5 border border-white/10 rounded-xl">
                        <h3 className="text-lg font-bold text-white mb-4">Built With:</h3>
                        <div className="flex flex-wrap gap-3">
                            <Badge variant="outline" className="text-white/70 border-white/30">Electron</Badge>
                            <Badge variant="outline" className="text-white/70 border-white/30">FFmpeg</Badge>
                            <Badge variant="outline" className="text-white/70 border-white/30">React</Badge>
                            <Badge variant="outline" className="text-white/70 border-white/30">AI-Powered</Badge>
                            <Badge variant="outline" className="text-white/70 border-white/30">Cross-Platform</Badge>
                        </div>
                    </div>
                </div>
            </section>

            {/* Coming Soon Section */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-gelica font-bold text-white mb-4">
                            More Tools in Development
                        </h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            We build what we need. When it&apos;s ready, you&apos;ll know.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="bg-white/5 border-white/10">
                            <CardHeader>
                                <CardTitle className="text-white text-xl">TimeCapsule</CardTitle>
                                <CardDescription className="text-white/60">Long-term project archive</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="bg-white/5 border-white/10">
                            <CardHeader>
                                <CardTitle className="text-white text-xl">AeroKnot</CardTitle>
                                <CardDescription className="text-white/60">Equipment maintenance tracker</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="bg-white/5 border-white/10">
                            <CardHeader>
                                <CardTitle className="text-white text-xl">TravelPact</CardTitle>
                                <CardDescription className="text-white/60">Crew travel coordination</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                        Built by operators, for operators
                    </h2>
                    <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
                        We&apos;re not consultants. We fly, we build, we test.
                        Request access to the tools that actually work.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                        >
                            Request Beta Access
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10 px-8 py-4"
                            asChild
                        >
                            <Link href="/build-with-us">
                                Need Custom Tools?
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-xl">
                        <p className="text-white/60 text-sm">
                            Questions? Email us at <span className="text-orange-400">info@aerostatic.io</span>
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}