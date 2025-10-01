"use client";

import { useState } from 'react';
import { ProductInterestModal } from '@/components/ProductInterestModal';
import { MerchCTA } from '@/components/MerchCTA';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { track } from '@vercel/analytics';
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
import { toast } from 'sonner';

export default function TechnologiesPage() {
    const [hoveredTool, setHoveredTool] = useState<string | null>(null);
    const [toolIdea, setToolIdea] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showInterestModal, setShowInterestModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<{
        id: 'aerostatus' | 'aeronav',
        name: string,
        description: string
    } | null>(null);

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
                .insert([{
                    idea: toolIdea,
                    source: 'technologies_page',
                }]);

            if (error) {
                console.error('Supabase error:', error);
                toast.error("Failed to submit idea. Please try again.");
                return;
            }

            toast.success("Thanks for your idea! We'll review it carefully.");
            track('form_submission', { form: 'tool_suggestion' });
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
            <section className="pt-48 pb-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-pink-600/10" />

                {/* Animated aurora background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-emerald-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-500" />
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

                            Custom tools and cutting-edge tech to keep you on task.
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

                        className="mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-gelica font-bold text-white mb-6 text-center">
                            Our Tools
                        </h2>
                        <p className="text-lg font-sans text-white/60 text-center max-w-3xl mx-auto">
                            No more spreadsheets. No more paper logbooks. No more software that wasn&apos;t built for balloons.
                        </p>
                    </motion.div>

                    {/* Main Tool Cards - Two tools in a row */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
                        {/* AeroStatus Card */}
                        <motion.div

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
                                        Operations management designed for balloon companies. Everything you&apos;re currently doing the hard way—crew scheduling, flight logging, maintenance tracking—finally in one place.
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

                                    <div className="grid grid-cols-2 gap-3">
                                        <Button
                                            asChild
                                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                                        >
                                            <Link href="/technologies/aerostatus">
                                                Join Beta
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setSelectedProduct({
                                                    id: 'aerostatus',
                                                    name: 'AeroStatus',
                                                    description: 'Get early access and help shape the future of balloon operation management.'
                                                });
                                                setShowInterestModal(true);
                                                track('product_interest_click', { product: 'aerostatus' });
                                            }}
                                            variant="outline"
                                            className="border-orange-400/30 text-orange-400 hover:bg-orange-500/10"
                                        >
                                            I&apos;m Interested
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* AeroNav Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
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
                                        AeroNav
                                    </CardTitle>
                                    <p className="text-base font-sans text-orange-400">
                                        Flight Planning & Navigation
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-white/70 font-sans mb-6">
                                        Flight planning and navigation built specifically for balloonists. Real-time weather integration, route planning that understands how balloons actually fly, and tools that keep you safe in the air.
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
                                        onClick={() => {
                                            setSelectedProduct({
                                                id: 'aeronav',
                                                name: 'AeroNav',
                                                description: 'Join the waitlist and be the first to know when we launch our flight planning platform.'
                                            });
                                            setShowInterestModal(true);
                                            track('product_interest_click', { product: 'aeronav' });
                                        }}
                                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                                    >
                                        I&apos;m Interested
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
                                        We build tools that solve our own problems. If you have a pain point that needs solving, we want to hear it.
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
                                If you&apos;re a pilot, operator, or crew member, you know the pain. The spreadsheets. The outdated software. The paper logbooks. The weather apps that weren&apos;t built for balloons. The communication chaos when coordinating a flight.
                            </p>
                            <p>
                                We&apos;re building the tools that should have existed years ago—not to make money, but to remove the friction that keeps people from falling in love with this sport.
                            </p>
                            <p className="text-xl text-orange-400 font-picnic italic">
                                Technology should get you off your phone and into the air.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <MerchCTA />

            <Footer />

            {selectedProduct && (
                <ProductInterestModal
                    isOpen={showInterestModal}
                    onClose={() => {
                        setShowInterestModal(false);
                        setSelectedProduct(null);
                    }}
                    product={selectedProduct.id}
                    productName={selectedProduct.name}
                    productDescription={selectedProduct.description}
                />
            )}
        </div>
    );
}