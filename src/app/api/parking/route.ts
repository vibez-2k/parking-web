import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ParkingSlot from '@/models/ParkingSlot';
import { sendEmail } from '@/lib/email';

export async function GET() {
  try {
    await connectDB();
    const slots = await ParkingSlot.find().populate('vehicle');
    return NextResponse.json(slots);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch parking slots' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();
    const slot = await ParkingSlot.create(body);
    return NextResponse.json(slot);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create parking slot' }, { status: 500 });
  }
}