/**
 * Edge-safe auth: session token only (no Node crypto).
 * Use in middleware. Session = cookie value equals ADMIN_SESSION_TOKEN or AUTH_SECRET.
 */

export const ADMIN_COOKIE_NAME = "admin_session";

function getSessionToken(): string {
  const token =
    process.env.ADMIN_SESSION_TOKEN ||
    process.env.AUTH_SECRET ||
    process.env.DATABASE_URL;
  if (!token) throw new Error("Set ADMIN_SESSION_TOKEN or AUTH_SECRET for admin login.");
  return token;
}

export function verifyAdminCookie(cookieValue: string | undefined): boolean {
  if (!cookieValue || !cookieValue.trim()) return false;
  try {
    return cookieValue.trim() === getSessionToken();
  } catch {
    return false;
  }
}

export function getSessionTokenForCookie(): string {
  return getSessionToken();
}

export const ADMIN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
};
