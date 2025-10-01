"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { ExternalLink, ShoppingCart, ArrowRight } from 'lucide-react';

export default function MerchPage() {
    return (
        <div className="min-h-screen bg-black">
            <Header />

            {/* Hero Section */}
            <section className="pt-48 pb-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-yellow-600/10" />

                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto max-w-4xl relative z-10"
                >
                    <div className="text-center">
                        <motion.h1
                            className="text-6xl md:text-7xl lg:text-8xl font-picnic-script font-thin text-white mb-6 tracking-wide"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            Merch
                        </motion.h1>

                        <motion.p
                            className="text-xl md:text-2xl font-sans text-white/70 max-w-3xl mx-auto leading-relaxed mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Every purchase funds the mission. Get your gear and support
                            the future of flight.
                        </motion.p>

                        <motion.p
                            className="text-lg font-sans text-orange-400 max-w-2xl mx-auto mb-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Visit our Fourthwall store for the latest collection
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-lg px-8 py-6"
                                asChild
                            >
                                <a href="https://aerostatic-shop.fourthwall.com/en-usd/collections/all" target="_blank" rel="noopener noreferrer">
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    Shop Now on Fourthwall
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Simple Message Section */}
            <section className="py-20 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="container mx-auto max-w-4xl text-center"
                >
                    <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6">
                        First Generation Collection
                    </Badge>

                    <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-8">
                        All I Need Is A Nap And A Million Dollars
                    </h2>

                    <div className="max-w-3xl mx-auto space-y-6 text-lg font-sans text-white/70 leading-relaxed">
                        <p>
                            The perfect shirt for balloon pilots who start before dawn and dream big.
                            Along with hoodies, hats, and patches from our adventures around the world.
                        </p>
                        <p>
                            We&apos;re not just selling merch. Every dollar goes directly into keeping
                            hot air ballooning alive through technology, media, and experiences.
                        </p>
                        <p className="text-xl text-orange-400 font-picnic italic">
                            Your purchase helps fund our dawn flights and the tools we&apos;re building for the community.
                        </p>
                    </div>

                    <Button
                        size="lg"
                        variant="outline"
                        className="mt-12 border-orange-400/30 text-orange-400 hover:bg-orange-400/10 text-lg px-8"
                        asChild
                    >
                        <a href="https://aerostatic-shop.fourthwall.com/en-usd/collections/all" target="_blank" rel="noopener noreferrer">
                            View Full Collection
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                    </Button>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}