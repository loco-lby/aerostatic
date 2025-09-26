"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ArrowRight,
    Code2,
    Megaphone,
    Target,
    Rocket,
    Globe,
    Shield,
    Heart,
    Sparkles,
    Mountain,
    Plane,
    TrendingUp,
    Users,
    BarChart,
    Palette,
    Zap,
    CheckCircle,
    ArrowUpRight,
    X
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

// Featured Partner Projects
const featuredPartners = [
    {
        name: "TravelPact",
        category: "Travel Technology",
        logo: "🧭",
        color: "from-emerald-500 to-teal-600",
        services: ["Full-Stack Development", "Brand Strategy", "Content Marketing"],
        description: "Smart travel planning platform for modern adventurers",
        achievements: [
            "Integrated 50+ travel APIs for real-time data",
            "Built community-driven trip planning features",
            "Launched collaborative itinerary sharing system",

        ],
        testimonial: "Aerostatic transformed our vision into reality. Their blend of technical expertise and creative marketing is unmatched.",
        link: "https://travelpact.com",
        caseStudy: true
    },
    {
        name: "NomadInsurance",
        category: "InsurTech",
        logo: "🌍",
        color: "from-blue-500 to-indigo-600",
        services: ["Platform Development", "Digital Marketing", "UX Design"],
        description: "Revolutionary insurance solutions for digital nomads",
        achievements: [
            "Designed & built responsive insurance platform",
            "Created conversion-focused landing pages",
            "Developed content marketing strategy",
            "Increased conversion rate by 150%"
        ],
        testimonial: "From concept to launch, Aerostatic handled everything. They're not just vendors, they're true partners.",
        link: "https://nomadinsurance.com",
        caseStudy: true
    },
    {
        name: "ExpatInsurance",
        category: "Global Insurance",
        logo: "🛡️",
        color: "from-purple-500 to-pink-600",
        services: ["Web Development", "SEO Strategy", "Brand Development"],
        description: "Comprehensive coverage for expatriates worldwide",
        achievements: [
            "Built multi-language insurance portal",
            "Implemented advanced quote engine",
            "Developed SEO strategy ranking #1 for key terms",
            "Created brand guidelines & visual identity"
        ],
        testimonial: "Aerostatic's holistic approach to development and marketing delivered results beyond our expectations.",
        link: "https://expatinsurance.com",
        caseStudy: true
    }
];

// Service Offerings
const services = [
    {
        icon: Code2,
        title: "Development",
        description: "Full-stack web applications, mobile apps, and custom software solutions",
        capabilities: [
            "React/Next.js Applications",
            "API Development",
            "Database Architecture",
            "Cloud Infrastructure",
            "Mobile Development",
            "AI Integration"
        ]
    },
    {
        icon: Megaphone,
        title: "Marketing",
        description: "Strategic marketing campaigns that drive growth and engagement",
        capabilities: [
            "Brand Strategy",
            "Content Marketing",
            "Social Media Management",
            "SEO Optimization",
            "Paid Advertising",
            "Email Campaigns"
        ]
    },
    {
        icon: Palette,
        title: "Design",
        description: "Beautiful, functional design that connects with your audience",
        capabilities: [
            "UI/UX Design",
            "Brand Identity",
            "Web Design",
            "Motion Graphics",
            "Print Design",
            "Design Systems"
        ]
    },
    {
        icon: Rocket,
        title: "Strategy",
        description: "Data-driven strategies that align technology with business goals",
        capabilities: [
            "Digital Transformation",
            "Market Research",
            "Growth Strategy",
            "Product Strategy",
            "Analytics Setup",
            "Performance Optimization"
        ]
    }
];

// Process Steps
const processSteps = [
    {
        number: "01",
        title: "Discovery",
        description: "We dive deep into your business, goals, and challenges to create a tailored strategy"
    },
    {
        number: "02",
        title: "Strategy",
        description: "Develop a comprehensive roadmap combining development and marketing initiatives"
    },
    {
        number: "03",
        title: "Execution",
        description: "Build and launch your solution with agile development and iterative improvements"
    },
    {
        number: "04",
        title: "Growth",
        description: "Scale your success with ongoing optimization, marketing, and support"
    }
];

// Why Choose Aerostatic
const advantages = [
    {
        icon: Mountain,
        title: "Adventure-Driven Innovation",
        description: "We bring the spirit of exploration to every project"
    },
    {
        icon: Zap,
        title: "Full-Service Partner",
        description: "Development + Marketing under one roof"
    },
    {
        icon: Heart,
        title: "Passionate Commitment",
        description: "Your success is our mission"
    },
    {
        icon: TrendingUp,
        title: "Proven Results",
        description: "Track record of 150%+ growth for partners"
    }
];

