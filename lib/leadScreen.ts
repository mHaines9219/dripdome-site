/**
 * Server-side screening for inbound form submissions (/api/contact).
 *
 * Spam that trips a bot-only trap (honeypot filled, form submitted faster
 * than a human can type) is dropped silently: the API answers 200 so the bot
 * learns nothing, but no email goes out and the client is told `lead: false`
 * so no conversion fires. Anything a real person could get wrong (bad email,
 * oversized fields) gets a normal 400.
 *
 * Shared constants are safe to import from client components.
 */

/** Hidden field real visitors never see. Any value means a bot filled it. */
export const HONEYPOT_FIELD = "website";

/** Fastest plausible human fill time for our shortest form. */
export const MIN_FILL_MS = 3000;

const MAX_LINKS = 3;
const MAX_LENGTH: Record<string, number> = {
  name: 120,
  email: 254,
  company: 160,
  instagram: 120,
  referral: 300,
  referralSource: 40,
  referralDetail: 300,
  phone: 40,
  zip: 20,
  projectType: 40,
  location: 40,
  budget: 40,
  timeline: 40,
  links: 3000,
  projectDate: 40,
  budgetRange: 40,
  rentalStartDate: 40,
  rentalEndDate: 40,
  message: 5000,
  brief: 5000,
  projectDescription: 5000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_RE = /(https?:\/\/|www\.)\S+/i;
const URL_GLOBAL_RE = new RegExp(URL_RE.source, "gi");

export type ScreenResult =
  | { ok: true }
  | { ok: false; silent: true; reason: string }
  | { ok: false; silent: false; reason: string; error: string };

const spam = (reason: string): ScreenResult => ({ ok: false, silent: true, reason });
const invalid = (reason: string, error: string): ScreenResult => ({
  ok: false,
  silent: false,
  reason,
  error,
});

export function screenLead(body: Record<string, unknown>): ScreenResult {
  const honeypot = body[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return spam("honeypot");
  }

  // Elapsed time is measured on the client so clock skew can't matter.
  // A missing value means a direct POST or a stale bundle, so ask for a
  // refresh instead of silently dropping what might be a real person.
  const fillMs = body.formFillMs;
  if (typeof fillMs !== "number" || !Number.isFinite(fillMs)) {
    return invalid("no_timer", "Please refresh the page and try again.");
  }
  if (fillMs < MIN_FILL_MS) {
    return spam("too_fast");
  }

  for (const [field, max] of Object.entries(MAX_LENGTH)) {
    const value = body[field];
    if (value === undefined || value === null) continue;
    if (typeof value !== "string") {
      return invalid(`bad_type:${field}`, "Invalid form data");
    }
    if (value.length > max) {
      return invalid(`too_long:${field}`, `The ${field} field is too long`);
    }
  }

  const email = body.email;
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return invalid("bad_email", "Please enter a valid email address");
  }

  const name = typeof body.name === "string" ? body.name : "";
  if (URL_RE.test(name)) {
    return spam("link_in_name");
  }

  // The references field exists for links, so the API caps it separately
  const freeText = ["message", "brief", "projectDescription"]
    .map((field) => (typeof body[field] === "string" ? (body[field] as string) : ""))
    .join(" ");
  const links = freeText.match(URL_GLOBAL_RE)?.length ?? 0;
  if (links > MAX_LINKS) {
    return spam("too_many_links");
  }

  return { ok: true };
}

/**
 * Verifies a reCAPTCHA token with Google. When RECAPTCHA_ALLOWED_HOSTNAMES is
 * set (comma separated, e.g. "dripdome.com,www.dripdome.com"), tokens solved
 * on any other host are rejected too.
 */
export async function verifyRecaptcha(token: unknown): Promise<boolean> {
  if (typeof token !== "string" || token === "") {
    console.warn("reCAPTCHA rejected: no token in request");
    return false;
  }
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.error("reCAPTCHA rejected: RECAPTCHA_SECRET_KEY is not set in this environment");
    return false;
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
    }).toString(),
  });
  const data = (await response.json()) as {
    success?: boolean;
    hostname?: string;
    "error-codes"?: string[];
  };
  if (!data.success) {
    // e.g. invalid-input-secret (secret and site key from different keys),
    // timeout-or-duplicate (token over 2 minutes old or reused)
    console.warn(
      `reCAPTCHA rejected by Google: ${(data["error-codes"] ?? []).join(", ") || "no reason given"} (host ${data.hostname ?? "unknown"})`
    );
    return false;
  }

  const allowed = (process.env.RECAPTCHA_ALLOWED_HOSTNAMES ?? "")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);
  if (allowed.length > 0 && !allowed.includes((data.hostname ?? "").toLowerCase())) {
    console.warn(`reCAPTCHA rejected: host ${data.hostname} not in RECAPTCHA_ALLOWED_HOSTNAMES`);
    return false;
  }
  return true;
}
