"use client";

import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { MapPin, Mail, Phone, Calendar, Users, DollarSign, Clock, CheckCircle, ArrowRight, Palette, Wind, Camera, Award, Globe } from 'lucide-react';

const serviceTypes = [
    {
        value: "Static Displays",
        label: "Static Displays",
        description: "Our checkered 'billboard in the sky' balloon draws attention wherever it stands. Perfect for festivals, races, and outdoor events looking for something iconic.",
        icon: Palette,
        idealFor: "Festivals, Brand Activations, Outdoor Events"
    },
    {
        value: "Ride Activations",
        label: "Ride Activations",
        description: "Tethered balloon rides that leave your guests with a core memory. Safe, controlled ascents with breathtaking views and photo opportunities.",
        icon: Wind,
        idealFor: "Private Events, VIP Experiences, Corporate Retreats"
    },
    {
        value: "Media Coverage",
        label: "Media Coverage",
        description: "A balloon floating over your event doesn't just turn heads, it elevates the entire experience. Our team provides crafted content that lives far beyond the moment.",
        icon: Camera,
        idealFor: "Brand Campaigns, Event Documentation, Marketing Content"
    },
    {
        value: "Content Creators",
        label: "Content Creators",
        description: "Need content that stands above the noise? We collaborate with creators to deliver cinematic aerials, unforgettable backdrops, and moments that ignite engagement.",
        icon: Award,
        idealFor: "Influencers, Social Media, Personal Branding"
    },
    {
        value: "Branded Balloon Flights",
        label: "Branded Balloon Flights",
        description: "Put your logo in the sky. We design and fly custom branded envelopes or banners, turning your message into an airborne spectacle. Rise above your competitors... literally.",
        icon: Palette,
        idealFor: "Product Launches, Brand Campaigns, Corporate Events"
    },
    {
        value: "Custom Services",
        label: "Custom Services",
        description: "Need something off the beaten flight path? From aerial cinematography to fully tailored balloon ops, we bring experience, flexibility, and a knack for making magic from scratch.",
        icon: Globe,
        idealFor: "Festivals, Multi-City Tours, Extended Campaigns"
    }
]

