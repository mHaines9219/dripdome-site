import {
  BUDGET_RANGES,
  LOCATIONS,
  MAX_REFERENCE_LINKS,
  PROJECT_TYPES,
  REFERRAL_SOURCES,
  TIMELINES,
  isOption,
  isPlausiblePhone,
  optionLabel,
  parseReferenceLinks,
} from "@/lib/leadFields";

export type IntakeLead = {
  projectType: string;
  location: string;
  zip: string;
  budget: string;
  timeline: string;
  phone: string;
  company: string;
  links: string[];
  referralSource: string;
  referralDetail: string;
  /** Source label plus detail, e.g. "A FRIEND OR CLIENT: Jane at Spotify" */
  referral: string;
};

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

/**
 * Validates the project intake form's qualifying fields, after screenLead()
 * has already checked types, lengths and bot traps. Errors are worded for
 * the visitor since a stale tab or a hand-edited request can hit them.
 */
export function checkIntake(
  body: Record<string, unknown>
): { ok: true; lead: IntakeLead } | { ok: false; error: string } {
  if (!text(body.name) || !text(body.email) || !text(body.message)) {
    return { ok: false, error: "Missing required fields" };
  }
  const { projectType, location, budget, timeline } = body;
  if (
    !isOption(PROJECT_TYPES, projectType) ||
    !isOption(LOCATIONS, location) ||
    !isOption(BUDGET_RANGES, budget) ||
    !isOption(TIMELINES, timeline)
  ) {
    return { ok: false, error: "Please refresh the page and fill in every project question." };
  }

  const phone = text(body.phone);
  if (phone && !isPlausiblePhone(phone)) {
    return { ok: false, error: "Please check the phone number" };
  }

  const links = parseReferenceLinks(body.links);
  if (links.length > MAX_REFERENCE_LINKS) {
    return { ok: false, error: `Add up to ${MAX_REFERENCE_LINKS} reference links` };
  }

  const referralSource = isOption(REFERRAL_SOURCES, body.referralSource)
    ? body.referralSource
    : "";
  const referralDetail = text(body.referralDetail);
  const referral = [optionLabel(REFERRAL_SOURCES, referralSource), referralDetail]
    .filter(Boolean)
    .join(": ");

  return {
    ok: true,
    lead: {
      projectType,
      location,
      zip: text(body.zip),
      budget,
      timeline,
      phone,
      company: text(body.company),
      links,
      referralSource,
      referralDetail,
      referral,
    },
  };
}
