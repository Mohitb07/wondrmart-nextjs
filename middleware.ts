import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const { pathname } = new URL(request.url);
  const isAuthRequired =
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/user");

  // Skip requests that end with `/api`
  if (pathname.endsWith("/api")) {
    return NextResponse.next();
  }

  const isSignInPage = pathname.startsWith("/auth/signin");
  const isSignUpPage = pathname.startsWith("/auth/signup");
  const cookie = request.headers.get("Cookie")?.split("=")[1];

  if (isSignInPage && Boolean(cookie)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isSignUpPage && Boolean(cookie)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAuthRequired) {
    if (!cookie) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/checkout/:path*",
    "/auth/signin/:path*",
    "/auth/signup/:path*",
    "/user/:path*",
  ],
};
