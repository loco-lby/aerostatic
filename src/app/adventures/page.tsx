'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { Adventure } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Heart, MessageCircle, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from "next/image";

export default function AdventuresPage() {
    const [adventures, setAdventures] = useState<Adventure[]>([]);
    const [filteredAdventures, setFilteredAdventures] = useState<Adventure[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [difficultyFilter, setDifficultyFilter] = useState('all');

    useEffect(() => {
        const loadAdventures = async () => {
            try {
                const { data, error } = await supabase
                    .from('adventures')
                    .select('*')
                    .eq('status', 'published')
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Error loading adventures:', error);
                } else {
                    setAdventures(data || []);
                    setFilteredAdventures(data || []);
                }
            } catch (error) {
                console.error('Error loading adventures:', error);
            } finally {
                setLoading(false);
            }
        };

        loadAdventures();
    }, []);

    useEffect(() => {
        let filtered = adventures;

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(adventure =>
                adventure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                adventure.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                adventure.start_location_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                adventure.end_location_name?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by type
        if (typeFilter !== 'all') {
            filtered = filtered.filter(adventure => adventure.type === typeFilter);
        }

        // Filter by difficulty
        if (difficultyFilter !== 'all') {
            const difficultyRange = getDifficultyRange(difficultyFilter);
            filtered = filtered.filter(adventure =>
                adventure.difficulty_score >= difficultyRange.min &&
                adventure.difficulty_score <= difficultyRange.max
            );
        }

        setFilteredAdventures(filtered);
    }, [adventures, searchQuery, typeFilter, difficultyFilter]);

    const getDifficultyRange = (filter: string) => {
        switch (filter) {
            case 'easy': return { min: 1, max: 3 };
            case 'moderate': return { min: 4, max: 6 };
            case 'hard': return { min: 7, max: 8 };
            case 'extreme': return { min: 9, max: 10 };
            default: return { min: 1, max: 10 };
        }
    };

    const getDifficultyBadge = (score: number) => {
        if (score <= 3) return <Badge className="bg-green-600 text-white">Easy ({score}/10)</Badge>;
        if (score <= 6) return <Badge className="bg-yellow-600 text-white">Moderate ({score}/10)</Badge>;
        if (score <= 8) return <Badge className="bg-red-600 text-white">Hard ({score}/10)</Badge>;
        return <Badge className="bg-purple-600 text-white">Extreme ({score}/10)</Badge>;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-gelica font-bold text-white mb-6">
                        Adventure <span className="text-gradient">Catalog</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Discover epic adventures shared by our community. From completed expeditions
                        to inspiring ideas waiting to be explored.
                    </p>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                            placeholder="Search adventures..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-slate-800 border-slate-700 text-white"
                        />
                    </div>

                    <div className="flex">
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white rounded-md"
                        >
                            <option value="all">All Types</option>
                            <option value="completed">Completed</option>
                            <option value="idea">Ideas</option>
                        </select>
                    </div>

                    <div className="flex">
                        <select
                            value={difficultyFilter}
                            onChange={(e) => setDifficultyFilter(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white rounded-md"
                        >
                            <option value="all">All Difficulties</option>
                            <option value="easy">Easy (1-3)</option>
                            <option value="moderate">Moderate (4-6)</option>
                            <option value="hard">Hard (7-8)</option>
                            <option value="extreme">Extreme (9-10)</option>
                        </select>
                    </div>

                    <Button asChild>
                        <Link href="/submit">
                            <Filter className="w-4 h-4 mr-2" />
                            Add Adventure
                        </Link>
                    </Button>
                </div>

                {/* Results count */}
                <div className="mb-6">
                    <p className="text-slate-400">
                        Showing {filteredAdventures.length} of {adventures.length} adventures
                    </p>
                </div>

                {/* Adventures Grid */}
                {filteredAdventures.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-12 h-12 text-slate-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                            {searchQuery || typeFilter !== 'all' || difficultyFilter !== 'all'
                                ? 'No Adventures Found'
                                : 'No Adventures Yet'
                            }
                        </h3>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">
                            {searchQuery || typeFilter !== 'all' || difficultyFilter !== 'all'
                                ? 'Try adjusting your filters to find more adventures.'
                                : 'Be the first to share an adventure with our community!'
                            }
                        </p>
                        <Button asChild>
                            <Link href="/submit">Submit First Adventure</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAdventures.map((adventure) => (
                            <Link key={adventure.id} href={`/adventures/${adventure.slug}`}>
                                <Card className="glass-dark hover:border-orange-500 transition-all duration-300 h-full">
                                    {adventure.featured_image_url && (
                                        <div className="aspect-video rounded-t-lg overflow-hidden">
                                            <Image
                                                src={adventure.featured_image_url}
                                                alt={adventure.title}
                                                width={400}
                                                height={300}
                                                className="w-full h-48 object-cover"
                                            />
                                        </div>
                                    )}

                                    <CardHeader>
                                        <div className="flex items-start justify-between mb-2">
                                            <Badge variant={adventure.type === 'completed' ? 'default' : 'secondary'}>
                                                {adventure.type === 'completed' ? 'Completed' : 'Idea'}
                                            </Badge>
                                            {getDifficultyBadge(adventure.difficulty_score)}
                                        </div>

                                        <CardTitle className="text-white line-clamp-2">
                                            {adventure.title}
                                        </CardTitle>

                                        <CardDescription className="text-slate-300 line-clamp-3">
                                            {adventure.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="space-y-3">
                                            {/* Location */}
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <MapPin className="w-4 h-4" />
                                                <span>
                                                    {adventure.start_location_name}
                                                    {adventure.end_location_name && adventure.end_location_name !== adventure.start_location_name &&
                                                        ` → ${adventure.end_location_name}`
                                                    }
                                                </span>
                                            </div>

                                            {/* Duration */}
                                            {adventure.estimated_duration_days && (
                                                <div className="text-sm text-slate-400">
                                                    Duration: {adventure.estimated_duration_days} days
                                                </div>
                                            )}

                                            {/* Stats */}
                                            <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                                                <div className="flex items-center gap-4 text-sm text-slate-400">
                                                    <div className="flex items-center gap-1">
                                                        <Heart className="w-4 h-4" />
                                                        {adventure.encouragements_count}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MessageCircle className="w-4 h-4" />
                                                        {adventure.comments_count}
                                                    </div>
                                                </div>

                                                <div className="text-xs text-slate-400">
                                                    Score: {adventure.adventure_score}/10
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
} 