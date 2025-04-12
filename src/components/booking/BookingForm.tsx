'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface BookingFormProps {
  venueId: string;
  pricePerHour: number;
}

export default function BookingForm({ venueId, pricePerHour }: BookingFormProps) {
  const router = useRouter();
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [vehicle, setVehicle] = useState({
    type: 'car',
    licensePlate: '',
    make: '',
    model: ''
  });

  const calculateTotal = () => {
    if (!startTime || !endTime) return 0;
    const hours = Math.ceil((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));
    return hours * pricePerHour;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          venue: venueId,
          startTime,
          endTime,
          vehicle,
          totalAmount: calculateTotal()
        })
      });

      if (!response.ok) throw new Error('Booking failed');
      
      const booking = await response.json();
      router.push(`/bookings/${booking._id}`);
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Time</label>
        <DatePicker
          selected={startTime}
          onChange={setStartTime}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">End Time</label>
        <DatePicker
          selected={endTime}
          onChange={setEndTime}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={startTime}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
        <select
          value={vehicle.type}
          onChange={(e) => setVehicle({ ...vehicle, type: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="car">Car</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="truck">Truck</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">License Plate</label>
        <input
          type="text"
          value={vehicle.licensePlate}
          onChange={(e) => setVehicle({ ...vehicle, licensePlate: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">
          Total: ${calculateTotal()}
        </span>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Book Now
        </button>
      </div>
    </form>
  );
}