'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { User, Adventure } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Heart, MessageCircle, Trophy, Calendar, Edit, Camera } from 'lucide-react';
import Link from 'next/link';
import Image from "next/image";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [userAdventures, setUserAdventures] = useState<Adventure[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (!session) {
                    router.push('/');
                    return;
                }

                // Load user profile
                const { data: profile, error: profileError } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (profileError) {
                    console.error('Error loading profile:', profileError);
                    router.push('/');
                    return;
                }

                setUser(profile);

                // Load user's adventures
                const { data: adventures, error: adventuresError } = await supabase
                    .from('adventures')
                    .select('*')
                    .eq('creator_id', session.user.id)
                    .order('created_at', { ascending: false });

                if (!adventuresError && adventures) {
                    setUserAdventures(adventures);
                }

            } catch (error) {
                console.error('Error loading profile:', error);
                router.push('/');
            } finally {
                setLoading(false);
            }
        };

        loadUserProfile();
    }, [router]);

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'avid_adventurer':
                return 'bg-purple-600';
            case 'adventurer':
                return 'bg-green-600';
            case 'moderator':
                return 'bg-red-600';
            default:
                return 'bg-blue-600';
        }
    };

    const getRoleLabel = (role: string) => {
        switch (role) {
            case 'avid_adventurer':
                return 'Avid Adventurer';
            case 'adventurer':
                return 'Adventurer';
            case 'moderator':
                return 'Moderator';
            default:
                return 'Explorer';
        }
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
                    <h1 className="text-4xl font-gelica font-bold text-white mb-4">Profile Not Found</h1>
                    <p className="text-slate-400 mb-8">Please sign in to view your profile.</p>
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

            <main className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Profile Header */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-1">
                        <Card className="glass-dark">
                            <CardHeader className="text-center">
                                <div className="relative mx-auto mb-4">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-4xl">
                                        <Image
                                            src={user.avatar_url || '/default-avatar.png'}
                                            alt="Profile"
                                            width={96}
                                            height={96}
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                    <Button size="icon" className="absolute bottom-0 right-0 rounded-full">
                                        <Camera className="w-4 h-4" />
                                    </Button>
                                </div>

                                <CardTitle className="text-2xl font-gelica text-white">
                                    {user.full_name || `@${user.username}`}
                                </CardTitle>
                                <CardDescription className="text-slate-300">
                                    @{user.username}
                                </CardDescription>

                                <Badge className={`${getRoleBadgeColor(user.role)} text-white mx-auto w-fit mt-2`}>
                                    {getRoleLabel(user.role)}
                                </Badge>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {user.bio && (
                                    <div>
                                        <h4 className="font-semibold text-white mb-2">Bio</h4>
                                        <p className="text-slate-300 text-sm">{user.bio}</p>
                                    </div>
                                )}

                                {user.location && (
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-sm">{user.location}</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 text-slate-400">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">
                                        Joined {new Date(user.joined_at).toLocaleDateString()}
                                    </span>
                                </div>

                                <Button className="w-full" variant="outline">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Stats */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <Card className="glass-dark">
                                <CardContent className="p-6 text-center">
                                    <div className="text-3xl font-bold text-gradient mb-2">
                                        {user.completed_adventures_count}
                                    </div>
                                    <div className="text-slate-300 text-sm">Adventures Completed</div>
                                </CardContent>
                            </Card>

                            <Card className="glass-dark">
                                <CardContent className="p-6 text-center">
                                    <div className="text-3xl font-bold text-gradient mb-2">
                                        {user.total_encouragements_received}
                                    </div>
                                    <div className="text-slate-300 text-sm">Encouragements Received</div>
                                </CardContent>
                            </Card>

                            <Card className="glass-dark">
                                <CardContent className="p-6 text-center">
                                    <div className="text-3xl font-bold text-gradient mb-2">
                                        {user.total_encouragements_given}
                                    </div>
                                    <div className="text-slate-300 text-sm">Encouragements Given</div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Adventures */}
                        <Card className="glass-dark">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center justify-between">
                                    My Adventures
                                    <Button asChild size="sm">
                                        <Link href="/submit">Add Adventure</Link>
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {userAdventures.length === 0 ? (
                                    <div className="text-center py-8">
                                        <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-slate-400 mb-2">No Adventures Yet</h3>
                                        <p className="text-slate-500 mb-4">Ready to start your first adventure?</p>
                                        <Button asChild>
                                            <Link href="/submit">Submit Adventure</Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {userAdventures.slice(0, 3).map((adventure) => (
                                            <Link
                                                key={adventure.id}
                                                href={`/adventures/${adventure.slug}`}
                                                className="block p-4 border border-slate-700 rounded-lg hover:border-orange-500 transition-colors"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <h4 className="font-semibold text-white">{adventure.title}</h4>
                                                    <Badge variant={adventure.type === 'completed' ? 'default' : 'secondary'}>
                                                        {adventure.type === 'completed' ? 'Completed' : 'Idea'}
                                                    </Badge>
                                                </div>
                                                <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                                                    {adventure.description}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs text-slate-400">
                                                    <div className="flex items-center gap-1">
                                                        <Heart className="w-3 h-3" />
                                                        {adventure.encouragements_count}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MessageCircle className="w-3 h-3" />
                                                        {adventure.comments_count}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {adventure.start_location_name}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}

                                        {userAdventures.length > 3 && (
                                            <Button variant="outline" className="w-full">
                                                <Link href="/my-adventures">View All Adventures</Link>
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
} 