'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VenueList() {
  const [venues, setVenues] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    const response = await fetch('/api/venues');
    const data = await response.json();
    setVenues(data);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {venues.map((venue) => (
        <div key={venue._id} className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xl font-bold">{venue.name}</h3>
          <p className="text-gray-600">{venue.address}</p>
          <p className="text-green-600">Available Spots: {venue.availableSpots}</p>
          <button
            onClick={() => router.push(`/booking/${venue._id}`)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}