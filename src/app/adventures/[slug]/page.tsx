'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { Adventure, User, Comment } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Heart, MessageCircle, Calendar, Share2, Bookmark, Trophy, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import Image from "next/image";

export default function AdventureDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [adventure, setAdventure] = useState<Adventure | null>(null);
    const [creator, setCreator] = useState<User | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEncouraged, setIsEncouraged] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);
    const [encouragingLoading, setEncouragingLoading] = useState(false);

    useEffect(() => {
        const loadAdventure = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                // Load current user if logged in
                if (session) {
                    const { data: userProfile } = await supabase
                        .from('users')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    if (userProfile) {
                        setCurrentUser(userProfile);
                    }
                }

                // Load adventure
                const { data: adventureData, error: adventureError } = await supabase
                    .from('adventures')
                    .select('*')
                    .eq('slug', params.slug)
                    .eq('status', 'published')
                    .single();

                if (adventureError || !adventureData) {
                    console.error('Adventure not found:', adventureError);
                    router.push('/adventures');
                    return;
                }

                setAdventure(adventureData);

                // Load creator info
                const { data: creatorData } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', adventureData.creator_id)
                    .single();

                if (creatorData) {
                    setCreator(creatorData);
                }

                // Load comments
                const { data: commentsData } = await supabase
                    .from('comments')
                    .select(`
            *,
            users!comments_author_id_fkey(username, avatar_url, role)
          `)
                    .eq('adventure_id', adventureData.id)
                    .order('created_at', { ascending: false });

                if (commentsData) {
                    setComments(commentsData);
                }

                // Check if user has encouraged this adventure
                if (session) {
                    const { data: encouragementData } = await supabase
                        .from('encouragements')
                        .select('id')
                        .eq('user_id', session.user.id)
                        .eq('adventure_id', adventureData.id)
                        .single();

                    setIsEncouraged(!!encouragementData);

                    // Check if user has saved this adventure
                    const { data: savedData } = await supabase
                        .from('saved_adventures')
                        .select('id')
                        .eq('user_id', session.user.id)
                        .eq('adventure_id', adventureData.id)
                        .single();

                    setIsSaved(!!savedData);
                }

            } catch (error) {
                console.error('Error loading adventure:', error);
                router.push('/adventures');
            } finally {
                setLoading(false);
            }
        };

        if (params.slug) {
            loadAdventure();
        }
    }, [params.slug, router]);

    const handleEncourage = async () => {
        if (!currentUser || !adventure) return;

        setEncouragingLoading(true);

        try {
            if (isEncouraged) {
                // Remove encouragement
                await supabase
                    .from('encouragements')
                    .delete()
                    .eq('user_id', currentUser.id)
                    .eq('adventure_id', adventure.id);

                setIsEncouraged(false);
                setAdventure(prev => prev ? {
                    ...prev,
                    encouragements_count: prev.encouragements_count - 1
                } : null);
            } else {
                // Add encouragement
                await supabase
                    .from('encouragements')
                    .insert({
                        user_id: currentUser.id,
                        adventure_id: adventure.id
                    });

                setIsEncouraged(true);
                setAdventure(prev => prev ? {
                    ...prev,
                    encouragements_count: prev.encouragements_count + 1
                } : null);
            }
        } catch (error) {
            console.error('Error toggling encouragement:', error);
        } finally {
            setEncouragingLoading(false);
        }
    };

    const handleSubmitComment = async () => {
        if (!currentUser || !adventure || !newComment.trim()) return;

        setSubmittingComment(true);

        try {
            const { data: commentData, error } = await supabase
                .from('comments')
                .insert({
                    adventure_id: adventure.id,
                    author_id: currentUser.id,
                    content: newComment.trim()
                })
                .select(`
          *,
          users!comments_author_id_fkey(username, avatar_url, role)
        `)
                .single();

            if (error) throw error;

            setComments(prev => [commentData, ...prev]);
            setNewComment('');

            // Update comment count
            setAdventure(prev => prev ? {
                ...prev,
                comments_count: prev.comments_count + 1
            } : null);

        } catch (error) {
            console.error('Error submitting comment:', error);
        } finally {
            setSubmittingComment(false);
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

    if (!adventure) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-4xl font-gelica font-bold text-white mb-4">Adventure Not Found</h1>
                    <p className="text-slate-400 mb-8">The adventure you&apos;re looking for doesn&apos;t exist.</p>
                    <Button asChild>
                        <Link href="/adventures">Browse Adventures</Link>
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Hero Section */}
                {adventure.featured_image_url && (
                    <div className="aspect-video rounded-xl overflow-hidden mb-8">
                        <Image
                            src={adventure.featured_image_url}
                            alt={adventure.title}
                            className="w-full h-full object-cover"
                            width={800}
                            height={400}
                        />
                    </div>
                )}

                {/* Adventure Header */}
                <div className="mb-8">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge variant={adventure.type === 'completed' ? 'default' : 'secondary'}>
                                {adventure.type === 'completed' ? 'Completed' : 'Idea'}
                            </Badge>
                            {getDifficultyBadge(adventure.difficulty_score)}
                            <Badge variant="outline" className="text-orange-500 border-orange-500">
                                Score: {adventure.adventure_score}/10
                            </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleEncourage}
                                disabled={!currentUser || encouragingLoading}
                                className={isEncouraged ? 'bg-red-600 hover:bg-red-700 text-white' : ''}
                            >
                                <Heart className={`w-4 h-4 mr-1 ${isEncouraged ? 'fill-current' : ''}`} />
                                {adventure.encouragements_count}
                            </Button>

                            <Button variant="outline" size="sm">
                                <Share2 className="w-4 h-4 mr-1" />
                                Share
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                className={isSaved ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
                            >
                                <Bookmark className={`w-4 h-4 mr-1 ${isSaved ? 'fill-current' : ''}`} />
                                {isSaved ? 'Saved' : 'Save'}
                            </Button>
                        </div>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-gelica font-bold text-white mb-4">
                        {adventure.title}
                    </h1>

                    <div className="flex items-center gap-6 text-slate-300 mb-6">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            <span>
                                {adventure.start_location_name}
                                {adventure.end_location_name && adventure.end_location_name !== adventure.start_location_name &&
                                    ` → ${adventure.end_location_name}`
                                }
                            </span>
                        </div>

                        {adventure.estimated_duration_days && (
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                <span>{adventure.estimated_duration_days} days</span>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <MessageCircle className="w-5 h-5" />
                            <span>{adventure.comments_count} comments</span>
                        </div>
                    </div>

                    {/* Creator Info */}
                    {creator && (
                        <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold">
                                {creator.avatar_url ? (
                                    <Image
                                        src={creator.avatar_url}
                                        alt={creator.username}
                                        className="w-full h-full rounded-full object-cover"
                                        width={48}
                                        height={48}
                                    />
                                ) : (
                                    creator.username?.[0]?.toUpperCase()
                                )}
                            </div>
                            <div>
                                <div className="font-semibold text-white">
                                    {creator.full_name || `@${creator.username}`}
                                </div>
                                <div className="text-sm text-slate-400">
                                    {creator.completed_adventures_count} adventures completed
                                </div>
                            </div>
                            <div className="ml-auto">
                                <Badge className="bg-blue-600 text-white">
                                    {creator.role.replace('_', ' ')}
                                </Badge>
                            </div>
                        </div>
                    )}
                </div>

                {/* Adventure Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card className="glass-dark mb-8">
                            <CardHeader>
                                <CardTitle className="text-white">Description</CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-invert max-w-none">
                                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                                    {adventure.description}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Success Metrics */}
                        {adventure.success_metrics && adventure.success_metrics.length > 0 && (
                            <Card className="glass-dark mb-8">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center gap-2">
                                        <Trophy className="w-5 h-5" />
                                        Success Criteria
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {adventure.success_metrics.map((metric, index) => (
                                            <li key={index} className="flex items-start gap-2 text-slate-300">
                                                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                                                {metric}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        {/* Comments Section */}
                        <Card className="glass-dark">
                            <CardHeader>
                                <CardTitle className="text-white">Community Discussion</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* Comment Form */}
                                {currentUser ? (
                                    <div className="mb-6">
                                        <Textarea
                                            placeholder="Share your thoughts or ask questions..."
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            className="bg-slate-800 border-slate-700 text-white mb-3"
                                            rows={3}
                                        />
                                        <Button
                                            onClick={handleSubmitComment}
                                            disabled={!newComment.trim() || submittingComment}
                                        >
                                            {submittingComment ? 'Posting...' : 'Post Comment'}
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="mb-6 p-4 bg-slate-800/50 rounded-lg text-center">
                                        <p className="text-slate-400 mb-3">Sign in to join the discussion</p>
                                        <Button variant="outline" size="sm">
                                            Sign In
                                        </Button>
                                    </div>
                                )}

                                {/* Comments List */}
                                <div className="space-y-4">
                                    {comments.length === 0 ? (
                                        <p className="text-slate-400 text-center py-8">
                                            No comments yet. Be the first to share your thoughts!
                                        </p>
                                    ) : (
                                        comments.map((comment) => (
                                            <div key={comment.id} className="border-b border-slate-700 pb-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                                        {comment.author?.avatar_url ? (
                                                            <Image
                                                                src={comment.author.avatar_url}
                                                                alt={comment.author.username}
                                                                className="w-full h-full rounded-full object-cover"
                                                                width={32}
                                                                height={32}
                                                            />
                                                        ) : (
                                                            comment.author?.username?.[0]?.toUpperCase()
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="font-semibold text-white">
                                                                @{comment.author?.username}
                                                            </span>
                                                            <span className="text-xs text-slate-400">
                                                                {new Date(comment.created_at).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <p className="text-slate-300 whitespace-pre-wrap">
                                                            {comment.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="glass-dark">
                            <CardHeader>
                                <CardTitle className="text-white">Adventure Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-400">Type</label>
                                    <p className="text-white">{adventure.type === 'completed' ? 'Completed Adventure' : 'Adventure Idea'}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-400">Difficulty</label>
                                    <p className="text-white">{adventure.difficulty_score}/10</p>
                                </div>

                                {adventure.start_date && (
                                    <div>
                                        <label className="text-sm font-medium text-slate-400">
                                            {adventure.type === 'completed' ? 'Completed Date' : 'Planned Date'}
                                        </label>
                                        <p className="text-white">
                                            {new Date(adventure.start_date).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}

                                {adventure.tags && adventure.tags.length > 0 && (
                                    <div>
                                        <label className="text-sm font-medium text-slate-400">Tags</label>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {adventure.tags.map((tag, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="text-sm font-medium text-slate-400">Stats</label>
                                    <div className="space-y-2 mt-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">Encouragements</span>
                                            <span className="text-white">{adventure.encouragements_count}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">Comments</span>
                                            <span className="text-white">{adventure.comments_count}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">Saves</span>
                                            <span className="text-white">{adventure.saved_count}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
} 