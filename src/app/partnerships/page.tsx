"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    ArrowRight,
    Handshake,
    Camera,
    Target,
    Users,
    Award,
    Globe,
    Heart,
    Sparkles,
    Mountain,
    Coffee,
    Package
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

// Partnership types
const partnershipTypes = [
    {
        id: "brand",
        title: "Brand Partnerships",
        description: "Long-term content partnerships with aligned lifestyle and adventure brands",
        icon: Handshake,
        examples: ["Outdoor gear", "Adventure apparel", "Sustainable products", "Lifestyle brands"],
        benefits: [
            "Authentic content integration",
            "Access to engaged community",
            "Real-world product testing",
            "Cinematic brand storytelling"
        ]
    },
    {
        id: "sponsor",
        title: "Event Sponsorships",
        description: "Support our balloon operations and events in exchange for visibility",
        icon: Target,
        examples: ["Festival activations", "Competition sponsorship", "Equipment support", "Travel partnerships"],
        benefits: [
            "Event branding opportunities",
            "Social media coverage",
            "Documentary features",
            "VIP experiences"
        ]
    },
    {
        id: "creative",
        title: "Creative Collaborations",
        description: "Join forces on ambitious projects that push boundaries",
        icon: Sparkles,
        examples: ["Documentary series", "Art installations", "Research expeditions", "Conservation projects"],
        benefits: [
            "Co-creation opportunities",
            "Shared resources",
            "Cross-promotion",
            "Innovation showcase"
        ]
    }
];

// Current partners (example data)
const currentPartners = [
    {
        name: "Example Outdoor Co",
        type: "Gear Partner",
        description: "Providing technical equipment for extreme conditions"
    },
    {
        name: "Adventure Coffee",
        type: "Lifestyle Partner",
        description: "Fueling our pre-dawn launches since 2023"
    }
];

// Partnership values
const partnershipValues = [
    {
        icon: Heart,
        title: "Authentic Alignment",
        description: "We only partner with brands that share our values and vision"
    },
    {
        icon: Camera,
        title: "Content First",
        description: "Every partnership creates compelling stories worth sharing"
    },
    {
        icon: Users,
        title: "Community Focus",
        description: "Partners gain access to our engaged adventure community"
    },
    {
        icon: Mountain,
        title: "Real-World Testing",
        description: "Products and ideas tested in actual field conditions"
    }
];

