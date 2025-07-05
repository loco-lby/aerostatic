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
    Package,
    CheckSquare,
    MessageSquare,
    Shield,
    Zap,
    Cloud,
    Download,
    Github,
    ExternalLink,
    MapPin,
    Clock,
    Settings,
    Bell,
    Database,
    Wind,
    Navigation,
    Target,
    Map,
    Compass,
    Plane
} from "lucide-react";
import Link from "next/link";
import { useContent } from "@/hooks/useContent";
import { useState } from "react";

export default function TechPage() {
    const content = useContent();
    const techPillar = content.home.pillars.find(p => p.id === 'tech');
    const [activeTab, setActiveTab] = useState('aerostatus');

    const AeroStatusContent = () => (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6">
                                Mobile App • React Native
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-gelica font-bold text-white mb-6">
                                AeroStatus
                            </h1>
                            <p className="text-2xl md:text-3xl text-orange-400 font-medium mb-8">
                                Built in the field, refined through daily use
                            </p>
                            <p className="text-xl text-white/70 leading-relaxed mb-12">
                                Not another app pitched by consultants. AeroStatus was born from pre-dawn launches,
                                chase crew chaos, and the real needs of working balloon operations. Every feature
                                exists because we needed it ourselves.
                            </p>

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
                                    <Github className="mr-2 h-5 w-5" />
                                    View on GitHub
                                </Button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                                <Smartphone className="w-24 h-24 text-orange-400 mx-auto mb-6" />
                                <div className="text-center">
                                    <h3 className="text-2xl font-gelica font-bold text-white mb-4">
                                        Built for Balloon Crews
                                    </h3>
                                    <p className="text-white/70">
                                        We fly before dawn, build in our off-hours, and test everything in the field.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features Grid */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Core Features
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Everything balloon operations teams need, built into one powerful mobile app
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
                            <MessageSquare className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Real-time Communication</h3>
                            <p className="text-white/70 mb-4">
                                Centralized log with role-based messaging, media sharing, and @mentions.
                                Keep crews connected in real-time.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Live Chat
                                </Badge>
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Media Upload
                                </Badge>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
                            <Calendar className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Schedule Management</h3>
                            <p className="text-white/70 mb-4">
                                Weekly flight schedules with balloon assignments and crew coordination.
                                Automated notifications for changes.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Crew Assignments
                                </Badge>
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Push Notifications
                                </Badge>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
                            <Package className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Equipment Tracking</h3>
                            <p className="text-white/70 mb-4">
                                Comprehensive system for balloons, vehicles, and equipment with
                                maintenance logs and checkout systems.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Maintenance Logs
                                </Badge>
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    QR Codes
                                </Badge>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
                            <CheckSquare className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Safety Checklists</h3>
                            <p className="text-white/70 mb-4">
                                Digital pre/post flight checklists for safety compliance and
                                operation standardization.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Digital Forms
                                </Badge>
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Compliance
                                </Badge>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
                            <Users className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Role-Based Access</h3>
                            <p className="text-white/70 mb-4">
                                Six distinct roles with appropriate permissions: Owner, Manager,
                                Office Staff, Pilot, Crew Chief, and Crew.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Permissions
                                </Badge>
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    6 Roles
                                </Badge>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
                            <Cloud className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Offline Capability</h3>
                            <p className="text-white/70 mb-4">
                                Critical features work offline with automatic sync when
                                connection is restored. Never miss a beat.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Offline First
                                </Badge>
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Auto Sync
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Stack */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Engineered for Reality
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Tech stack chosen for field reliability, not conference talks
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        <div className="text-center">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
                                <Smartphone className="w-12 h-12 text-orange-400 mx-auto" />
                            </div>
                            <h3 className="text-xl font-gelica font-bold text-white mb-2">React Native</h3>
                            <p className="text-white/60 text-sm">Cross-platform mobile development</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
                                <Database className="w-12 h-12 text-orange-400 mx-auto" />
                            </div>
                            <h3 className="text-xl font-gelica font-bold text-white mb-2">Supabase</h3>
                            <p className="text-white/60 text-sm">PostgreSQL, Auth, Real-time, Storage</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
                                <Zap className="w-12 h-12 text-orange-400 mx-auto" />
                            </div>
                            <h3 className="text-xl font-gelica font-bold text-white mb-2">TypeScript</h3>
                            <p className="text-white/60 text-sm">Type-safe development</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
                                <Settings className="w-12 h-12 text-orange-400 mx-auto" />
                            </div>
                            <h3 className="text-xl font-gelica font-bold text-white mb-2">Expo SDK</h3>
                            <p className="text-white/60 text-sm">Rapid development & deployment</p>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h3 className="text-2xl font-gelica font-bold text-white mb-6 text-center">
                            Additional Technologies
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span className="text-white/80">Zustand (State Management)</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span className="text-white/80">React Navigation v6</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span className="text-white/80">React Hook Form + Zod</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span className="text-white/80">React Native Paper</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span className="text-white/80">Push Notifications</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span className="text-white/80">Offline-First Architecture</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

    const AetherContent = () => (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="mb-8">
                        <span className="text-6xl text-orange-400 font-mono">✦</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-gelica font-bold text-white mb-8 tracking-tight">
                        AETHER
                    </h1>
                    <p className="text-2xl md:text-3xl text-white mb-4 font-medium">
                        Learn to Fly. Navigate Everything.
                    </p>
                    <p className="text-xl text-orange-400 mb-16 font-mono">
                        Not a course. Not a map. A way out.
                    </p>
                </div>
            </section>

            {/* Start with Basics */}
            <section className="py-16 px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="border-l-4 border-orange-400 pl-8 mb-16">
                        <div className="flex items-center mb-6">
                            <span className="text-2xl text-orange-400 font-mono mr-4">✦</span>
                            <h2 className="text-3xl md:text-4xl font-gelica font-bold text-white">
                                START WITH THE BASICS
                            </h2>
                        </div>
                        <p className="text-xl text-white mb-8">
                            You want to fly? You&apos;ll need a license.
                            <br />
                            <span className="text-orange-400">Aether gets you there, fast.</span>
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-3"></div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">FAA prep that doesn&apos;t feel like punishment</h3>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-3"></div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Actual test questions</h3>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-3"></div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">AI coaching that talks like a real human</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <Plane className="w-12 h-12 text-orange-400 mb-4" />
                                <p className="text-white/80 mb-4">
                                    Study in your truck. Or the field. Or nowhere at all.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-orange-400">$9.99/month</span>
                                    <span className="text-sm text-white/60">Cancel anytime</span>
                                </div>
                                <p className="text-xs text-white/50 mt-2">
                                    Cancel the second you pass. Or don&apos;t. Up to you.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Toolkit Section */}
            <section className="py-16 px-6 bg-white/[0.02]">
                <div className="container mx-auto max-w-4xl">
                    <div className="border-l-4 border-orange-400 pl-8">
                        <div className="flex items-center mb-6">
                            <span className="text-2xl text-orange-400 font-mono mr-4">✦</span>
                            <h2 className="text-3xl md:text-4xl font-gelica font-bold text-white">
                                THEN UNLOCK THE TOOLKIT
                            </h2>
                        </div>
                        <p className="text-xl text-white mb-12">
                            Once you pass, Aether opens up.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                                    <Map className="w-12 h-12 text-orange-400 mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">A world map built for flight</h3>
                                    <p className="text-white/70">Complete global coverage optimized for aerial navigation</p>
                                </div>

                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <Wind className="w-12 h-12 text-orange-400 mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">Offline overlays</h3>
                                    <p className="text-white/70">Wind, terrain, airspace, public land</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <Target className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Drop markers. Draw lines. Plan exits.</h3>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <Users className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Coordinate with chase. Replay your flights.</h3>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <Compass className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Explore overlay packs</h3>
                                        <p className="text-white/60">Made by pilots who don&apos;t post about it</p>
                                    </div>
                                </div>

                                <div className="bg-orange-400/10 border border-orange-400/30 rounded-xl p-4 mt-8">
                                    <p className="text-white font-bold mb-2">One-time fee. Lifetime access.</p>
                                    <p className="text-white/80 text-sm">No bloat. No tutorials. Just tools.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Not for Everyone */}
            <section className="py-16 px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="border-l-4 border-orange-400 pl-8">
                        <div className="flex items-center mb-6">
                            <span className="text-2xl text-orange-400 font-mono mr-4">✦</span>
                            <h2 className="text-3xl md:text-4xl font-gelica font-bold text-white">
                                THIS WASN&apos;T BUILT FOR EVERYONE
                            </h2>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
                            <p className="text-xl text-white/80 mb-6 leading-relaxed">
                                If you like your schedule, your routine, your group chats,
                                <br />
                                <span className="text-orange-400">Aether&apos;s not for you.</span>
                            </p>

                            <div className="space-y-4">
                                <p className="text-lg text-white">
                                    This is for people who check the wind before the news.
                                </p>
                                <p className="text-lg text-white">
                                    For those who&apos;ve already looked up and wondered, <span className="text-orange-400">&quot;What if I could?&quot;</span>
                                </p>
                                <p className="text-2xl font-bold text-orange-400 mt-8">
                                    You can.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Early Access */}
            <section className="py-16 px-6 bg-white/[0.02]">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="flex items-center justify-center mb-6">
                        <span className="text-2xl text-orange-400 font-mono mr-4">⬇️</span>
                        <h2 className="text-3xl md:text-4xl font-gelica font-bold text-white">
                            EARLY ACCESS IS NEAR
                        </h2>
                    </div>

                    <p className="text-xl text-white mb-12">
                        Drop your email. We&apos;ll let you know when to suit up.
                    </p>

                    <div className="max-w-md mx-auto mb-8">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-orange-400 transition-colors"
                            />
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                            >
                                Get Notified →
                            </Button>
                        </div>
                    </div>

                    <p className="text-sm text-white/60">
                        No spam. Just a single ping when it&apos;s time.
                    </p>

                    <div className="mt-16 py-8 border-t border-white/10">
                        <div className="font-mono text-white/40 text-lg mb-4">
                            ▒▒▒
                        </div>
                        <p className="text-white font-gelica font-bold mb-2">
                            AETHER by AEROSTATIC
                        </p>
                        <p className="text-white/80 mb-4">
                            We don&apos;t teach dreams. We teach flight.
                        </p>
                        <div className="flex justify-center gap-6">
                            <Link href="/" className="text-orange-400 hover:text-orange-300 transition-colors">
                                aerostatic.io
                            </Link>
                            <span className="text-white/30">|</span>
                            <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors">
                                @aerostatic_
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

    return (
        <div className="min-h-screen bg-black">
            <Header />

            {/* Tab Navigation */}
            <section className="pt-24 px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex justify-center mb-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-2 flex">
                            <button
                                onClick={() => setActiveTab('aerostatus')}
                                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 'aerostatus'
                                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                AeroStatus
                            </button>
                            <button
                                onClick={() => setActiveTab('aether')}
                                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 'aether'
                                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                Aether
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            {activeTab === 'aerostatus' ? <AeroStatusContent /> : <AetherContent />}

            {/* Beta Access CTA - Only for AeroStatus */}
            {activeTab === 'aerostatus' && (
                <section className="py-20 px-6">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Join the Beta
                        </h2>
                        <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
                            Quietly offered to others walking the same path. Help us build the tools
                            we all wish existed. Your daily frustrations become tomorrow&apos;s features.
                        </p>

                        <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl">
                            <p className="text-white/60 text-sm">
                                This isn&apos;t about disrupting an industry. It&apos;s about preserving a craft.
                                <br />
                                Questions? Email us at <span className="text-orange-400">info@aerostatus.io</span>
                            </p>
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
} 