export default function EventsPage() {
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
    const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({
                            ...prev,
                            [entry.target.id]: true
                        }));
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        const sections = document.querySelectorAll('[data-animate]');
        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            observer.disconnect();
        };
    }, [isMounted]);

    const getAnimationClass = (sectionId: string, baseClass: string = '') => {
        const baseClasses = `${baseClass} transition-all duration-1000`;

        if (!isMounted) {
            return `${baseClasses} opacity-100`;
        }

        const isIntersected = isVisible[sectionId];
        if (isIntersected === undefined) {
            return `${baseClasses} opacity-100 translate-y-0`;
        }

        return `${baseClasses} ${isIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`;
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleServiceToggle = (service: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            services: checked
                ? [...prev.services, service]
                : prev.services.filter(s => s !== service)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const supabase = createClient();

            const { error } = await supabase
                .from('event_inquiries')
                .insert({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    company: formData.company,
                    event_type: formData.eventType,
                    event_date: formData.eventDate,
                    location: formData.location,
                    attendees: formData.attendees,
                    services: formData.services,
                    description: formData.description,
                    timeline: formData.timeline,
                    additional_requests: formData.additionalRequests,
                    status: 'new'
                });

            if (error) {
                console.error('Error submitting inquiry:', error);
                toast.error('Failed to submit inquiry. Please try again.');
            } else {
                toast.success('Inquiry submitted successfully! We\'ll be in touch within 24 hours.');

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
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to submit inquiry. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black">
            <Header />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    {isMounted && (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                            style={{ filter: 'brightness(0.4) contrast(1.2)' }}
                        >
                            <source src="/videos/hero2.mp4" type="video/mp4" />
                        </video>
                    )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10"></div>

                {/* Hero Content */}
                <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
                    <Badge variant="outline" className="border-orange-500/30 text-orange-400 mb-6">
                        03
                    </Badge>
                    <h1 className="text-6xl md:text-7xl font-gelica font-bold mb-6 leading-tight text-white">
                        Elevate Your Event
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Static displays that stop traffic. Tethered rides that create memories. Media coverage that lives forever.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 px-8"
                            onClick={() => {
                                const element = document.getElementById('services');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }}
                        >
                            View Services
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-white/20 text-white hover:bg-white/10 px-8"
                            onClick={() => {
                                const element = document.getElementById('inquiry');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }}
                        >
                            Get Quote
                        </Button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section
                id="services"
                data-animate
                className={`py-32 px-6 ${getAnimationClass('services')}`}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Our Services
                        </h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            From static displays to custom balloon flights, we bring the wow factor to your event.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {serviceTypes.map((service, index) => {
                            const IconComponent = service.icon;
                            return (
                                <Card key={service.value} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group">
                                    <CardHeader>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <IconComponent className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-white text-lg">{service.label}</CardTitle>
                                            </div>
                                        </div>
                                        <CardDescription className="text-white/70 mb-4">
                                            {service.description}
                                        </CardDescription>
                                        <div className="text-sm text-white/50">
                                            <span className="font-medium">Ideal for:</span> {service.idealFor}
                                        </div>
                                    </CardHeader>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Inquiry Form Section */}
            <section
                id="inquiry"
                data-animate
                className={`py-32 px-6 bg-white/[0.02] ${getAnimationClass('inquiry')}`}
            >
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Let&apos;s Plan Your Event
                        </h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Tell us about your vision and we&apos;ll craft a proposal that takes your event to new heights.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-white">Name *</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                                    placeholder="Your full name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-white">Email *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-white">Phone</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                                    placeholder="(555) 123-4567"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-white">Company/Organization</Label>
                                <Input
                                    id="company"
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => handleInputChange('company', e.target.value)}
                                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                                    placeholder="Your company name"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="eventType" className="text-white">Event Type *</Label>
                                <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                                        <SelectValue placeholder="Select event type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="festival">Festival</SelectItem>
                                        <SelectItem value="corporate">Corporate Event</SelectItem>
                                        <SelectItem value="wedding">Wedding</SelectItem>
                                        <SelectItem value="brand-activation">Brand Activation</SelectItem>
                                        <SelectItem value="content-creation">Content Creation</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="eventDate" className="text-white">Event Date</Label>
                                <Input
                                    id="eventDate"
                                    type="date"
                                    value={formData.eventDate}
                                    onChange={(e) => handleInputChange('eventDate', e.target.value)}
                                    className="bg-white/5 border-white/20 text-white"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="location" className="text-white">Location *</Label>
                                <Input
                                    id="location"
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                                    placeholder="City, State"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="attendees" className="text-white">Expected Attendees</Label>
                                <Select value={formData.attendees} onValueChange={(value) => handleInputChange('attendees', value)}>
                                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                                        <SelectValue placeholder="Select attendee count" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1-50">1-50</SelectItem>
                                        <SelectItem value="51-100">51-100</SelectItem>
                                        <SelectItem value="101-500">101-500</SelectItem>
                                        <SelectItem value="501-1000">501-1,000</SelectItem>
                                        <SelectItem value="1000+">1,000+</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-white">Services Interested In</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {serviceTypes.map((service) => (
                                    <div key={service.value} className="flex items-center space-x-3 p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
                                        <Checkbox
                                            id={service.value}
                                            checked={formData.services.includes(service.value)}
                                            onCheckedChange={(checked) => handleServiceToggle(service.value, checked as boolean)}
                                        />
                                        <div className="flex-1">
                                            <Label htmlFor={service.value} className="text-white font-medium cursor-pointer">
                                                {service.label}
                                            </Label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-white">Event Description *</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                                placeholder="Tell us about your event, goals, and vision..."
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="timeline" className="text-white">Timeline</Label>
                                <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                                        <SelectValue placeholder="When do you need this?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="asap">ASAP</SelectItem>
                                        <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                                        <SelectItem value="1-month">1 month</SelectItem>
                                        <SelectItem value="2-3-months">2-3 months</SelectItem>
                                        <SelectItem value="6-months">6+ months</SelectItem>
                                        <SelectItem value="flexible">Flexible</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="additionalRequests" className="text-white">Additional Requests</Label>
                            <Textarea
                                id="additionalRequests"
                                value={formData.additionalRequests}
                                onChange={(e) => handleInputChange('additionalRequests', e.target.value)}
                                className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                                placeholder="Any special requirements, accessibility needs, or other details..."
                            />
                        </div>

                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isSubmitting}
                                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 px-12 py-3"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        Submitting...
                                    </div>
                                ) : (
                                    <>
                                        Submit Inquiry
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );
} 