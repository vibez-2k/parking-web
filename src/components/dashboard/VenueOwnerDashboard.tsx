'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';

export default function VenueOwnerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalSpots: 0,
    occupiedSpots: 0,
    revenue: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const [bookingsRes, statsRes] = await Promise.all([
      fetch('/api/bookings/venue'),
      fetch('/api/venues/stats')
    ]);
    
    const [bookingsData, statsData] = await Promise.all([
      bookingsRes.json(),
      statsRes.json()
    ]);

    setBookings(bookingsData);
    setStats(statsData);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Spots" value={stats.totalSpots} />
        <StatCard title="Occupied Spots" value={stats.occupiedSpots} />
        <StatCard title="Revenue" value={`$${stats.revenue}`} />
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">User</th>
                <th className="text-left p-2">Spot</th>
                <th className="text-left p-2">Duration</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b">
                  <td className="p-2">{booking.user.name}</td>
                  <td className="p-2">{booking.spot.number}</td>
                  <td className="p-2">{booking.duration}</td>
                  <td className="p-2">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}