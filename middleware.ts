import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCookie, ADMIN_COOKIE_NAME } from "@/lib/simple-auth-edge";

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const cookieValue = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifyAdminCookie(cookieValue)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
