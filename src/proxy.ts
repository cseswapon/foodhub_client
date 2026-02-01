import { NextRequest, NextResponse } from "next/server";
import { UserService } from "./services/user.service";
import { AuthResponse } from "./types";
import { ROLE } from "./lib/roles";

const userService = new UserService();

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session: AuthResponse | undefined = await userService.getSession();
  const user = session?.data?.user;
  const isAuthenticated = !!session?.data?.session;
  const userRole = user?.role || ROLE.USER;

  // Public routes that everyone can access
  const publicRoutes = [
    "/",
    "/terms",
    "/provider",
    /^\/provider\/[^\/]+$/, 
    /^\/review$/,
  ];

  // Authentication routes
  const authRoutes = ["/auth/login", "/auth/register"];

  // User routes (authenticated users)
  const userRoutes = [
    "/profile",
    "/profile/update",
    "/cart",
    "/checkout",
    "/order",
    /^\/order\/[^\/]+$/, // /order/[id]
  ];

  // Provider routes (only for providers)
  const providerRoutes = [
    "/provider/dashboard",
    "/provider/menu",
    "/provider/menu/add",
    /^\/provider\/menu\/update\/[^\/]+$/,
    "/provider/my-provider",
    "/provider/my-provider/add",
    "/provider/my-provider/update",
    /^\/provider\/my-provider\/update\/[^\/]+$/, 
    "/provider/orders",
    /^\/provider\/orders\/[^\/]+$/, 
    "/provider/orders/update",
    /^\/provider\/orders\/update\/[^\/]+$/, 
  ];

  // Admin routes (only for admins)
  const adminRoutes = [
    "/admin",
    "/admin/categories",
    "/admin/orders",
    "/admin/reviews",
    "/admin/users",
    "/admin/users/edit",
    /^\/admin\/users\/edit\/[^\/]+$/, // /admin/users/edit/[id]
  ];

  // Helper function to check if path matches route pattern
  const isRouteMatch = (path: string, routes: (string | RegExp)[]): boolean => {
    return routes.some((route) => {
      if (typeof route === "string") {
        return path === route;
      }
      return route.test(path);
    });
  };

  // Check if current path is public
  const isPublicRoute = isRouteMatch(pathname, publicRoutes);

  // Check route categories
  const isAuthRoute = isRouteMatch(pathname, authRoutes);
  const isUserRoute = isRouteMatch(pathname, userRoutes);
  const isProviderRoute = isRouteMatch(pathname, providerRoutes);
  const isAdminRoute = isRouteMatch(pathname, adminRoutes);

  // Handle authentication routes
  if (isAuthRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // Not logged in, allow access to auth routes
    return NextResponse.next();
  }

  // If not authenticated and trying to access protected route
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If authenticated, check role-based access
  if (isAuthenticated) {
    if (isProviderRoute && userRole !== ROLE.PROVIDER) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // User trying to access admin routes
    if (isAdminRoute && userRole !== ROLE.ADMIN) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Provider trying to access user-specific routes (optional, adjust as needed)
    if (
      userRole === ROLE.PROVIDER &&
      isUserRoute &&
      pathname !== "/profile" &&
      pathname !== "/profile/update"
    ) {
      return NextResponse.redirect(new URL("/provider/dashboard", request.url));
    }

    // Admin trying to access provider routes (optional, adjust as needed)
    if (userRole === ROLE.ADMIN) {
      if (isProviderRoute || (isUserRoute && !pathname.includes("/admin"))) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }
  }

  // All checks passed, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Public routes
    "/",
    "/terms",
    "/provider",
    "/provider/:id",
    "/review",

    // Auth routes
    "/auth/login",
    "/auth/register",

    // User routes
    "/profile",
    "/profile/update",
    "/cart",
    "/checkout",
    "/order",
    "/order/:path*",

    // Provider routes
    "/provider/dashboard",
    "/provider/menu",
    "/provider/menu/add",
    "/provider/menu/update",
    "/provider/menu/update/:id",
    "/provider/my-provider",
    "/provider/my-provider/add",
    "/provider/my-provider/update",
    "/provider/my-provider/update/:id",
    "/provider/orders",
    "/provider/orders/:id",
    "/provider/orders/update",
    "/provider/orders/update/:id",

    // Admin routes
    "/admin",
    "/admin/categories",
    "/admin/orders",
    "/admin/reviews",
    "/admin/users",
    "/admin/users/edit",
    "/admin/users/edit/:id",
  ],
};
