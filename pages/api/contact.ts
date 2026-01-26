import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

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
    } = req.body;

    // Verify reCAPTCHA token
    try {
      const recaptchaResponse = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        }
      );

      const recaptchaData = await recaptchaResponse.json();

      if (!recaptchaData.success) {
        return res.status(400).json({ error: "Invalid CAPTCHA" });
      }
    } catch (error) {
      console.error("reCAPTCHA verification error:", error);
      return res.status(500).json({ error: "Failed to verify CAPTCHA" });
    }

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
        text: `Hi ${name},\n\nThank you for your rental request. We have received your inquiry and will review it shortly.\n\nRental Details:\n- Equipment Requested: ${equipmentList}\n- Rental Period: ${rentalStartDate} to ${rentalEndDate}\n- Project Description: ${projectDescription}\n${instagram ? `- Instagram: ${instagram}` : ""}\n\nWe will be in touch soon!\n\nBest regards,\nDrip Dome Productions`,
        cc: [{ email: "info@dripdome.com", name: "Drip Dome Productions" }],
        bcc: [
          { email: "diana@dripdome.com", name: "Diana Haines" },
          { email: "matt@dripdome.com", name: "Matt Haines" },
          { email: "patricia@dripdome.com", name: "Patricia Kwiatkowski" },
        ],
      };

      try {
        await sgMail.send(msg);
        res.status(200).json({ message: "Rental request sent successfully" });
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
        text: `Hi ${name},\n\nThank you for reaching out. We have received your message and will be in touch shortly!: "${message}".\n\nBest regards,\nDrip Dome Productions`,
        cc: [{ email: "info@dripdome.com", name: "Drip Dome Productions" }],
        bcc: [
          { email: "diana@dripdome.com", name: "Diana Haines" },
          { email: "matt@dripdome.com", name: "Matt Haines" },
          { email: "patricia@dripdome.com", name: "Patricia Kwiatkowski" },
        ],
      };

      try {
        await sgMail.send(msg);
        res.status(200).json({ message: "Email sent successfully" });
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
