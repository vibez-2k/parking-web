"use client"
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

interface ParkingLocation {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  capacity: number;
  availableSpots: number;
  address: string;
}

const MapboxParkingRouteMap: React.FC<{
  initialLongitude: number;
  initialLatitude: number;
  zoom: number;
}> = ({ initialLongitude, initialLatitude, zoom }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<mapboxgl.LngLat | null>(
    new mapboxgl.LngLat(initialLongitude, initialLatitude)
  );
  const [parkingLocations, setParkingLocations] = useState<ParkingLocation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isListVisible, setIsListVisible] = useState(true);
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

    if (map.current.getLayer("route")) {
      map.current.removeLayer("route");
      map.current.removeSource("route");
    }

    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.lng},${userLocation.lat};${location.longitude},${location.latitude}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`;

    fetch(directionsUrl)
      .then((response) => response.json())
      .then((data) => {
        const route = data.routes[0];

        map.current?.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: route.geometry.coordinates,
            },
          },
        });

        map.current?.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#4285F4",
            "line-width": 6,
            "line-opacity": 0.8,
          },
        });

        const bounds = new mapboxgl.LngLatBounds(
          [userLocation.lng, userLocation.lat],
          [location.longitude, location.latitude]
        );

        route.geometry.coordinates.forEach((coord: number[]) => {
          bounds.extend(coord as [number, number]);
        });

        map.current?.fitBounds(bounds, {
          padding: 100,
          duration: 1000,
        });

        if (isMobile) {
          setIsListVisible(false);
        }
      })
      .catch((err) => {
        console.error("Route generation error:", err);
        alert("Could not generate route");
      });
  };

  useEffect(() => {
    if (!mapboxgl.accessToken) {
      setError("Mapbox access token is missing");
      return;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [initialLongitude, initialLatitude],
      zoom,
    });

    const userMarkerEl = document.createElement("div");
    userMarkerEl.innerHTML = `
      <div style="
        width: 20px;
        height: 20px;
        background-color: #4285F4;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 10px rgba(66,133,244,0.5);
      "></div>
    `;

    new mapboxgl.Marker(userMarkerEl)
      .setLngLat([initialLongitude, initialLatitude])
      .addTo(map.current);

    const dummyLocations: ParkingLocation[] = [
      {
        id: 1,
        name: "Central Parking Garage",
        latitude: initialLatitude,
        longitude: initialLongitude + 0.01,
        capacity: 200,
        availableSpots: 75,
        address: "123 Main Street",
      },
      {
        id: 2,
        name: "North Parking Lot",
        latitude: initialLatitude + 0.015,
        longitude: initialLongitude,
        capacity: 150,
        availableSpots: 50,
        address: "456 North Avenue",
      },
      {
        id: 3,
        name: "West Parking Complex",
        latitude: initialLatitude,
        longitude: initialLongitude - 0.02,
        capacity: 180,
        availableSpots: 90,
        address: "789 West Street",
      },
      {
        id: 4,
        name: "South Parking Zone",
        latitude: initialLatitude - 0.025,
        longitude: initialLongitude,
        capacity: 120,
        availableSpots: 40,
        address: "321 South Road",
      },
    ];

    setParkingLocations(dummyLocations);

    dummyLocations.forEach((location) => {
      const parkingMarkerEl = document.createElement("div");
      parkingMarkerEl.innerHTML = `
        <div style="
          width: 30px;
          height: 30px;
          background-color: #EA4335;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
          font-weight: bold;
          border: 2px solid white;
          box-shadow: 0 0 8px rgba(234,67,53,0.5);
        ">P</div>
      `;

      const marker = new mapboxgl.Marker(parkingMarkerEl)
        .setLngLat([location.longitude, location.latitude])
        .addTo(map.current!);

      marker.getElement().addEventListener("click", () => showRoute(location));
    });

    return () => {
      map.current?.remove();
    };
  }, [initialLongitude, initialLatitude, zoom]);

  if (error) {
    return (
      <div
        className="error"
        style={{
          padding: "20px",
          backgroundColor: "#ffebee",
          color: "#c62828",
          borderRadius: "4px",
          margin: "20px",
          fontSize: "16px",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Map Container */}
      <div
        ref={mapContainer}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      />

      {/* Toggle Button for Mobile */}
      {isMobile && (
        <button
          onClick={() => setIsListVisible(!isListVisible)}
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            padding: "8px 12px",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "4px",
            zIndex: 10,
            cursor: "pointer",
          }}
        >
          {isListVisible ? "Hide List" : "Show List"}
        </button>
      )}

      {/* Floating List of Parking Locations */}
      {isListVisible && (
        <div
          style={{
            position: "absolute",
            top: isMobile ? 70 : 20,
            left: isMobile ? "50%" : 20,
            transform: isMobile ? "translateX(-50%)" : "none",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxHeight: isMobile ? "60vh" : "300px",
            width: isMobile ? "90%" : "300px",
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          <h3 style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 600 }}>
            Parking Spots
          </h3>
          {parkingLocations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => showRoute(loc)}
              style={{
                display: "block",
                width: "100%",
                marginBottom: "6px",
                padding: "8px 10px",
                textAlign: "left",
                border: "1px solid #ddd",
                borderRadius: "6px",
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {loc.name}
              <div style={{ fontSize: "12px", color: "#666" }}>{loc.address}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapboxParkingRouteMap;
