import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
  // An array of public routes that don't require authentication.
  publicRoutes: [
    "/api/webhook/clerk",
    "/api/uploadthing",
    "/api/competitions",
    "/api/sports",
    "/api/slideshows",
  ],

  // An array of routes to be ignored by the authentication middleware.
  ignoredRoutes: ["/api/webhook/clerk"],
  beforeAuth: async (req: NextRequest) => {
    const origin = req.headers.get("origin");

    if (!origin) {
      return new NextResponse(null, {
        status: 400,
        statusText: "Bad Request",
        headers: { "Content-Type": "text/plain" },
      });
    }

    if (origin && req.nextUrl.pathname.startsWith("/api/competitions")) {
      const res = NextResponse.next();
      res.headers.append("Access-Control-Allow-Origin", origin);
      res.headers.append("Access-Control-Allow-Methods", "GET");
      return res;
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
