import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API_URL } from "./constants";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authenticatedPaths =
    path.startsWith("/login") || path.startsWith("/signup");

  // Setup headers
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Cookie", request.headers.get("cookie") || "");
  requestHeaders.set("withCredentials", "true");

  const sessionID = request.cookies.get("mrbankycookie")?.value;

  //If no sessionID and path is not one of the authenticatedPaths, redirect to login
  if (!sessionID && !authenticatedPaths)
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  else if (sessionID) {
    try {
      // // Double check if user is logged in
      // const res = await fetch(`${API_URL}/is-logged-in`, {
      //   method: "GET",
      //   headers: requestHeaders,
      // });

      // // User is not logged in and path is not one of the authenticatedPaths, redirect to login
      // if (res?.status !== 200 && !authenticatedPaths) {
      //   return NextResponse.redirect(new URL("/login", request.nextUrl));
      // }

      // // User is logged in and path is one of the authenticatedPaths, redirect to home
      // if (authenticatedPaths) {
      //   return NextResponse.redirect(new URL("/", request.nextUrl));
      // }
      if (authenticatedPaths) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
      }
    } catch (err) {}
  }

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - backend (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|backend|site.webmanifest|_next/static|_next/image|favicon.ico|favicon|android).*)",
  ],
};
