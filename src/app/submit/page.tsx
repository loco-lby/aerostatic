'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { User } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Trophy, Upload, Eye, Save } from 'lucide-react';

type AdventureFormData = {
    title: string;
    description: string;
    type: 'idea' | 'completed';
    start_location_name: string;
    start_latitude: number;
    start_longitude: number;
    end_location_name: string;
    end_latitude?: number;
    end_longitude?: number;
    is_journey: boolean;
    estimated_duration_days?: number;
    start_date?: string;
    end_date?: string;
    difficulty_score: number;
    success_metrics: string[];
    tags: string[];
    featured_image_url?: string;
    completion_evidence_url?: string;
    completion_date?: string;
    gps_track_url?: string;
};

export default function SubmitAdventurePage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState<AdventureFormData>({
        title: '',
        description: '',
        type: 'idea',
        start_location_name: '',
        start_latitude: 0,
        start_longitude: 0,
        end_location_name: '',
        is_journey: false,
        difficulty_score: 5,
        success_metrics: [''],
        tags: [],
        estimated_duration_days: 1,
    });
    const [newTag, setNewTag] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (!session) {
                    router.push('/');
                    return;
                }

                const { data: userProfile } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (userProfile) {
                    setUser(userProfile);
                } else {
                    router.push('/');
                }
            } catch (error) {
                console.error('Error checking auth:', error);
                router.push('/');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.start_location_name.trim()) {
            newErrors.start_location_name = 'Start location is required';
        }

        if (formData.difficulty_score < 1 || formData.difficulty_score > 10) {
            newErrors.difficulty_score = 'Difficulty must be between 1 and 10';
        }

        if (formData.type === 'completed' && !formData.completion_date) {
            newErrors.completion_date = 'Completion date is required for completed adventures';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleSubmit = async (isDraft: boolean = false) => {
        if (!validateForm() && !isDraft) return;
        if (!user) return;

        setSubmitting(true);

        try {
            const slug = generateSlug(formData.title);

            // Check if slug already exists
            const { data: existingAdventure } = await supabase
                .from('adventures')
                .select('id')
                .eq('slug', slug)
                .single();

            const finalSlug = existingAdventure ? `${slug}-${Date.now()}` : slug;

            const adventureData = {
                title: formData.title,
                slug: finalSlug,
                description: formData.description,
                type: formData.type,
                status: isDraft ? 'draft' : 'published',
                creator_id: user.id,
                is_journey: formData.is_journey,
                start_location_name: formData.start_location_name,
                start_latitude: formData.start_latitude,
                start_longitude: formData.start_longitude,
                end_location_name: formData.end_location_name || formData.start_location_name,
                end_latitude: formData.end_latitude || formData.start_latitude,
                end_longitude: formData.end_longitude || formData.start_longitude,
                estimated_duration_days: formData.estimated_duration_days,
                start_date: formData.start_date,
                end_date: formData.end_date,
                difficulty_score: formData.difficulty_score,
                adventure_score: 0, // Default, can be updated by moderators
                success_metrics: formData.success_metrics.filter(metric => metric.trim()),
                tags: formData.tags,
                featured_image_url: formData.featured_image_url,
                completion_evidence_url: formData.completion_evidence_url,
                completion_date: formData.completion_date,
                gps_track_url: formData.gps_track_url,
                encouragements_count: 0,
                comments_count: 0,
                contributions_total: 0,
                saved_count: 0,
            };

            const { data, error } = await supabase
                .from('adventures')
                .insert(adventureData)
                .select()
                .single();

            if (error) throw error;

            // Redirect to the new adventure page
            router.push(`/adventures/${finalSlug}`);

        } catch (error) {
            console.error('Error submitting adventure:', error);
            setErrors({ submit: 'Failed to submit adventure. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    const addSuccessMetric = () => {
        setFormData(prev => ({
            ...prev,
            success_metrics: [...prev.success_metrics, '']
        }));
    };

    const updateSuccessMetric = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            success_metrics: prev.success_metrics.map((metric, i) =>
                i === index ? value : metric
            )
        }));
    };

    const removeSuccessMetric = (index: number) => {
        setFormData(prev => ({
            ...prev,
            success_metrics: prev.success_metrics.filter((_, i) => i !== index)
        }));
    };

    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const getDifficultyLabel = (score: number) => {
        if (score <= 3) return 'Easy';
        if (score <= 6) return 'Moderate';
        if (score <= 8) return 'Hard';
        return 'Extreme';
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

    if (!user) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-4xl font-gelica font-bold text-white mb-4">Access Denied</h1>
                    <p className="text-slate-400 mb-8">Please sign in to submit an adventure.</p>
                    <Button asChild>
                        <Link href="/">Go Home</Link>
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
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-gelica font-bold text-white mb-4">
                        Share Your <span className="text-gradient">Adventure</span>
                    </h1>
                    <p className="text-xl text-slate-300">
                        Document a completed adventure or share an inspiring idea
                    </p>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                    {/* Adventure Type */}
                    <Card className="glass-dark">
                        <CardHeader>
                            <CardTitle className="text-white">Adventure Type</CardTitle>
                            <CardDescription>
                                Choose whether this is a completed adventure or an idea
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, type: 'idea' }))}
                                    className={`p-4 border-2 rounded-lg transition-colors ${formData.type === 'idea'
                                        ? 'border-orange-500 bg-orange-500/10'
                                        : 'border-slate-700 hover:border-slate-600'
                                        }`}
                                >
                                    <div className="font-semibold text-white mb-2">Adventure Idea</div>
                                    <div className="text-sm text-slate-400">
                                        Share an inspiring adventure concept for others to pursue
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, type: 'completed' }))}
                                    className={`p-4 border-2 rounded-lg transition-colors ${formData.type === 'completed'
                                        ? 'border-orange-500 bg-orange-500/10'
                                        : 'border-slate-700 hover:border-slate-600'
                                        }`}
                                >
                                    <div className="font-semibold text-white mb-2">Completed Adventure</div>
                                    <div className="text-sm text-slate-400">
                                        Document an adventure you&apos;ve already completed
                                    </div>
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Basic Information */}
                    <Card className="glass-dark">
                        <CardHeader>
                            <CardTitle className="text-white">Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Adventure Title *
                                </label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="Enter a compelling title for your adventure"
                                    className="bg-slate-800 border-slate-700 text-white"
                                />
                                {errors.title && (
                                    <p className="text-red-400 text-sm mt-1">{errors.title}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Description *
                                </label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Describe your adventure in detail. What makes it special? What challenges does it involve?"
                                    className="bg-slate-800 border-slate-700 text-white min-h-[120px]"
                                />
                                {errors.description && (
                                    <p className="text-red-400 text-sm mt-1">{errors.description}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Featured Image URL
                                </label>
                                <Input
                                    value={formData.featured_image_url || ''}
                                    onChange={(e) => setFormData(prev => ({ ...prev, featured_image_url: e.target.value }))}
                                    placeholder="https://example.com/image.jpg"
                                    className="bg-slate-800 border-slate-700 text-white"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Location Information */}
                    <Card className="glass-dark">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                Location Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Start Location *
                                </label>
                                <Input
                                    value={formData.start_location_name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, start_location_name: e.target.value }))}
                                    placeholder="e.g., Mount Whitney, California"
                                    className="bg-slate-800 border-slate-700 text-white"
                                />
                                {errors.start_location_name && (
                                    <p className="text-red-400 text-sm mt-1">{errors.start_location_name}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Latitude
                                    </label>
                                    <Input
                                        type="number"
                                        step="any"
                                        value={formData.start_latitude}
                                        onChange={(e) => setFormData(prev => ({ ...prev, start_latitude: parseFloat(e.target.value) || 0 }))}
                                        placeholder="36.5786"
                                        className="bg-slate-800 border-slate-700 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Longitude
                                    </label>
                                    <Input
                                        type="number"
                                        step="any"
                                        value={formData.start_longitude}
                                        onChange={(e) => setFormData(prev => ({ ...prev, start_longitude: parseFloat(e.target.value) || 0 }))}
                                        placeholder="-118.2923"
                                        className="bg-slate-800 border-slate-700 text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_journey"
                                    checked={formData.is_journey}
                                    onChange={(e) => setFormData(prev => ({ ...prev, is_journey: e.target.checked }))}
                                    className="rounded border-slate-700"
                                />
                                <label htmlFor="is_journey" className="text-sm text-slate-300">
                                    This is a multi-location journey
                                </label>
                            </div>

                            {formData.is_journey && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        End Location
                                    </label>
                                    <Input
                                        value={formData.end_location_name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, end_location_name: e.target.value }))}
                                        placeholder="e.g., Mount Washington, New Hampshire"
                                        className="bg-slate-800 border-slate-700 text-white"
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Adventure Details */}
                    <Card className="glass-dark">
                        <CardHeader>
                            <CardTitle className="text-white">Adventure Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Estimated Duration (days)
                                    </label>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={formData.estimated_duration_days || ''}
                                        onChange={(e) => setFormData(prev => ({ ...prev, estimated_duration_days: parseInt(e.target.value) || undefined }))}
                                        placeholder="1"
                                        className="bg-slate-800 border-slate-700 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Difficulty Score (1-10) *
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={formData.difficulty_score}
                                            onChange={(e) => setFormData(prev => ({ ...prev, difficulty_score: parseInt(e.target.value) || 5 }))}
                                            className="bg-slate-800 border-slate-700 text-white flex-1"
                                        />
                                        <Badge className={`
                      ${formData.difficulty_score <= 3 ? 'bg-green-600' : ''}
                      ${formData.difficulty_score > 3 && formData.difficulty_score <= 6 ? 'bg-yellow-600' : ''}
                      ${formData.difficulty_score > 6 && formData.difficulty_score <= 8 ? 'bg-red-600' : ''}
                      ${formData.difficulty_score > 8 ? 'bg-purple-600' : ''}
                      text-white
                    `}>
                                            {getDifficultyLabel(formData.difficulty_score)}
                                        </Badge>
                                    </div>
                                    {errors.difficulty_score && (
                                        <p className="text-red-400 text-sm mt-1">{errors.difficulty_score}</p>
                                    )}
                                </div>
                            </div>

                            {formData.type === 'completed' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Start Date
                                        </label>
                                        <Input
                                            type="date"
                                            value={formData.start_date || ''}
                                            onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                                            className="bg-slate-800 border-slate-700 text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Completion Date *
                                        </label>
                                        <Input
                                            type="date"
                                            value={formData.completion_date || ''}
                                            onChange={(e) => setFormData(prev => ({ ...prev, completion_date: e.target.value }))}
                                            className="bg-slate-800 border-slate-700 text-white"
                                        />
                                        {errors.completion_date && (
                                            <p className="text-red-400 text-sm mt-1">{errors.completion_date}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Success Metrics */}
                    <Card className="glass-dark">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Trophy className="w-5 h-5" />
                                Success Criteria
                            </CardTitle>
                            <CardDescription>
                                Define what constitutes success for this adventure
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {formData.success_metrics.map((metric, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Input
                                        value={metric}
                                        onChange={(e) => updateSuccessMetric(index, e.target.value)}
                                        placeholder="e.g., Reach the summit before sunset"
                                        className="bg-slate-800 border-slate-700 text-white flex-1"
                                    />
                                    {formData.success_metrics.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeSuccessMetric(index)}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addSuccessMetric}
                            >
                                Add Success Criterion
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Tags */}
                    <Card className="glass-dark">
                        <CardHeader>
                            <CardTitle className="text-white">Tags</CardTitle>
                            <CardDescription>
                                Add tags to help others discover your adventure
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Input
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                                    placeholder="e.g., hiking, mountaineering, solo"
                                    className="bg-slate-800 border-slate-700 text-white flex-1"
                                />
                                <Button type="button" onClick={addTag} size="sm">
                                    Add Tag
                                </Button>
                            </div>

                            {formData.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map((tag, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="cursor-pointer hover:bg-red-600"
                                            onClick={() => removeTag(tag)}
                                        >
                                            {tag} ×
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Completion Evidence (for completed adventures) */}
                    {formData.type === 'completed' && (
                        <Card className="glass-dark">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Upload className="w-5 h-5" />
                                    Evidence & Documentation
                                </CardTitle>
                                <CardDescription>
                                    Optional: Add proof and documentation of your completed adventure
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Evidence URL
                                    </label>
                                    <Input
                                        value={formData.completion_evidence_url || ''}
                                        onChange={(e) => setFormData(prev => ({ ...prev, completion_evidence_url: e.target.value }))}
                                        placeholder="Link to photos, videos, or blog post"
                                        className="bg-slate-800 border-slate-700 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        GPS Track URL
                                    </label>
                                    <Input
                                        value={formData.gps_track_url || ''}
                                        onChange={(e) => setFormData(prev => ({ ...prev, gps_track_url: e.target.value }))}
                                        placeholder="Link to Strava, AllTrails, or GPX file"
                                        className="bg-slate-800 border-slate-700 text-white"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Submit Section */}
                    <Card className="glass-dark">
                        <CardContent className="pt-6">
                            {errors.submit && (
                                <div className="mb-4 p-3 bg-red-600/20 border border-red-600 rounded text-red-300">
                                    {errors.submit}
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <Button
                                    type="button"
                                    onClick={() => handleSubmit(true)}
                                    disabled={submitting}
                                    variant="outline"
                                    className="flex-1"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save as Draft
                                </Button>

                                <Button
                                    type="button"
                                    onClick={() => handleSubmit(false)}
                                    disabled={submitting}
                                    className="flex-1"
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    {submitting ? 'Publishing...' : 'Publish Adventure'}
                                </Button>
                            </div>

                            <p className="text-sm text-slate-400 mt-3 text-center">
                                By publishing, you agree to share your adventure with the Aerostatic community
                            </p>
                        </CardContent>
                    </Card>
                </form>
            </main>

            <Footer />
        </div>
    );
} 