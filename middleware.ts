import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Temporarily allow all access
  return NextResponse.next();
}

// Match all admin routes
export const config = {
  matcher: ['/admin/:path*'],
}; 