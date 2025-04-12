import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the MapboxParkingRouteMap to ensure client-side rendering
const MapboxParkingRouteMap = dynamic(
    () => import('@/components/map/mapboxDirection'),
    {
        loading: () => <p>Loading map...</p>,
        ssr: false
    }
);

export default function ParkingRoutePage() {
    return (
        <div className="flex flex-col h-screen">
            {/* Main Content */}
            <main className="flex-grow">
                {/* Map Container */}
                <div className="h-full w-full">
                    <MapboxParkingRouteMap />
                </div>
            </main>
        </div>
    );
}