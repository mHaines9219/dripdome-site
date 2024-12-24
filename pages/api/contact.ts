import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    const msg = {
      to: email, // Send response to the user's email
      from: 'info@dripdome.com', // Your verified sender
      subject: 'Thank you for contacting us',
      text: `Hi ${name},\n\nThank you for reaching out. We have received your message: "${message}".\n\nBest regards,\nYour Company Name`,
      cc: 'matt@dripdome.com',
      bcc: 'diana@dripdome.com',
    };

    try {
      await sgMail.send(msg);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
