import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, message, recaptchaToken } = req.body;

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

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const msg = {
      to: email, // Send response to the user's email
      from: {
        email: "info@dripdome.com",
        name: "Drip Dome Productions",
      }, // Your verified sender
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
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
