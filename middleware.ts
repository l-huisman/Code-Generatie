import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API_URL } from "./constants";
import { getIronSession } from "iron-session/edge";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authenticatedPaths =
    path.startsWith("/login") || path.startsWith("/signup");

  const employeeAuthenticatedPaths = path.startsWith("/dashboard");

  const sessionID = request.cookies.get("mrbankycookie")?.value;

  //If no sessionID and path is not one of the authenticatedPaths, redirect to login
  if (!sessionID && !authenticatedPaths)
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  else if (sessionID) {
    try {
      const res = NextResponse.next();
      const session: any = await getIronSession(request, res, {
        password:
          process.env.SESSION_PASSWORD ||
          "222222222222222222222222222222222222222222",
        cookieName: "mrbankycookie",
        // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
      });

      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set("Authorization", `Bearer ${session?.token}`);
      requestHeaders.set("withCredentials", "true");

      // Double check if user is logged in
      const resUser = await fetch(`${API_URL}/login/validate`, {
        method: "GET",
        headers: requestHeaders,
      });

      if (resUser.status !== 200 && !authenticatedPaths) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
      }

      const role = await resUser.json();

      if (role != "EMPLOYEE" && employeeAuthenticatedPaths) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
      }

      if (role == "EMPLOYEE" && !employeeAuthenticatedPaths) {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
      }

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
