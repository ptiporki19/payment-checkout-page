import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  try {
    // Check if the user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // If the user is not authenticated and trying to access admin routes
    if (!session && req.nextUrl.pathname.startsWith('/admin')) {
      // Redirect to login page if not already there
      if (req.nextUrl.pathname !== '/admin/login') {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }
    }

    // If the user is authenticated, check if they have admin role
    if (session) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }

      const roles = user.app_metadata?.roles || [];
      
      // If user is authenticated but not an admin, redirect to home
      if (req.nextUrl.pathname.startsWith('/admin') && !roles.includes('admin')) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      // If user is authenticated and trying to access login page
      if (req.nextUrl.pathname === '/admin/login') {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of error, redirect to login
    if (req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    return res;
  }
}

// Match all admin routes
export const config = {
  matcher: ['/admin/:path*'],
}; 