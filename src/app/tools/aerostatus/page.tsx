"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ArrowRight,
    Smartphone,
    Users,
    Calendar,
    MessageSquare,
    Shield,
    Cloud,
    Download,
    Check,
    Clock,
    Settings,
    Database,
    Zap,
    ChevronRight,
    Apple,
    Play
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const features = [
    {
        title: "Real-time Communication",
        description: "Centralized log with role-based messaging, media sharing, and @mentions",
        icon: MessageSquare
    },
    {
        title: "Schedule Management",
        description: "Weekly flight schedules with balloon assignments and crew coordination",
        icon: Calendar
    },
    {
        title: "Equipment Tracking",
        description: "Comprehensive system for balloons, vehicles, and equipment with maintenance logs",
        icon: Settings
    },
    {
        title: "Digital Checklists",
        description: "Pre/post flight checklists for safety compliance and standardization",
        icon: Shield
    },
    {
        title: "Offline Mode",
        description: "Critical features work offline with sync when connection restored",
        icon: Cloud
    },
    {
        title: "Role-Based Access",
        description: "Six distinct roles with appropriate permissions and access levels",
        icon: Users
    }
];

const roles = [
    { name: "Owner", description: "Full system access" },
    { name: "Manager", description: "Approve users, manage schedules" },
    { name: "Office Staff", description: "Administrative access" },
    { name: "Pilot", description: "Flight operations, safety checks" },
    { name: "Crew Chief", description: "Equipment, crew coordination" },
    { name: "Driver/Crew", description: "Operational access" }
];

