'use client';

import dynamic from 'next/dynamic';
// Simple type definition for static content
interface Adventure {
    id: string;
    title: string;
    start_longitude: number;
    start_latitude: number;
    start_location_name: string;
}

const AdventureMap = dynamic(() => import('./Map'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="text-gray-500">Loading map...</div>
        </div>
    ),
});

interface ClientMapProps {
    adventures?: Adventure[];
    initialViewState?: {
        longitude: number;
        latitude: number;
        zoom: number;
    };
    onMarkerClick?: (adventure: Adventure) => void;
    interactive?: boolean;
}

export default function ClientMap(props: ClientMapProps) {
    return <AdventureMap {...props} />;
} 