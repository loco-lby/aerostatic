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
    Lock,
    Camera,
    Upload,
    Share2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import { useState } from "react";
import { CustomSolutionsContent } from "./CustomSolutionsContent";

export default function TechPage() {
    const content = useContent();
    const techPillar = content.home.pillars.find(p => p.id === 'tech');
    const [activeTab, setActiveTab] = useState('aerostatus');
    
    // Handle AeroMedia redirect
    const handleTabChange = (tab: string) => {
        if (tab === 'aeromedia') {
            window.location.href = '/tools/aeromedia';
        } else {
            setActiveTab(tab);
        }
    };

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

    const AeroMediaContentOld = () => (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6">
                                Media Delivery Platform
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-gelica font-bold text-white mb-6">
                                AeroMedia
                            </h1>
                            <p className="text-2xl md:text-3xl text-orange-400 font-medium mb-8">
                                Memories delivered with care
                            </p>
                            <p className="text-xl text-white/70 leading-relaxed mb-12">
                                A seamless media delivery platform for balloon ride photos and videos. 
                                Passengers access their flight memories with a simple 6-digit code - 
                                no apps, no accounts, just beautiful memories.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/tools/aeromedia">
                                    <Button
                                        size="lg"
                                        className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                                    >
                                        Try Demo
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link href="/tools/aeromedia/admin">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-white/20 text-white hover:bg-white/10 px-8 py-4"
                                    >
                                        <Lock className="mr-2 h-5 w-5" />
                                        Admin Portal
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                                <Camera className="w-24 h-24 text-orange-400 mx-auto mb-6" />
                                <div className="text-center">
                                    <h3 className="text-2xl font-gelica font-bold text-white mb-4">
                                        Simple. Secure. Beautiful.
                                    </h3>
                                    <p className="text-white/70">
                                        Professional media delivery that matches the magic of your flights.
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
                            Key Features
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Everything you need to deliver flight memories professionally
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
                            <Upload className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Easy Upload</h3>
                            <p className="text-white/70 mb-4">
                                Drag and drop interface for bulk media uploads. Automatic categorization and thumbnail generation.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Bulk Upload
                                </Badge>
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Auto-Optimize
                                </Badge>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
                            <Lock className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Secure Access</h3>
                            <p className="text-white/70 mb-4">
                                6-digit access codes with automatic expiration. No accounts needed for passengers.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    30-Day Access
                                </Badge>
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    No Sign-up
                                </Badge>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
                            <Camera className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Smart Gallery</h3>
                            <p className="text-white/70 mb-4">
                                Beautiful responsive galleries with categorized views. Photos, videos, and drone footage organized.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Categories
                                </Badge>
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Lightbox
                                </Badge>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
                            <Download className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Easy Downloads</h3>
                            <p className="text-white/70 mb-4">
                                Individual downloads or bulk ZIP packages. High-resolution originals preserved.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Bulk Download
                                </Badge>
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Full Quality
                                </Badge>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
                            <Share2 className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Easy Sharing</h3>
                            <p className="text-white/70 mb-4">
                                Share galleries with a simple link. Perfect for social media or email.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Link Sharing
                                </Badge>
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Social Ready
                                </Badge>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
                            <Database className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Analytics</h3>
                            <p className="text-white/70 mb-4">
                                Track views, downloads, and engagement. Know which memories matter most.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Download Stats
                                </Badge>
                                <Badge variant="outline" className="text-orange-400/70 border-orange-400/30 text-xs">
                                    Insights
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            How It Works
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            From flight to memories in three simple steps
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl font-bold text-orange-400">1</span>
                            </div>
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Upload Media</h3>
                            <p className="text-white/70">
                                After the flight, upload photos and videos to create a media package with passenger details.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl font-bold text-orange-400">2</span>
                            </div>
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Share Code</h3>
                            <p className="text-white/70">
                                Send passengers their unique 6-digit access code via email or text message.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl font-bold text-orange-400">3</span>
                            </div>
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Enjoy Memories</h3>
                            <p className="text-white/70">
                                Passengers access their gallery instantly, download photos, and share with friends.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Stack */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Built for Scale
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Modern tech stack designed for reliability and performance
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        <div className="text-center">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
                                <Zap className="w-12 h-12 text-orange-400 mx-auto" />
                            </div>
                            <h3 className="text-xl font-gelica font-bold text-white mb-2">Next.js 15</h3>
                            <p className="text-white/60 text-sm">React 19 with App Router</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
                                <Database className="w-12 h-12 text-orange-400 mx-auto" />
                            </div>
                            <h3 className="text-xl font-gelica font-bold text-white mb-2">Supabase</h3>
                            <p className="text-white/60 text-sm">PostgreSQL & Storage</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
                                <Shield className="w-12 h-12 text-orange-400 mx-auto" />
                            </div>
                            <h3 className="text-xl font-gelica font-bold text-white mb-2">Row Level Security</h3>
                            <p className="text-white/60 text-sm">Secure by design</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
                                <Cloud className="w-12 h-12 text-orange-400 mx-auto" />
                            </div>
                            <h3 className="text-xl font-gelica font-bold text-white mb-2">Edge Functions</h3>
                            <p className="text-white/60 text-sm">Global CDN delivery</p>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h3 className="text-2xl font-gelica font-bold text-white mb-6 text-center">
                            Key Technologies
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span className="text-white/80">TypeScript</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span className="text-white/80">Tailwind CSS</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span className="text-white/80">Framer Motion</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span className="text-white/80">React Hook Form</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span className="text-white/80">Zod Validation</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span className="text-white/80">shadcn/ui</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Perfect For */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Perfect For
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Any balloon operation that values passenger experience
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Tour Operators</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-white/80">Deliver memories that match your premium experience</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-white/80">Reduce support requests with simple access codes</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-white/80">Track engagement and improve offerings</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Event Flights</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-white/80">Perfect for festivals and special events</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-white/80">Handle multiple flights with ease</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-white/80">Professional presentation for sponsors</span>
                                </li>
                            </ul>
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
                                onClick={() => handleTabChange('aerostatus')}
                                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 'aerostatus'
                                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                AeroStatus
                            </button>
                            <button
                                onClick={() => handleTabChange('aeromedia')}
                                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 text-white/70 hover:text-white hover:bg-white/10`}
                            >
                                AeroMedia
                            </button>
                            <button
                                onClick={() => handleTabChange('custom')}
                                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 'custom'
                                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                Custom Solutions
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            {activeTab === 'aerostatus' ? <AeroStatusContent /> : <CustomSolutionsContent />}

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