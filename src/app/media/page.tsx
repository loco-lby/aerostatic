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
    ExternalLink
} from "lucide-react";
import Link from "next/link";
import { useContent } from "@/hooks/useContent";
import { motion } from "framer-motion";

// Service types for media production
const mediaServices = [
    {
        id: "documentary",
        title: "Documentary Series",
        description: "Long-form storytelling that captures skills, lifestyles, and disappearing crafts",
        icon: Film,
        features: [
            "Multi-episode productions",
            "Character-driven narratives",
            "4K cinematography",
            "Distribution strategy"
        ]
    },
    {
        id: "branded",
        title: "Branded Campaigns",
        description: "Cinematic content for mission-aligned companies that value authenticity",
        icon: Camera,
        features: [
            "Brand story development",
            "Product integration",
            "Social-first formats",
            "Performance tracking"
        ]
    },
    {
        id: "events",
        title: "Event Coverage",
        description: "From weddings to festivals, we capture the energy while it's happening",
        icon: Video,
        features: [
            "Multi-camera setups",
            "Same-day highlights",
            "Aerial perspectives",
            "Social content packages"
        ]
    },
    {
        id: "field",
        title: "Field Cinematography",
        description: "Remote locations, challenging conditions, stories worth the journey",
        icon: Mountain,
        features: [
            "Adventure documentation",
            "Expedition coverage",
            "Environmental storytelling",
            "Raw, unfiltered approach"
        ]
    }
];

export default function MediaPage() {
    const content = useContent();
    const mediaPillar = content.home.pillars.find(p => p.id === 'media');

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
                    <div className="text-center mb-16">
                        <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6">
                            Media Production
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-gelica font-bold text-white mb-6">
                            Stories That Move
                        </h1>
                        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
                            We chase the light, ride the wind, and tell stories that move — bold, cinematic, and alive.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Services Grid */}
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
                            What We Create
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            From docuseries to branded campaigns, we bring the camera where others don&apos;t
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {mediaServices.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true, margin: "0px" }}
                                >
                                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full group">
                                        <CardHeader>
                                            <Icon className="w-12 h-12 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                                            <CardTitle className="text-2xl font-gelica text-white">
                                                {service.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-white/70 mb-6">
                                                {service.description}
                                            </p>
                                            <ul className="space-y-2">
                                                {service.features.map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                                                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Our Approach */}
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
                            <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                                Not Staged. Not Filtered. Just Real.
                            </h2>
                            <div className="space-y-4 text-lg text-white/70">
                                <p>
                                    We&apos;re not here to stage a version of reality. We&apos;re here to capture it — while it&apos;s still breathing.
                                </p>
                                <p>
                                    Our approach is simple: show up where life is happening, bring the right tools, and let the story unfold.
                                    No manufactured moments, no fake drama. Just the raw energy of real experiences.
                                </p>
                                <p>
                                    Whether it&apos;s a sunrise balloon launch, a craftsman at work, or your brand&apos;s authentic story,
                                    we document what matters — beautifully, honestly, cinematically.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <Card className="bg-white/5 border-white/10 p-6">
                                    <Globe className="w-8 h-8 text-orange-400 mb-3" />
                                    <h3 className="text-lg font-gelica text-white mb-2">Remote Ready</h3>
                                    <p className="text-sm text-white/60">We go where the story is, not where it&apos;s convenient</p>
                                </Card>
                                <Card className="bg-white/5 border-white/10 p-6">
                                    <Users className="w-8 h-8 text-orange-400 mb-3" />
                                    <h3 className="text-lg font-gelica text-white mb-2">Small Crew</h3>
                                    <p className="text-sm text-white/60">Nimble teams that can adapt on the fly</p>
                                </Card>
                            </div>
                            <div className="space-y-4 pt-8">
                                <Card className="bg-white/5 border-white/10 p-6">
                                    <Sparkles className="w-8 h-8 text-orange-400 mb-3" />
                                    <h3 className="text-lg font-gelica text-white mb-2">Cinema Quality</h3>
                                    <p className="text-sm text-white/60">4K, color graded, ready for any screen</p>
                                </Card>
                                <Card className="bg-white/5 border-white/10 p-6">
                                    <Mountain className="w-8 h-8 text-orange-400 mb-3" />
                                    <h3 className="text-lg font-gelica text-white mb-2">Field Tested</h3>
                                    <p className="text-sm text-white/60">Equipment and workflows built for reality</p>
                                </Card>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* Partner With Us Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30">
                        <CardContent className="p-12">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-4">
                                        Brand Partnerships
                                    </Badge>
                                    <h2 className="text-3xl md:text-4xl font-gelica font-bold text-white mb-6">
                                        Partner With Us
                                    </h2>
                                    <p className="text-lg text-white/70 mb-6">
                                        We&apos;re selective about partnerships, but when values align, magic happens.
                                        If your brand shares our commitment to authenticity, adventure, and craft, let&apos;s talk.
                                    </p>
                                    <ul className="space-y-3 mb-8">
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                                            <span className="text-white/80">Access to our engaged adventure community</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                                            <span className="text-white/80">Cinematic content that tells your story</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                                            <span className="text-white/80">Real-world activations and experiences</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="text-center lg:text-right">
                                    <p className="text-white/60 text-sm mb-4">
                                        Current partners include lifestyle brands, adventure companies, and mission-driven organizations.
                                    </p>
                                    <Button
                                        size="lg"
                                        className="bg-white text-black hover:bg-white/90"
                                        asChild
                                    >
                                        <Link href="/partnerships">
                                            Explore Partnership
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                        Ready to Tell Your Story?
                    </h2>
                    <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
                        Whether it&apos;s a documentary, brand campaign, or something that doesn&apos;t fit in a box —
                        if it&apos;s worth capturing, we&apos;re interested.
                    </p>
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                        asChild
                    >
                        <Link href="/work-with-us">
                            Let&apos;s Make Something
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </section>

            <Footer />
        </div>
    );
}