"use client"
import MapboxParkingRouteMap from "@/components/map/mapboxDirection";
import React, { useEffect, useRef, useState } from "react";

export default function ParkingRoutePage() {
  const [userLocation, setUserLocation] = useState({
    latitude: 8.789767,
    longitude: 78.127725,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const locationFetched = useRef(false);

  useEffect(() => {
    if (!locationFetched.current) {
      locationFetched.current = true;

      // Check if running in React Native WebView
      if (window.isReactNativeWebView) {
        console.log("Running in React Native WebView, requesting location");

        // Setup listener for location data from React Native
        window.addEventListener("message", (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log("Received message:", data);

            if (data.type === "LOCATION_DATA") {
              console.log("Got location data:", data.latitude, data.longitude);
              setUserLocation({
                latitude: data.latitude,
                longitude: data.longitude,
              });
              setIsLoading(false);
            } else if (data.type === "LOCATION_ERROR") {
              setError(data.message || "Unable to retrieve your location");
              setIsLoading(false);
            }
          } catch (err) {
            console.error("Error parsing location data:", err);
            setError("Error processing location data");
            setIsLoading(false);
          }
        });

        // Request location from React Native
        window.ReactNativeWebView &&
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: "GET_LOCATION",
            })
          );

        // Set a fallback timeout in case we don't get location data
        setTimeout(() => {
          if (isLoading) {
            console.log("Location timeout, using default");
            setIsLoading(false);
          }
        }, 5000);
      }
      // If running in web browser
      else if (navigator.geolocation) {
        console.log("Running in browser, using geolocation API");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(
              "Browser location:",
              position.coords.latitude,
              position.coords.longitude
            );
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
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
            maximumAge: 0,
          }
        );
      } else {
        setError("Geolocation is not supported by your browser");
        setIsLoading(false);
      }
    }
  }, [isLoading]);

  // Log when map props change
  useEffect(() => {
    console.log("Map props updated:", {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      isLoading,
    });
  }, [userLocation, isLoading]);

  const mapProps = {
    initialLongitude: userLocation.longitude,
    initialLatitude: userLocation.latitude,
    zoom: isLoading ? 4 : 12,
    key: `${userLocation.latitude}-${userLocation.longitude}-${!isLoading}`,
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content */}
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
          <MapboxParkingRouteMap {...mapProps} />
        </div>
      )}
    </div>
  );
}
