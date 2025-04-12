import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Booking from '@/models/Booking';
import ParkingSlot from '@/models/ParkingSlot';
import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();
    
    // Check if slot is available
    const slot = await ParkingSlot.findById(body.parkingSlot);
    if (!slot || slot.status !== 'available') {
      return NextResponse.json({ error: 'Slot not available' }, { status: 400 });
    }

    // Create booking
    const booking = await Booking.create(body);
    
    // Update slot status
    slot.status = 'occupied';
    slot.vehicle = body.vehicle;
    await slot.save();

    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}