import { NextRequest, NextResponse } from "next/server";
import {
  getSessionTokenForCookie,
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_OPTIONS,
} from "@/lib/simple-auth-edge";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  const adminEmail1 = process.env.ADMIN_EMAIL_1;
  const adminPass1 = process.env.ADMIN_PASS_1;
  const adminEmail2 = process.env.ADMIN_EMAIL_2;
  const adminPass2 = process.env.ADMIN_PASS_2;

  const normalized = email?.trim().toLowerCase() ?? "";
  const isFirstAdmin =
    normalized === (adminEmail1?.trim().toLowerCase() ?? "") &&
    password === adminPass1;
  const isSecondAdmin =
    normalized === (adminEmail2?.trim().toLowerCase() ?? "") &&
    password === adminPass2;

  if (!isFirstAdmin && !isSecondAdmin) {
    return NextResponse.redirect(new URL("/error", request.url));
  }

  const origin =
    request.nextUrl?.origin ?? request.url.split("/").slice(0, 3).join("/");
  const adminUrl = `${origin}/admin`;
  const res = new NextResponse(
    `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=${adminUrl}"></head><body>Redirecting...</body></html>`,
    {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
  res.cookies.set(ADMIN_COOKIE_NAME, getSessionTokenForCookie(), ADMIN_COOKIE_OPTIONS);
  return res;
}
