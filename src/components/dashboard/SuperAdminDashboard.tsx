'use client';

import { useState, useEffect } from 'react';

export default function SuperAdminDashboard() {
  const [venues, setVenues] = useState([]);
  const [globalStats, setGlobalStats] = useState({
    totalVenues: 0,
    totalBookings: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    const [venuesRes, statsRes] = await Promise.all([
      fetch('/api/admin/venues'),
      fetch('/api/admin/stats')
    ]);
    
    const [venuesData, statsData] = await Promise.all([
      venuesRes.json(),
      statsRes.json()
    ]);

    setVenues(venuesData);
    setGlobalStats(statsData);
  };

  const notifyUsers = async (venueId) => {
    await fetch('/api/notify/parking-available', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ venueId })
    });
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Venues" value={globalStats.totalVenues} />
        <StatCard title="Total Bookings" value={globalStats.totalBookings} />
        <StatCard title="Total Revenue" value={`$${globalStats.totalRevenue}`} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Venue Management</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Venue</th>
                <th className="text-left p-2">Owner</th>
                <th className="text-left p-2">Available Spots</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue) => (
                <tr key={venue._id} className="border-b">
                  <td className="p-2">{venue.name}</td>
                  <td className="p-2">{venue.owner.name}</td>
                  <td className="p-2">{venue.availableSpots}</td>
                  <td className="p-2">
                    <button
                      onClick={() => notifyUsers(venue._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Notify Users
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}