"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
    ArrowRight,
    Play,
    Film,
    ExternalLink,
    AlertCircle,
    RefreshCw,
    Info,
    Calendar,
    MapPin,
    Wind,
    Thermometer,
    Clock,
    Camera
} from "lucide-react";
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

// Field Report Component - Styled like mission logs
function FieldReport({ post, index }: { post: InstagramPost, index: number }) {
    const { node } = post;
    const caption = node.edge_media_to_caption.edges[0]?.node.text || '';
    const cleanCaption = caption.replace(/(#\w+)+/g, '').trim();
    const timestamp = new Date(node.taken_at_timestamp * 1000);

    // Extract location from hashtags or caption
    const locationMatch = caption.match(/#(\w+)/);
    const location = locationMatch ? locationMatch[1] : 'UNDISCLOSED';

    return (
        <div className="border border-orange-500/20 bg-black/50 p-4 font-mono text-sm">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <div className="text-orange-500 text-xs mb-1">FIELD REPORT #{String(index + 1).padStart(3, '0')}</div>
                    <div className="text-white/50 text-xs">{timestamp.toISOString().split('T')[0]}</div>
                </div>
                <Badge variant="outline" className="border-orange-500/30 text-orange-400 text-xs font-mono">
                    {node.is_video ? 'VIDEO LOG' : 'PHOTO LOG'}
                </Badge>
            </div>

            <div className="relative aspect-square mb-3 border border-white/10 overflow-hidden">
                <Image
                    src={node.display_url || node.thumbnail_src}
                    alt={`Field Report ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {node.is_video && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Play className="w-12 h-12 text-white/80" />
                    </div>
                )}
            </div>

            <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-white/50">
                    <MapPin className="w-3 h-3" />
                    <span>LOCATION: {location.toUpperCase()}</span>
                </div>
                <div className="text-white/70 line-clamp-2">
                    NOTES: {cleanCaption || 'NO ADDITIONAL NOTES'}
                </div>
            </div>

            <a
                href={`https://www.instagram.com/p/${node.shortcode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-orange-400 hover:text-orange-300 text-xs font-mono transition-colors"
            >
                ACCESS FULL LOG <ExternalLink className="w-3 h-3" />
            </a>
        </div>
    );
}

// Mission Status Component
function MissionStatus() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="border border-orange-500/30 bg-black/80 p-6 font-mono text-sm mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-orange-500 font-bold">MISSION STATUS</h3>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-500 text-xs">OPERATIONAL</span>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <div className="text-white/50 text-xs mb-1">UTC TIME</div>
                    <div className="text-white font-bold">{time.toUTCString().split(' ')[4]}</div>
                </div>
                <div>
                    <div className="text-white/50 text-xs mb-1">ACTIVE MISSIONS</div>
                    <div className="text-white font-bold">03</div>
                </div>
                <div>
                    <div className="text-white/50 text-xs mb-1">LOGS RECORDED</div>
                    <div className="text-white font-bold">247</div>
                </div>
                <div>
                    <div className="text-white/50 text-xs mb-1">FLIGHT HOURS</div>
                    <div className="text-white font-bold">1,842</div>
                </div>
            </div>
        </div>
    );
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
                <p className="text-white/70 mb-4 font-mono">TRANSMISSION ERROR</p>
                <p className="text-white/50 text-sm mb-6 max-w-md mx-auto font-mono">{error}</p>
                <Button
                    onClick={onRetry}
                    variant="outline"
                    className="border-orange-400/30 text-orange-400 hover:bg-orange-400/10 font-mono"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    RETRY
                </Button>
            </div>
        );
    }

    if (!instagramPosts || instagramPosts.length === 0) {
        return (
            <div className="text-center py-12">
                <Film className="w-16 h-16 text-orange-500/50 mx-auto mb-4" />
                <p className="text-white/70 mb-4 font-mono">NO FIELD REPORTS AVAILABLE</p>
                <p className="text-white/50 text-sm font-mono">CHECK BACK AFTER NEXT MISSION WINDOW</p>
            </div>
        );
    }

    return (
        <>
            {isDemoData && (
                <div className="mb-8 p-4 bg-yellow-900/10 border border-yellow-500/30 font-mono text-xs">
                    <div className="flex items-start gap-3">
                        <Info className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-yellow-400 font-bold mb-1">SIMULATION MODE ACTIVE</p>
                            <p className="text-yellow-400/70">
                                Currently displaying test data. Production system requires Instagram Basic Display API credentials.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {instagramPosts.slice(0, 9).map((post, i) => (
                    <FieldReport key={i} post={post} index={i} />
                ))}
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

export default function StoriesPage() {
    const content = useContent();
    const [time, setTime] = useState(new Date());
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

            {/* Hero Section - Mission Control Style */}
            <section className="pt-32 pb-20 px-6 border-b border-orange-500/20">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge variant="outline" className="text-orange-400 border-orange-400/30 mb-6 font-mono">
                                02 / FIELD OPERATIONS
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-mono">
                                FIELD<br />DISPATCHES
                            </h1>
                            <p className="text-xl text-orange-400 font-medium mb-8 font-mono">
                                REAL-TIME DOCUMENTATION FROM ACTIVE OPERATIONS
                            </p>
                            <p className="text-lg text-white/70 mb-8 font-mono leading-relaxed">
                                Ground truth from the field. No filters, no edits, no bullshit.
                                Just raw operational data from crews who wake up at 0400 to chase wind windows.
                            </p>
                            <div className="flex flex-wrap gap-4 text-xs font-mono text-white/50">
                                <div className="flex items-center gap-2">
                                    <Camera className="w-4 h-4" />
                                    <span>VISUAL LOGS</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Wind className="w-4 h-4" />
                                    <span>WEATHER DATA</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>GPS TAGGED</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <MissionStatus />

                            <div className="border border-orange-500/30 bg-black/50 p-6 font-mono text-sm">
                                <h3 className="text-orange-500 font-bold mb-3">LATEST TRANSMISSION</h3>
                                <div className="space-y-2 text-xs">
                                    <div className="text-white/70">
                                        <span className="text-white/50">FROM:</span> AEROSTATIC FIELD TEAM ALPHA
                                    </div>
                                    <div className="text-white/70">
                                        <span className="text-white/50">SUBJECT:</span> PRE-DAWN INFLATION SEQUENCE INITIATED
                                    </div>
                                    <div className="text-white/70">
                                        <span className="text-white/50">CONDITIONS:</span> WINDS 3-5KTS, VIS UNLIMITED, TEMP 52F
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Field Reports Grid */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
                            MISSION LOG ARCHIVE
                        </h2>
                        <p className="text-white/70 font-mono text-sm">
                            CHRONOLOGICAL RECORD OF FIELD OPERATIONS • UNCLASSIFIED
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center gap-3 text-orange-400 font-mono">
                                <div className="animate-spin w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full"></div>
                                <span>RETRIEVING FIELD DATA...</span>
                            </div>
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
                                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-black px-6 py-3 font-mono font-bold text-sm transition-colors"
                            >
                                ACCESS FULL ARCHIVE <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    )}
                </div>
            </section>

            {/* Additional Mission Intel Section */}
            <section className="py-20 px-6 border-t border-orange-500/20">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-mono text-center">
                        OPERATIONAL PHILOSOPHY
                    </h2>
                    <div className="space-y-6 font-mono text-sm">
                        <div className="border border-orange-500/30 bg-black/50 p-6">
                            <h3 className="text-orange-500 font-bold mb-3">DOCUMENTATION PROTOCOL</h3>
                            <p className="text-white/70 leading-relaxed">
                                Every launch, every landing, every weather hold. We document the reality of
                                operating at the edge of the atmosphere. No staged shots, no retakes.
                                This is what it actually looks like when you&apos;re chasing thermals at dawn.
                            </p>
                        </div>

                        <div className="border border-orange-500/30 bg-black/50 p-6">
                            <h3 className="text-orange-500 font-bold mb-3">FIELD TEAM COMPOSITION</h3>
                            <ul className="space-y-2 text-white/70">
                                <li>• PILOT IN COMMAND - Third generation aeronaut, 2000+ hours</li>
                                <li>• CHASE CREW CHIEF - Ground ops, recovery, weather tracking</li>
                                <li>• VISUAL SYSTEMS OPERATOR - Documentation, real-time capture</li>
                                <li>• SAFETY OFFICER - Risk assessment, emergency response</li>
                            </ul>
                        </div>

                        <div className="border border-orange-500/30 bg-black/50 p-6">
                            <h3 className="text-orange-500 font-bold mb-3">TRANSMISSION FREQUENCY</h3>
                            <p className="text-white/70 leading-relaxed">
                                Field reports transmitted when conditions permit. Expect increased activity during:
                                Morning launches (0500-0800 LOCAL), Evening flights (1700-SUNSET),
                                Festival operations, and weather windows.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
} 