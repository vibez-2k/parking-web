"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Interface for Parking Location
interface ParkingLocation {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  capacity: number;
  availableSpots: number;
  liveFeedUrl?: string;
}

// Typescript interface for component props
interface MapboxGlobeViewProps {
  initialLongitude?: number;
  initialLatitude?: number;
  zoom?: number;
}

const MapboxGlobeView: React.FC<MapboxGlobeViewProps> = ({
  initialLongitude = 0,
  initialLatitude = 0,
  zoom = 3
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [parkingLocations, setParkingLocations] = useState<ParkingLocation[]>([]);

  // Generate parking locations clustered around a central point
  const generateClusteredParkingLocations = (
    centerLongitude: number,
    centerLatitude: number,
    radius: number = 0.05,
    count: number = 10
  ) => {
    const locations: ParkingLocation[] = [];
    for (let i = 0; i < count; i++) {
      // Generate locations within a circular radius
      const angle = Math.random() * 2 * Math.PI;
      const r = radius * Math.sqrt(Math.random());

      const longitude = centerLongitude + r * Math.cos(angle);
      const latitude = centerLatitude + r * Math.sin(angle);

      locations.push({
        id: i + 1,
        name: `Parking Location ${i + 1}`,
        longitude: longitude,
        latitude: latitude,
        capacity: Math.floor(Math.random() * 100) + 50,
        availableSpots: Math.floor(Math.random() * 50),
        liveFeedUrl: `/dashboard/live-feed`
      });
    }
    return locations;
  };

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      // Ensure Mapbox access token is set from environment
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

      // Prevent re-initialization
      if (map.current) return;

      try {
        // Initialize map
        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/thayanithi2006/cm8phn1yo000401qyczvx22w7',
          center: [initialLongitude, initialLatitude],
          zoom: zoom,
          projection: 'globe'
        });

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl());

        // Ensure style is loaded before adding sources
        map.current.on('style.load', () => {
          if (!map.current) return;

          // Generate clustered parking locations around a central point
          const centralLocation = {
            longitude: 77.5946, // Bangalore, India as an example
            latitude: 12.9716
          };

          const locations = generateClusteredParkingLocations(
            centralLocation.longitude,
            centralLocation.latitude
          );
          setParkingLocations(locations);

          // Add a central marker
          const centralMarker = new mapboxgl.Marker({ color: 'red' })
            .setLngLat([centralLocation.longitude, centralLocation.latitude])
            .addTo(map.current!);

          // Fly to central location
          map.current.flyTo({
            center: [centralLocation.longitude, centralLocation.latitude],
            zoom: 12,
            duration: 10000
          });

          // Add markers for parking locations
          locations.forEach(location => {
            // Create a custom marker element
            const markerEl = document.createElement('div');
            markerEl.className = 'custom-marker';
            markerEl.style.width = '15px';
            markerEl.style.height = '15px';
            markerEl.style.backgroundColor = 'blue';
            markerEl.style.borderRadius = '50%';
            markerEl.style.cursor = 'pointer';

            // Create popup
            const popup = new mapboxgl.Popup({
              offset: 25,
              closeOnClick: false,
              maxWidth: '300px'
            });

            // Create marker
            const marker = new mapboxgl.Marker(markerEl)
              .setLngLat([location.longitude, location.latitude])
              .setPopup(popup)
              .addTo(map.current!);

            // Hover event
            markerEl.addEventListener('mouseenter', () => {
              // Create a container div to wrap popup content
              const popupContainer = document.createElement('div');
              popupContainer.innerHTML = `
  <div class="p-2">
    <h3 class="font-bold text-lg">${location.name}</h3>
    <p>Total Capacity: ${location.capacity}</p>
    <p>Available Spots: ${location.availableSpots}</p>
    <div class="flex space-x-2 mt-2">
      <a href="${location.liveFeedUrl}" class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
        View Live Feed
      </a>
      <a href="/parking/${location.id}" class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer">
        Details
      </a>
    </div>
  </div>
`;


              // Set popup content
              popup.setLngLat([location.longitude, location.latitude])
                .setDOMContent(popupContainer)
                .addTo(map.current!);
            });

            // Add popup to marker
            marker.setPopup(popup);
          });

          // Add terrain source
          map.current.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
          });

          // Set terrain if supported
          map.current.setTerrain({
            'source': 'mapbox-dem',
            'exaggeration': 1.5
          });
        });

        // Handle any potential errors
        map.current.on('error', (e) => {
          console.error('Mapbox error:', e);
          setError('Failed to load map');
        });

        // Cleanup on unmount
        return () => {
          if (map.current) {
            map.current.remove();
            map.current = null;
          }
        };
      } catch (err) {
        console.error('Map initialization error:', err);
        setError('Failed to initialize map');
      }
    }
  }, []); // Empty dependency array

  // Error handling UI
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div
      ref={mapContainer}
      className="w-full h-full"
    />
  );
};

export default MapboxGlobeView;