export default function AeroStatusPage() {
    return (
        <div className="min-h-screen bg-black">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-teal-600/10" />
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto max-w-7xl relative z-10"
                >
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge variant="outline" className="text-green-400 border-green-400/30 mb-6">
                                Now in Beta
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-gelica font-bold text-white mb-6">
                                AeroStatus
                            </h1>
                            <p className="text-2xl md:text-3xl text-green-400 font-medium mb-8">
                                Operations software that survives reality
                            </p>
                            <p className="text-xl text-white/70 mb-12">
                                Built for hot air balloon operations but works for any field team. 
                                Real-time coordination, equipment tracking, and digital checklists 
                                that actually get used.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-medium"
                                    disabled
                                >
                                    <Apple className="mr-2 w-5 h-5" />
                                    Coming to App Store
                                </Button>
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-medium"
                                    disabled
                                >
                                    <Play className="mr-2 w-5 h-5" />
                                    Coming to Google Play
                                </Button>
                            </div>
                            
                            <p className="text-sm text-white/50">
                                Currently in private beta. Contact us for early access.
                            </p>
                        </div>
                        
                        <div className="relative">
                            <div className="aspect-[9/16] bg-gradient-to-br from-green-500/20 to-teal-600/20 rounded-3xl border border-white/10 p-8">
                                <div className="h-full bg-black/50 rounded-2xl flex items-center justify-center">
                                    <Smartphone className="w-32 h-32 text-green-400/30" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Everything You Need to Run Operations
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            From pre-dawn setup to post-flight paperwork, AeroStatus handles the chaos
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                                        <CardHeader>
                                            <Icon className="w-10 h-10 text-green-400 mb-3" />
                                            <CardTitle className="text-xl text-white">
                                                {feature.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-white/60">
                                                {feature.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Role-Based System */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <Badge variant="outline" className="text-green-400 border-green-400/30 mb-6">
                                Smart Permissions
                            </Badge>
                            <h2 className="text-4xl font-gelica font-bold text-white mb-6">
                                Role-Based Access Control
                            </h2>
                            <p className="text-lg text-white/70 mb-8">
                                Everyone sees what they need, nothing more. From owners to crew, 
                                each role has tailored access to features and information.
                            </p>
                            
                            <div className="space-y-3">
                                {roles.map((role) => (
                                    <div key={role.name} className="flex items-center gap-3">
                                        <ChevronRight className="w-5 h-5 text-green-400" />
                                        <div>
                                            <span className="text-white font-medium">{role.name}:</span>
                                            <span className="text-white/60 ml-2">{role.description}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <Card className="bg-white/5 border-white/10 p-6">
                                <Database className="w-8 h-8 text-green-400 mb-3" />
                                <h3 className="text-lg font-gelica text-white mb-2">15+ Tables</h3>
                                <p className="text-sm text-white/60">Comprehensive data structure</p>
                            </Card>
                            <Card className="bg-white/5 border-white/10 p-6">
                                <Shield className="w-8 h-8 text-green-400 mb-3" />
                                <h3 className="text-lg font-gelica text-white mb-2">Row-Level Security</h3>
                                <p className="text-sm text-white/60">Data isolation by operation</p>
                            </Card>
                            <Card className="bg-white/5 border-white/10 p-6">
                                <Zap className="w-8 h-8 text-green-400 mb-3" />
                                <h3 className="text-lg font-gelica text-white mb-2">Real-time Sync</h3>
                                <p className="text-sm text-white/60">Instant updates across devices</p>
                            </Card>
                            <Card className="bg-white/5 border-white/10 p-6">
                                <Clock className="w-8 h-8 text-green-400 mb-3" />
                                <h3 className="text-lg font-gelica text-white mb-2">Auto Archive</h3>
                                <p className="text-sm text-white/60">Daily logs at 5 PM</p>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Different */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Built Where the Work Happens
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Not another app designed in an office. AeroStatus was built in the field, 
                            refined at 4 AM launches, and tested when everything goes wrong.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="bg-gradient-to-br from-green-900/20 to-teal-900/20 border-green-500/30">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-gelica text-white mb-4">
                                    Offline First
                                </h3>
                                <p className="text-white/70 mb-4">
                                    Built for fields without cell towers. Critical features work offline, 
                                    sync when you&apos;re back in range.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm text-white/60">
                                        <Check className="w-4 h-4 text-green-400" />
                                        Offline log entries
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-white/60">
                                        <Check className="w-4 h-4 text-green-400" />
                                        Local schedule cache
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-white/60">
                                        <Check className="w-4 h-4 text-green-400" />
                                        Automatic sync queue
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-green-900/20 to-teal-900/20 border-green-500/30">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-gelica text-white mb-4">
                                    Actually Simple
                                </h3>
                                <p className="text-white/70 mb-4">
                                    No manual required. If your crew can use Instagram, they can use AeroStatus. 
                                    Built for speed, not spreadsheets.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm text-white/60">
                                        <Check className="w-4 h-4 text-green-400" />
                                        One-tap check-ins
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-white/60">
                                        <Check className="w-4 h-4 text-green-400" />
                                        Visual checklists
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-white/60">
                                        <Check className="w-4 h-4 text-green-400" />
                                        Smart defaults
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-green-900/20 to-teal-900/20 border-green-500/30">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-gelica text-white mb-4">
                                    Field Tested
                                </h3>
                                <p className="text-white/70 mb-4">
                                    Every feature exists because we needed it. Tested in real operations, 
                                    refined through actual use.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm text-white/60">
                                        <Check className="w-4 h-4 text-green-400" />
                                        100+ flight operations
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-white/60">
                                        <Check className="w-4 h-4 text-green-400" />
                                        20+ crew members
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-white/60">
                                        <Check className="w-4 h-4 text-green-400" />
                                        Real feedback loop
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                        Ready for Operations That Work?
                    </h2>
                    <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
                        AeroStatus is currently in private beta with select operations. 
                        Join the waitlist for early access when we launch.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
                            asChild
                        >
                            <Link href="/work-with-us">
                                Request Beta Access
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10"
                            asChild
                        >
                            <Link href="mailto:info@aerostatic.io">
                                Contact Us
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}