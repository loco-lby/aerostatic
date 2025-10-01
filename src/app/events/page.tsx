"use client";

import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MerchCTA } from "@/components/MerchCTA";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
    MapPin,
    Calendar,
    Users,
    ArrowRight,
    Palette,
    Wind,
    Camera,
    Award,
    Globe,
    Play,
    Image as ImageIcon,
    Clock,
    Star,
    ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Past Events Data
const pastEvents = [
    {
        id: 1,
        title: "Cathedral City Balloon Festival",
        date: "November 2020-2024",
        location: "Cathedral City, CA",
        type: "Media Coverage & Ride Activations",
        description: "Annual festival coverage with spectacular sunrise flights over the desert",
        images: ["/videos/your_event.mp4"],
        testimonial: "Five years of incredible aerial coverage and passenger experiences.",
        highlights: ["5 consecutive years", "2nd place 2023", "3rd place 2024"]
    },
    {
        id: 2,
        title: "Singha International Festival",
        date: "February 2020-2024",
        location: "Chiang Rai, Thailand",
        type: "International Media Production",
        description: "Documenting one of Asia's premier balloon festivals with cinematic storytelling",
        images: ["/videos/thailand.mp4"],
        stats: { flights: 60, countries: 15, mediaReach: "5M+" },
        testimonial: "Their ability to capture the scale and beauty of our international event is unmatched.",
        client: "Singha Festival Committee"
    },
    {
        id: 3,
        title: "Balloons Over Bend",
        date: "July 2023-2024",
        location: "Bend, OR",
        type: "Static Display & Media Coverage",
        description: "Showcasing Oregon's natural beauty from above with our signature checkered balloon",
        images: ["/videos/hero1.mp4"],
        highlights: ["Cascade Mountains backdrop", "Dawn patrol flights", "Community engagement"]
    }
];

// Future Events Data
const futureEvents = [
    {
        id: 1,
        title: "Burning Man",
        date: "August 25 - September 2, 2025",
        location: "Black Rock City, NV",
        type: "Art Installation & Coverage",
        status: "planning",
        description: "Experimental balloon art installation and desert documentation"
    },
    {
        id: 2,
        title: "Albuquerque International Balloon Fiesta",
        date: "October 4-12, 2025",
        location: "Albuquerque, NM",
        type: "Media Production & Flights",
        status: "confirmed",
        description: "Capturing the world's largest balloon festival from the inside"
    },
    {
        id: 3,
        title: "Your Event",
        date: "Dates Flexible",
        location: "Anywhere",
        type: "Custom Services",
        status: "available",
        description: "Let's create something unforgettable together",
        isCustom: true
    }
];

