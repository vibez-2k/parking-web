import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Venue from '@/models/Venue';
import { verifyToken } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    await connectDB();
    const venues = await Venue.find().populate('owner', 'name email');
    return NextResponse.json(venues);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch venues' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const token = req.cookies.get('token')?.value;
    const user = verifyToken(token);
    
    if (!user || !['super_admin', 'venue_owner'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    await connectDB();
    
    const venue = await Venue.create({
      ...data,
      owner: user.id,
      availableSpots: data.totalSpots
    });

    return NextResponse.json(venue);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create venue' }, { status: 500 });
  }
}