export default function PartnershipsPage() {
    const [formData, setFormData] = useState({
        contact_name: '',
        company_name: '',
        email: '',
        website: '',
        partnership_type: '',
        budget: '',
        timeline: '',
        description: '',
        goals: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const supabase = createClient();
            const { error } = await supabase
                .from('partnership_inquiries')
                .insert([{
                    ...formData,
                    source: 'partnerships_page',
                    status: 'pending'
                }]);

            if (error) throw error;

            toast.success('Partnership inquiry submitted! We\'ll be in touch within 48 hours.');

            // Reset form
            setFormData({
                contact_name: '',
                company_name: '',
                email: '',
                website: '',
                partnership_type: '',
                budget: '',
                timeline: '',
                description: '',
                goals: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            Brand Partnerships
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-gelica font-bold text-white mb-6">
                            Rise Together
                        </h1>
                        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
                            We&apos;re selective about partnerships, but when values align, magic happens.
                            Join us in creating authentic stories that elevate both our missions.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Partnership Types */}
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
                            Partnership Opportunities
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Whether you&apos;re a brand, organization, or creative, there&apos;s a way to work together
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {partnershipTypes.map((type, index) => {
                            const Icon = type.icon;
                            return (
                                <motion.div
                                    key={type.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full group">
                                        <CardHeader>
                                            <Icon className="w-12 h-12 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                                            <CardTitle className="text-2xl font-gelica text-white">
                                                {type.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-white/70 mb-6">
                                                {type.description}
                                            </p>

                                            <div className="mb-6">
                                                <p className="text-sm text-orange-400 font-medium mb-3">Examples:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {type.examples.map((example, i) => (
                                                        <Badge key={i} variant="outline" className="text-white/60 border-white/20 text-xs">
                                                            {example}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-sm text-orange-400 font-medium mb-3">Benefits:</p>
                                                <ul className="space-y-2">
                                                    {type.benefits.map((benefit, i) => (
                                                        <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                                                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                                                            {benefit}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Partnership Values */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            What We Look For
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Successful partnerships are built on shared values and mutual benefit
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {partnershipValues.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-center"
                                >
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4 group hover:bg-white/10 transition-all">
                                        <Icon className="w-12 h-12 text-orange-400 mx-auto group-hover:scale-110 transition-transform" />
                                    </div>
                                    <h3 className="text-xl font-gelica font-bold text-white mb-2">{value.title}</h3>
                                    <p className="text-white/60 text-sm">{value.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Current Partners */}
            {currentPartners.length > 0 && (
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
                                Current Partners
                            </h2>
                            <p className="text-xl text-white/70 max-w-3xl mx-auto">
                                Proud to work with companies that share our commitment to adventure and authenticity
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {currentPartners.map((partner, index) => (
                                <motion.div
                                    key={partner.name}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="bg-white/5 border-white/10">
                                        <CardContent className="p-8">
                                            <div className="flex items-start gap-4">
                                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-lg flex items-center justify-center">
                                                    <Package className="w-8 h-8 text-orange-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-gelica font-bold text-white mb-1">
                                                        {partner.name}
                                                    </h3>
                                                    <p className="text-orange-400 text-sm mb-2">{partner.type}</p>
                                                    <p className="text-white/60 text-sm">{partner.description}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Partnership Inquiry Form */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Start a Partnership
                        </h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Tell us about your brand and how you envision working together
                        </p>
                    </motion.div>

                    <Card className="bg-white/5 border-white/10">
                        <CardContent className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="contact_name">Contact Name *</Label>
                                        <Input
                                            id="contact_name"
                                            value={formData.contact_name}
                                            onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                                            required
                                            className="bg-white/5 border-white/10 focus:border-orange-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="company_name">Company/Brand Name *</Label>
                                        <Input
                                            id="company_name"
                                            value={formData.company_name}
                                            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                            required
                                            className="bg-white/5 border-white/10 focus:border-orange-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            className="bg-white/5 border-white/10 focus:border-orange-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="website">Website</Label>
                                        <Input
                                            id="website"
                                            type="url"
                                            value={formData.website}
                                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                            placeholder="https://example.com"
                                            className="bg-white/5 border-white/10 focus:border-orange-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="partnership_type">Partnership Type *</Label>
                                    <Select
                                        value={formData.partnership_type}
                                        onValueChange={(value) => setFormData({ ...formData, partnership_type: value })}
                                    >
                                        <SelectTrigger className="bg-white/5 border-white/10 focus:border-orange-500">
                                            <SelectValue placeholder="Select partnership type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="brand">Brand Partnership</SelectItem>
                                            <SelectItem value="sponsor">Event Sponsorship</SelectItem>
                                            <SelectItem value="creative">Creative Collaboration</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="budget">Budget Range</Label>
                                        <Select
                                            value={formData.budget}
                                            onValueChange={(value) => setFormData({ ...formData, budget: value })}
                                        >
                                            <SelectTrigger className="bg-white/5 border-white/10 focus:border-orange-500">
                                                <SelectValue placeholder="Select budget range" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="<10k">Less than $10k</SelectItem>
                                                <SelectItem value="10-25k">$10k - $25k</SelectItem>
                                                <SelectItem value="25-50k">$25k - $50k</SelectItem>
                                                <SelectItem value="50k+">$50k+</SelectItem>
                                                <SelectItem value="product">Product/Trade</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="timeline">Timeline</Label>
                                        <Input
                                            id="timeline"
                                            value={formData.timeline}
                                            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                            placeholder="e.g., Q2 2024, Ongoing"
                                            className="bg-white/5 border-white/10 focus:border-orange-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Tell Us About Your Brand *</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                        rows={4}
                                        placeholder="What does your brand stand for? What's your mission? Why are you interested in partnering with Aerostatic?"
                                        className="bg-white/5 border-white/10 focus:border-orange-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="goals">Partnership Goals</Label>
                                    <Textarea
                                        id="goals"
                                        value={formData.goals}
                                        onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                                        rows={3}
                                        placeholder="What are you hoping to achieve through this partnership? Any specific ideas or campaigns in mind?"
                                        className="bg-white/5 border-white/10 focus:border-orange-500"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                                    size="lg"
                                >
                                    {isSubmitting ? 'Sending...' : 'Submit Partnership Inquiry'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="text-center mt-8">
                        <p className="text-white/60">
                            For immediate inquiries:{' '}
                            <a href="mailto:info@aerostatic.io" className="text-orange-400 hover:text-orange-300 transition-colors">
                                info@aerostatic.io
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}