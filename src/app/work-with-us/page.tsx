"use client";

import { useState } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Film,
    Calendar,
    Code2,
    ArrowRight,
    Camera,
    Wind,
    Wrench,
    Star,
    Check
} from 'lucide-react';

// Tab configuration
const serviceTabs = [
    {
        id: 'media',
        label: 'Media Production',
        icon: Film,
        description: 'Documentary series, branded campaigns, event coverage'
    },
    {
        id: 'events',
        label: 'Event Services',
        icon: Wind,
        description: 'Static displays, ride activations, aerial coverage'
    },
    {
        id: 'tech',
        label: 'Tech Solutions',
        icon: Code2,
        description: 'Custom software, operational tools, consulting'
    }
];

// Media Form Component
function MediaForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        timeline: '',
        budget: '',
        description: '',
        services: [] as string[]
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const mediaServices = [
        'Documentary Series',
        'Branded Campaign',
        'Event Coverage',
        'Field Cinematography',
        'Social Content',
        'Other'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const supabase = createClient();
            const { error } = await supabase
                .from('hire_requests')
                .insert([{
                    ...formData,
                    services: formData.services.join(', '),
                    source: 'work_with_us_media',
                    status: 'pending'
                }]);

            if (error) throw error;

            toast.success('Request submitted! We\'ll be in touch within 24 hours.');

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                projectType: '',
                timeline: '',
                budget: '',
                description: '',
                services: []
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-white/5 border-white/10 focus:border-orange-500"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-white/5 border-white/10 focus:border-orange-500"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-white/5 border-white/10 focus:border-orange-500"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="bg-white/5 border-white/10 focus:border-orange-500"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Services Interested In</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {mediaServices.map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                            <Checkbox
                                id={service}
                                checked={formData.services.includes(service)}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setFormData({ ...formData, services: [...formData.services, service] });
                                    } else {
                                        setFormData({ ...formData, services: formData.services.filter(s => s !== service) });
                                    }
                                }}
                            />
                            <Label
                                htmlFor={service}
                                className="text-sm font-normal cursor-pointer"
                            >
                                {service}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="timeline">Project Timeline</Label>
                    <Input
                        id="timeline"
                        name="timeline"
                        placeholder="e.g., Q2 2024"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="bg-white/5 border-white/10 focus:border-orange-500"
                    />
                </div>

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
                            <SelectItem value="50-100k">$50k - $100k</SelectItem>
                            <SelectItem value="100k+">$100k+</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Tell Us About Your Project *</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    placeholder="What story do you want to tell? What's your vision? How can we help bring it to life?"
                    className="bg-white/5 border-white/10 focus:border-orange-500"
                />
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                size="lg"
            >
                {isSubmitting ? 'Sending...' : 'Submit Media Project Request'}
            </Button>
        </form>
    );
}

// Events Form Component (copied from events page)
function EventsForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        eventType: '',
        eventDate: '',
        location: '',
        attendees: '',
        services: [] as string[],
        description: '',
        timeline: '',
        additionalRequests: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const eventServices = [
        'Static Displays',
        'Ride Activations',
        'Media Coverage',
        'Content Creators',
        'Branded Balloon Flights',
        'Custom Services'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const supabase = createClient();
            const { error } = await supabase
                .from('hire_requests')
                .insert([{
                    ...formData,
                    services: formData.services.join(', '),
                    source: 'work_with_us_events',
                    status: 'pending'
                }]);

            if (error) throw error;

            toast.success('Request submitted! We\'ll be in touch within 24 hours.');

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                eventType: '',
                eventDate: '',
                location: '',
                attendees: '',
                services: [],
                description: '',
                timeline: '',
                additionalRequests: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-white/5 border-white/10 focus:border-orange-500"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-white/5 border-white/10 focus:border-orange-500"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="eventType">Event Type</Label>
                <Select
                    value={formData.eventType}
                    onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                >
                    <SelectTrigger className="bg-white/5 border-white/10 focus:border-orange-500">
                        <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="festival">Music Festival</SelectItem>
                        <SelectItem value="corporate">Corporate Event</SelectItem>
                        <SelectItem value="private">Private Party</SelectItem>
                        <SelectItem value="sports">Sporting Event</SelectItem>
                        <SelectItem value="charity">Charity/Fundraiser</SelectItem>
                        <SelectItem value="marketing">Marketing Campaign</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="eventDate">Event Date(s)</Label>
                    <Input
                        id="eventDate"
                        name="eventDate"
                        type="text"
                        placeholder="e.g., June 15-17, 2024"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="bg-white/5 border-white/10 focus:border-orange-500"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                        placeholder="City, State"
                        className="bg-white/5 border-white/10 focus:border-orange-500"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Services Interested In</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {eventServices.map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                            <Checkbox
                                id={`event-${service}`}
                                checked={formData.services.includes(service)}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setFormData({ ...formData, services: [...formData.services, service] });
                                    } else {
                                        setFormData({ ...formData, services: formData.services.filter(s => s !== service) });
                                    }
                                }}
                            />
                            <Label
                                htmlFor={`event-${service}`}
                                className="text-sm font-normal cursor-pointer"
                            >
                                {service}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Tell Us About Your Event *</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    placeholder="Describe your event, goals, and how you envision balloon services enhancing the experience..."
                    className="bg-white/5 border-white/10 focus:border-orange-500"
                />
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                size="lg"
            >
                {isSubmitting ? 'Sending...' : 'Submit Event Request'}
            </Button>
        </form>
    );
}

