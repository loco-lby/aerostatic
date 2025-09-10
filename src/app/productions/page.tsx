"use client";

import { useState } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import {
    MapPin,
    Calendar,
    Users,
    ArrowRight,
    Palette,
    Wind,
    Camera,
    Award,
    Globe,
    Play,
    Film,
    Video,
    Mountain,
    Star,
    Sparkles,
    ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Featured Productions
const featuredProductions = [
    {
        id: 1,
        title: "Cathedral City Balloon Festival",
        category: "Festival Coverage",
        date: "November 2020-2024",
        location: "Cathedral City, CA",
        description: "Five years of capturing the magic of dawn patrol flights and competitive races in the California desert",
        media: "/videos/your_event.mp4",
        highlights: ["2nd place 2023", "3rd place 2024", "Official media partner"]
    },
    {
        id: 2,
        title: "Singha International Festival",
        category: "International Production",
        date: "February 2020-2024",
        location: "Chiang Rai, Thailand",
        description: "Documenting one of Asia's premier balloon festivals with cinematic storytelling across cultures",
        media: "/videos/thailand.mp4"
    },
    {
        id: 3,
        title: "Burning Man",
        category: "Desert Experience",
        date: "August 2023-2024",
        location: "Black Rock City, NV",
        description: "Hot air balloons meet radical self-expression in the Nevada desert",
        media: "/videos/hero.mp4",
        highlights: ["Sunrise flights over the playa", "Art car collaborations", "Desert documentation"]
    },
    {
        id: 4,
        title: "Balloons Over Bend",
        category: "Brand Activation",
        date: "July 2023-2024",
        location: "Bend, OR",
        description: "Static displays and aerial cinematography showcasing Oregon's natural beauty",
        media: "/videos/hero1.mp4",
        highlights: ["Cascade Mountains backdrop", "Dawn patrol flights", "Community engagement"]
    }
];

// Production Services
const productionServices = [
    {
        id: "events",
        title: "Event Productions",
        subtitle: "From festivals to private gatherings",
        description: "We bring both the spectacle and the documentation. Our balloons become the centerpiece while our cameras capture every moment.",
        icon: Wind,
        services: [
            "Static balloon displays",
            "Tethered ride experiences",
            "Multi-camera event coverage",
            "Same-day highlight reels",
            "Social media content packages"
        ],
        idealFor: "Festivals, Corporate Events, Weddings, Brand Launches"
    },
    {
        id: "documentary",
        title: "Documentary Series",
        subtitle: "Long-form storytelling from the sky",
        description: "Character-driven narratives that explore skills, lifestyles, and disappearing crafts from a unique perspective.",
        icon: Film,
        services: [
            "Multi-episode productions",
            "4K aerial cinematography",
            "Character development",
            "Distribution strategy",
            "Festival submissions"
        ],
        idealFor: "Streaming Platforms, Brand Stories, Cultural Documentation"
    },
    {
        id: "branded",
        title: "Branded Campaigns",
        subtitle: "Authentic content for mission-aligned brands",
        description: "Put your brand literally and figuratively in the sky with custom balloon branding and cinematic production.",
        icon: Camera,
        services: [
            "Custom balloon branding",
            "Product integration",
            "Influencer collaborations",
            "Performance tracking",
            "Multi-platform delivery"
        ],
        idealFor: "Product Launches, Brand Awareness, Content Marketing"
    },
    {
        id: "field",
        title: "Expedition Coverage",
        subtitle: "Remote locations, challenging conditions",
        description: "From desert races to mountain expeditions, we document adventures worth the journey.",
        icon: Mountain,
        services: [
            "Adventure documentation",
            "Environmental storytelling",
            "Remote location expertise",
            "Raw documentary approach",
            "Expedition planning support"
        ],
        idealFor: "Adventure Brands, Environmental Causes, Extreme Sports"
    }
];

// Production Process
const productionProcess = [
    {
        step: 1,
        title: "Discovery",
        description: "We learn your story, goals, and vision"
    },
    {
        step: 2,
        title: "Pre-Production",
        description: "Location scouting, permits, and creative development"
    },
    {
        step: 3,
        title: "Production",
        description: "Boots on the ground, balloons in the air, cameras rolling"
    },
    {
        step: 4,
        title: "Post-Production",
        description: "Edit, color, sound design, and final delivery"
    },
    {
        step: 5,
        title: "Distribution",
        description: "Strategic release across platforms for maximum impact"
    }
];

export default function ProductionsPage() {
    const [selectedProduction, setSelectedProduction] = useState<number | null>(null);
    const [hoveredService, setHoveredService] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-black">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-600/10" />
                
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
                            Productions
                        </motion.h1>
                        <motion.p 
                            className="text-xl md:text-2xl font-sans text-white/70 max-w-4xl mx-auto leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Where hot air balloons meet Hollywood. We bring the spectacle, 
                            capture the magic, and deliver stories that rise above the ordinary.
                        </motion.p>
                    </div>

                </motion.div>
            </section>

            {/* Featured Productions */}
            <section id="featured" className="py-20 px-6 bg-white/[0.02]">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-gelica font-bold text-white mb-6 text-center">
                            Featured Work
                        </h2>
                        <p className="text-lg font-sans text-white/60 text-center max-w-3xl mx-auto">
                            From international festivals to intimate gatherings, every production tells a unique story
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {featuredProductions.map((production, index) => (
                            <motion.div
                                key={production.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group h-full overflow-hidden">
                                    <div className="aspect-video relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                                        <video
                                            src={production.media}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <Badge className="bg-black/50 backdrop-blur-sm text-orange-400 border-orange-400/30">
                                                {production.category}
                                            </Badge>
                                        </div>
                                        <div className="absolute bottom-4 left-4 right-4 z-20">
                                            <h3 className="text-2xl font-gelica font-bold text-white mb-1">
                                                {production.title}
                                            </h3>
                                            <div className="flex items-center gap-3 text-sm text-white/80">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {production.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {production.date}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <CardContent className="p-6">
                                        <p className="text-white/70 font-sans mb-4">
                                            {production.description}
                                        </p>
                                        
                                        {production.highlights && (
                                            <div className="space-y-1">
                                                {production.highlights.map((highlight, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm">
                                                        <Star className="w-3 h-3 text-orange-400" />
                                                        <span className="font-sans text-white/60">{highlight}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Production Services */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-gelica font-bold text-white mb-6">
                            What We Do
                        </h2>
                        <p className="text-lg font-sans text-white/60 max-w-3xl mx-auto">
                            Full-service production from pre to post, with hot air balloons as our signature
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {productionServices.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    onMouseEnter={() => setHoveredService(service.id)}
                                    onMouseLeave={() => setHoveredService(null)}
                                >
                                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                                        <CardHeader className="pb-4">
                                            <div className="flex items-start justify-between mb-4">
                                                <Icon className="w-12 h-12 text-orange-400" />
                                                <Sparkles className={`w-6 h-6 text-orange-400 transition-opacity ${hoveredService === service.id ? 'opacity-100' : 'opacity-0'}`} />
                                            </div>
                                            <CardTitle className="text-2xl font-gelica font-bold text-white mb-2">
                                                {service.title}
                                            </CardTitle>
                                            <p className="text-base font-sans text-orange-400">
                                                {service.subtitle}
                                            </p>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-white/70 font-sans mb-6">
                                                {service.description}
                                            </p>
                                            
                                            <div className="space-y-2 mb-6">
                                                {service.services.map((item, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <ChevronRight className="w-4 h-4 text-orange-400 flex-shrink-0" />
                                                        <span className="text-sm font-sans text-white/80">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <div className="pt-4 border-t border-white/10">
                                                <p className="text-xs font-sans text-orange-400/80">
                                                    <span className="font-picnic italic">Ideal for:</span> {service.idealFor}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Production Process */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-gelica font-bold text-white mb-6">
                            Our Process
                        </h2>
                        <p className="text-lg font-sans text-white/60 max-w-3xl mx-auto">
                            From concept to completion, we handle every detail
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Connection Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-orange-400 via-orange-500 to-red-600 hidden md:block" />
                        
                        <div className="space-y-12">
                            {productionProcess.map((item, index) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    <div className="flex-1 text-right md:block hidden">
                                        {index % 2 === 0 && (
                                            <div>
                                                <h3 className="text-2xl font-gelica font-bold text-white mb-2">
                                                    {item.title}
                                                </h3>
                                                <p className="font-sans text-white/70">
                                                    {item.description}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center">
                                            <span className="text-2xl font-gelica font-bold text-white">
                                                {item.step}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1">
                                        <div>
                                            <h3 className="text-2xl font-gelica font-bold text-white mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="font-sans text-white/70">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="container mx-auto max-w-4xl text-center"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-gelica font-bold text-white mb-6">
                        <span className="font-picnic italic font-light text-orange-400">Ready to</span> Create?
                    </h2>
                    <p className="text-lg font-sans text-white/70 mb-8 max-w-2xl mx-auto">
                        Whether you need balloons at your event or stories told from the sky, 
                        let&apos;s make something unforgettable together.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium text-lg px-8"
                            asChild
                        >
                            <Link href="/work-with-us">
                                Start Your Production
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-orange-400/30 text-orange-400 hover:bg-orange-400/10 font-medium text-lg px-8"
                            asChild
                        >
                            <Link href="#featured">
                                View Our Work
                                <Play className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}