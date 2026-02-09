import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Lire cookies
  const token = request.cookies.get("token")?.value
  const userCookie = request.cookies.get("user")?.value

  let user = null
  if (userCookie) {
    try {
      user = JSON.parse(userCookie)
    } catch {}
  }

  // 1️⃣ PAGE ACCUEIL & LOGIN (public)
  if (pathname === "/" || pathname === "/login") {
    // Empêche d'aller à /login si déjà connecté
    if (token && pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // 2️⃣ PROTECTED : /dashboard/*
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // ADMIN ONLY
    if (
      pathname.includes("/candidates") ||
      pathname.includes("/elections") ||
      pathname.includes("/locations") ||
      pathname.includes("/users")
    ) {
      if (user?.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }

    // OPERATOR ONLY
    if (pathname.includes("/results/entry")) {
      if (user?.role !== "operator") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
}
