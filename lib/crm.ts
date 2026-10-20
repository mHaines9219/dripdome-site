/**
 * Server-only hand-off of verified leads to the n8n CRM workflow. The webhook
 * URL lives in N8N_LEAD_WEBHOOK_URL so it is never shipped to the browser
 * (it used to be, which let anyone post fake leads to the CRM).
 */
export async function sendLeadToCrm(payload: Record<string, unknown>): Promise<void> {
  const url = process.env.N8N_LEAD_WEBHOOK_URL;
  if (!url) {
    console.warn("N8N_LEAD_WEBHOOK_URL is not set; lead not sent to CRM");
    return;
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) console.error(`CRM webhook returned ${response.status}`);
  } catch (error) {
    // The lead email already went out, so a CRM outage must not fail the request
    console.error("CRM webhook error:", error);
  }
}
