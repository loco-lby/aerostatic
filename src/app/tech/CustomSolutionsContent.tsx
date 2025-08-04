import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
    Settings,
    Smartphone,
    Globe,
    Database,
    Cloud,
    Shield,
    ArrowRight,
    CheckCircle,
    Zap,
    Users,
    Calendar,
    MapPin,
    BarChart,
    Package
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const CustomSolutionsContent = () => {
    const [formData, setFormData] = useState({
        company: '',
        name: '',
        email: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // TODO: Implement form submission
        setTimeout(() => {
            toast.success("Thank you! We'll be in touch within 24 hours.");
            setFormData({
                company: '',
                name: '',
                email: '',
                projectType: '',
                budget: '',
                timeline: '',
                description: ''
            });
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6">
                                Custom Development
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-gelica font-bold text-white mb-6">
                                Custom Solutions
                            </h1>
                            <p className="text-2xl md:text-3xl text-orange-400 font-medium mb-8">
                                Built for Adventure Tourism
                            </p>
                            <p className="text-xl text-white/70 leading-relaxed mb-12">
                                We build custom web and native applications specifically designed for
                                adventure tourism operations. From booking systems to operational tools,
                                we understand your unique challenges and create solutions that work in the field.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                                    onClick={() => {
                                        const element = document.getElementById('custom-solutions-form');
                                        element?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    Start Your Project
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                                <Settings className="w-24 h-24 text-orange-400 mx-auto mb-6" />
                                <div className="text-center">
                                    <h3 className="text-2xl font-gelica font-bold text-white mb-4">
                                        Tailored to Your Needs
                                    </h3>
                                    <p className="text-white/70">
                                        Every adventure business is unique. We build solutions that fit.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Build */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            What We Build
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Custom applications designed for the unique needs of adventure tourism operators
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
                            <Calendar className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Booking Systems</h3>
                            <p className="text-white/70 mb-4">
                                Custom booking platforms with availability management, dynamic pricing, and integrated payments.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-white/60 text-sm">Real-time availability</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-white/60 text-sm">Multi-location support</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-white/60 text-sm">Weather integration</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
                            <Users className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Operations Tools</h3>
                            <p className="text-white/70 mb-4">
                                Streamline your daily operations with custom tools built for your workflow.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-white/60 text-sm">Staff scheduling</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-white/60 text-sm">Equipment tracking</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-white/60 text-sm">Safety checklists</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
                            <Smartphone className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Mobile Apps</h3>
                            <p className="text-white/70 mb-4">
                                Native iOS and Android apps for staff, guides, and customers.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-white/60 text-sm">Offline capability</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-white/60 text-sm">GPS tracking</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-white/60 text-sm">Push notifications</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
                            <BarChart className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Analytics Dashboards</h3>
                            <p className="text-white/70 mb-4">
                                Understand your business with custom analytics and reporting tools.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-white/60 text-sm">Revenue tracking</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-white/60 text-sm">Customer insights</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-white/60 text-sm">Operational metrics</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
                            <MapPin className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Guest Experience</h3>
                            <p className="text-white/70 mb-4">
                                Enhance your customer journey with digital touchpoints.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-white/60 text-sm">Digital waivers</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-white/60 text-sm">Media delivery</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-white/60 text-sm">Review collection</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
                            <Package className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-gelica font-bold text-white mb-4">Integration Systems</h3>
                            <p className="text-white/70 mb-4">
                                Connect your existing tools into a unified system.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-white/60 text-sm">POS integration</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-white/60 text-sm">CRM sync</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-4 h-4 text-orange-400 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-white/60 text-sm">API development</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Why Adventure Operators Choose Us
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            We&apos;re not just developers. We&apos;re operators who understand your business.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Globe className="w-6 h-6 text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Field-Tested Solutions</h3>
                                    <p className="text-white/70">
                                        We&apos;ve operated in the field. We know what works when cell service is spotty
                                        and conditions are challenging.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-6 h-6 text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Safety First</h3>
                                    <p className="text-white/70">
                                        Every solution we build puts safety and operational integrity first.
                                        We understand the stakes in adventure tourism.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Zap className="w-6 h-6 text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Built for Speed</h3>
                                    <p className="text-white/70">
                                        Fast loading times, offline capability, and efficient workflows.
                                        Your tools should keep up with your pace.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Database className="w-6 h-6 text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Scalable Architecture</h3>
                                    <p className="text-white/70">
                                        From single-location operations to multi-site enterprises,
                                        our solutions grow with your business.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Cloud className="w-6 h-6 text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Modern Tech Stack</h3>
                                    <p className="text-white/70">
                                        We use cutting-edge technology that&apos;s proven reliable.
                                        No experimental frameworks, just solid engineering.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Users className="w-6 h-6 text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Ongoing Partnership</h3>
                                    <p className="text-white/70">
                                        We don&apos;t just build and disappear. We&apos;re here for updates,
                                        support, and evolving your solution as you grow.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-20 px-6 bg-white/[0.02]" id="custom-solutions-form">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Let&apos;s Build Something Great
                        </h2>
                        <p className="text-xl text-white/70">
                            Tell us about your project and we&apos;ll be in touch within 24 hours
                        </p>
                    </div>

                    <Card className="p-8 bg-white/5 border-white/10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="company">Company Name</Label>
                                    <Input
                                        id="company"
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        placeholder="Adventure Tours Inc."
                                        className="bg-white/5 border-white/10 focus:border-orange-500"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="name">Your Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                        className="bg-white/5 border-white/10 focus:border-orange-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="john@adventuretours.com"
                                    className="bg-white/5 border-white/10 focus:border-orange-500"
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="projectType">Project Type</Label>
                                    <select
                                        id="projectType"
                                        value={formData.projectType}
                                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 text-white"
                                        required
                                    >
                                        <option value="" className="bg-black">Select a type...</option>
                                        <option value="booking-system" className="bg-black">Booking System</option>
                                        <option value="mobile-app" className="bg-black">Mobile App</option>
                                        <option value="operations-tool" className="bg-black">Operations Tool</option>
                                        <option value="analytics" className="bg-black">Analytics Dashboard</option>
                                        <option value="integration" className="bg-black">System Integration</option>
                                        <option value="other" className="bg-black">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="budget">Budget Range</Label>
                                    <select
                                        id="budget"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 text-white"
                                        required
                                    >
                                        <option value="" className="bg-black">Select budget...</option>
                                        <option value="5-10k" className="bg-black">$5,000 - $10,000</option>
                                        <option value="10-25k" className="bg-black">$10,000 - $25,000</option>
                                        <option value="25-50k" className="bg-black">$25,000 - $50,000</option>
                                        <option value="50k+" className="bg-black">$50,000+</option>
                                        <option value="discuss" className="bg-black">Let&apos;s Discuss</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="timeline">Timeline</Label>
                                <select
                                    id="timeline"
                                    value={formData.timeline}
                                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 text-white"
                                    required
                                >
                                    <option value="" className="bg-black">When do you need this?</option>
                                    <option value="asap" className="bg-black">ASAP</option>
                                    <option value="1-2-months" className="bg-black">1-2 months</option>
                                    <option value="3-6-months" className="bg-black">3-6 months</option>
                                    <option value="6+-months" className="bg-black">6+ months</option>
                                    <option value="planning" className="bg-black">Just planning</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Project Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Tell us about your project, challenges you're facing, and what success looks like..."
                                    className="bg-white/5 border-white/10 focus:border-orange-500 min-h-[150px]"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Project Details'}
                            </Button>
                        </form>
                    </Card>

                    <div className="mt-8 text-center">
                        <p className="text-white/60">
                            Prefer to chat? Email us at{' '}
                            <a href="mailto:info@aerostatic.io" className="text-orange-400 hover:text-orange-300 transition-colors">
                                info@aerostatic.io
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};