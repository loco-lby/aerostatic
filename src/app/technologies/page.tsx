"use client";

import { useState } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Camera,
    BarChart,
    Layers,
    Plane,
    Lightbulb,
    Shield,
    Zap,
    Globe,
    ExternalLink,
    CheckCircle,
    Send
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function TechnologiesPage() {
    const [hoveredTool, setHoveredTool] = useState<string | null>(null);
    const [toolIdea, setToolIdea] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleToolIdeaSubmit = async () => {
        if (!toolIdea.trim()) {
            toast.error("Please enter your tool idea");
            return;
        }

        setIsSubmitting(true);
        try {
            const supabase = createClient();
            const { error } = await supabase
                .from('tool_suggestions')
                .insert({
                    idea: toolIdea,
                    source: 'technologies_page'
                });

            if (error) throw error;

            toast.success("Thanks for your idea! We'll review it carefully.");
            setToolIdea('');
        } catch (error) {
            console.error('Error submitting tool idea:', error);
            toast.error("Failed to submit idea. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-600/10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,146,60,0.1),transparent_50%)]" />
                </div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto max-w-7xl relative z-10"
                >
                    <div className="text-center">
                        <motion.h1 
                            className="text-6xl md:text-7xl lg:text-8xl font-picnic-script font-thin text-white mb-6 tracking-wide"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            Technologies
                        </motion.h1>
                        <motion.p 
                            className="text-xl md:text-2xl font-sans text-white/70 max-w-4xl mx-auto leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Building the future of aerial media production. 
                            Custom tools, cutting-edge tech, and innovations that push boundaries.
                        </motion.p>
                    </div>

                    {/* Tech Philosophy */}
                    <motion.div 
                        className="grid md:grid-cols-3 gap-8 mt-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {[
                            { 
                                icon: Zap, 
                                title: "Performance", 
                                description: "Lightning-fast tools that work at the speed of creativity" 
                            },
                            { 
                                icon: Shield, 
                                title: "Security", 
                                description: "Enterprise-grade protection for your media and data" 
                            },
                            { 
                                icon: Globe, 
                                title: "Accessibility", 
                                description: "Tools that work anywhere, on any device, for everyone" 
                            }
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <item.icon className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                                <h3 className="text-xl font-gelica font-bold text-white mb-2">{item.title}</h3>
                                <p className="font-sans text-white/60 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* Main Tools Section */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-gelica font-bold text-white mb-6 text-center">
                            Our Tools
                        </h2>
                        <p className="text-lg font-sans text-white/60 text-center max-w-3xl mx-auto">
                            Purpose-built platforms that solve real problems for creators and event organizers
                        </p>
                    </motion.div>

                    {/* Main Tool Cards - Three tools in a row */}
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {/* TravelPact Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                                <CardHeader>
                                    <div className="flex items-start justify-between mb-4">
                                        <Plane className="w-12 h-12 text-orange-400" />
                                        <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                                            live
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-2xl font-gelica font-bold text-white mb-2">
                                        TravelPact
                                    </CardTitle>
                                    <p className="text-base font-sans text-orange-400">
                                        Travel Planning & Connection Tracking
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white/70 font-sans mb-6">
                                        Comprehensive travel platform combining interactive trip planning with AI assistance and global connection tracking. Turn overwhelming travel planning into seamless adventures.
                                    </p>
                                    
                                    <div className="space-y-2 mb-6">
                                        {[
                                            "Interactive route planning with maps",
                                            "AI travel assistant with document learning",
                                            "Smart packing lists with CSV import",
                                            "3D global connection tracking",
                                            "Automatic travel timelines from photos"
                                        ].map((feature, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                                <span className="text-sm font-sans text-white/80">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        asChild
                                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                                    >
                                        <Link href="https://travelpact.io" target="_blank" rel="noopener noreferrer">
                                            Visit TravelPact
                                            <ExternalLink className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* AeroStatus Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                                <CardHeader>
                                    <div className="flex items-start justify-between mb-4">
                                        <BarChart className="w-12 h-12 text-orange-400" />
                                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/30">
                                            beta
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-2xl font-gelica font-bold text-white mb-2">
                                        AeroStatus
                                    </CardTitle>
                                    <p className="text-base font-sans text-orange-400">
                                        Balloon Operation Management
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white/70 font-sans mb-6">
                                        Complete balloon operation management platform with advanced scheduling and real-time team coordination.
                                    </p>
                                    
                                    <div className="space-y-2 mb-6">
                                        {[
                                            "Advanced scheduling system",
                                            "Employee message log",
                                            "Equipment checklists",
                                            "Ticket management",
                                            "Equipment checkouts"
                                        ].map((feature, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                                <span className="text-sm font-sans text-white/80">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <Button 
                                        asChild
                                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                                    >
                                        <Link href="/tools/aerostatus">
                                            Join Beta
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* AeroKnot Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                                <CardHeader>
                                    <div className="flex items-start justify-between mb-4">
                                        <Layers className="w-12 h-12 text-orange-400" />
                                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">
                                            in development
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-2xl font-gelica font-bold text-white mb-2">
                                        AeroKnot
                                    </CardTitle>
                                    <p className="text-base font-sans text-orange-400">
                                        Flight Planning & Navigation
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white/70 font-sans mb-6">
                                        Comprehensive flight planning and navigation app with integrated crew coordination for aerial operations.
                                    </p>
                                    
                                    <div className="space-y-2 mb-6">
                                        {[
                                            "Flight route planning",
                                            "Weather integration",
                                            "Crew coordination",
                                            "NOTAMs & TFRs",
                                            "Fuel calculations"
                                        ].map((feature, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                                <span className="text-sm font-sans text-white/80">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <Button 
                                        disabled
                                        className="w-full bg-white/10 text-white/50 cursor-not-allowed"
                                    >
                                        Coming Soon
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Idea Submission Card - Now standalone below the tools */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto"
                    >
                        <Card className="bg-gradient-to-br from-orange-500/10 to-red-600/10 border-orange-400/20 hover:border-orange-400/30 transition-all duration-300">
                            <CardHeader>
                                <div className="flex items-center justify-center gap-4 mb-4">
                                    <Lightbulb className="w-10 h-10 text-orange-400" />
                                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-400/30">
                                        contribute
                                    </Badge>
                                </div>
                                <CardTitle className="text-2xl font-gelica font-bold text-white text-center">
                                    Your Idea Here
                                </CardTitle>
                                <p className="text-base font-sans text-orange-400 text-center">Suggest a utility-first tool</p>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <p className="text-white/70 font-sans text-center">
                                        Have an idea for a tool that would save you time? We&apos;d love to hear it!
                                    </p>
                                    <Textarea
                                        placeholder="What tool would save you time? Describe your idea..."
                                        value={toolIdea}
                                        onChange={(e) => setToolIdea(e.target.value)}
                                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40 resize-none h-24"
                                    />
                                    <Button 
                                        onClick={handleToolIdeaSubmit}
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit Idea"}
                                        <Send className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* The Aerostatic Approach */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6">
                            Our Philosophy
                        </Badge>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-gelica font-bold text-white mb-8">
                            The Aerostatic Approach
                        </h2>
                        <div className="max-w-4xl mx-auto space-y-6 text-lg font-sans text-white/70 leading-relaxed">
                            <p>
                                We create utility-first tools that solve our own problems in media and adventure. 
                                We don&apos;t try to build products for the sake of taking money from users.
                            </p>
                            <p>
                                If you have an idea, drop it in the box above and if we think it will save us 
                                and others like us time, we might just build it.
                            </p>
                            <p className="text-xl text-orange-400 font-picnic italic">
                                This is technology made to get you off your phone, 
                                to aid you in seeing the world through a new lens.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}