import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname;

  // Allow access to the login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check for admin routes that need protection
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // In a real app, this would check for a valid session or JWT token
    // Here we're checking for a specific cookie that gets set on login
    const authCookie = request.cookies.get('cms_auth');
    
    // If not authenticated, redirect to login
    if (!authCookie || authCookie.value !== 'true') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// Match all admin routes
export const config = {
  matcher: ['/admin/:path*'],
}; 