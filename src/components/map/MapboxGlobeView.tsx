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

          const userMarker = new mapboxgl.Marker({ color: 'red' })
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
            markerEl.style.width = '15px';
            markerEl.style.height = '15px';
            markerEl.style.backgroundColor = 'blue';
            markerEl.style.borderRadius = '50%';
            markerEl.style.cursor = 'pointer';

            const popup = new mapboxgl.Popup({
              offset: 25,
              closeOnClick: false,
              maxWidth: '300px'
            });

            const marker = new mapboxgl.Marker(markerEl)
              .setLngLat([location.longitude, location.latitude])
              .setPopup(popup)
              .addTo(map.current!);

            markerEl.addEventListener('mouseenter', () => {
              const popupContainer = document.createElement('div');
              popupContainer.innerHTML = `
                <div class="p-2">
                  <h3 class="font-bold text-lg">${location.name}</h3>
                  <p>Total Capacity: ${location.capacity}</p>
                  <p>Available Spots: ${location.availableSpots}</p>
                  <div class="flex space-x-2 mt-2">
                    <a href="${location.liveFeedUrl}" class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      View Live Feed
                    </a>
                    <a href="/parking/${location.id}" class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                      Details
                    </a>
                  </div>
                </div>
              `;
              popup.setLngLat([location.longitude, location.latitude])
                .setDOMContent(popupContainer)
                .addTo(map.current!);
            });

            marker.setPopup(popup);
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
