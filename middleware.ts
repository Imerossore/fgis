import { NextResponse, NextRequest } from "next/server";
import { getAuthUser } from "./lib/getAuthUser";

const publicRoutes = ["/login", "/register"];
const protectedRoutes = ["/", "/setting", "/reports"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const user = await getAuthUser();
  const userId = user?.id;

  const isPublicRoute = publicRoutes.some((route) => path === route);

  const isProtectedRoute =
    protectedRoutes.some(
      (route) => path === route || (route !== "/" && path.startsWith(route))
    ) || path === "/";

  if (isProtectedRoute && !userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicRoute && userId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/setting/:path*", "/reports/:path*"],
};
