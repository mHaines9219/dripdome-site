/**
 * Qualifying options for the project intake form. Shared by the form
 * (ContactForm) and the API (pages/api/contact.ts), which rejects any value
 * not listed here, so edit the bands in one place.
 *
 * Values are what reach the email, the CRM and Google Ads offline imports,
 * so keep them stable once the campaign is live; labels can change freely.
 */

export type LeadOption = { value: string; label: string };

export const PROJECT_TYPES: LeadOption[] = [
  { value: "podcast", label: "PODCAST STUDIO" },
  { value: "activation", label: "BRAND ACTIVATION" },
  { value: "interior", label: "INTERIOR / OFFICE" },
  { value: "setDesign", label: "SET DESIGN" },
  { value: "other", label: "SOMETHING ELSE" },
];

export const LOCATIONS: LeadOption[] = [
  { value: "nyc", label: "NEW YORK AREA" },
  { value: "la", label: "LOS ANGELES AREA" },
  { value: "other", label: "SOMEWHERE ELSE" },
];

export const BUDGET_RANGES: LeadOption[] = [
  { value: "under10k", label: "UNDER $10K" },
  { value: "10k-25k", label: "$10K TO $25K" },
  { value: "25k-50k", label: "$25K TO $50K" },
  { value: "50k-100k", label: "$50K TO $100K" },
  { value: "100k+", label: "$100K+" },
  { value: "unsure", label: "NOT SURE YET" },
];

export const TIMELINES: LeadOption[] = [
  { value: "asap", label: "ASAP (UNDER 1 MONTH)" },
  { value: "1-3m", label: "1 TO 3 MONTHS" },
  { value: "3-6m", label: "3 TO 6 MONTHS" },
  { value: "6m+", label: "6+ MONTHS" },
  { value: "exploring", label: "JUST EXPLORING" },
];

export const REFERRAL_SOURCES: LeadOption[] = [
  { value: "google", label: "GOOGLE SEARCH" },
  { value: "instagram", label: "INSTAGRAM" },
  { value: "referral", label: "A FRIEND OR CLIENT" },
  { value: "sawWork", label: "SAW YOUR WORK" },
  { value: "press", label: "PRESS / ARTICLE" },
  { value: "ai", label: "CHATGPT / AI SEARCH" },
  { value: "other", label: "OTHER" },
];

/** Max reference links per lead; the field is plain text, never embedded. */
export const MAX_REFERENCE_LINKS = 10;

export function isOption(options: LeadOption[], value: unknown): value is string {
  return typeof value === "string" && options.some((option) => option.value === value);
}

export function optionLabel(options: LeadOption[], value: unknown): string {
  return options.find((option) => option.value === value)?.label ?? "";
}

/**
 * Splits the references field into http(s) URLs. Anything that is not a
 * well-formed web link is dropped so nothing scriptable reaches the email
 * or CRM.
 */
export function parseReferenceLinks(raw: unknown): string[] {
  if (typeof raw !== "string") return [];
  const links: string[] = [];
  for (const token of raw.split(/[\s,]+/)) {
    if (!token) continue;
    const candidate = /^https?:\/\//i.test(token) ? token : `https://${token}`;
    try {
      const url = new URL(candidate);
      if ((url.protocol === "https:" || url.protocol === "http:") && url.hostname.includes(".")) {
        links.push(url.toString());
      }
    } catch {
      // not a link, skip it
    }
  }
  return links;
}

/** Loose phone check: optional field, 7 to 20 digits with common punctuation. */
export function isPlausiblePhone(raw: string): boolean {
  if (!/^[+\d\s().-]+$/.test(raw)) return false;
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 20;
}
