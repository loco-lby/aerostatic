"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Camera, Play, Image as ImageIcon, Video, Calendar, MapPin, Eye, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import { config } from "@/config";

interface GalleryItem {
    id: string;
    type: 'photo' | 'video';
    title: string;
    description: string;
    category: string;
    location: string;
    date: string;
    aspectRatio: 'square' | 'portrait' | 'landscape' | 'wide';
    featured: boolean;
    views: number;
    likes: number;
}

// Placeholder gallery data
const galleryItems: GalleryItem[] = [
    {
        id: '1',
        type: 'photo',
        title: 'Sunrise Festival Display',
        description: 'Our checkered balloon creating magic at dawn during the Summer Music Festival',
        category: 'Static Displays',
        location: 'Napa Valley, CA',
        date: '2024-08-15',
        aspectRatio: 'landscape',
        featured: true,
        views: 1250,
        likes: 89
    },
    {
        id: '2',
        type: 'video',
        title: 'Brand Launch Activation',
        description: 'Cinematic coverage of a tech company product launch with aerial perspectives',
        category: 'Media Coverage',
        location: 'San Francisco, CA',
        date: '2024-07-22',
        aspectRatio: 'wide',
        featured: true,
        views: 2100,
        likes: 156
    },
    {
        id: '3',
        type: 'photo',
        title: 'VIP Tethered Experience',
        description: 'Exclusive balloon ride activation for corporate retreat guests',
        category: 'Ride Activations',
        location: 'Sonoma County, CA',
        date: '2024-09-03',
        aspectRatio: 'portrait',
        featured: false,
        views: 890,
        likes: 67
    },
    {
        id: '4',
        type: 'photo',
        title: 'Festival Crowd Shot',
        description: 'Aerial view of festival grounds with our balloon as the centerpiece',
        category: 'Media Coverage',
        location: 'Lake Tahoe, CA',
        date: '2024-06-18',
        aspectRatio: 'landscape',
        featured: false,
        views: 1580,
        likes: 112
    },
    {
        id: '5',
        type: 'video',
        title: 'Behind the Scenes',
        description: 'Time-lapse of balloon setup and inflation process',
        category: 'Content Creation',
        location: 'Paso Robles, CA',
        date: '2024-08-01',
        aspectRatio: 'square',
        featured: false,
        views: 750,
        likes: 45
    },
    {
        id: '6',
        type: 'photo',
        title: 'Golden Hour Magic',
        description: 'Stunning sunset balloon display with mountain backdrop',
        category: 'Static Displays',
        location: 'Mammoth Lakes, CA',
        date: '2024-07-10',
        aspectRatio: 'landscape',
        featured: true,
        views: 1920,
        likes: 203
    },
    {
        id: '7',
        type: 'photo',
        title: 'Custom Branded Flight',
        description: 'Specially designed balloon envelope for luxury brand campaign',
        category: 'Branded Flights',
        location: 'Monterey, CA',
        date: '2024-05-25',
        aspectRatio: 'portrait',
        featured: false,
        views: 1100,
        likes: 78
    },
    {
        id: '8',
        type: 'video',
        title: 'Multi-Day Festival',
        description: 'Highlights from a 3-day music festival activation',
        category: 'Multi-day Events',
        location: 'Santa Barbara, CA',
        date: '2024-04-12',
        aspectRatio: 'wide',
        featured: false,
        views: 2850,
        likes: 234
    },
    {
        id: '9',
        type: 'photo',
        title: 'Influencer Content',
        description: 'Social media content creation with lifestyle influencers',
        category: 'Content Creation',
        location: 'Malibu, CA',
        date: '2024-09-20',
        aspectRatio: 'square',
        featured: false,
        views: 980,
        likes: 145
    },
    {
        id: '10',
        type: 'photo',
        title: 'Corporate Team Building',
        description: 'Team building experience with balloon ride activation',
        category: 'Ride Activations',
        location: 'Napa Valley, CA',
        date: '2024-08-30',
        aspectRatio: 'landscape',
        featured: false,
        views: 650,
        likes: 42
    },
    {
        id: '11',
        type: 'video',
        title: 'Aerial Cinematography',
        description: 'Cinematic drone footage combined with balloon perspectives',
        category: 'Media Coverage',
        location: 'Big Sur, CA',
        date: '2024-06-05',
        aspectRatio: 'wide',
        featured: true,
        views: 3200,
        likes: 287
    },
    {
        id: '12',
        type: 'photo',
        title: 'Wine Country Display',
        description: 'Elegant balloon display over vineyard landscape',
        category: 'Static Displays',
        location: 'Sonoma, CA',
        date: '2024-07-28',
        aspectRatio: 'portrait',
        featured: false,
        views: 1350,
        likes: 98
    }
];

const categories = ['All', 'Static Displays', 'Ride Activations', 'Media Coverage', 'Content Creation', 'Branded Flights', 'Multi-day Events'];

