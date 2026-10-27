import type { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";
import sgMail from "@sendgrid/mail";
import { formatAttribution, sanitizeAttribution } from "@/lib/attribution";
import { screenLead, verifyRecaptcha } from "@/lib/leadScreen";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      name,
      email,
      message,
      recaptchaToken,
      formType,
      // Rental-specific fields
      equipmentDesired,
      rentalStartDate,
      rentalEndDate,
      projectDescription,
      instagram,
      referral,
      // Brand activation-specific fields
      company,
      projectDate,
      budgetRange,
      brief,
    } = req.body;

    // Screen for bots before spending a CAPTCHA call or an email on them
    const screen = screenLead(req.body ?? {});
    if (!screen.ok) {
      console.warn(`Contact form rejected (${formType ?? "contact"}): ${screen.reason}`);
      if (screen.silent) {
        // Look like a success so bots don't adapt; `lead: false` keeps the
        // client from firing a conversion or forwarding it to the CRM
        return res.status(200).json({ message: "Received", lead: false });
      }
      return res.status(400).json({ error: screen.error });
    }

    try {
      if (!(await verifyRecaptcha(recaptchaToken))) {
        return res.status(400).json({ error: "Invalid CAPTCHA" });
      }
    } catch (error) {
      console.error("reCAPTCHA verification error:", error);
      return res.status(500).json({ error: "Failed to verify CAPTCHA" });
    }

    // Ties the email to the conversion so qualified leads can be
    // matched up and imported back into Google Ads later
    const leadId = randomUUID();
    const attribution = sanitizeAttribution(req.body?.attribution);

    // Team-only note so the measured source can be compared with the
    // self-reported answer, kept out of the customer's confirmation email
    const sendSourceNote = async (kind: string) => {
      try {
        await sgMail.send({
          to: { email: "info@dripdome.com", name: "Drip Dome Productions" },
          from: { email: "info@dripdome.com", name: "Drip Dome Productions" },
          subject: `Lead source: ${name} (${kind})`,
          text: `Reference: ${leadId}\nForm: ${kind}\nName: ${name}\nEmail: ${email}\n\nHow they heard about us (self-reported): ${referral || "not answered"}\n\nMeasured source:\n${formatAttribution(attribution)}`,
        });
      } catch (error) {
        // The customer email already went out, so don't fail the request
        console.error("SendGrid source note error:", error);
      }
    };

    // Validate inputs based on form type
    if (formType === "rental") {
      if (!name || !email || !equipmentDesired || !rentalStartDate || !rentalEndDate || !projectDescription) {
        return res.status(400).json({ error: "Missing required fields for rental request" });
      }

      // Format equipment list
      const equipmentList = Array.isArray(equipmentDesired)
        ? equipmentDesired.join(", ")
        : equipmentDesired;

      const msg = {
        to: email,
        from: {
          email: "info@dripdome.com",
          name: "Drip Dome Productions",
        },
        subject: "Thank you for your rental request",
        text: `Hi ${name},\n\nThank you for your rental request. We have received your inquiry and will review it shortly.\n\nRental Details:\n- Equipment Requested: ${equipmentList}\n- Rental Period: ${rentalStartDate} to ${rentalEndDate}\n- Project Description: ${projectDescription}\n${instagram ? `- Instagram: ${instagram}\n` : ""}- Reference: ${leadId}\n\nWe will be in touch soon!\n\nBest regards,\nDrip Dome Productions`,
        cc: [{ email: "info@dripdome.com", name: "Drip Dome Productions" }],
        bcc: [
          { email: "diana@dripdome.com", name: "Diana Haines" },
          { email: "matt@dripdome.com", name: "Matt Haines" },
          { email: "patricia@dripdome.com", name: "Patricia Kwiatkowski" },
        ],
      };

      try {
        await sgMail.send(msg);
        await sendSourceNote("rental");
        res.status(200).json({ message: "Rental request sent successfully", lead: true, leadId });
      } catch (error) {
        console.error("SendGrid Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to send email";
        res.status(500).json({ error: errorMessage });
      }
    } else if (formType === "brandActivation") {
      if (!name || !email || !company || !projectDate || !budgetRange || !brief) {
        return res.status(400).json({ error: "Missing required fields for brand activation inquiry" });
      }

      const msg = {
        to: email,
        from: {
          email: "info@dripdome.com",
          name: "Drip Dome Productions",
        },
        subject: `New Brand Activation Inquiry: ${company}`,
        text: `Hi ${name},\n\nThank you for reaching out about your brand activation project. We received your inquiry and will review it within 48 hours.\n\nProject Details:\n- Company: ${company}\n- Estimated Project Date: ${projectDate}\n- Budget Range: ${budgetRange}\n- Brief: ${brief}\n${referral ? `- How they heard about us: ${referral}\n` : ""}\nSource: Google Ads landing page\nReference: ${leadId}\n\nSpeak soon,\nDrip Dome Productions`,
        cc: [{ email: "info@dripdome.com", name: "Drip Dome Productions" }],
        bcc: [
          { email: "diana@dripdome.com", name: "Diana Haines" },
          { email: "matt@dripdome.com", name: "Matt Haines" },
          { email: "patricia@dripdome.com", name: "Patricia Kwiatkowski" },
        ],
      };

      try {
        await sgMail.send(msg);
        await sendSourceNote("brandActivation");
        res.status(200).json({ message: "Brand activation inquiry sent successfully", lead: true, leadId });
      } catch (error) {
        console.error("SendGrid Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to send email";
        res.status(500).json({ error: errorMessage });
      }
    } else {
      // Original contact form handling
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const msg = {
        to: email,
        from: {
          email: "info@dripdome.com",
          name: "Drip Dome Productions",
        },
        subject: "Thank you for contacting us",
        text: `Hi ${name},\n\nThank you for reaching out. We have received your message and will be in touch shortly!: "${message}".\n\n${referral ? `How they heard about us: ${referral}\n` : ""}Reference: ${leadId}\n\nBest regards,\nDrip Dome Productions`,
        cc: [{ email: "info@dripdome.com", name: "Drip Dome Productions" }],
        bcc: [
          { email: "diana@dripdome.com", name: "Diana Haines" },
          { email: "matt@dripdome.com", name: "Matt Haines" },
          { email: "patricia@dripdome.com", name: "Patricia Kwiatkowski" },
        ],
      };

      try {
        await sgMail.send(msg);
        await sendSourceNote("contact");
        res.status(200).json({ message: "Email sent successfully", lead: true, leadId });
      } catch (error) {
        console.error("SendGrid Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to send email";
        res.status(500).json({ error: errorMessage });
      }
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
