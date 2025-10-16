"use client";

import { useState } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { FractalsShaders } from "@/components/ui/shadcn-io/fractals-shaders";
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Play,
    Wind,
    Leaf,
    Flame,
    Mountain,
    Globe,
    Heart,
    Users,
    DollarSign,
    ExternalLink,
    ChevronDown
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function GoldilocksPage() {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    // Fundraising stats - update these as campaign progresses
    const GOAL = 250000;
    const CURRENT = 0; // Update this value as donations come in
    const SUPPORTERS = 0; // Update supporter count
    const percentRaised = (CURRENT / GOAL) * 100;

    // Calculate days until Christmas 2026
    const targetDate = new Date('2026-12-25');
    const today = new Date();
    const daysUntilTarget = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return (
        <div className="min-h-screen relative">
            {/* Fractal Background - behind everything */}
            <div className="fixed inset-0 z-0">
                <FractalsShaders
                    speed={0.3}
                    iterations={4}
                    colorShift={0.5}
                    brightness={0.8}
                    zoom={1.0}
                />
                {/* Consistent overlay for readability */}
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 via-transparent to-purple-950/20" />
            </div>

            {/* All content above the background */}
            <div className="relative z-10">
            <Header />

            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 bg-black/65">
                {/* Hero Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative z-20 text-center px-6 max-w-6xl mx-auto"
                >
                    {/* Main Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-gelica font-bold text-white mb-4 tracking-[0.25em] uppercase"
                    >
                        GOLDILOCKS
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-2xl md:text-3xl font-picnic font-light text-orange-400 mb-6"
                    >
                        The Aerostatic Transition
                    </motion.p>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg md:text-xl font-sans font-light italic text-white/80 mb-12 max-w-3xl mx-auto"
                    >
                        A 100,000 cubic foot hot air balloon printed with nature&apos;s fractal geometry.
                        <br className="hidden md:block" />
                        Technology that respects planetary limits.
                    </motion.p>

                    {/* Donation Ticker */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mb-10 max-w-2xl mx-auto"
                    >
                        <Card className="bg-white/5 backdrop-blur-md border-orange-400/30 overflow-hidden">
                            <CardContent className="p-6 md:p-8">
                                {/* Amount Raised */}
                                <div className="mb-6">
                                    <div className="flex items-baseline justify-center gap-3 mb-2">
                                        <span className="text-5xl md:text-6xl font-gelica font-bold text-white">
                                            ${CURRENT.toLocaleString()}
                                        </span>
                                        <span className="text-xl md:text-2xl text-white/60 font-sans">
                                            / ${(GOAL / 1000).toLocaleString()}k
                                        </span>
                                    </div>
                                    <p className="text-orange-400 font-sans text-sm md:text-base">
                                        raised from {SUPPORTERS} supporters
                                    </p>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentRaised}%` }}
                                            transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full"
                                        />
                                    </div>
                                    <p className="text-white/60 text-xs md:text-sm font-sans mt-2">
                                        {percentRaised.toFixed(1)}% of goal reached
                                    </p>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                    <div>
                                        <p className="text-2xl md:text-3xl font-gelica font-bold text-orange-400">
                                            {daysUntilTarget}
                                        </p>
                                        <p className="text-xs md:text-sm text-white/60 font-sans">
                                            Days Until Launch
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-2xl md:text-3xl font-gelica font-bold text-orange-400">
                                            Dec 25
                                        </p>
                                        <p className="text-xs md:text-sm text-white/60 font-sans">
                                            2026 Goal
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium text-lg px-10 h-14 hover:scale-105 transition-transform"
                            asChild
                        >
                            <Link href="#support">
                                Support the Movement
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/10 font-medium text-lg px-10 h-14 hover:scale-105 transition-transform"
                            asChild
                        >
                            <Link href="#story">
                                Watch the Story
                                <Play className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Partnership Credit */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="mt-12 text-white/50 text-sm font-sans"
                    >
                        A collaboration between <span className="text-orange-400 font-semibold">Aerostatic</span> &amp;{' '}
                        <span className="text-orange-400 font-semibold">Fractal Foundation</span>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    >
                        <ChevronDown className="w-8 h-8 text-white/50 animate-bounce" />
                    </motion.div>
                </motion.div>
            </section>

            {/* MISSION STATEMENT SECTION */}
            <section className="py-20 md:py-32 px-6 bg-black/65">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                        {/* Left Column - The Problem */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="inline-block">
                                <Badge className="bg-red-500/20 text-red-400 border-red-400/30 text-sm px-4 py-1 mb-4">
                                    THE CRISIS
                                </Badge>
                            </div>

                            <div className="space-y-4 text-white/80 font-sans leading-relaxed">
                                <p>
                                    For billions of years, Earth&apos;s biosphere has been autopoietic—
                                    self-creating, self-maintaining, never undermining the conditions
                                    it needs to survive.
                                </p>
                                <p className="text-xl text-white font-medium">
                                    Then we invented the technosphere.
                                </p>
                                <p>
                                    In just 200 years, we built machines and systems that are
                                    actively destroying the planetary conditions they depend on.
                                </p>
                                <p className="text-lg text-red-400 font-medium">
                                    Climate collapse. Ecosystem breakdown.
                                </p>
                                <p>
                                    This is what astrophysicist Adam Frank calls an{' '}
                                    <span className="text-orange-400 font-semibold italic">immature technosphere</span>
                                    : technology that&apos;s killing itself and us in the process.
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Column - The Solution */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="inline-block">
                                <Badge className="bg-green-500/20 text-green-400 border-green-400/30 text-sm px-4 py-1 mb-4">
                                    THE ANSWER
                                </Badge>
                            </div>

                            <div className="space-y-4 text-white/80 font-sans leading-relaxed">
                                <p>
                                    A mature technosphere would work like the biosphere—in balance
                                    with the planet. Regenerative. Sustainable across geological
                                    timescales.
                                </p>
                                <p>
                                    We&apos;re not there yet. But someone has to start practicing it.
                                </p>
                                <p className="text-xl text-white font-medium">
                                    Meet Goldilocks.
                                </p>
                                <p>
                                    A 100,000 cubic foot hot air balloon printed with nature&apos;s own
                                    geometry. Fractals—the same patterns you see in mycelial networks,
                                    rivers, trees, lightning, and coastlines—now flying through the sky.
                                </p>
                                <p className="text-lg text-orange-400 font-medium">
                                    It&apos;s not just art. It&apos;s a statement printed 10 stories tall that
                                    says technology can remember where it came from.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* GOLDILOCKS PRINCIPLE SECTION */}
            <section className="py-20 md:py-32 px-6 bg-black/65">
                <div className="container mx-auto max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-gelica font-bold text-white mb-8">
                            WHY &quot;GOLDILOCKS&quot;?
                        </h2>
                        <p className="text-xl text-orange-400 font-picnic italic">
                            Because we&apos;re done pretending technology can ignore planetary limits
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-6 text-white/80 font-sans text-lg leading-relaxed"
                    >
                        <p className="text-xl text-white font-semibold">
                            Earth exists in a Goldilocks Zone.
                        </p>
                        <p>
                            Not too hot. Not too cold. Not too acidic. Not too much CO₂. Not too little oxygen.
                            An impossibly narrow band where everything has to be <span className="text-orange-400 font-semibold">just right</span> for life to exist.
                        </p>
                        <p className="text-xl text-red-400 font-medium">
                            Right now, we&apos;re pushing ourselves out of that zone.
                        </p>
                        <p>
                            And yet most technology acts like limits don&apos;t exist. Infinite growth. Unlimited extraction.
                            Move fast and break things—including the atmosphere.
                        </p>
                        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/40 rounded-lg p-8 my-8">
                            <p className="text-xl text-white font-semibold mb-4">
                                Goldilocks the balloon refuses to play that game.
                            </p>
                            <p className="text-white/90">
                                Yes, it burns propane. Yes, it has a carbon footprint. We&apos;re not hiding from that.
                                But it <span className="text-orange-400 font-semibold">only flies when conditions are just right</span>.
                            </p>
                            <p className="text-white/90 mt-4">
                                Too much wind? Grounded. Wrong temperature? Grounded. Unstable air? Grounded.
                            </p>
                            <p className="text-white/90 mt-4">
                                It <span className="text-orange-400 font-semibold">respects its constraints</span>. It works <span className="text-orange-400 font-semibold">with</span> the
                                atmosphere, not against it. It knows its limits—and thrives within them.
                            </p>
                        </div>
                        <p className="text-2xl text-white font-semibold text-center py-6">
                            That&apos;s the future we&apos;re building toward.
                        </p>
                        <p className="text-center">
                            Technology that doesn&apos;t fight nature. Technology that learns from 4 billion years
                            of biological evolution. Technology that understands: <span className="text-orange-400 font-semibold italic">the limits aren&apos;t bugs, they&apos;re features</span>.
                        </p>
                        <p className="text-xl text-white text-center font-medium pt-8">
                            And when we operate within those limits?
                        </p>
                        <p className="text-2xl text-orange-400 text-center font-bold font-picnic italic">
                            Magic happens.
                        </p>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-8">
                            <p className="text-white/70 text-center italic">
                                Goldilocks isn&apos;t just a balloon. It&apos;s a 10-story billboard that says: <span className="text-white font-semibold">we can do better</span>.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FRACTAL PHILOSOPHY SECTION */}
            <section className="py-20 md:py-32 px-6 bg-black/65">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-gelica font-bold text-white mb-6">
                            WHY FRACTALS?
                        </h2>
                        <p className="text-xl text-orange-400 font-picnic italic">
                            Because nature invented them first
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Leaf,
                                title: "Nature's Pattern",
                                description: "Fractals appear everywhere in nature—from the branching of trees to the structure of your lungs, from river deltas to lightning strikes. They're nature's solution to infinite complexity with finite rules."
                            },
                            {
                                icon: Mountain,
                                title: "100 Billion Pixels",
                                description: "Kubicek's printing technology can render 100 billion pixels on this balloon. That's roughly the same order of magnitude as atoms in a human cell, stars in the Milky Way galaxy, or neurons firing in your brain as you read this."
                            },
                            {
                                icon: Globe,
                                title: "Self-Similar Beauty",
                                description: "Zoom in or out, the pattern repeats. Fractals teach us that the same principles work at every scale—from mycorrhizal networks to galaxy clusters. As above, so below."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                                    <CardHeader>
                                        <item.icon className="w-12 h-12 text-orange-400 mb-4" />
                                        <CardTitle className="text-2xl font-gelica text-white">
                                            {item.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-white/70 font-sans leading-relaxed">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center"
                    >
                        <div className="bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-400/30 rounded-lg p-10 max-w-4xl mx-auto">
                            <p className="text-xl md:text-2xl text-white/90 font-sans leading-relaxed">
                                <span className="text-orange-400 font-bold">Goldilocks</span> wears a <span className="text-orange-400 font-bold">Mandelbox fractal</span>—
                                a 3D mathematical structure that looks like something alive. It&apos;s computational geometry printed
                                on fabric, floating through Earth&apos;s atmosphere.
                            </p>
                            <p className="text-lg text-white/70 mt-6 italic">
                                Technology paying homage to the patterns that built this planet.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* THE STORY SECTION */}
            <section id="story" className="py-20 md:py-32 px-6 bg-black/65">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-gelica font-bold text-white mb-6">
                            THE STORY
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto font-sans">
                            How we&apos;re building a statement about technology, sustainability,
                            and what it means to fly responsibly
                        </p>
                    </motion.div>

                    {/* Video Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="aspect-video bg-gradient-to-br from-orange-900/20 to-purple-900/20 rounded-lg overflow-hidden mb-12 flex items-center justify-center border border-white/10"
                    >
                        <div className="text-center">
                            <Play className="w-20 h-20 text-white/50 mx-auto mb-4" />
                            <p className="text-white/50 font-sans">Video coming soon</p>
                        </div>
                    </motion.div>

                    {/* Story Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto space-y-6 text-white/80 font-sans text-lg leading-relaxed"
                    >
                        <p className="text-xl text-white">
                            What if a balloon could be a statement?
                        </p>
                        <p>
                            Goldilocks is being manufactured by Kubicek—one of the world&apos;s premier
                            balloon makers—custom-built to carry a message 10 stories tall.
                        </p>
                        <p>
                            We&apos;re printing it with a <span className="text-orange-400 font-semibold">Mandelbox fractal</span>—a
                            geometric pattern that echoes the structures you see everywhere in nature.
                            Mycelial networks. River deltas. Lightning. Coastlines. The same mathematics
                            that built this planet, now floating through Earth&apos;s atmosphere.
                        </p>
                        <p className="text-xl text-white font-semibold">
                            This isn&apos;t just decoration. It&apos;s a declaration.
                        </p>
                        <p>
                            We named it Goldilocks because it only flies when conditions are just right.
                            No fighting the wind. No forcing it. It respects planetary constraints—the same
                            ones keeping all of us alive.
                        </p>
                        <p className="text-orange-400 italic text-lg">
                            Respect the limits. Work within the constraints. Fly beautifully anyway.
                        </p>
                        <div className="bg-white/5 border border-orange-400/30 rounded-lg p-6 mt-8">
                            <p className="text-white/90">
                                <span className="text-orange-400 font-semibold">And this is just the beginning.</span> Goldilocks
                                is the first. If this campaign succeeds, it proves there&apos;s appetite for technology
                                that respects nature—and we&apos;ll build more.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* TECHNICAL SPECS SECTION */}
            <section className="py-20 md:py-32 px-6 bg-black/65">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-gelica font-bold text-white mb-6">
                            TECHNICAL SPECS
                        </h2>
                        <p className="text-xl text-white/70 font-sans">
                            Because the details matter
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: "Volume", value: "100,000 cu ft", icon: Wind },
                            { label: "Height", value: "~100 feet", icon: Mountain },
                            { label: "Fuel", value: "Propane (LPG)", icon: Flame },
                            { label: "Pattern", value: "Mandelbox Fractal", icon: Globe }
                        ].map((spec, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 text-center h-full">
                                    <CardHeader>
                                        <spec.icon className="w-10 h-10 text-orange-400 mx-auto mb-2" />
                                        <p className="text-sm text-white/60 font-sans uppercase tracking-wider">
                                            {spec.label}
                                        </p>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-2xl font-gelica font-bold text-white">
                                            {spec.value}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="mt-12 bg-white/5 border border-white/10 rounded-lg p-8"
                    >
                        <h3 className="text-2xl font-gelica font-bold text-white mb-4">
                            The Honest Truth About Impact
                        </h3>
                        <div className="space-y-4 text-white/70 font-sans leading-relaxed">
                            <p>
                                Yes, Goldilocks burns propane. A typical flight uses 30-40 gallons,
                                emitting roughly 600-800 lbs of CO₂.
                            </p>
                            <p>
                                We&apos;re not claiming this is carbon-neutral. It&apos;s not. But it&apos;s also not
                                about perfection—it&apos;s about <span className="text-orange-400 font-semibold">direction</span>.
                            </p>
                            <p>
                                We fly only when atmospheric conditions allow—not when we want to, but when
                                the planet permits. We use every flight as an opportunity to start conversations
                                about what a mature technosphere could look like.
                            </p>
                            <p>
                                We&apos;re building this with Kubicek, a manufacturer known for quality and longevity.
                                This balloon is meant to fly for decades, not be disposable technology.
                            </p>
                            <p className="text-white text-lg">
                                We&apos;re practicing what we preach: technology that respects limits and
                                works within them. And if Goldilocks proves the concept, we&apos;ll build more.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SUPPORT SECTION */}
            <section id="support" className="py-20 md:py-32 px-6 bg-black/65">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-gelica font-bold text-white mb-6">
                            SUPPORT THE MOVEMENT
                        </h2>
                        <p className="text-xl text-white/80 max-w-3xl mx-auto font-sans leading-relaxed">
                            Goldilocks flies because of people who believe technology can learn from nature.
                            Every flight is funded by community support.
                        </p>
                    </motion.div>

                    {/* Fundraising Tiers */}
                    <div className="space-y-6 mb-16">
                        {/* $10 Tier - Mycelium Supporter */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-orange-400/30 transition-all duration-300">
                                <CardContent className="p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-3xl font-gelica font-bold text-orange-400">$10</span>
                                                <h3 className="text-2xl font-gelica font-bold text-white">Mycelium Supporter</h3>
                                            </div>
                                            <p className="text-white/70 font-sans text-sm mb-3">
                                                <span className="text-orange-400 font-semibold">Sticker</span> • Digital supporter badge • Quarterly updates • Vote on design elements • Supporter-only community access
                                            </p>
                                        </div>
                                        <Button
                                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white md:min-w-[140px]"
                                            asChild
                                        >
                                            <Link href="/work-with-us">
                                                Support
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* $50 Tier - Fractal Friend */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-orange-400/30 transition-all duration-300">
                                <CardContent className="p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-3xl font-gelica font-bold text-orange-400">$50</span>
                                                <h3 className="text-2xl font-gelica font-bold text-white">Fractal Friend</h3>
                                            </div>
                                            <p className="text-white/70 font-sans text-sm mb-3">
                                                <span className="text-orange-400 font-semibold">Enamel pin</span> • All previous benefits • Exclusive behind-the-scenes videos • Early documentary access • Monthly team video calls • Digital wallpaper pack
                                            </p>
                                        </div>
                                        <Button
                                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white md:min-w-[140px]"
                                            asChild
                                        >
                                            <Link href="/work-with-us">
                                                Support
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* $100 Tier - Pattern Keeper (MOST POPULAR) */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-orange-500/10 border-orange-400/50 hover:bg-orange-500/15 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-4 right-4">
                                    <Badge className="bg-orange-500 text-white border-none">MOST POPULAR</Badge>
                                </div>
                                <CardContent className="p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-3xl font-gelica font-bold text-orange-400">$100</span>
                                                <h3 className="text-2xl font-gelica font-bold text-white">Pattern Keeper</h3>
                                            </div>
                                            <p className="text-white/70 font-sans text-sm mb-3">
                                                <span className="text-orange-400 font-semibold">T-shirt + Sticker + Pin</span> • All previous benefits • Design selection vote • Name in documentary credits • Virtual launch party invite
                                            </p>
                                        </div>
                                        <Button
                                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white md:min-w-[140px]"
                                            asChild
                                        >
                                            <Link href="/work-with-us">
                                                Support
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* $250 Tier - Atmospheric Navigator */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-orange-400/30 transition-all duration-300">
                                <CardContent className="p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-3xl font-gelica font-bold text-orange-400">$250</span>
                                                <h3 className="text-2xl font-gelica font-bold text-white">Atmospheric Navigator</h3>
                                            </div>
                                            <p className="text-white/70 font-sans text-sm mb-3">
                                                <span className="text-orange-400 font-semibold">Hoodie + T-shirt + Sticker + Pin</span> • All previous benefits • Quarterly intimate team calls • 5x voting weight • Personalized thank you video • Signed 18x24&quot; poster • Priority event notifications
                                            </p>
                                        </div>
                                        <Button
                                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white md:min-w-[140px]"
                                            asChild
                                        >
                                            <Link href="/work-with-us">
                                                Support
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* $1,000 Tier - Envelope Etched */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-orange-400/30 transition-all duration-300">
                                <CardContent className="p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-3xl font-gelica font-bold text-orange-400">$1,000</span>
                                                <h3 className="text-2xl font-gelica font-bold text-white">Envelope Etched</h3>
                                            </div>
                                            <p className="text-white/70 font-sans text-sm mb-3">
                                                <span className="text-orange-400 font-semibold">Your name printed on the balloon</span> • Launch event invitations • Lifetime supporter status • Exclusive crew jacket • Personal balloon tour • 30-min private video call
                                            </p>
                                        </div>
                                        <Button
                                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white md:min-w-[140px]"
                                            asChild
                                        >
                                            <Link href="/work-with-us">
                                                Support
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* $5,000 Tier - Glow Sponsor */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-purple-500/10 border-purple-400/30 hover:bg-purple-500/15 transition-all duration-300">
                                <CardContent className="p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-3xl font-gelica font-bold text-purple-400">$5,000</span>
                                                <h3 className="text-2xl font-gelica font-bold text-white">Glow Sponsor</h3>
                                            </div>
                                            <p className="text-white/70 font-sans text-sm mb-3">
                                                <span className="text-purple-400 font-semibold">Sponsor a specific glow event</span> (your name in materials) • VIP crew access experience • Professional photo package • Featured supporter spotlight • Bring guests
                                            </p>
                                        </div>
                                        <Button
                                            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white md:min-w-[140px]"
                                            asChild
                                        >
                                            <Link href="/work-with-us">
                                                Support
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* $10,000 Tier - Home Flight */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-gradient-to-r from-orange-500/20 to-purple-500/20 border-orange-400/50 hover:border-orange-400/70 transition-all duration-300">
                                <CardContent className="p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-4xl font-gelica font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">$10,000</span>
                                                <h3 className="text-2xl font-gelica font-bold text-white">Home Flight</h3>
                                            </div>
                                            <p className="text-white/80 font-sans text-base mb-4">
                                                <span className="text-orange-400 font-bold">We bring Goldilocks to you</span> for a flight or glow event at your location (continental US, travel included within reason)
                                            </p>
                                            <p className="text-white/70 font-sans text-sm">
                                                Private crew experience • Professional 4K video & photo package • Major sponsor recognition • Bring up to 10 guests • Optional brief flight (weather permitting)
                                            </p>
                                        </div>
                                        <Button
                                            className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white md:min-w-[140px]"
                                            asChild
                                        >
                                            <Link href="/work-with-us">
                                                Support
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* $25,000+ Tier - Co-Creator */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 border-yellow-400/50 hover:border-yellow-400/70 transition-all duration-300">
                                <CardContent className="p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-4xl font-gelica font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">$25,000+</span>
                                                <h3 className="text-2xl font-gelica font-bold text-white">Co-Creator</h3>
                                            </div>
                                            <p className="text-white/80 font-sans text-base mb-4">
                                                <span className="text-yellow-400 font-bold">Collaborate on next balloon design</span> • Input on fractal selection, color palette, and aesthetic • Named artistic partner
                                            </p>
                                            <p className="text-white/70 font-sans text-sm">
                                                Advisory role in project direction • Featured prominently in documentary • Multi-event VIP access • Speaking engagement opportunities • Legacy recognition as founding co-creator
                                            </p>
                                        </div>
                                        <Button
                                            className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 hover:from-yellow-600 hover:via-orange-600 hover:to-red-700 text-white md:min-w-[140px]"
                                            asChild
                                        >
                                            <Link href="/work-with-us">
                                                Contact Us
                                                <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Budget Breakdown */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-orange-400/30 rounded-lg p-8"
                    >
                        <h3 className="text-2xl md:text-3xl font-gelica font-bold text-white mb-6 text-center">
                            Where Your Support Goes
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { label: "Balloon Production", amount: "$100,000", description: "Kubicek manufacturing, fractal printing, shipping" },
                                { label: "Lighting System", amount: "$25,000", description: "8 DMX LED lights, controller, installation" },
                                { label: "Operations & Logistics", amount: "$50,000", description: "Transport vehicle, crew training, insurance, fuel" },
                                { label: "Marketing & Media", amount: "$50,000", description: "Documentary production, website, campaign management" },
                                { label: "Carbon Offsetting", amount: "$25,000", description: "Flight tracking system, 5-year offset reserve" }
                            ].map((item, index) => (
                                <div key={index} className="bg-white/5 rounded-lg p-4">
                                    <div className="flex items-baseline justify-between mb-2">
                                        <h4 className="text-lg font-gelica font-bold text-white">{item.label}</h4>
                                        <span className="text-xl font-gelica font-bold text-orange-400">{item.amount}</span>
                                    </div>
                                    <p className="text-sm text-white/60 font-sans">{item.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-6 border-t border-white/10 text-center">
                            <p className="text-sm text-white/70 font-sans">
                                All funds are held in a dedicated account and spent according to this budget. Full financial transparency will be maintained throughout the campaign.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FINAL CTA SECTION */}
            <section className="py-20 px-6 bg-black/65">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="container mx-auto max-w-4xl text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-8">
                        <span className="font-picnic italic font-light text-orange-400">This is just</span> the beginning
                    </h2>
                    <p className="text-xl text-white/70 font-sans mb-12 leading-relaxed">
                        Goldilocks is a proof of concept. A statement. A reminder that technology
                        doesn&apos;t have to destroy the world—it can learn from it instead.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium text-lg px-10"
                            asChild
                        >
                            <Link href="#support">
                                Support Goldilocks
                                <Heart className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-orange-400/30 text-orange-400 hover:bg-orange-400/10 font-medium text-lg px-10"
                            asChild
                        >
                            <Link href="/work-with-us">
                                Work With Us
                                <ExternalLink className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </section>

            <Footer />
            </div>
        </div>
    );
}
