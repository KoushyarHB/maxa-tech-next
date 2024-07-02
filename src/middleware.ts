import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "cookies-next";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  if (pathname.startsWith("/dashboard")) {
    const role = getCookie("role", { req });

    if (role !== "admin") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/cart")) {
    const userId = getCookie("userId", { req });

    if (!userId) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/checkout")) {
    const userId = getCookie("userId", { req });

    if (!userId) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/payment")) {
    const userId = getCookie("userId", { req });

    if (!userId) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/cart/:path*",
    "/checkout/:path*",
    "/payment/:path*",
  ],
};
