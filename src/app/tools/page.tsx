"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import {
    ArrowRight,
    Play,
    Film,
    Camera,
    Video,
    Globe,
    Mountain,
    Sparkles,
    Users,
    ExternalLink,
    Package,
    Smartphone,
    Cloud,
    Plane,
    MapPin,
    Calendar,
    Shield,
    MessageSquare,
    Download,
    Check
} from "lucide-react";
import Link from "next/link";
import { useContent } from "@/hooks/useContent";
import { motion } from "framer-motion";

// Tool definitions
const tools = [
    {
        id: "aeromedia",
        title: "AeroMedia",
        tagline: "Turn chaos into stories worth telling",
        description: "Professional media management and delivery platform. Organize, edit, and publish your content faster than ever.",
        icon: Film,
        status: "live",
        href: "/tools/aeromedia",
        features: [
            "Smart media organization",
            "Client delivery portals",
            "Watermarked previews",
            "Secure payment processing"
        ],
        techStack: ["Next.js", "Supabase", "Stripe", "TypeScript"],
        color: "from-orange-500 to-red-600"
    },
    {
        id: "travelpact",
        title: "TravelPact",
        tagline: "Travel planning & connection tracking made simple",
        description: "Comprehensive platform combining AI-powered trip planning with global connection tracking. Interactive maps, smart packing lists, and a 3D globe to visualize your travel network.",
        icon: MapPin,
        status: "live",
        href: "https://travelpact.io",
        external: true,
        features: [
            "Interactive route planning with AI assistant",
            "Smart packing lists with CSV import/export",
            "Document hub with AI learning",
            "3D global connection tracking",
            "Automatic travel timelines from photos"
        ],
        techStack: ["Next.js", "Supabase", "Mapbox", "OpenAI", "Three.js"],
        color: "from-blue-500 to-purple-600"
    },
    {
        id: "aerostatus",
        title: "AeroStatus",
        tagline: "Operations software that survives reality",
        description: "Built for balloon operations but works for any field team. Real-time coordination, equipment tracking, and digital checklists.",
        icon: Smartphone,
        status: "beta",
        href: "/tools/aerostatus",
        features: [
            "Real-time crew coordination",
            "Equipment tracking",
            "Digital checklists",
            "Works offline"
        ],
        techStack: ["React Native", "Expo", "Supabase", "TypeScript"],
        color: "from-green-500 to-teal-600",
        platforms: ["iOS", "Android"]
    }
];

