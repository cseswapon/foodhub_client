import { NextRequest, NextResponse } from "next/server";
import { UserService } from "./services/user.service";
import { AuthResponse } from "./types";
import { ROLE } from "./lib/roles";

const userService = new UserService();

/**
 * Route groups
 */
const PUBLIC_ROUTES = ["/", "/meal", "/provider", "/privacy", "/terms"];
const AUTH_ROUTES = ["/auth/login", "/auth/register"];

const PROVIDER_PREFIXES = [
  "/provider/dashboard",
  "/provider/menu",
  "/provider/my-provider",
  "/provider/orders",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    /\.(jpg|jpeg|png|svg|webp|ico)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const session: AuthResponse | undefined = await userService.getSession();

  const user = session?.data?.user;
  const isAuthenticated = !!session?.data?.session;

  if (
    PUBLIC_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route + "/"),
    )
  ) {
    return NextResponse.next();
  }

  if (AUTH_ROUTES.includes(pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Admin routes (/admin + all nested)
  if (pathname.startsWith("/admin")) {
    if (user?.role !== ROLE.ADMIN) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Provider protected routes
  if (PROVIDER_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    if (user?.role !== ROLE.PROVIDER) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
