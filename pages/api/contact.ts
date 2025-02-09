import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const msg = {
      to: email, // Send response to the user's email
      from: {
        email: 'info@dripdome.com',
        name: 'Drip Dome Productions',
      }, // Your verified sender
      subject: 'Thank you for contacting us',
      text: `Hi ${name},\n\nThank you for reaching out. We have received your message: "${message}".\n\nBest regards,\nDrip Dome Productions`,
      cc: [{ email: 'matt@dripdome.com', name: 'Matt Haines' }],
      bcc: [{ email: 'diana@dripdome.com', name: 'Diana Haines' }],
    };

    try {
      await sgMail.send(msg);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error: any) {
      console.error('SendGrid Error:', error);
      res.status(500).json({ error: error.message || 'Failed to send email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
