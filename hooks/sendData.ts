import { getAttribution } from "@/lib/attribution";

type formData = {
  name: string;
  instagram: string;
  email: string;
  message: string;
  referral?: string;
  leadId?: string;
};

export const sendData = async (data: formData) => {
  await fetch(
    "https://kingbird.app.n8n.cloud/webhook/653ffa9b-9b49-4ada-870d-f74a27ad2835",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        instagram: data.instagram,
        message: data.message,
        referral: data.referral ?? "",
        leadId: data.leadId ?? "",
        attribution: getAttribution(),
      }),
    }
  );
};
