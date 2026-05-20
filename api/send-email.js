import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, email, message } = req.body;

 try {

  // EMAIL PRE FIRMU
  await resend.emails.send({
    from: 'TMS Hydra <onboarding@resend.dev>',
    to: 'lukaskrasny55@gmail.com',
    subject: 'Nový dopyt z webu',
    html: `
      <h2>Nový dopyt</h2>
      <p><b>Meno:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p>${message}</p>
    `,
  });

  // POTVRDENIE PRE ZÁKAZNÍKA
  await resend.emails.send({
    from: 'TMS Hydra <onboarding@resend.dev>',
    to: email,
    subject: 'Potvrdenie prijatia dopytu',
    html: `
      <h2>Ďakujeme za váš dopyt</h2>
      <p>Dobrý deň ${name},</p>
      <p>váš dopyt sme úspešne prijali a budeme vás čoskoro kontaktovať.</p>
      <p>Tím TMS Hydra</p>
    `,
  });

  return res.status(200).json({ success: true });

} catch (err) {
  return res.status(500).json({ error: 'Email error' });
}
}