export default function GalleryPage() {
    const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredItems, setFilteredItems] = useState(galleryItems);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Add structured data for the gallery
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "Aerostatic Hot Air Balloon Gallery",
            description: "Professional hot air balloon photography, aerial cinematography, and event coverage showcasing our work across the Western United States.",
            url: `${config.baseUrl}/gallery`,
            publisher: {
                "@type": "Organization",
                name: "Aerostatic",
                url: config.baseUrl,
            },
            image: galleryItems.filter(item => item.type === 'photo').map(item => ({
                "@type": "ImageObject",
                name: item.title,
                description: item.description,
                contentLocation: item.location,
                dateCreated: item.date,
                creator: {
                    "@type": "Organization",
                    name: "Aerostatic",
                },
            })),
            video: galleryItems.filter(item => item.type === 'video').map(item => ({
                "@type": "VideoObject",
                name: item.title,
                description: item.description,
                contentLocation: item.location,
                uploadDate: item.date,
                creator: {
                    "@type": "Organization",
                    name: "Aerostatic",
                },
            })),
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
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

        const items = document.querySelectorAll('[data-animate]');
        items.forEach((item) => {
            if (observerRef.current) {
                observerRef.current.observe(item);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [filteredItems]);

    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredItems(galleryItems);
        } else {
            setFilteredItems(galleryItems.filter(item => item.category === selectedCategory));
        }
    }, [selectedCategory]);

    const getAspectRatioClass = (aspectRatio: string) => {
        switch (aspectRatio) {
            case 'square': return 'aspect-square';
            case 'portrait': return 'aspect-[3/4]';
            case 'landscape': return 'aspect-[4/3]';
            case 'wide': return 'aspect-[16/9]';
            default: return 'aspect-[4/3]';
        }
    };

    const getGridSpanClass = (aspectRatio: string, featured: boolean) => {
        if (featured) {
            return 'md:col-span-2 md:row-span-2';
        }
        switch (aspectRatio) {
            case 'wide': return 'md:col-span-2';
            case 'portrait': return 'md:row-span-2';
            default: return '';
        }
    };

    return (
        <div className="min-h-screen bg-black">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-60 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-900/10 to-transparent"></div>

                <div className="relative z-10 max-w-6xl mx-auto text-center">
                    <Badge variant="outline" className="border-orange-500/30 text-orange-400 mb-6 animate-glow-pulse">
                        Our Work
                    </Badge>
                    <h1 className="hero-text text-white mb-6 animate-fade-in-up">
                        Gallery
                    </h1>
                    <p className="subhead-text my-12 max-w-4xl mx-auto animate-fade-in-up animation-delay-300">
                        From sunrise displays to cinematic coverage, explore the magic we create from sky-high perspectives.
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                onClick={() => setSelectedCategory(category)}
                                className={`transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white cinematic-glow'
                                    : 'border-white/30 text-white hover:bg-white/10 backdrop-blur-sm'
                                    }`}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-max">
                        {filteredItems.map((item, index) => (
                            <Card
                                key={item.id}
                                id={`gallery-item-${item.id}`}
                                data-animate
                                className={`glass hover:glass-warm smooth-transition hover-lift group overflow-hidden ${getGridSpanClass(item.aspectRatio, item.featured)} ${isVisible[`gallery-item-${item.id}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                                    }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <CardContent className="p-0 relative">
                                    {/* Placeholder Image/Video */}
                                    <div className={`relative ${getAspectRatioClass(item.aspectRatio)} bg-gradient-to-br from-orange-900/20 to-red-900/20 overflow-hidden`}>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {item.type === 'video' ? (
                                                <div className="relative">
                                                    <Video className="w-16 h-16 text-white/60" />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <Play className="w-8 h-8 text-white/80" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <ImageIcon className="w-16 h-16 text-white/60" />
                                            )}
                                        </div>

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="flex gap-3">
                                                <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/20">
                                                    <Eye className="w-4 h-4 mr-1" />
                                                    {item.views}
                                                </Button>
                                                <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/20">
                                                    <Heart className="w-4 h-4 mr-1" />
                                                    {item.likes}
                                                </Button>
                                                <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/20">
                                                    <Share2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Featured Badge */}
                                        {item.featured && (
                                            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-600 text-white">
                                                Featured
                                            </Badge>
                                        )}

                                        {/* Type Badge */}
                                        <Badge variant="outline" className="absolute top-3 right-3 border-white/30 text-white bg-black/50 backdrop-blur-sm">
                                            {item.type === 'video' ? (
                                                <>
                                                    <Video className="w-3 h-3 mr-1" />
                                                    Video
                                                </>
                                            ) : (
                                                <>
                                                    <Camera className="w-3 h-3 mr-1" />
                                                    Photo
                                                </>
                                            )}
                                        </Badge>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="mb-3">
                                            <Badge variant="outline" className="border-orange-500/30 text-orange-400 text-xs mb-2">
                                                {item.category}
                                            </Badge>
                                            <h3 className="text-lg font-gelica font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-white/70 text-sm leading-relaxed mb-4">
                                                {item.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-white/50">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                <span>{item.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>{new Date(item.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-20">
                            <ImageIcon className="w-16 h-16 text-white/30 mx-auto mb-4" />
                            <h3 className="text-xl font-gelica text-white mb-2">No items found</h3>
                            <p className="text-white/60">Try selecting a different category</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-gelica font-bold mb-6">
                        Ready to Create Your Own Story?
                    </h2>
                    <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Let&apos;s capture your next event from a perspective that will leave everyone looking up.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            size="lg"
                            className="text-lg px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 cinematic-glow font-semibold hover-lift"
                            asChild
                        >
                            <Link href="/hire-us">
                                Start Your Project
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="text-lg px-10 py-4 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover-lift"
                            asChild
                        >
                            <Link href="/services">View Our Services</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
} 