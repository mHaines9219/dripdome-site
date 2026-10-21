import type { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";
import sgMail from "@sendgrid/mail";
import { formatAttribution, sanitizeAttribution } from "@/lib/attribution";
import { screenLead, verifyRecaptcha } from "@/lib/leadScreen";
import { sendLeadToCrm } from "@/lib/crm";
import {
  allowedUploadOrigin,
  createLeadFolder,
  createUploadSession,
  folderUrl,
  isDriveConfigured,
  rememberOidcToken,
} from "@/lib/drive";
import {
  BUDGET_RANGES,
  LOCATIONS,
  PROJECT_TYPES,
  TIMELINES,
  optionLabel,
} from "@/lib/leadFields";
import { checkIntake } from "@/lib/leadIntake";

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
        await sendLeadToCrm({
          formType: "brandActivation",
          leadId,
          name,
          email,
          company,
          projectDate,
          budgetRange,
          brief,
          referral: referral ?? "",
          attribution,
        });
        res.status(200).json({ message: "Brand activation inquiry sent successfully", lead: true, leadId });
      } catch (error) {
        console.error("SendGrid Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to send email";
        res.status(500).json({ error: errorMessage });
      }
    } else {
      // Project intake form (app/components/ContactForm.tsx)
      const intake = checkIntake(req.body);
      if (!intake.ok) {
        console.warn(`Contact form rejected (contact): ${intake.error}`);
        return res.status(400).json({ error: intake.error });
      }
      const lead = intake.lead;

      // Attachments go browser -> Drive. A Drive problem must never cost us
      // the lead, so on failure the inquiry still sends without uploads.
      let drive: { folderId: string; folderUrl: string; uploadUrls: string[] } | null = null;
      let filesNote = "";
      if (lead.files.length > 0) {
        const origin = allowedUploadOrigin(req.headers.origin);
        if (!isDriveConfigured() || !origin) {
          filesNote = !origin ? "upload origin not allowed" : "Drive not configured";
        } else {
          try {
            rememberOidcToken(req);
            const folderId = await createLeadFolder(name, leadId);
            const uploadUrls = await Promise.all(
              lead.files.map((file) => createUploadSession(folderId, file, origin))
            );
            drive = {
              folderId,
              folderUrl: folderUrl(folderId),
              uploadUrls,
            };
          } catch (error) {
            console.error("Drive upload setup error:", error);
            filesNote = "Drive upload setup failed";
          }
        }
        if (filesNote) console.warn(`Lead ${leadId}: files not uploaded (${filesNote})`);
      }

      const fileNames = lead.files.map((file) => file.name);
      const answers = [
        `- Project: ${optionLabel(PROJECT_TYPES, lead.projectType)}`,
        `- Location: ${optionLabel(LOCATIONS, lead.location)}${lead.zip ? ` (${lead.zip})` : ""}`,
        `- Budget: ${optionLabel(BUDGET_RANGES, lead.budget)}`,
        `- Timeline: ${optionLabel(TIMELINES, lead.timeline)}`,
        lead.company ? `- Company: ${lead.company}` : "",
        lead.phone ? `- Phone: ${lead.phone}` : "",
        instagram ? `- Instagram: ${instagram}` : "",
        lead.links.length ? `- References:\n${lead.links.map((link) => `    ${link}`).join("\n")}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const msg = {
        to: email,
        from: {
          email: "info@dripdome.com",
          name: "Drip Dome Productions",
        },
        subject: "Thank you for contacting us",
        text: `Hi ${name},\n\nThank you for reaching out. We have received your project details and will be in touch within 48 hours.\n\n${answers}${fileNames.length ? `\n- Files: ${fileNames.join(", ")}` : ""}\n\nWhat you want built:\n${message}\n\nReference: ${leadId}\n\nBest regards,\nDrip Dome Productions`,
        cc: [{ email: "info@dripdome.com", name: "Drip Dome Productions" }],
        bcc: [
          { email: "diana@dripdome.com", name: "Diana Haines" },
          { email: "matt@dripdome.com", name: "Matt Haines" },
          { email: "patricia@dripdome.com", name: "Patricia Kwiatkowski" },
        ],
      };

      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error("SendGrid Error:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to send email";
        return res.status(500).json({ error: errorMessage });
      }

      // Team-only lead sheet: the answers, the Drive folder, and the measured
      // source beside the self-reported one. Kept out of the customer email.
      const filesLine = fileNames.length
        ? drive
          ? `Files (${fileNames.length}, uploading from the visitor's browser): ${drive.folderUrl}\n${fileNames.map((file) => `    ${file}`).join("\n")}`
          : `Files (${fileNames.length}) NOT uploaded (${filesNote}). Ask the client to email them:\n${fileNames.map((file) => `    ${file}`).join("\n")}`
        : "Files: none";
      try {
        await sgMail.send({
          to: { email: "info@dripdome.com", name: "Drip Dome Productions" },
          from: { email: "info@dripdome.com", name: "Drip Dome Productions" },
          replyTo: email,
          subject: `New lead: ${name} · ${optionLabel(PROJECT_TYPES, lead.projectType)} · ${optionLabel(BUDGET_RANGES, lead.budget)}`,
          text: `Reference: ${leadId}\nForm: contact\nName: ${name}\nEmail: ${email}\n${answers}\n\nWhat they want built:\n${message}\n\n${filesLine}\n\nHow they heard about us (self-reported): ${lead.referral || "not answered"}\n\nMeasured source:\n${formatAttribution(attribution)}`,
        });
      } catch (error) {
        // The customer email already went out, so don't fail the request
        console.error("SendGrid lead note error:", error);
      }

      await sendLeadToCrm({
        formType: "contact",
        leadId,
        name,
        email,
        phone: lead.phone,
        company: lead.company,
        instagram: instagram ?? "",
        projectType: lead.projectType,
        location: lead.location,
        zip: lead.zip,
        budget: lead.budget,
        timeline: lead.timeline,
        message,
        links: lead.links,
        referral: lead.referral,
        referralSource: lead.referralSource,
        referralDetail: lead.referralDetail,
        files: fileNames,
        driveFolderUrl: drive?.folderUrl ?? "",
        attribution,
      });

      res.status(200).json({
        message: "Email sent successfully",
        lead: true,
        leadId,
        ...(drive
          ? {
              uploads: {
                folderId: drive.folderId,
                urls: drive.uploadUrls,
              },
            }
          : {}),
        ...(lead.files.length && !drive ? { uploadsUnavailable: true } : {}),
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
