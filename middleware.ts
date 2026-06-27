import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/perfil");
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// 3. Configura qué rutas debe escuchar este middleware
export const config = {
  matcher: ["/login", "/dashboard/:path*", "/perfil/:path*"],
};