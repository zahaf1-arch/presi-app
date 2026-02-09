import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const userCookie = request.cookies.get('user')?.value
  const { pathname } = request.nextUrl

  // Parse user from cookie
  let user = null
  if (userCookie) {
    try {
      user = JSON.parse(userCookie)
    } catch (e) {
      // Invalid JSON
    }
  }

  // Protected routes
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Admin-only routes
    if (
      pathname.includes('/candidates') ||
      pathname.includes('/elections') ||
      pathname.includes('/locations') ||
      pathname.includes('/users')
    ) {
      if (user && user.role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }

    // Operator-only routes
    if (pathname.includes('/results/entry')) {
      if (user && user.role !== 'operator') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
  }

  // Public routes
  if (pathname === '/login') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}
