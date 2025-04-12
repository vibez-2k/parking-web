"use client";

import MapboxGlobeView from '@/components/map/MapboxGlobeView';
import React, { useState, useEffect, useRef } from 'react';

function ParkingMapPage() {
  const [userLocation, setUserLocation] = useState({
    latitude: 8.789767,
    longitude: 78.127725
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locationFetched = useRef(false);

  useEffect(() => {
    if (!locationFetched.current) {
      locationFetched.current = true;

      // Check if running in React Native WebView
      if (window.ReactNativeWebView) {
        // Request location from React Native
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'GET_LOCATION'
        }));

        // Listen for location data from React Native
        window.addEventListener('message', (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'LOCATION_DATA') {
              setUserLocation({
                latitude: data.latitude,
                longitude: data.longitude
              });
              setIsLoading(false);
            } else if (data.type === 'LOCATION_ERROR') {
              setError(data.message || "Unable to retrieve your location");
              setIsLoading(false);
            }
          } catch (err) {
            console.error('Error parsing location data:', err);
          }
        });
      } 
      // If running in web browser
      else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            setIsLoading(false);
          },
          (err) => {
            console.error("Error getting location:", err);
            setError("Unable to retrieve your location");
            setIsLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      } else {
        setError("Geolocation is not supported by your browser");
        setIsLoading(false);
      }
    }
  }, []);

  const mapProps = {
    initialLongitude: userLocation.longitude,
    initialLatitude: userLocation.latitude,
    zoom: isLoading ? 4 : 12,
    key: `${userLocation.latitude}-${userLocation.longitude}`
  };

  return (
    <div className="w-full h-screen">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <p>Getting your location...</p>
        </div>
      ) : (
        <div className="h-full w-full relative">
          {error && (
            <div className="absolute top-4 left-4 z-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
            </div>
          )}
          <MapboxGlobeView {...mapProps} />
        </div>
      )}
    </div>
  );
}

export default ParkingMapPage;
