declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

// The Google Ads tag (AW-18099031816) loads directly in app/layout.tsx, so a
// verified lead can be reported straight to Ads without a GTM tag. Both values
// are inlined at build time; with no label set, nothing is sent to Ads.
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18099031816";
const ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

type DataLayerPayload = Record<string, unknown>;

export function pushDataLayer(event: string, payload: DataLayerPayload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

/**
 * Fire only after /api/contact confirms a verified lead (`lead: true`),
 * never on button click, so spam and failed sends stay out of Google Ads.
 * `leadId` doubles as transaction_id so a retried push counts once, and
 * `email` feeds enhanced conversions for leads via GTM's user-provided data.
 *
 * When NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL is set it also sends the
 * conversion straight to Google Ads through gtag. Don't also add a GTM Ads
 * conversion tag on generate_lead for the same action, or each lead is sent
 * twice (the shared transaction_id dedupes, but one path is enough).
 */
export function trackGenerateLead(opts: {
  form: string;
  leadId: string;
  email?: string;
  value?: number;
  currency?: string;
}) {
  const { form, leadId, email, value = 500, currency = "USD" } = opts;
  pushDataLayer("generate_lead", {
    form_type: form,
    lead_id: leadId,
    transaction_id: leadId,
    value,
    currency,
    ...(email ? { user_data: { email: email.trim().toLowerCase() } } : {}),
  });
  sendAdsLeadConversion({ leadId, email, value, currency });
}

function sendAdsLeadConversion(opts: {
  leadId: string;
  email?: string;
  value: number;
  currency: string;
}) {
  if (typeof window === "undefined" || !ADS_LEAD_LABEL) return;
  // Queue through dataLayer if gtag.js (lazy loaded) isn't ready yet; it
  // replays queued commands once it loads.
  const gtag =
    window.gtag ??
    function (...args: unknown[]) {
      window.dataLayer = window.dataLayer || [];
      (window.dataLayer as unknown[]).push(args);
    };
  if (opts.email) {
    gtag("set", "user_data", { email: opts.email.trim().toLowerCase() });
  }
  gtag("event", "conversion", {
    send_to: `${ADS_ID}/${ADS_LEAD_LABEL}`,
    value: opts.value,
    currency: opts.currency,
    transaction_id: opts.leadId,
  });
}

export function trackPageView(opts: { page: string }) {
  pushDataLayer(`view_${opts.page}`, { page: opts.page });
}
