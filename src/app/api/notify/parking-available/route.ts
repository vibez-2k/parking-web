import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import Venue from '@/models/Venue';
import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { venueId } = await req.json();
    await connectDB();

    const venue = await Venue.findById(venueId);
    if (!venue) {
      return NextResponse.json({ error: 'Venue not found' }, { status: 404 });
    }

    const users = await User.find({ role: 'user' });
    
    const emailPromises = users.map(user => {
      const html = `
        <h2>Parking Space Available!</h2>
        <p>Dear ${user.name},</p>
        <p>New parking spaces are available at ${venue.name}.</p>
        <p>Current available spots: ${venue.availableSpots}</p>
        <p>Book now to secure your spot!</p>
      `;

      return sendEmail(
        user.email,
        `Parking Available at ${venue.name}`,
        html
      );
    });

    await Promise.all(emailPromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json({ error: 'Failed to send notifications' }, { status: 500 });
  }
}