export default function PartnershipsPage() {
    return (
        <div className="min-h-screen bg-black">
            <Header />

            {/* Hero Section */}
            <section className="pt-48 pb-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />

                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto max-w-7xl relative z-10"
                >
                    <div className="text-center mb-16">
                        <Badge variant="outline" className="text-blue-400 border-blue-400/30 mb-6 px-4 py-1">
                            <Plane className="w-4 h-4 mr-2" />
                            Aerostatic Productions
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-gelica font-bold text-white mb-6">
                            Your Vision,
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                {" "}Elevated
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-8">
                            We partner with ambitious companies to build exceptional digital products
                            and marketing strategies that drive real growth
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/work-with-us">
                                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                                    Start Your Project
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="#case-studies">
                                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                                    View Case Studies
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Featured Partners */}
            <section id="case-studies" className="py-20 px-6 bg-white/[0.02]">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <Badge variant="outline" className="text-purple-400 border-purple-400/30 mb-6">
                            Success Stories
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Featured Partners
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            From startups to established brands, we&apos;ve helped companies transform
                            their digital presence and accelerate growth
                        </p>
                    </motion.div>

                    <div className="grid gap-8">
                        {featuredPartners.map((partner, index) => (
                            <motion.div
                                key={partner.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group">
                                    <div className={`h-2 bg-gradient-to-r ${partner.color}`} />
                                    <CardContent className="p-8">
                                        <div className="grid lg:grid-cols-2 gap-8">
                                            <div>
                                                <div className="flex items-start justify-between mb-6">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="text-4xl">{partner.logo}</span>
                                                            <div>
                                                                <h3 className="text-2xl font-gelica font-bold text-white">
                                                                    {partner.name}
                                                                </h3>
                                                                <p className="text-white/60">{partner.category}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {partner.link && (
                                                        <a
                                                            href={partner.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-white/40 hover:text-white transition-colors"
                                                        >
                                                            <ArrowUpRight className="w-5 h-5" />
                                                        </a>
                                                    )}
                                                </div>

                                                <p className="text-white/80 mb-6">{partner.description}</p>

                                                <div className="mb-6">
                                                    <p className="text-sm text-purple-400 font-medium mb-3">Services Provided:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {partner.services.map((service) => (
                                                            <Badge
                                                                key={service}
                                                                variant="outline"
                                                                className="text-white/70 border-white/20"
                                                            >
                                                                {service}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 text-white/70">
                                                    <X className="w-5 h-5 text-red-400" />
                                                    <span className="italic">Have they bought a balloon yet?</span>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-lg font-gelica font-bold text-white mb-4">
                                                    Key Achievements
                                                </h4>
                                                <ul className="space-y-3">
                                                    {partner.achievements.map((achievement, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                                            <span className="text-white/80">{achievement}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <Badge variant="outline" className="text-blue-400 border-blue-400/30 mb-6">
                            Full-Service Solutions
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Development + Marketing = Growth
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            We don&apos;t just build products or run campaigns. We create comprehensive
                            solutions that drive measurable business results.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full group">
                                        <CardHeader>
                                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                <Icon className="w-7 h-7 text-blue-400" />
                                            </div>
                                            <CardTitle className="text-xl font-gelica text-white">
                                                {service.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-white/70 mb-4">
                                                {service.description}
                                            </p>
                                            <ul className="space-y-2">
                                                {service.capabilities.map((capability) => (
                                                    <li key={capability} className="flex items-center gap-2 text-sm text-white/60">
                                                        <div className="w-1 h-1 bg-blue-400 rounded-full" />
                                                        {capability}
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

            {/* Process Section */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <Badge variant="outline" className="text-purple-400 border-purple-400/30 mb-6">
                            Our Process
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            From Concept to Success
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            A proven methodology that ensures every project delivers maximum impact
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                {index < processSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-purple-400/50 to-transparent" />
                                )}
                                <div className="text-center">
                                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                                        {step.number}
                                    </div>
                                    <h3 className="text-xl font-gelica font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-white/60 text-sm">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Aerostatic */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <Badge variant="outline" className="text-blue-400 border-blue-400/30 mb-6">
                            Why Choose Us
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            The Aerostatic Advantage
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            We bring the spirit of aviation to digital innovation -
                            always reaching higher, seeing further
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {advantages.map((advantage, index) => {
                            const Icon = advantage.icon;
                            return (
                                <motion.div
                                    key={advantage.title}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-center"
                                >
                                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-6 mb-4 group hover:border-purple-400/30 transition-all">
                                        <Icon className="w-12 h-12 text-purple-400 mx-auto group-hover:scale-110 transition-transform" />
                                    </div>
                                    <h3 className="text-xl font-gelica font-bold text-white mb-2">{advantage.title}</h3>
                                    <p className="text-white/60 text-sm">{advantage.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 rounded-3xl p-12 text-center"
                    >
                        <Badge variant="outline" className="text-purple-400 border-purple-400/30 mb-6">
                            Ready to Elevate?
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Let&apos;s Build Something Amazing
                        </h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
                            Whether you need a complete digital transformation or strategic marketing support,
                            we&apos;re ready to help you reach new heights
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/work-with-us">
                                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                                    Start Your Project
                                    <Rocket className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="mailto:partnerships@aerostatic.io">
                                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                                    Schedule a Call
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}