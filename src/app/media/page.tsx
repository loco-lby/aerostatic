"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Film, ExternalLink, AlertCircle, RefreshCw, Info } from "lucide-react";
import Link from "next/link";
import { useContent } from "@/hooks/useContent";
import { useState, useEffect } from "react";

// Instagram Types
interface InstagramPost {
    node: {
        shortcode: string;
        display_url: string;
        thumbnail_src: string;
        edge_media_to_caption: {
            edges: Array<{
                node: {
                    text: string;
                }
            }>
        };
        taken_at_timestamp: number;
        is_video: boolean;
    };
}

// Instagram Feed Component
function InstagramFeed({ instagramPosts, error, onRetry, isDemoData }: {
    instagramPosts: InstagramPost[],
    error: string | null,
    onRetry: () => void,
    isDemoData: boolean
}) {
    if (error) {
        return (
            <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-orange-500/50 mx-auto mb-4" />
                <p className="text-white/70 mb-4">Unable to load Instagram content</p>
                <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">{error}</p>
                <Button
                    onClick={onRetry}
                    variant="outline"
                    className="border-orange-400/30 text-orange-400 hover:bg-orange-400/10"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                </Button>
            </div>
        );
    }

    if (!instagramPosts || instagramPosts.length === 0) {
        return (
            <div className="text-center py-12">
                <Film className="w-16 h-16 text-orange-500/50 mx-auto mb-4" />
                <p className="text-white/70 mb-4">No Instagram content available at the moment.</p>
                <p className="text-white/50 text-sm">Check back soon for updates!</p>
            </div>
        );
    }

    return (
        <>
            {isDemoData && (
                <div className="mb-8 p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-orange-200 text-sm font-medium mb-1">Demo Content</p>
                            <p className="text-orange-200/70 text-xs">
                                Currently showing demo content. For production, implement Instagram Basic Display API integration.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {instagramPosts.slice(0, 9).map(({ node }, i) => {
                    const caption = node.edge_media_to_caption.edges[0]?.node.text || '';
                    const cleanCaption = caption.replace(/(#\w+)+/g, '').trim();

                    return (
                        <div key={i} className="group relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-orange-900/20 to-red-900/20">
                            <img
                                src={node.display_url || node.thumbnail_src}
                                alt={cleanCaption || 'Instagram post'}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-white text-sm line-clamp-2 mb-3">
                                        {cleanCaption}
                                    </p>
                                    <a
                                        href={isDemoData ? "https://www.instagram.com/aerostatic.io/" : `https://www.instagram.com/p/${node.shortcode}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        {isDemoData ? "Visit Instagram" : "View on Instagram"}
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                            {node.is_video && (
                                <div className="absolute top-3 right-3">
                                    <div className="bg-black/50 rounded-full p-1.5">
                                        <Play className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

// Function to fetch Instagram posts from API route
async function getInstagramPosts(): Promise<{ posts: InstagramPost[], error: string | null, isDemoData: boolean }> {
    try {
        const response = await fetch('/api/instagram');
        const data = await response.json();

        if (data.success && data.posts) {
            return {
                posts: data.posts,
                error: null,
                isDemoData: !!data.note
            };
        }

        return {
            posts: [],
            error: data.error || 'Failed to fetch Instagram posts',
            isDemoData: false
        };
    } catch (error) {
        console.error('Failed to fetch Instagram posts:', error);
        return {
            posts: [],
            error: 'Network error - please check your connection',
            isDemoData: false
        };
    }
}

export default function FilmsPage() {
    const content = useContent();
    const filmsPillar = content.home.pillars.find(p => p.id === 'media');
    const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDemoData, setIsDemoData] = useState(false);

    const fetchPosts = async () => {
        setIsLoading(true);
        setError(null);
        const { posts, error: fetchError, isDemoData: isDemo } = await getInstagramPosts();
        setInstagramPosts(posts);
        setError(fetchError);
        setIsDemoData(isDemo);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-black">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 my-48">
                <div className="container mx-auto max-w-4xl text-center">
                    <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6">
                        02
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-gelica font-bold text-white mb-6">
                        {filmsPillar?.title}
                    </h1>
                    <p className="text-2xl md:text-3xl text-orange-400 font-medium mb-8">
                        {filmsPillar?.content}
                    </p>
                    <p className="text-lg text-white/70 max-w-3xl mx-auto">
                        {filmsPillar?.description}
                    </p>
                </div>
            </section>

            {/* Instagram Timeline Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-gelica font-bold text-white mb-6">
                            Living Record of a Disappearing Craft
                        </h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
                            From pre-dawn launches to post-flight breakdowns. We document reality, not manufacture vibes.
                        </p>
                        <a
                            href="https://www.instagram.com/aerostatic.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium transition-colors"
                        >
                            Follow us on Instagram
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-white/70">Loading Instagram content...</p>
                        </div>
                    ) : (
                        <InstagramFeed
                            instagramPosts={instagramPosts}
                            error={error}
                            onRetry={fetchPosts}
                            isDemoData={isDemoData}
                        />
                    )}

                    {instagramPosts.length > 9 && !error && (
                        <div className="text-center mt-12">
                            <a
                                href="https://www.instagram.com/aerostatic.io/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-300"
                            >
                                View More on Instagram
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
} 