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
        <div className="flex flex-col">
            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


                    {/* Map Container */}
                    <div className="md:col-span-2  bg-gray-100 rounded-lg overflow-hidden">
                        <MapboxParkingRouteMap />
                    </div>

                    {/* Sidebar with Parking Information */}
                    <aside className="bg-white shadow-md rounded-lg p-6 h-fit">
                        <h2 className="text-xl font-semibold mb-4">Parking Locations</h2>
                        <ul className="space-y-3">
                            <li className="bg-gray-100 p-3 rounded-md">
                                <h3 className="font-bold">Central Parking Garage</h3>
                                <p>Capacity: 200 | Available: 75</p>
                            </li>
                            <li className="bg-gray-100 p-3 rounded-md">
                                <h3 className="font-bold">Downtown Parking Structure</h3>
                                <p>Capacity: 150 | Available: 50</p>
                            </li>
                            <li className="bg-gray-100 p-3 rounded-md">
                                <h3 className="font-bold">Waterfront Parking</h3>
                                <p>Capacity: 100 | Available: 25</p>
                            </li>
                        </ul>
                    </aside>
                </div>
            </main>


        </div>
    );
}