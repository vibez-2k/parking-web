import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Booking from '@/models/Booking';
import Venue from '@/models/Venue';
import { verifyToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const token = req.cookies.get('token')?.value;
    const user = verifyToken(token);
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    await connectDB();

    // Check availability
    const isAvailable = await Booking.checkAvailability(
      data.venue,
      new Date(data.startTime),
      new Date(data.endTime)
    );

    if (!isAvailable) {
      return NextResponse.json({ error: 'Spot not available' }, { status: 400 });
    }

    // Create booking
    const booking = await Booking.create({
      ...data,
      user: user.id,
      status: 'pending'
    });

    // Update venue availability
    await Venue.findByIdAndUpdate(data.venue, {
      $inc: { availableSpots: -1 }
    });

    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}