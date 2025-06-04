"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function WhyHireUsPage() {
    return (
        <div className="min-h-screen bg-slate-900">
            {/* Hero Section */}
            <div className="relative h-screen">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-slate-900/70" />
                </div>
                <div className="relative container mx-auto px-4 h-full flex items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-7xl font-bold text-white mb-8">
                            Transforming Spaces into{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                                Magical Realms
                            </span>
                        </h1>
                        <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
                            We don&apos;t just show up with a balloon. We craft experiences that become the stories people tell for years.
                        </p>
                        <Link
                            href="/hire-us"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-200"
                        >
                            Let&apos;s Create Magic Together
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-20 bg-slate-900/50 border-y border-slate-800">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-center"
                        >
                            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                                500+
                            </div>
                            <div className="text-gray-400">Events Transformed</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-center"
                        >
                            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 mb-4">
                                98%
                            </div>
                            <div className="text-gray-400">Client Satisfaction</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="text-center"
                        >
                            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                                10+
                            </div>
                            <div className="text-gray-400">Years of Innovation</div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="py-20 bg-slate-900">
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center text-white mb-16"
                    >
                        Why Choose{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                            Aerostatic
                        </span>
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                title: "Innovative Designs",
                                description: "Our creations push the boundaries of balloon artistry, combining traditional techniques with cutting-edge design concepts.",
                                icon: "✨"
                            },
                            {
                                title: "Premium Quality",
                                description: "We use only the highest quality materials, ensuring your installations look perfect throughout your entire event.",
                                icon: "💎"
                            },
                            {
                                title: "Expert Team",
                                description: "Our artists bring years of experience and a passion for creating unforgettable experiences.",
                                icon: "👥"
                            },
                            {
                                title: "Custom Solutions",
                                description: "Every design is tailored to your specific vision, venue, and event theme.",
                                icon: "🎨"
                            },
                            {
                                title: "Timely Delivery",
                                description: "We pride ourselves on punctuality and professional installation, ensuring your event starts without a hitch.",
                                icon: "⏰"
                            },
                            {
                                title: "Eco-Conscious",
                                description: "We&apos;re committed to sustainable practices, using biodegradable materials whenever possible.",
                                icon: "🌱"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-purple-500/50 transition-colors"
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 bg-gradient-to-br from-purple-900/50 via-slate-900 to-blue-900/50">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto"
                    >
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Ready to Elevate Your Event?
                        </h2>
                        <p className="text-gray-300 mb-8">
                            Let&apos;s create something extraordinary together. Our team is ready to bring your vision to life.
                        </p>
                        <Link
                            href="/hire-us"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-200"
                        >
                            Get Started Today
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
} 