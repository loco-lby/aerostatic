"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import {
    ArrowRight,
    ShoppingBag,
    HelpCircle,
    Mail,
    ExternalLink,
    Package,
    FileText,
    Download,
    MessageSquare,
    Phone,
    MapPin,
    Clock,
    CheckCircle,
    AlertCircle,
    Shirt,
    Coffee,
    Sticker
} from "lucide-react";
import { useState, useEffect } from "react";
import { getFourthwallProducts, type FourthwallProduct } from "@/lib/fourthwall";

// FAQ Data
const faqData = [
    {
        category: "TOOLS & SOFTWARE",
        questions: [
            {
                q: "How do I get access to AeroStatus beta?",
                a: "Submit a request through the Tools page. We're onboarding teams in batches based on operational needs and feedback capacity."
            },
            {
                q: "What's the pricing model for your tools?",
                a: "AeroStatus: Free during beta, then $29/month per team. AeroMedia: One-time $149 license. Volume discounts available."
            },
            {
                q: "Do your tools work offline?",
                a: "Yes. Critical features work without connectivity. Data syncs when you're back online."
            }
        ]
    },
    {
        category: "CUSTOM PROJECTS",
        questions: [
            {
                q: "What's your typical project timeline?",
                a: "MVPs in 4-8 weeks. Full builds in 2-4 months. We move fast because we test in the field, not conference rooms."
            },
            {
                q: "Do you work with non-aviation clients?",
                a: "Yes. If you operate in harsh conditions and need tools that actually work, we speak your language."
            },
            {
                q: "What's your minimum project size?",
                a: "Usually $10K. But if the problem's interesting enough, we'll figure something out."
            }
        ]
    },
    {
        category: "OPERATIONS",
        questions: [
            {
                q: "Where are you based?",
                a: "Primary ops in the American Southwest. Remote work with occasional on-site as needed."
            },
            {
                q: "Can you document our event/expedition?",
                a: "Yes. Check the Build With Us page for media production services."
            },
            {
                q: "Do you offer training?",
                a: "For our tools, yes. For general operations, we can connect you with qualified instructors."
            }
        ]
    }
];

