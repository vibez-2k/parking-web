"use client";

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface ParkingLocation {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  capacity: number;
  availableSpots: number;
  liveFeedUrl?: string;
}

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
  const activePopupRef = useRef<mapboxgl.Popup | null>(null);

  const generateClusteredParkingLocations = (
    centerLongitude: number,
    centerLatitude: number,
    radius: number = 0.05,
    count: number = 10
  ) => {
    const locations: ParkingLocation[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const r = radius * Math.sqrt(Math.random());
      const longitude = centerLongitude + r * Math.cos(angle);
      const latitude = centerLatitude + r * Math.sin(angle);

      locations.push({
        id: i + 1,
        name: `Parking Location ${i + 1}`,
        longitude,
        latitude,
        capacity: Math.floor(Math.random() * 100) + 50,
        availableSpots: Math.floor(Math.random() * 50),
        liveFeedUrl: `/dashboard/live-feed`
      });
    }
    return locations;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

      if (map.current) return;

      try {
        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/thayanithi2006/cm8phn1yo000401qyczvx22w7',
          center: [initialLongitude, initialLatitude],
          zoom,
          projection: 'globe'
        });

        map.current.addControl(new mapboxgl.NavigationControl());

        map.current.on('style.load', () => {
          if (!map.current) return;

          const locations = generateClusteredParkingLocations(
            initialLongitude,
            initialLatitude
          );
          setParkingLocations(locations);

          const userMarker = new mapboxgl.Marker({
            color: '#FF4B4B',
            scale: 1.2
          })
            .setLngLat([initialLongitude, initialLatitude])
            .addTo(map.current!);

          map.current.flyTo({
            center: [initialLongitude, initialLatitude],
            zoom: zoom,
            duration: 5000
          });

          locations.forEach(location => {
            const markerEl = document.createElement('div');
            markerEl.className = 'custom-marker';
            markerEl.style.width = '24px';
            markerEl.style.height = '24px';
            markerEl.style.background = `radial-gradient(circle at center, #4A90E2 60%, rgba(74, 144, 226, 0.4) 100%)`;
            markerEl.style.borderRadius = '50%';
            markerEl.style.cursor = 'pointer';
            markerEl.style.boxShadow = '0 0 10px rgba(74, 144, 226, 0.5)';
            markerEl.style.border = '2px solid #FFFFFF';
            markerEl.style.transition = 'all 0.3s ease';

            markerEl.addEventListener('mouseenter', () => {
              // Remove any existing popup
              if (activePopupRef.current) {
                activePopupRef.current.remove();
              }

              markerEl.style.transform = 'scale(1.2)';
              const availabilityPercentage = (location.availableSpots / location.capacity) * 100;
              const availabilityColor = availabilityPercentage > 50 ? 'text-green-600' : 
                                      availabilityPercentage > 20 ? 'text-yellow-600' : 
                                      'text-red-600';
              
              const popup = new mapboxgl.Popup({
                offset: 25,
                closeOnClick: true,
                maxWidth: '320px',
                className: 'custom-popup'
              });

              const popupContainer = document.createElement('div');
              popupContainer.innerHTML = `
                <div class="p-4 bg-white rounded-lg shadow-lg">
                  <h3 class="font-bold text-xl text-gray-800 mb-2">${location.name}</h3>
                  <div class="space-y-2 mb-3">
                    <div class="flex justify-between items-center">
                      <span class="text-gray-600">Total Capacity:</span>
                      <span class="font-semibold">${location.capacity}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-gray-600">Available Spots:</span>
                      <span class="font-semibold ${availabilityColor}">${location.availableSpots}</span>
                    </div>
                  </div>
                  <div class="flex space-x-3 mt-3">
                    <a href="${location.liveFeedUrl}" 
                       class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg text-center font-medium hover:bg-blue-600 transition-colors duration-200">
                      Live Feed
                    </a>
                    <a href="/dashboard/venue-details" 
                       class="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg text-center font-medium hover:bg-green-600 transition-colors duration-200">
                      Details
                    </a>
                  </div>
                </div>
              `;

              popup.setLngLat([location.longitude, location.latitude])
                .setDOMContent(popupContainer)
                .addTo(map.current!);

              // Store the current popup reference
              activePopupRef.current = popup;

              // Add event listener to close popup when clicking outside
              const closePopupOnClick = (e: MouseEvent) => {
                if (!popupContainer.contains(e.target as Node)) {
                  popup.remove();
                  document.removeEventListener('click', closePopupOnClick);
                }
              };
              document.addEventListener('click', closePopupOnClick);
            });

            markerEl.addEventListener('mouseleave', () => {
              markerEl.style.transform = 'scale(1)';
            });

            const marker = new mapboxgl.Marker(markerEl)
              .setLngLat([location.longitude, location.latitude])
              .addTo(map.current!);
          });

          map.current.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
          });

          map.current.setTerrain({
            'source': 'mapbox-dem',
            'exaggeration': 1.5
          });
        });

        map.current.on('error', (e) => {
          console.error('Mapbox error:', e);
          setError('Failed to load map');
        });

        return () => {
          if (map.current) {
            map.current.remove();
            map.current = null;
          }
          if (activePopupRef.current) {
            activePopupRef.current.remove();
          }
        };
      } catch (err) {
        console.error('Map initialization error:', err);
        setError('Failed to initialize map');
      }
    }
  }, []);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-100 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default MapboxGlobeView;
