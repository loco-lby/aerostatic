'use client';

import { useEffect, useState } from 'react';
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// Simple type definition for static content
interface Adventure {
    id: string;
    title: string;
    start_longitude: number;
    start_latitude: number;
    start_location_name: string;
}

interface AdventureMapProps {
    adventures?: Adventure[];
    initialViewState?: {
        longitude: number;
        latitude: number;
        zoom: number;
    };
    onMarkerClick?: (adventure: Adventure) => void;
    interactive?: boolean;
}

export default function AdventureMap({
    adventures = [],
    initialViewState = {
        longitude: -98.5795,  // Center of US
        latitude: 39.8283,
        zoom: 3
    },
    onMarkerClick,
    interactive = true
}: AdventureMapProps) {
    const [popupInfo, setPopupInfo] = useState<Adventure | null>(null);

    return (
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            initialViewState={initialViewState}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/outdoors-v12"
            interactive={interactive}
        >
            <NavigationControl />

            {adventures.map((adventure) => (
                <Marker
                    key={adventure.id}
                    longitude={adventure.start_longitude}
                    latitude={adventure.start_latitude}
                    anchor="bottom"
                    onClick={(e) => {
                        e.originalEvent.stopPropagation();
                        setPopupInfo(adventure);
                        onMarkerClick?.(adventure);
                    }}
                >
                    <div className="cursor-pointer text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                    </div>
                </Marker>
            ))}

            {popupInfo && (
                <Popup
                    anchor="top"
                    longitude={popupInfo.start_longitude}
                    latitude={popupInfo.start_latitude}
                    onClose={() => setPopupInfo(null)}
                >
                    <div className="p-2">
                        <h3 className="font-bold">{popupInfo.title}</h3>
                        <p className="text-sm text-gray-600">{popupInfo.start_location_name}</p>
                    </div>
                </Popup>
            )}
        </Map>
    );
} 