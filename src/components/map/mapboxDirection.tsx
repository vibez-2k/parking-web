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
  const [parkingLocations, setParkingLocations] = useState<ParkingLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<ParkingLocation | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showRoute = (location: ParkingLocation) => {
    if (!userLocation || !map.current) return;

    if (map.current.getLayer('route')) {
      map.current.removeLayer('route');
      map.current.removeSource('route');
    }

    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.lng},${userLocation.lat};${location.longitude},${location.latitude}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`;

    fetch(directionsUrl)
      .then(response => response.json())
      .then(data => {
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
            'line-color': '#4285F4',
            'line-width': isMobile ? 4 : 6,
            'line-opacity': 0.8
          }
        });

        const bounds = new mapboxgl.LngLatBounds(
          [userLocation.lng, userLocation.lat],
          [location.longitude, location.latitude]
        );
        
        route.geometry.coordinates.forEach((coord: number[]) => {
          bounds.extend(coord as [number, number]);
        });

        map.current?.fitBounds(bounds, {
          padding: isMobile ? 50 : 100,
          duration: 1000
        });
      })
      .catch(err => {
        console.error('Route generation error:', err);
        alert('Could not generate route');
      });
  };

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

    if (!mapboxgl.accessToken) {
      setError('Mapbox access token is missing');
      return;
    }

    const initializeMap = (userPos: mapboxgl.LngLat) => {
      setUserLocation(userPos);

      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [userPos.lng, userPos.lat],
        zoom: isMobile ? 13 : 14
      });

      const userMarkerEl = document.createElement('div');
      userMarkerEl.innerHTML = `
        <div style="
          width: ${isMobile ? '16px' : '20px'}; 
          height: ${isMobile ? '16px' : '20px'}; 
          background-color: #4285F4; 
          border-radius: 50%; 
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(66,133,244,0.5);
        "></div>
      `;

      new mapboxgl.Marker(userMarkerEl)
        .setLngLat(userPos)
        .addTo(map.current);

      const dummyLocations: ParkingLocation[] = [
        {
          id: 1,
          name: "Central Parking Garage",
          latitude: userPos.lat,
          longitude: userPos.lng + 0.01,
          capacity: 200,
          availableSpots: 75,
          address: "123 Main Street"
        },
        {
          id: 2,
          name: "North Parking Lot",
          latitude: userPos.lat + 0.015,
          longitude: userPos.lng,
          capacity: 150,
          availableSpots: 50,
          address: "456 North Avenue"
        },
        {
          id: 3,
          name: "West Parking Complex",
          latitude: userPos.lat,
          longitude: userPos.lng - 0.02,
          capacity: 180,
          availableSpots: 90,
          address: "789 West Street"
        },
        {
          id: 4,
          name: "South Parking Zone",
          latitude: userPos.lat - 0.025,
          longitude: userPos.lng,
          capacity: 120,
          availableSpots: 40,
          address: "321 South Road"
        }
      ];

      setParkingLocations(dummyLocations);

      dummyLocations.forEach(location => {
        const parkingMarkerEl = document.createElement('div');
        parkingMarkerEl.innerHTML = `
          <div style="
            width: ${isMobile ? '24px' : '30px'}; 
            height: ${isMobile ? '24px' : '30px'}; 
            background-color: #EA4335; 
            border-radius: 50%; 
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: ${isMobile ? '12px' : '14px'};
            font-weight: bold;
            border: 2px solid white;
            box-shadow: 0 0 8px rgba(234,67,53,0.5);
          ">P</div>
        `;

        new mapboxgl.Marker(parkingMarkerEl)
          .setLngLat([location.longitude, location.latitude])
          .addTo(map.current!);
      });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = new mapboxgl.LngLat(
            position.coords.longitude,
            position.coords.latitude
          );
          initializeMap(userPos);
        },
        (err) => {
          console.error(err);
          // Use default location if geolocation fails
          const defaultPos = new mapboxgl.LngLat(78.127725, 8.789767);
          initializeMap(defaultPos);
        }
      );
    } else {
      // Use default location if geolocation is not supported
      const defaultPos = new mapboxgl.LngLat(78.127725, 8.789767);
      initializeMap(defaultPos);
    }

    return () => {
      map.current?.remove();
    };
  }, [isMobile]);

  if (error) {
    return <div className="error" style={{ 
      padding: isMobile ? '15px' : '20px', 
      backgroundColor: '#ffebee', 
      color: '#c62828',
      borderRadius: '4px',
      margin: isMobile ? '10px' : '20px',
      fontSize: isMobile ? '14px' : '16px'
    }}>{error}</div>;
  }

  return (
    <div className="map-container" style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '10px' : '20px',
      padding: isMobile ? '10px' : '20px',
      maxWidth: '100%',
      height: isMobile ? 'calc(100vh - 60px)' : '100%'
    }}>
      <div
        ref={mapContainer}
        style={{ 
          width: '100%',
          height: isMobile ? '50vh' : '600px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          flex: 2
        }}
      />
      <div style={{
        flex: 1,
        height: isMobile ? '45vh' : '600px',
        overflowY: 'auto',
        padding: isMobile ? '10px' : '15px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          marginBottom: isMobile ? '10px' : '15px', 
          color: '#333',
          fontSize: isMobile ? '18px' : '24px'
        }}>Available Parking Locations</h2>
        {parkingLocations.map(location => (
          <div
            key={location.id}
            style={{
              padding: isMobile ? '10px' : '15px',
              marginBottom: isMobile ? '8px' : '10px',
              backgroundColor: selectedLocation?.id === location.id ? '#e3f2fd' : '#f5f5f5',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={() => {
              setSelectedLocation(location);
              showRoute(location);
            }}
          >
            <h3 style={{ 
              margin: '0 0 6px 0', 
              color: '#333',
              fontSize: isMobile ? '16px' : '18px'
            }}>{location.name}</h3>
            <p style={{ 
              margin: '4px 0', 
              color: '#666',
              fontSize: isMobile ? '13px' : '14px'
            }}>{location.address}</p>
            <p style={{ 
              margin: '4px 0', 
              color: '#666',
              fontSize: isMobile ? '13px' : '14px'
            }}>
              Available: {location.availableSpots}/{location.capacity}
            </p>
            <button
              style={{
                backgroundColor: '#4285F4',
                color: 'white',
                border: 'none',
                padding: isMobile ? '6px 12px' : '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '6px',
                fontWeight: 'bold',
                width: '100%',
                fontSize: isMobile ? '14px' : '16px'
              }}
              onClick={(e) => {
                e.stopPropagation();
                showRoute(location);
              }}
            >
              Show Route
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapboxParkingRouteMap;