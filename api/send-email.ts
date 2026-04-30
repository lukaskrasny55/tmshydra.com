import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, email, message } = req.body;

  try {
    await resend.emails.send({
      from: 'TMS Hydra <onboarding@resend.dev>',
      to: 'info@tmshydra.com',
      subject: 'Nový dopyt z webu',
      html: `
        <h2>Nový dopyt</h2>
        <p><b>Meno:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ error: 'Email error' });
  }
}
