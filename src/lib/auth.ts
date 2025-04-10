import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export function generateToken(payload) {
  return jwt.sign(
    payload,
    process.env.NEXT_PUBLIC_JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function setTokenCookie(token, response = null) {
  // If a response object is provided, use it to set the cookie
  if (response) {
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });
    return response;
  }
  
  // Otherwise, use the cookies() API (only works in route handlers)
  cookies().set({
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
  } catch (error) {
    return null;
  }
}