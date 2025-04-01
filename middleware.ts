import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const authRoutes = ["/dashboard", "/setting"];
const adminRoutes = ["/user-management"];
const publicRoutes = ["/register", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const cookie = req.cookies.get("session")?.value;
  const session = await decrypt(cookie);

  if (
    adminRoutes.some((route) => path === route || path.startsWith(`${route}/`))
  ) {
    if (!session?.userId) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  } else if (
    authRoutes.some((route) => path === route || path.startsWith(`${route}/`))
  ) {
    if (!session?.userId) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  } else if (publicRoutes.includes(path) && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
