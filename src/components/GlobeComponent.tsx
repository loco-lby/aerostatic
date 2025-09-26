'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// Simple type definition for static content
interface Adventure {
    id: string;
    title: string;
    start_longitude: number;
    start_latitude: number;
    start_location_name: string;
    end_location_name?: string;
    is_journey?: boolean;
    type: 'completed' | 'idea';
    creator?: { username: string };
    difficulty_score: number;
    description: string;
    success_metrics?: string[];
    encouragements_count: number;
    comments_count: number;
    contributions_total: number;
}
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Heart, MessageCircle, DollarSign, Calendar, User } from 'lucide-react';

// Set your Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface GlobeComponentProps {
    adventures: Adventure[];
}

export function GlobeComponent({ adventures }: GlobeComponentProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [selectedAdventure, setSelectedAdventure] = useState<Adventure | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        // Initialize the map
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: [0, 20],
            zoom: 1.5,
            projection: 'globe' as any,
            antialias: true,
        });

        // Add atmosphere effect
        map.current.on('style.load', () => {
            if (!map.current) return;

            map.current.setFog({
                color: 'rgb(186, 210, 235)',
                'high-color': 'rgb(36, 92, 223)',
                'horizon-blend': 0.02,
                'space-color': 'rgb(11, 11, 25)',
                'star-intensity': 0.6,
            });

            // Add adventure points
            const geojsonData = {
                type: 'FeatureCollection',
                features: adventures.map((adventure) => ({
                    type: 'Feature',
                    properties: {
                        id: adventure.id,
                        title: adventure.title,
                        type: adventure.type,
                        encouragements: adventure.encouragements_count,
                        contributions: adventure.contributions_total,
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [adventure.start_longitude, adventure.start_latitude],
                    },
                })),
            };

            map.current.addSource('adventures', {
                type: 'geojson',
                data: geojsonData as any,
            });

            // Add pins layer
            map.current.addLayer({
                id: 'adventure-pins',
                type: 'circle',
                source: 'adventures',
                paint: {
                    'circle-radius': [
                        'interpolate',
                        ['linear'],
                        ['get', 'encouragements'],
                        0, 8,
                        50, 15,
                        100, 20
                    ],
                    'circle-color': [
                        'case',
                        ['==', ['get', 'type'], 'completed'],
                        '#22c55e', // Green for completed
                        '#f97316'  // Orange for ideas
                    ],
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff',
                    'circle-opacity': 0.8,
                },
            });

            // Add glow effect layer
            map.current.addLayer({
                id: 'adventure-glow',
                type: 'circle',
                source: 'adventures',
                paint: {
                    'circle-radius': [
                        'interpolate',
                        ['linear'],
                        ['get', 'encouragements'],
                        0, 16,
                        50, 25,
                        100, 35
                    ],
                    'circle-color': [
                        'case',
                        ['==', ['get', 'type'], 'completed'],
                        '#22c55e',
                        '#f97316'
                    ],
                    'circle-opacity': 0.3,
                    'circle-blur': 1,
                },
            }, 'adventure-pins');

            // Add click events
            map.current.on('click', 'adventure-pins', (e) => {
                if (!e.features || !e.features[0]) return;

                const feature = e.features[0];
                const adventureId = feature.properties?.id;
                const adventure = adventures.find(a => a.id === adventureId);

                if (adventure) {
                    setSelectedAdventure(adventure);
                    setIsModalOpen(true);
                }
            });

            // Change cursor on hover
            map.current.on('mouseenter', 'adventure-pins', () => {
                if (map.current) {
                    map.current.getCanvas().style.cursor = 'pointer';
                }
            });

            map.current.on('mouseleave', 'adventure-pins', () => {
                if (map.current) {
                    map.current.getCanvas().style.cursor = '';
                }
            });
        });

        // Auto-rotate the globe
        let userInteracting = false;
        let spinEnabled = true;

        function spinGlobe() {
            if (spinEnabled && !userInteracting && map.current) {
                const center = map.current.getCenter();
                center.lng -= 0.2;
                map.current.easeTo({ center, duration: 1000 });
            }
        }

        map.current.on('mousedown', () => {
            userInteracting = true;
        });

        map.current.on('mouseup', () => {
            userInteracting = false;
            setTimeout(() => {
                spinEnabled = true;
            }, 2000);
        });

        // Start spinning
        const spinInterval = setInterval(spinGlobe, 1000);

        return () => {
            clearInterval(spinInterval);
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [adventures]);

    return (
        <>
            <div className="relative w-full h-full">
                <div
                    ref={mapContainer}
                    className="w-full h-full rounded-full overflow-hidden shadow-2xl"
                    style={{ minHeight: '400px', minWidth: '400px' }}
                />

                {/* Overlay instructions */}
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span>Adventure Ideas</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Completed Adventures</span>
                    </div>
                </div>
            </div>

            {/* Adventure Detail Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-2xl bg-slate-900 border-slate-700 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-orange-400">
                            {selectedAdventure?.title}
                        </DialogTitle>
                    </DialogHeader>

                    {selectedAdventure && (
                        <div className="space-y-6">
                            {/* Adventure Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 text-slate-300">
                                    <MapPin className="h-4 w-4" />
                                    <span>{selectedAdventure.start_location_name}</span>
                                    {selectedAdventure.is_journey && (
                                        <span>→ {selectedAdventure.end_location_name}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <User className="h-4 w-4" />
                                    <span>@{selectedAdventure.creator?.username}</span>
                                </div>
                            </div>

                            {/* Adventure Type and Status */}
                            <div className="flex gap-2">
                                <Badge
                                    variant={selectedAdventure.type === 'completed' ? 'default' : 'secondary'}
                                    className={selectedAdventure.type === 'completed' ? 'bg-green-600' : 'bg-orange-600'}
                                >
                                    {selectedAdventure.type === 'completed' ? 'Completed' : 'Adventure Idea'}
                                </Badge>
                                <Badge variant="outline" className="border-slate-600 text-slate-300">
                                    Difficulty: {selectedAdventure.difficulty_score}/10
                                </Badge>
                            </div>

                            {/* Description */}
                            <div>
                                <h4 className="font-semibold mb-2">Description</h4>
                                <p className="text-slate-300 leading-relaxed">
                                    {selectedAdventure.description}
                                </p>
                            </div>

                            {/* Success Metrics */}
                            {selectedAdventure.success_metrics && selectedAdventure.success_metrics.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-2">Success Metrics</h4>
                                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                                        {selectedAdventure.success_metrics.map((metric, index) => (
                                            <li key={index}>{metric}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Engagement Stats */}
                            <div className="grid grid-cols-3 gap-4 py-4 border-t border-slate-700">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-red-400 mb-1">
                                        <Heart className="h-4 w-4" />
                                        <span className="font-bold">{selectedAdventure.encouragements_count}</span>
                                    </div>
                                    <div className="text-xs text-slate-400">Encouragements</div>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                                        <MessageCircle className="h-4 w-4" />
                                        <span className="font-bold">{selectedAdventure.comments_count}</span>
                                    </div>
                                    <div className="text-xs text-slate-400">Comments</div>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
                                        <DollarSign className="h-4 w-4" />
                                        <span className="font-bold">${selectedAdventure.contributions_total}</span>
                                    </div>
                                    <div className="text-xs text-slate-400">Contributed</div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                                    <Heart className="mr-2 h-4 w-4" />
                                    Encourage
                                </Button>
                                <Button variant="outline" className="flex-1 border-slate-600 text-white hover:bg-slate-800">
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Comment
                                </Button>
                                {selectedAdventure.type === 'idea' && (
                                    <Button variant="outline" className="flex-1 border-green-600 text-green-400 hover:bg-green-600 hover:text-white">
                                        <DollarSign className="mr-2 h-4 w-4" />
                                        Contribute
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
} 