// Tech Form Component (similar to build-with-us page)
function TechForm() {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const supabase = createClient();
            const { error } = await supabase
                .from('hire_requests')
                .insert([{
                    ...formData,
                    source: 'work_with_us_tech',
                    status: 'pending'
                }]);

            if (error) throw error;

            toast.success('Request submitted! We\'ll be in touch within 48 hours.');

            // Reset form
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
            console.error('Error submitting form:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="name">Contact Name *</Label>
                    <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white/5 border-white/10 focus:border-orange-500"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white/5 border-white/10 focus:border-orange-500"
                        placeholder="contact@example.com"
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="organization">Organization</Label>
                <Input
                    id="organization"
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="bg-white/5 border-white/10 focus:border-orange-500"
                    placeholder="Company/Team Name"
                />
            </div>

            <div>
                <Label htmlFor="projectType">Project Type *</Label>
                <Select
                    value={formData.projectType}
                    onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                >
                    <SelectTrigger className="bg-white/5 border-white/10 focus:border-orange-500">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="tools">Custom Tools / Software</SelectItem>
                        <SelectItem value="consulting">Technical Consulting</SelectItem>
                        <SelectItem value="integration">API Integration</SelectItem>
                        <SelectItem value="other">Other / Hybrid</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="timeline">Project Timeline</Label>
                    <Input
                        id="timeline"
                        type="text"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="bg-white/5 border-white/10 focus:border-orange-500"
                        placeholder="e.g., Q1 2025"
                    />
                </div>

                <div>
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
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div>
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                    id="description"
                    required
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-white/5 border-white/10 focus:border-orange-500 resize-none"
                    placeholder="Tell us about your project. What problem are you trying to solve? What's your current approach? What outcomes are you looking for?"
                />
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                size="lg"
            >
                {isSubmitting ? 'Sending...' : 'Submit Tech Project Request'}
            </Button>
        </form>
    );
}

export default function WorkWithUsPage() {
    const [activeTab, setActiveTab] = useState('media');

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
                            Let&apos;s Collaborate
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-gelica font-bold text-white mb-6">
                            Work With Us
                        </h1>
                        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
                            Whether you need cinematic storytelling, event spectacle, or custom tech —
                            we&apos;re here to bring your vision to life.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Service Tabs and Forms */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
                            {serviceTabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === tab.id
                                            ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="hidden sm:inline">{tab.label}</span>
                                        <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tab Description */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="text-center mb-12"
                        >
                            <p className="text-lg text-white/70">
                                {serviceTabs.find(tab => tab.id === activeTab)?.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Form Content */}
                    <Card className="bg-white/5 border-white/10">
                        <CardContent className="p-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {activeTab === 'media' && <MediaForm />}
                                    {activeTab === 'events' && <EventsForm />}
                                    {activeTab === 'tech' && <TechForm />}
                                </motion.div>
                            </AnimatePresence>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <div className="text-center mt-12">
                        <p className="text-white/60 mb-4">
                            Questions? Reach out directly
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a
                                href="mailto:info@aerostatic.io"
                                className="text-orange-400 hover:text-orange-300 transition-colors"
                            >
                                info@aerostatic.io
                            </a>
                            <span className="text-white/30 hidden sm:inline">•</span>
                            <span className="text-white/60">Response within 24-48 hours</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Work With Us */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white text-center mb-16">
                        Why Choose Aerostatic
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="bg-white/5 border-white/10 text-center">
                            <CardContent className="p-8">
                                <Camera className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                                <h3 className="text-xl font-gelica font-bold text-white mb-3">
                                    Field-Tested Excellence
                                </h3>
                                <p className="text-white/70">
                                    We&apos;re not theorists. Every solution we build has been tested in real conditions,
                                    refined through actual use.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/5 border-white/10 text-center">
                            <CardContent className="p-8">
                                <Star className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                                <h3 className="text-xl font-gelica font-bold text-white mb-3">
                                    Cinematic Quality
                                </h3>
                                <p className="text-white/70">
                                    We don&apos;t just document — we create visual experiences that demand attention
                                    and inspire action.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/5 border-white/10 text-center">
                            <CardContent className="p-8">
                                <Check className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                                <h3 className="text-xl font-gelica font-bold text-white mb-3">
                                    End-to-End Support
                                </h3>
                                <p className="text-white/70">
                                    From concept to execution, we handle every detail. Your vision,
                                    our expertise, delivered seamlessly.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}