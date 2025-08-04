"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    ArrowRight,
    Code2,
    Camera,
    Wrench,
    Terminal,
    FileCode,
    Cpu,
    Rocket,
    CheckCircle,
    AlertCircle,
    Zap,
    Database,
    Cloud,
    Shield
} from "lucide-react";
import { useState } from "react";

// Project Inquiry Form Component
function ProjectInquiryForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        projectType: 'tools',
        timeline: '',
        budget: '',
        description: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                organization: '',
                projectType: 'tools',
                timeline: '',
                budget: '',
                description: ''
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
                        CONTACT NAME *
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-black border-orange-500/30 text-white font-mono focus:border-orange-500"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <Label htmlFor="email" className="text-white/70 text-xs mb-2 block">
                        EMAIL ADDRESS *
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-black border-orange-500/30 text-white font-mono focus:border-orange-500"
                        placeholder="contact@example.com"
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="organization" className="text-white/70 text-xs mb-2 block">
                    ORGANIZATION
                </Label>
                <Input
                    id="organization"
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="bg-black border-orange-500/30 text-white font-mono focus:border-orange-500"
                    placeholder="Company/Team Name"
                />
            </div>

            <div>
                <Label htmlFor="projectType" className="text-white/70 text-xs mb-2 block">
                    PROJECT TYPE *
                </Label>
                <select
                    id="projectType"
                    required
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-black border border-orange-500/30 text-white font-mono focus:border-orange-500 px-3 py-2 rounded-md"
                >
                    <option value="tools">CUSTOM TOOLS / SOFTWARE</option>
                    <option value="media">MEDIA PRODUCTION</option>
                    <option value="consulting">TECHNICAL CONSULTING</option>
                    <option value="other">OTHER / HYBRID</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="timeline" className="text-white/70 text-xs mb-2 block">
                        PROJECT TIMELINE
                    </Label>
                    <Input
                        id="timeline"
                        type="text"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="bg-black border-orange-500/30 text-white font-mono focus:border-orange-500"
                        placeholder="e.g., Q1 2025"
                    />
                </div>

                <div>
                    <Label htmlFor="budget" className="text-white/70 text-xs mb-2 block">
                        BUDGET RANGE
                    </Label>
                    <Input
                        id="budget"
                        type="text"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="bg-black border-orange-500/30 text-white font-mono focus:border-orange-500"
                        placeholder="e.g., $10-25K"
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="description" className="text-white/70 text-xs mb-2 block">
                    PROJECT DESCRIPTION *
                </Label>
                <Textarea
                    id="description"
                    required
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-black border-orange-500/30 text-white font-mono focus:border-orange-500 resize-none"
                    placeholder="Tell us about your project. What problem are you trying to solve? What's your current approach? What outcomes are you looking for?"
                />
            </div>

            <div className="pt-4">
                {submitStatus === 'success' && (
                    <div className="mb-4 p-4 border border-green-500/30 bg-green-900/10 text-green-400 text-sm flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 mt-0.5" />
                        <div>
                            <p className="font-bold mb-1">TRANSMISSION RECEIVED</p>
                            <p className="text-green-400/70">We&apos;ll review your project and respond within 48 hours.</p>
                        </div>
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="mb-4 p-4 border border-red-500/30 bg-red-900/10 text-red-400 text-sm flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 mt-0.5" />
                        <div>
                            <p className="font-bold mb-1">TRANSMISSION ERROR</p>
                            <p className="text-red-400/70">Failed to send. Please try again or contact us directly.</p>
                        </div>
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-500 hover:bg-orange-600 text-black font-mono font-bold px-8 py-6 text-base"
                >
                    {isSubmitting ? 'TRANSMITTING...' : 'SUBMIT PROJECT INQUIRY'}
                    {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>
            </div>
        </form>
    );
}

export default function BuildWithUsPage() {
    return (
        <div className="min-h-screen bg-black">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 border-b border-orange-500/20">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6 font-mono">
                                03 / ENGINEERING
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-mono">
                                BUILD<br />WITH US
                            </h1>
                            <p className="text-xl text-orange-400 font-medium mb-8 font-mono">
                                WE BUILD WHAT WE NEED. MAYBE YOU NEED IT TOO.
                            </p>
                            <p className="text-lg text-white/70 mb-8 font-mono leading-relaxed">
                                When off-the-shelf doesn&apos;t cut it, we engineer solutions.
                                Custom tools for operators who can&apos;t afford to fail.
                                Media systems for crews documenting reality, not manufacturing it.
                            </p>
                            <div className="flex flex-wrap gap-4 text-xs font-mono text-white/50">
                                <div className="flex items-center gap-2">
                                    <Terminal className="w-4 h-4" />
                                    <span>CUSTOM SOFTWARE</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Camera className="w-4 h-4" />
                                    <span>MEDIA SYSTEMS</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Wrench className="w-4 h-4" />
                                    <span>FIELD TOOLS</span>
                                </div>
                            </div>
                        </div>

                        <div className="border border-orange-500/30 bg-black/50 p-6 font-mono text-sm">
                            <h3 className="text-orange-500 font-bold mb-4">RECENT BUILDS</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                                    <div>
                                        <p className="text-white font-bold">AEROSTATUS</p>
                                        <p className="text-white/70 text-xs">Real-time balloon tracker. 10K+ active users.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                                    <div>
                                        <p className="text-white font-bold">AEROMEDIA</p>
                                        <p className="text-white/70 text-xs">AI-powered expedition documentation system.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5"></div>
                                    <div>
                                        <p className="text-white font-bold">WINDCALL PRO</p>
                                        <p className="text-white/70 text-xs">Weather decision engine. In development.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 font-mono">
                        CAPABILITIES
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Custom Tools */}
                        <div className="border border-orange-500/30 bg-black/50 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Code2 className="w-6 h-6 text-orange-500" />
                                <h3 className="text-xl font-bold text-white font-mono">CUSTOM TOOLS</h3>
                            </div>
                            <p className="text-white/70 mb-6 font-mono text-sm leading-relaxed">
                                Purpose-built software for field operations. Real-time data systems,
                                mission planning tools, documentation platforms.
                            </p>
                            <ul className="space-y-3 font-mono text-xs">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span className="text-white/70">Web & mobile applications</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span className="text-white/70">Real-time data pipelines</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span className="text-white/70">API integrations</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span className="text-white/70">Offline-first systems</span>
                                </li>
                            </ul>
                        </div>

                        {/* Media Production */}
                        <div className="border border-orange-500/30 bg-black/50 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Camera className="w-6 h-6 text-orange-500" />
                                <h3 className="text-xl font-bold text-white font-mono">MEDIA PRODUCTION</h3>
                            </div>
                            <p className="text-white/70 mb-6 font-mono text-sm leading-relaxed">
                                Documentary-style content that shows how things actually work.
                                No fluff, no filters, just ground truth.
                            </p>
                            <ul className="space-y-3 font-mono text-xs">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span className="text-white/70">Field documentation</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span className="text-white/70">Technical explainers</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span className="text-white/70">Training materials</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span className="text-white/70">Live operations coverage</span>
                                </li>
                            </ul>
                        </div>

                        {/* Consulting */}
                        <div className="border border-orange-500/30 bg-black/50 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Wrench className="w-6 h-6 text-orange-500" />
                                <h3 className="text-xl font-bold text-white font-mono">CONSULTING</h3>
                            </div>
                            <p className="text-white/70 mb-6 font-mono text-sm leading-relaxed">
                                Technical guidance from operators who&apos;ve been there.
                                Strategy rooted in experience, not theory.
                            </p>
                            <ul className="space-y-3 font-mono text-xs">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span className="text-white/70">System architecture</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span className="text-white/70">Technical audits</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span className="text-white/70">Process optimization</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                    <span className="text-white/70">Team training</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="py-20 px-6 border-t border-orange-500/20">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 font-mono">
                        TECH STACK
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-sm">
                        <div className="border border-orange-500/30 bg-black/50 p-6">
                            <FileCode className="w-8 h-8 text-orange-500 mb-4" />
                            <h3 className="text-white font-bold mb-2">FRONTEND</h3>
                            <ul className="text-white/70 text-xs space-y-1">
                                <li>React / Next.js</li>
                                <li>TypeScript</li>
                                <li>Tailwind CSS</li>
                                <li>Three.js</li>
                            </ul>
                        </div>

                        <div className="border border-orange-500/30 bg-black/50 p-6">
                            <Database className="w-8 h-8 text-orange-500 mb-4" />
                            <h3 className="text-white font-bold mb-2">BACKEND</h3>
                            <ul className="text-white/70 text-xs space-y-1">
                                <li>Node.js</li>
                                <li>Python</li>
                                <li>PostgreSQL</li>
                                <li>Redis</li>
                            </ul>
                        </div>

                        <div className="border border-orange-500/30 bg-black/50 p-6">
                            <Cloud className="w-8 h-8 text-orange-500 mb-4" />
                            <h3 className="text-white font-bold mb-2">INFRASTRUCTURE</h3>
                            <ul className="text-white/70 text-xs space-y-1">
                                <li>AWS / Vercel</li>
                                <li>Docker</li>
                                <li>GitHub Actions</li>
                                <li>Cloudflare</li>
                            </ul>
                        </div>

                        <div className="border border-orange-500/30 bg-black/50 p-6">
                            <Zap className="w-8 h-8 text-orange-500 mb-4" />
                            <h3 className="text-white font-bold mb-2">SPECIALTIES</h3>
                            <ul className="text-white/70 text-xs space-y-1">
                                <li>WebRTC</li>
                                <li>Maps / GIS</li>
                                <li>AI / ML</li>
                                <li>IoT / Edge</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Inquiry Form */}
            <section className="py-20 px-6 border-t border-orange-500/20">
                <div className="container mx-auto max-w-3xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
                            START A PROJECT
                        </h2>
                        <p className="text-white/70 font-mono text-sm">
                            Got a problem that needs solving? Let&apos;s talk.
                        </p>
                    </div>

                    <div className="border border-orange-500/30 bg-black/50 p-8">
                        <ProjectInquiryForm />
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-white/50 font-mono text-xs">
                            PREFERRED CONTACT: info@aerostatic.io | RESPONSE TIME: 24-48 HOURS
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}