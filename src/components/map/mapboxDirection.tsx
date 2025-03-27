"use client";

import React, { useEffect, useRef, useState } from 'react';
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
  address: string;
}

const MapboxParkingRouteMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<mapboxgl.LngLat | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sample parking locations (hardcoded around a specific location)
  const parkingLocations: ParkingLocation[] = [
    {
      id: 1,
      name: "Central Parking Garage",
      latitude: 11.507219, // Changed to consistent location
      longitude:  77.376230, // Changed to consistent location
      capacity: 200,
      availableSpots: 75,
      address: "123 Main Street"
    },
  ];

  useEffect(() => {
    // Ensure Mapbox access token is set
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

    if (!mapboxgl.accessToken) {
      setError('Mapbox access token is missing');
      return;
    }

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-122.4194, 37.7749], // San Francisco center
      zoom: 12
    });

    // Get user's location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userPos = new mapboxgl.LngLat(longitude, latitude);
          setUserLocation(userPos);

          // Create user location marker
          const userMarkerEl = document.createElement('div');
          userMarkerEl.innerHTML = `
            <div style="
              width: 40px; 
              height: 40px; 
              background-color: blue; 
              border-radius: 50%; 
              border: 3px solid white;
              box-shadow: 0 0 10px rgba(0,0,255,0.5);
            "></div>
          `;

          // Add user marker
          new mapboxgl.Marker(userMarkerEl)
            .setLngLat(userPos)
            .addTo(map.current!);

          // Center map on user location
          map.current?.flyTo({
            center: userPos,
            zoom: 12
          });

          // Add parking location markers
          parkingLocations.forEach(location => {
            // Create parking marker
            const parkingMarkerEl = document.createElement('div');
            parkingMarkerEl.innerHTML = `
              <div style="
                width: 30px; 
                height: 30px; 
                background-color: green; 
                border-radius: 50%; 
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                border: 2px solid white;
                box-shadow: 0 0 8px rgba(0,128,0,0.5);
              ">P</div>
            `;

            // Create popup for parking location
            const popup = new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div>
                  <h3>${location.name}</h3>
                  <p>Address: ${location.address}</p>
                  <p>Capacity: ${location.capacity}</p>
                  <p>Available: ${location.availableSpots}</p>
                  <button class="route-btn" data-lng="${location.longitude}" data-lat="${location.latitude}" style="
                    background-color: blue;
                    color: white;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 5px;
                    cursor: pointer;
                  ">Get Route</button>
                </div>
              `);

            // Create marker
            const marker = new mapboxgl.Marker(parkingMarkerEl)
              .setLngLat([location.longitude, location.latitude])
              .setPopup(popup)
              .addTo(map.current!);

            // Event listener for route generation
            popup.on('open', () => {
              const routeBtns = document.querySelectorAll('.route-btn');
              routeBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                  // Remove any existing route layers
                  if (map.current?.getLayer('route')) {
                    map.current.removeLayer('route');
                    map.current.removeSource('route');
                  }

                  const targetBtn = e.currentTarget as HTMLButtonElement;
                  const destLng = parseFloat(targetBtn.dataset.lng || '0');
                  const destLat = parseFloat(targetBtn.dataset.lat || '0');

                  // Create a new directions service
                  const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${userPos.lng},${userPos.lat};${destLng},${destLat}?access_token=${mapboxgl.accessToken}`;

                  fetch(directionsUrl)
                    .then(response => response.json())
                    .then(data => {
                      // Draw route on map
                      const route = data.routes[0];
                      
                      map.current?.addSource('route', {
                        type: 'geojson',
                        data: {
                          type: 'Feature',
                          properties: {},
                          geometry: {
                            type: 'LineString',
                            coordinates: route.geometry.coordinates
                          }
                        }
                      });

                      map.current?.addLayer({
                        id: 'route',
                        type: 'line',
                        source: 'route',
                        layout: {
                          'line-join': 'round',
                          'line-cap': 'round'
                        },
                        paint: {
                          'line-color': '#888',
                          'line-width': 8
                        }
                      });

                      // Fit map to route
                      const bounds = new mapboxgl.LngLatBounds(
                        userPos,
                        [destLng, destLat]
                      );
                      map.current?.fitBounds(bounds, { padding: 50 });
                    })
                    .catch(err => {
                      console.error('Route generation error:', err);
                      alert('Could not generate route');
                    });
                });
              });
            });
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError('Could not retrieve your location');
        }
      );
    } else {
      setError('Geolocation not supported');
    }

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '500px' }}
    />
  );
};

export default MapboxParkingRouteMap;