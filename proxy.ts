import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["en", "ka"],
  defaultLocale: "en",
  localePrefix: "always"
});

export default function proxy(request: NextRequest) {
  const response = intlMiddleware(request);

  if (response) {
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), interest-cohort=()"
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|.*\\..*).*)",
    "/",
    "/(ka|en)/:path*" 
  ]
};