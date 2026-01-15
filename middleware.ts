import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Better Auth uses different cookie names in production vs development
    const sessionToken =
      request.cookies.get('__Secure-better-auth.session_token') ??
      request.cookies.get('better-auth.session_token');

    if (!sessionToken) {
      const url = request.nextUrl.clone();
      url.pathname = '/sign-in';
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
