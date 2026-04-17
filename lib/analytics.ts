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

export function trackGenerateLead(opts: {
  form: string;
  value?: number;
  currency?: string;
}) {
  const { form, value = 500, currency = "USD" } = opts;
  pushDataLayer("generate_lead", {
    form_type: form,
    value,
    currency,
  });
}

export function trackPageView(opts: { page: string }) {
  pushDataLayer(`view_${opts.page}`, { page: opts.page });
}
