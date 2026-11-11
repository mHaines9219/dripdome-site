/**
 * Ad attribution for lead forms: where a visitor actually came from, so the
 * self-reported "how did you hear about us" answer can be compared with the
 * measured source, and Google Ads leads can be matched by click ID later.
 *
 * The browser half captures it on landing and keeps it for 90 days (see
 * AttributionCapture in ClientLayout); the server half sanitizes what a form
 * sends back.
 */

export const ATTRIBUTION_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "landing_page",
  "referrer",
  "landed_at",
] as const;

export type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>;

const STORAGE_KEY = "dd_attribution";
const URL_PARAMS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;
const MAX_VALUE_LENGTH = 500;

/** Google keeps an ad click eligible for conversions for up to 90 days. */
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

function readStored(): Attribution | null {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  const data = JSON.parse(raw) as Attribution;
  const age = Date.now() - Date.parse(data.landed_at ?? "");
  return age >= 0 && age <= MAX_AGE_MS ? data : null;
}

/**
 * Records where this browser first landed and keeps it for 90 days, so a
 * visitor who clicks an ad and inquires a week later still carries the
 * click ID. A later landing that carries its own click ID or UTMs (a second
 * ad click) replaces it; untagged visits and internal navigation never do.
 */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const tagged = URL_PARAMS.some((key) => params.get(key));
    if (!tagged && readStored()) return;

    const data: Attribution = {
      landing_page: window.location.pathname,
      landed_at: new Date().toISOString(),
    };
    for (const key of URL_PARAMS) {
      const value = params.get(key);
      if (value) data[key] = value;
    }
    // Only count referrers from other sites
    if (document.referrer) {
      const ref = new URL(document.referrer);
      if (ref.host !== window.location.host) data.referrer = ref.origin + ref.pathname;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage blocked or bad referrer: forms just send no attribution
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    return readStored() ?? {};
  } catch {
    return {};
  }
}

/** Server side: keep only known keys with short string values. */
export function sanitizeAttribution(raw: unknown): Attribution {
  if (!raw || typeof raw !== "object") return {};
  const clean: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = (raw as Record<string, unknown>)[key];
    if (typeof value === "string" && value.trim() !== "") {
      clean[key] = value.trim().slice(0, MAX_VALUE_LENGTH);
    }
  }
  return clean;
}

/** One "key: value" line per captured field, for the team email. */
export function formatAttribution(attribution: Attribution): string {
  const lines = ATTRIBUTION_KEYS.filter((key) => attribution[key]).map(
    (key) => `- ${key}: ${attribution[key]}`
  );
  return lines.length ? lines.join("\n") : "- none captured (direct visit or storage blocked)";
}
