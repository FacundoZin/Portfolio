import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const DEFAULT_LOCALE = "es"
const COOKIE_NAME = "locale"

export function middleware(request: NextRequest) {
  const localeCookie = request.cookies.get(COOKIE_NAME)?.value
  const pathname = request.nextUrl.pathname

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // If no locale cookie, set default
  if (!localeCookie) {
    const response = NextResponse.next()
    response.cookies.set(COOKIE_NAME, DEFAULT_LOCALE, {
      path: "/",
      maxAge: 365 * 24 * 60 * 60, // 1 year
      sameSite: "lax",
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
}
