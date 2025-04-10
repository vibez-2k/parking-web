import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  
  if (!user || password !== user.password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Generate token with all needed user data
  const token = generateToken({ 
    id: user._id, 
    role: user.role,
    email: user.email,
    name: user.name || '' 
  });

  // Create the response object
  const response = NextResponse.json({ 
    message: 'Login successful',
    user: {
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
  
  // Set the cookie on the response
  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: false, // Set to false so it's accessible by client-side JS
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  });

  return response;
}