// Contact Form Component
function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'general',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: 'general',
                message: ''
            });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 font-mono">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="name" className="text-white/70 text-xs mb-2 block">
                        NAME *
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-black border-orange-500/30 text-white font-mono focus:border-orange-500"
                    />
                </div>

                <div>
                    <Label htmlFor="email" className="text-white/70 text-xs mb-2 block">
                        EMAIL *
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-black border-orange-500/30 text-white font-mono focus:border-orange-500"
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="subject" className="text-white/70 text-xs mb-2 block">
                    SUBJECT *
                </Label>
                <select
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-black border border-orange-500/30 text-white font-mono focus:border-orange-500 px-3 py-2 rounded-md"
                >
                    <option value="general">GENERAL INQUIRY</option>
                    <option value="support">TECHNICAL SUPPORT</option>
                    <option value="project">PROJECT INQUIRY</option>
                    <option value="media">MEDIA REQUEST</option>
                </select>
            </div>

            <div>
                <Label htmlFor="message" className="text-white/70 text-xs mb-2 block">
                    MESSAGE *
                </Label>
                <Textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-black border-orange-500/30 text-white font-mono focus:border-orange-500 resize-none"
                />
            </div>

            <div>
                {submitStatus === 'success' && (
                    <div className="mb-4 p-4 border border-green-500/30 bg-green-900/10 text-green-400 text-sm flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 mt-0.5" />
                        <div>
                            <p className="font-bold mb-1">MESSAGE SENT</p>
                            <p className="text-green-400/70">We&apos;ll respond within 24-48 hours.</p>
                        </div>
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="mb-4 p-4 border border-red-500/30 bg-red-900/10 text-red-400 text-sm flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 mt-0.5" />
                        <div>
                            <p className="font-bold mb-1">TRANSMISSION ERROR</p>
                            <p className="text-red-400/70">Failed to send. Try again or email directly.</p>
                        </div>
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-500 hover:bg-orange-600 text-black font-mono font-bold px-8 py-4"
                >
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                    {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>
            </div>
        </form>
    );
}

// Merch Component
function MerchSection() {
    const [products, setProducts] = useState<FourthwallProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProducts() {
            try {
                const fetchedProducts = await getFourthwallProducts();
                setProducts(fetchedProducts);
            } catch (err) {
                console.error('Failed to load products:', err);
                setError('Failed to load products');
            } finally {
                setIsLoading(false);
            }
        }
        loadProducts();
    }, []);

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="inline-flex items-center gap-3 text-orange-400 font-mono">
                    <div className="animate-spin w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full"></div>
                    <span>LOADING INVENTORY...</span>
                </div>
            </div>
        );
    }

    if (error || products.length === 0) {
        return (
            <div className="border border-orange-500/30 bg-black/50 p-12 text-center">
                <Package className="w-16 h-16 text-orange-500/50 mx-auto mb-4" />
                <p className="text-white/70 font-mono mb-4">INVENTORY TEMPORARILY OFFLINE</p>
                <a
                    href="https://aerostatic.fourthwall.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-mono text-sm"
                >
                    VISIT STORE DIRECTLY <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((product) => {
                const price = product.variants[0]?.price || product.price;
                const imageUrl = product.images[0]?.url || '/placeholder.jpg';

                return (
                    <div key={product.id} className="border border-orange-500/30 bg-black/50 overflow-hidden group">
                        <div className="aspect-square bg-white/5 relative overflow-hidden">
                            <Image
                                src={imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-white font-mono font-bold mb-2">{product.name.toUpperCase()}</h3>
                            <p className="text-white/70 font-mono text-sm mb-4 line-clamp-2">
                                {product.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-orange-400 font-mono font-bold">
                                    ${(price / 100).toFixed(2)}
                                </span>
                                <a
                                    href={`https://aerostatic.fourthwall.com/products/${product.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-orange-400 hover:text-orange-300 font-mono text-sm flex items-center gap-1"
                                >
                                    VIEW <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default function SupportPage() {
    const [activeSection, setActiveSection] = useState<'merch' | 'faq' | 'contact'>('merch');

    return (
        <div className="min-h-screen bg-black">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 border-b border-orange-500/20">
                <div className="container mx-auto max-w-6xl">
                    <div className="max-w-3xl">
                        <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6 font-mono">
                            04 / SUPPORT
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-mono">
                            MISSION<br />SUPPORT
                        </h1>
                        <p className="text-xl text-orange-400 font-medium mb-8 font-mono">
                            GEAR UP. GET ANSWERS. GET IN TOUCH.
                        </p>
                        <p className="text-lg text-white/70 font-mono leading-relaxed">
                            Every purchase funds the next flight. Every question helps us build better tools.
                            Every message gets read by someone who&apos;s been there.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section Navigation */}
            <section className="py-8 px-6 border-b border-orange-500/20 sticky top-0 bg-black z-40">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex gap-4 font-mono">
                        <button
                            onClick={() => setActiveSection('merch')}
                            className={`px-6 py-3 border transition-all ${activeSection === 'merch'
                                ? 'bg-orange-500 text-black border-orange-500 font-bold'
                                : 'border-orange-500/30 text-orange-400 hover:bg-orange-500/10'
                                }`}
                        >
                            <ShoppingBag className="w-4 h-4 inline mr-2" />
                            MISSION GEAR
                        </button>
                        <button
                            onClick={() => setActiveSection('faq')}
                            className={`px-6 py-3 border transition-all ${activeSection === 'faq'
                                ? 'bg-orange-500 text-black border-orange-500 font-bold'
                                : 'border-orange-500/30 text-orange-400 hover:bg-orange-500/10'
                                }`}
                        >
                            <HelpCircle className="w-4 h-4 inline mr-2" />
                            FAQ
                        </button>
                        <button
                            onClick={() => setActiveSection('contact')}
                            className={`px-6 py-3 border transition-all ${activeSection === 'contact'
                                ? 'bg-orange-500 text-black border-orange-500 font-bold'
                                : 'border-orange-500/30 text-orange-400 hover:bg-orange-500/10'
                                }`}
                        >
                            <Mail className="w-4 h-4 inline mr-2" />
                            CONTACT
                        </button>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    {/* Merch Section */}
                    {activeSection === 'merch' && (
                        <div>
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
                                    MISSION GEAR
                                </h2>
                                <p className="text-white/70 font-mono text-sm mb-8">
                                    FIELD-TESTED APPAREL AND EQUIPMENT. EVERY PURCHASE FUNDS THE NEXT FLIGHT.
                                </p>
                                <div className="flex items-center gap-6 text-xs font-mono text-white/50 mb-8">
                                    <div className="flex items-center gap-2">
                                        <Shirt className="w-4 h-4" />
                                        <span>PREMIUM MATERIALS</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Package className="w-4 h-4" />
                                        <span>SHIPS WORLDWIDE</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>SATISFACTION GUARANTEED</span>
                                    </div>
                                </div>
                            </div>

                            <MerchSection />

                            <div className="mt-12 text-center">
                                <a
                                    href="https://aerostatic.fourthwall.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-black px-6 py-3 font-mono font-bold text-sm transition-colors"
                                >
                                    VIEW FULL INVENTORY <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    )}

                    {/* FAQ Section */}
                    {activeSection === 'faq' && (
                        <div>
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
                                    FREQUENTLY ASKED QUESTIONS
                                </h2>
                                <p className="text-white/70 font-mono text-sm">
                                    STRAIGHT ANSWERS TO COMMON QUESTIONS. NO MARKETING SPEAK.
                                </p>
                            </div>

                            <div className="space-y-12">
                                {faqData.map((category, categoryIndex) => (
                                    <div key={categoryIndex}>
                                        <h3 className="text-orange-400 font-mono font-bold mb-6 text-sm">
                                            {category.category}
                                        </h3>
                                        <div className="space-y-6">
                                            {category.questions.map((item, itemIndex) => (
                                                <div
                                                    key={itemIndex}
                                                    className="border border-orange-500/30 bg-black/50 p-6"
                                                >
                                                    <h4 className="text-white font-mono font-bold mb-3">
                                                        Q: {item.q}
                                                    </h4>
                                                    <p className="text-white/70 font-mono text-sm leading-relaxed">
                                                        A: {item.a}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 border border-orange-500/30 bg-black/50 p-8 text-center">
                                <HelpCircle className="w-12 h-12 text-orange-500/50 mx-auto mb-4" />
                                <p className="text-white font-mono font-bold mb-2">DID&apos;T FIND YOUR ANSWER?</p>
                                <p className="text-white/70 font-mono text-sm mb-6">
                                    Send us a message. We&apos;ll get back to you within 48 hours.
                                </p>
                                <Button
                                    onClick={() => setActiveSection('contact')}
                                    className="bg-orange-500 hover:bg-orange-600 text-black font-mono font-bold"
                                >
                                    CONTACT US <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Contact Section */}
                    {activeSection === 'contact' && (
                        <div>
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
                                    GET IN TOUCH
                                </h2>
                                <p className="text-white/70 font-mono text-sm">
                                    DIRECT LINE TO THE TEAM. WE READ EVERYTHING.
                                </p>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-12">
                                <div>
                                    <div className="border border-orange-500/30 bg-black/50 p-8">
                                        <ContactForm />
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="border border-orange-500/30 bg-black/50 p-6">
                                        <h3 className="text-orange-500 font-mono font-bold mb-4">DIRECT CONTACTS</h3>
                                        <div className="space-y-4 font-mono text-sm">
                                            <div className="flex items-start gap-3">
                                                <Mail className="w-5 h-5 text-orange-500 mt-0.5" />
                                                <div>
                                                    <p className="text-white font-bold">General Inquiries</p>
                                                    <p className="text-white/70">info@aerostatic.io</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <MessageSquare className="w-5 h-5 text-orange-500 mt-0.5" />
                                                <div>
                                                    <p className="text-white font-bold">Technical Support</p>
                                                    <p className="text-white/70">info@aerostatic.io</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Package className="w-5 h-5 text-orange-500 mt-0.5" />
                                                <div>
                                                    <p className="text-white font-bold">Tool Access</p>
                                                    <p className="text-white/70">info@aerostatic.io</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-orange-500/30 bg-black/50 p-6">
                                        <h3 className="text-orange-500 font-mono font-bold mb-4">RESPONSE TIMES</h3>
                                        <div className="space-y-3 font-mono text-sm">
                                            <div className="flex items-center justify-between">
                                                <span className="text-white/70">General Inquiries</span>
                                                <span className="text-white">24-48 hours</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-white/70">Technical Support</span>
                                                <span className="text-white">&lt; 24 hours</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-white/70">Project Proposals</span>
                                                <span className="text-white">48-72 hours</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-orange-500/30 bg-black/50 p-6">
                                        <h3 className="text-orange-500 font-mono font-bold mb-4">DOCUMENTATION</h3>
                                        <div className="space-y-3">
                                            <a
                                                href="#"
                                                className="flex items-center justify-between text-white/70 hover:text-orange-400 font-mono text-sm transition-colors"
                                            >
                                                <span>AeroStatus User Guide</span>
                                                <Download className="w-4 h-4" />
                                            </a>
                                            <a
                                                href="#"
                                                className="flex items-center justify-between text-white/70 hover:text-orange-400 font-mono text-sm transition-colors"
                                            >
                                                <span>AeroMedia Documentation</span>
                                                <Download className="w-4 h-4" />
                                            </a>
                                            <a
                                                href="#"
                                                className="flex items-center justify-between text-white/70 hover:text-orange-400 font-mono text-sm transition-colors"
                                            >
                                                <span>API Reference</span>
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}