export default function ToolsPage() {
    const content = useContent();

    return (
        <div className="min-h-screen bg-black">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-600/10" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto max-w-7xl relative z-10"
                >
                    <div className="text-center mb-16">
                        <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6">
                            Field-Tested Software
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-gelica font-bold text-white mb-6">
                            Tools That Work
                        </h1>
                        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
                            Built in the field, not the boardroom. Software that handles real operations, 
                            tested at 4AM launches and equipment failures.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Tools Grid */}
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
                            Our Software Suite
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Three flagship tools, each solving real problems we face every day
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {tools.map((tool, index) => {
                            const Icon = tool.icon;
                            return (
                                <motion.div
                                    key={tool.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full group relative overflow-hidden">
                                        {/* Gradient accent */}
                                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.color}`} />
                                        
                                        <CardHeader className="pb-4">
                                            <div className="flex items-start justify-between mb-4">
                                                <Icon className="w-12 h-12 text-orange-400 group-hover:scale-110 transition-transform" />
                                                <Badge 
                                                    variant={tool.status === 'live' ? 'default' : 'outline'}
                                                    className={tool.status === 'live' 
                                                        ? 'bg-green-500/20 text-green-400 border-green-400/30' 
                                                        : 'text-yellow-400 border-yellow-400/30'
                                                    }
                                                >
                                                    {tool.status === 'live' ? 'Live' : 'Beta'}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-2xl font-gelica text-white mb-2">
                                                {tool.title}
                                            </CardTitle>
                                            <p className="text-lg text-orange-400 font-medium">
                                                {tool.tagline}
                                            </p>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <p className="text-white/70">
                                                {tool.description}
                                            </p>
                                            
                                            <ul className="space-y-2">
                                                {tool.features.map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                                                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>

                                            {tool.platforms && (
                                                <div className="flex gap-2">
                                                    {tool.platforms.map(platform => (
                                                        <Badge 
                                                            key={platform}
                                                            variant="outline" 
                                                            className="text-white/60 border-white/20"
                                                        >
                                                            {platform}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="pt-4">
                                                <Button
                                                    className={`w-full bg-gradient-to-r ${tool.color} hover:opacity-90 text-white font-medium`}
                                                    asChild
                                                >
                                                    <Link 
                                                        href={tool.href}
                                                        target={tool.external ? "_blank" : undefined}
                                                        rel={tool.external ? "noopener noreferrer" : undefined}
                                                    >
                                                        {tool.status === 'live' ? 'Access Now' : 'Join Beta'}
                                                        {tool.external ? (
                                                            <ExternalLink className="ml-2 w-4 h-4" />
                                                        ) : (
                                                            <ArrowRight className="ml-2 w-4 h-4" />
                                                        )}
                                                    </Link>
                                                </Button>
                                            </div>

                                            <div className="pt-4 border-t border-white/10">
                                                <p className="text-xs text-white/40 mb-2">Built with:</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {tool.techStack.map(tech => (
                                                        <span 
                                                            key={tech}
                                                            className="text-xs px-2 py-1 bg-white/5 rounded text-white/50"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Tech Philosophy */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6">
                                Our Approach
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                                Built By Operators, For Operators
                            </h2>
                            <div className="space-y-4 text-lg text-white/70">
                                <p>
                                    We&apos;re not consultants pitching solutions. We&apos;re the ones in the field at dawn, 
                                    dealing with equipment failures, coordinating crews, and managing media chaos.
                                </p>
                                <p>
                                    Every feature exists because we needed it. Every workflow is tested in real operations. 
                                    No bloat, no buzzwords, just tools that work when you need them.
                                </p>
                                <p>
                                    From hot air balloon operations to adventure filmmaking, our software handles the 
                                    unpredictable reality of field work.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <Card className="bg-white/5 border-white/10 p-6">
                                    <Shield className="w-8 h-8 text-orange-400 mb-3" />
                                    <h3 className="text-lg font-gelica text-white mb-2">Field Tested</h3>
                                    <p className="text-sm text-white/60">Every feature proven in real operations</p>
                                </Card>
                                <Card className="bg-white/5 border-white/10 p-6">
                                    <Cloud className="w-8 h-8 text-orange-400 mb-3" />
                                    <h3 className="text-lg font-gelica text-white mb-2">Offline First</h3>
                                    <p className="text-sm text-white/60">Works when cell towers don&apos;t</p>
                                </Card>
                            </div>
                            <div className="space-y-4 pt-8">
                                <Card className="bg-white/5 border-white/10 p-6">
                                    <Users className="w-8 h-8 text-orange-400 mb-3" />
                                    <h3 className="text-lg font-gelica text-white mb-2">Real Workflows</h3>
                                    <p className="text-sm text-white/60">Designed for how teams actually work</p>
                                </Card>
                                <Card className="bg-white/5 border-white/10 p-6">
                                    <Sparkles className="w-8 h-8 text-orange-400 mb-3" />
                                    <h3 className="text-lg font-gelica text-white mb-2">No Fluff</h3>
                                    <p className="text-sm text-white/60">Features that matter, nothing else</p>
                                </Card>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                        Need Custom Tools?
                    </h2>
                    <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
                        We build software for unique operations. If you&apos;re doing something different 
                        and need tools that actually work, let&apos;s talk.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                            asChild
                        >
                            <Link href="/work-with-us">
                                Build Something Together
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
                                Get In Touch
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}