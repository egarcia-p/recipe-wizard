import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  withMiddlewareAuthRequired,
  getSession,
} from "@auth0/nextjs-auth0/edge";
import * as jose from "jose";

export default withMiddlewareAuthRequired(async function middleware(
  req: NextRequest
) {
  const res = NextResponse.next();

  try {
    const session = await getSession(req, res);

    if (!session || !session.user) {
      return NextResponse.redirect(new URL("/api/auth/login", req.url));
    }

    // Define required scopes for different routes
    const scopesByRoute: Record<string, string[]> = {
      "/dashboard/cookbooks": ["read:recipe", "read:cookbook"],
      "/recipes": ["read:recipe", "create:recipe"],
      "/cookbooks": ["read:cookbook", "create:cookbook"],
    };

    // Get required scopes for current path
    const path = req.nextUrl.pathname;
    const requiredScopes = scopesByRoute[path] || [];

    if (requiredScopes.length > 0) {
      //const userScopes = session.user.scope?.split(" ") || [];
      // Decode the access token
      const decodedToken = jose.decodeJwt(session.accessToken || "");

      // Get scopes from the token (typically in the 'scope' or 'permissions' claim)

      const userScopes =
        //(decodedToken.scope as string)?.split(" ") ||
        (decodedToken.permissions as string[]) || [];
      const hasRequiredScopes = requiredScopes.every((scope) =>
        userScopes.includes(scope)
      );

      if (!hasRequiredScopes) {
        return NextResponse.redirect(new URL("/errors/unauthorized", req.url));
      }
    }

    return res;
  } catch (error) {
    console.error("Auth middleware error:", error);
    return NextResponse.redirect(new URL("/api/auth/login", req.url));
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/recipes/:path*",
    "/cookbooks/:path*",
    // Add more protected routes as needed
  ],
};
