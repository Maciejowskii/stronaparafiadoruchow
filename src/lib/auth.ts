import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "parafia2026!";
const SESSION_SECRET = process.env.SESSION_SECRET || "parafia-doruchow-secret-key-2026";
const COOKIE_NAME = "parafia_admin_session";

export function createSessionToken(): string {
  const timestamp = Date.now();
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(`admin-${timestamp}`)
    .digest("hex");
  return `admin-${timestamp}.${signature}`;
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payload, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("hex");

  if (signature !== expectedSignature) return false;

  // Check token age (max 7 days)
  const timestampStr = payload.replace("admin-", "");
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  const age = Date.now() - timestamp;
  return age < 7 * 24 * 60 * 60 * 1000;
}

export function authenticateAdmin(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function checkIsAdmin(): boolean {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return isValidSessionToken(token);
}

export { COOKIE_NAME };
