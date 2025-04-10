import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { protectedRoutes } from './utils/route-roles';

const intlMiddleware = createMiddleware(routing);

function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split('/');
  const locale = segments[1];
  if (routing.locales.includes(locale)) {
    return '/' + segments.slice(2).join('/');
  }
  return pathname;
}

async function getUserRole(request: NextRequest): Promise<string | null> {
  const token = request.cookies.get('token')?.value;
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    return payload.role as string;
  } catch {
    return null;
  }
}

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cleanedPath = getPathWithoutLocale(pathname);

  if (protectedRoutes[cleanedPath]) {
    const userRole = await getUserRole(request);
    const allowedRoles = protectedRoutes[cleanedPath];

    if (!userRole || !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
  ]
};
