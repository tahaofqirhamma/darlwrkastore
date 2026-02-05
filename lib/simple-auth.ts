import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  getSessionTokenForCookie,
  ADMIN_COOKIE_OPTIONS,
  verifyAdminCookie as verifyCookieValue,
} from "@/lib/simple-auth-edge";

export { ADMIN_COOKIE_NAME, ADMIN_COOKIE_OPTIONS } from "@/lib/simple-auth-edge";

/** Returns session if the cookie matches the shared token. */
export async function getAdminSession(): Promise<{ email?: string } | null> {
  const store = await cookies();
  const value = store.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifyCookieValue(value)) return null;
  return { email: "admin" };
}

export function setAdminCookie(): Promise<void> {
  return (async () => {
    const store = await cookies();
    store.set(ADMIN_COOKIE_NAME, getSessionTokenForCookie(), ADMIN_COOKIE_OPTIONS);
  })();
}

export function clearAdminCookie(): Promise<void> {
  return (async () => {
    const store = await cookies();
    store.delete(ADMIN_COOKIE_NAME);
  })();
}

/** Kept for compatibility; token auth does not use email allow-list. */
export function isAllowedEmail(_email: string): boolean {
  return true;
}
