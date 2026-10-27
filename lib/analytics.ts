declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

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
}

export function trackPageView(opts: { page: string }) {
  pushDataLayer(`view_${opts.page}`, { page: opts.page });
}