const serviceTypes = [
    {
        value: "Static Displays",
        label: "Static Displays",
        description: "Our checkered 'billboard in the sky' balloon draws attention wherever it stands.",
        icon: Palette,
        idealFor: "Festivals, Brand Activations, Outdoor Events"
    },
    {
        value: "Ride Activations",
        label: "Ride Activations",
        description: "Tethered balloon rides that leave your guests with a core memory.",
        icon: Wind,
        idealFor: "Private Events, VIP Experiences, Corporate Retreats"
    },
    {
        value: "Media Coverage",
        label: "Media Coverage",
        description: "Cinematic aerial coverage that elevates your entire event.",
        icon: Camera,
        idealFor: "Brand Campaigns, Event Documentation, Marketing Content"
    },
    {
        value: "Content Creators",
        label: "Content Creators",
        description: "Collaborate with creators for unforgettable aerial content.",
        icon: Award,
        idealFor: "Influencers, Social Media, Personal Branding"
    },
    {
        value: "Branded Balloon Flights",
        label: "Branded Balloon Flights",
        description: "Put your logo in the sky with custom branded envelopes.",
        icon: Palette,
        idealFor: "Product Launches, Brand Campaigns, Corporate Events"
    },
    {
        value: "Custom Services",
        label: "Custom Services",
        description: "Tailored balloon operations for unique requirements.",
        icon: Globe,
        idealFor: "Festivals, Multi-City Tours, Extended Campaigns"
    }
];

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
    const [selectedPastEvent, setSelectedPastEvent] = useState<number | null>(null);

    interface FutureEvent {
        id: number;
        title: string;
        date: string;
        location: string;
        type: string;
        status: string;
        description: string;
        isCustom?: boolean;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleServiceToggle = (service: string) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter(s => s !== service)
                : [...prev.services, service]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // For static site, just show success message
            // In production, this would integrate with your backend service
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
                            Balloon Event Services
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-gelica font-bold text-white mb-6">
                            Elevate Your Event
                        </h1>
                        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
                            From intimate gatherings to massive festivals, we bring the magic of flight
                            to create unforgettable experiences and capture perspectives others can&apos;t.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Past Events Section */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6 text-center">
                            Our Track Record
                        </h2>
                        <p className="text-xl text-white/70 text-center max-w-3xl mx-auto">
                            We&apos;ve had the privilege of elevating some of the world&apos;s most iconic events
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pastEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group h-full"
                                    onClick={() => setSelectedPastEvent(event.id)}
                                >
                                    <div className="aspect-video relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                                        {event.images?.[0]?.endsWith('.mp4') ? (
                                            <video
                                                src={event.images[0]}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                            />
                                        ) : (
                                            <Image
                                                src={event.images?.[0] || "/images/events/placeholder.jpg"}
                                                alt={event.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        )}
                                        <div className="absolute top-4 right-4 z-20">
                                            <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                                                <Play className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    <CardContent className="p-6">
                                        <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-3 text-xs">
                                            {event.type}
                                        </Badge>
                                        <h3 className="text-2xl font-gelica font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                            {event.title}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {event.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {event.location}
                                            </span>
                                        </div>
                                        <p className="text-white/70 mb-4">
                                            {event.description}
                                        </p>

                                        {event.highlights && (
                                            <div className="space-y-1">
                                                {event.highlights.map((highlight, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                                                        <Star className="w-3 h-3 text-orange-400" />
                                                        {highlight}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {event.testimonial && (
                                            <blockquote className="border-l-2 border-orange-400 pl-4 mt-4 italic text-white/60">
                                                &quot;{event.testimonial}&quot;
                                                {event.client && <cite className="block text-sm mt-2 not-italic">- {event.client}</cite>}
                                            </blockquote>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Future Events Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6 text-center">
                            Upcoming Adventures
                        </h2>
                        <p className="text-xl text-white/70 text-center max-w-3xl mx-auto">
                            Join us at these upcoming events or book us for your own
                        </p>
                    </motion.div>

                    <div className="space-y-4 max-w-4xl mx-auto mb-16">
                        {futureEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-gelica font-bold text-white">
                                                        {event.title}
                                                    </h3>
                                                    <Badge
                                                        variant={event.status === 'confirmed' ? 'default' : 'outline'}
                                                        className={event.status === 'confirmed'
                                                            ? 'bg-green-500/20 text-green-400 border-green-400/30'
                                                            : 'text-orange-400 border-orange-400/30'
                                                        }
                                                    >
                                                        {event.status}
                                                    </Badge>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-2">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {event.date}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {event.location}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Wind className="w-4 h-4" />
                                                        {event.type}
                                                    </span>
                                                </div>
                                                <p className="text-white/70">
                                                    {event.description}
                                                </p>
                                                {event.isCustom && (
                                                    <Button
                                                        size="sm"
                                                        className="mt-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const element = document.getElementById('booking-form');
                                                            element?.scrollIntoView({ behavior: 'smooth' });
                                                        }}
                                                    >
                                                        Book Now
                                                        <ArrowRight className="ml-2 w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                            {!event.isCustom && <ChevronRight className="w-5 h-5 text-orange-400 md:block hidden" />}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center">
                        <p className="text-2xl font-gelica text-white mb-4">
                            Want to see us at your event?
                        </p>
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                            onClick={() => {
                                const element = document.getElementById('booking-form');
                                element?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Book Us Now
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
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
                            How We Elevate Events
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Choose from our signature services or let us create something custom
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {serviceTypes.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={service.value}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 h-full group">
                                        <CardHeader>
                                            <Icon className="w-12 h-12 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                                            <CardTitle className="text-2xl font-gelica text-white">
                                                {service.label}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-white/70 mb-4">
                                                {service.description}
                                            </p>
                                            <p className="text-sm text-orange-400">
                                                Ideal for: {service.idealFor}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Booking Form Section */}
            <section className="py-20 px-6" id="booking-form">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Your Event Could Be Next
                        </h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Tell us about your vision and let&apos;s create something extraordinary together
                        </p>
                    </motion.div>

                    <Card className="bg-white/5 border-white/10">
                        <CardContent className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Your Name *</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
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
                                            onChange={handleInputChange}
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
                                            onChange={handleInputChange}
                                            className="bg-white/5 border-white/10 focus:border-orange-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="company">Company/Organization</Label>
                                        <Input
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className="bg-white/5 border-white/10 focus:border-orange-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="eventType">Event Type</Label>
                                    <Select
                                        value={formData.eventType}
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, eventType: value }))}
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
                                            onChange={handleInputChange}
                                            className="bg-white/5 border-white/10 focus:border-orange-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="location">Location *</Label>
                                        <Input
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="City, State"
                                            className="bg-white/5 border-white/10 focus:border-orange-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Services Interested In</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {serviceTypes.map((service) => (
                                            <div key={service.value} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={service.value}
                                                    checked={formData.services.includes(service.value)}
                                                    onCheckedChange={() => handleServiceToggle(service.value)}
                                                />
                                                <Label
                                                    htmlFor={service.value}
                                                    className="text-sm font-normal cursor-pointer"
                                                >
                                                    {service.label}
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
                                        onChange={handleInputChange}
                                        required
                                        rows={4}
                                        placeholder="Describe your event, goals, and how you envision balloon services enhancing the experience..."
                                        className="bg-white/5 border-white/10 focus:border-orange-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="attendees">Expected Attendance</Label>
                                    <Select
                                        value={formData.attendees}
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, attendees: value }))}
                                    >
                                        <SelectTrigger className="bg-white/5 border-white/10 focus:border-orange-500">
                                            <SelectValue placeholder="Select range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="<100">Less than 100</SelectItem>
                                            <SelectItem value="100-500">100-500</SelectItem>
                                            <SelectItem value="500-1000">500-1,000</SelectItem>
                                            <SelectItem value="1000-5000">1,000-5,000</SelectItem>
                                            <SelectItem value="5000-10000">5,000-10,000</SelectItem>
                                            <SelectItem value="10000+">10,000+</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                        </CardContent>
                    </Card>

                    <div className="text-center mt-8">
                        <p className="text-white/60">
                            Questions? Email us at{' '}
                            <a href="mailto:info@aerostatic.io" className="text-orange-400 hover:text-orange-300 transition-colors">
                                info@aerostatic.io
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            <MerchCTA />

            <Footer />
        </div>
    );
}