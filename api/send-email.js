import { Resend } from 'resend';

// Only these origins may call this endpoint. Local dev ports are included so
// the flow can be tested before deploying.
const ALLOWED_ORIGINS = [
  'https://tmshydra.com',
  'https://www.tmshydra.com',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5; // per IP, per window

// Best-effort in-memory rate limiter. Vercel serverless functions are
// stateless across cold starts and can run as multiple concurrent instances,
// so this Map is only shared within a single warm instance — it blunts bursts
// hitting the same instance but is not a hard global guarantee. A durable
// limiter would need Vercel KV / Upstash Redis (paid), which is out of scope.
const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function isAllowedOrigin(req) {
  const source = req.headers.origin || req.headers.referer || '';
  if (!source) return false;
  return ALLOWED_ORIGINS.some((allowed) => source.startsWith(allowed));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Strips newlines so request input can't be used for email header injection
// when it ends up in a subject line.
function forHeader(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim();
}

// BookingCalendar sends the booking date as a full ISO timestamp
// (Date.toISOString()); emails should show it the way a customer reads a date.
function formatDate(value) {
  return new Date(value).toLocaleDateString('sk-SK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function validate(body) {
  const errors = [];
  const { type, name, email, message, phone, address, date, time } = body || {};

  if (typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Meno je povinné.');
  } else if (name.trim().length > 100) {
    errors.push('Meno môže mať najviac 100 znakov.');
  }

  if (typeof email !== 'string' || email.trim().length === 0) {
    errors.push('Email je povinný.');
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.push('Email nemá platný formát.');
  }

  if (typeof message !== 'string' || message.trim().length === 0) {
    errors.push('Správa je povinná.');
  } else if (message.length > 2000) {
    errors.push('Správa môže mať najviac 2000 znakov.');
  }

  if (type === 'booking') {
    if (typeof phone !== 'string' || phone.trim().length === 0) {
      errors.push('Telefón je povinný pre rezerváciu.');
    }
    if (typeof address !== 'string' || address.trim().length === 0) {
      errors.push('Adresa je povinná pre rezerváciu.');
    }
    if (typeof date !== 'string' || date.trim().length === 0) {
      errors.push('Dátum je povinný pre rezerváciu.');
    }
    if (typeof time !== 'string' || time.trim().length === 0) {
      errors.push('Čas je povinný pre rezerváciu.');
    }
  }

  return errors;
}

const BRAND = {
  heading: '#0f172a', // slate-900 — matches the dark sections used across the site
  accent: '#2563eb', // blue-600 — matches the site's primary accent/buttons
  muted: '#888888',
};

function wrapEmail(innerHtml) {
  return `<div style="font-family: Arial, Helvetica, sans-serif; color:#1e293b; max-width:560px; margin:0 auto;">${innerHtml}</div>`;
}

function companyInquiryEmail({ name, email, message }) {
  return {
    subject: `Nový dopyt z webu – ${forHeader(name)}`,
    html: wrapEmail(`
      <h2 style="color:${BRAND.heading};margin-bottom:16px;">Nový dopyt z kalkulačky</h2>
      <p><b>Meno:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Správa:</b><br>${message}</p>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">
      <p style="color:${BRAND.muted};font-size:12px">Odoslané z formulára na tmshydra.com</p>
    `),
  };
}

function companyBookingEmail({ name, phone, email, address, date, time, message }) {
  return {
    subject: `Nová rezervácia – ${forHeader(name)}, ${forHeader(date)} ${forHeader(time)}`,
    html: wrapEmail(`
      <h2 style="color:${BRAND.heading};margin-bottom:16px;">Nová rezervácia obhliadky</h2>
      <p><b>Meno:</b> ${name}</p>
      <p><b>Telefón:</b> ${phone}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Adresa:</b> ${address}</p>
      <p><b>Dátum a čas:</b> ${date} o ${time}</p>
      <p><b>Poznámka:</b><br>${message}</p>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">
      <p style="color:${BRAND.muted};font-size:12px">Odoslané z rezervačného formulára na tmshydra.com</p>
    `),
  };
}

function customerInquiryEmail({ name, message }) {
  return {
    subject: 'Ďakujeme za váš dopyt – TMS Hydra',
    html: wrapEmail(`
      <h2 style="color:${BRAND.heading};margin-bottom:16px;">Ďakujeme, ${name}!</h2>
      <p>Váš dopyt sme úspešne prijali a čoskoro sa vám ozveme s odpoveďou.</p>
      <p><b>Zhrnutie vašej správy:</b><br>${message}</p>
      <p>Ak potrebujete niečo doplniť, stačí odpovedať priamo na tento e-mail alebo nás kontaktovať na info@tmshydra.com.</p>
      <br>
      <p>S pozdravom,<br><b style="color:${BRAND.accent}">TMS Hydra</b><br>Hydroizolácie a ploché strechy</p>
    `),
  };
}

function customerBookingEmail({ name, date, time, address, message }) {
  return {
    subject: 'Potvrdenie rezervácie obhliadky – TMS Hydra',
    html: wrapEmail(`
      <h2 style="color:${BRAND.heading};margin-bottom:16px;">Ďakujeme za rezerváciu, ${name}!</h2>
      <p>Vašu obhliadku sme si zaznamenali na termín:</p>
      <p style="font-size:16px"><b style="color:${BRAND.accent}">${date} o ${time}</b></p>
      <p><b>Adresa:</b> ${address}</p>
      <p><b>Vaša poznámka:</b><br>${message}</p>
      <p>V prípade potreby zmeny termínu nás kontaktujte na info@tmshydra.com alebo telefonicky.</p>
      <br>
      <p>Tešíme sa na stretnutie,<br><b style="color:${BRAND.accent}">TMS Hydra</b><br>Hydroizolácie a ploché strechy</p>
    `),
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service is not configured.' });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Requesty z tejto domény nie sú povolené.' });
  }

  if (isRateLimited(getClientIp(req))) {
    return res.status(429).json({ error: 'Príliš veľa požiadaviek. Skúste to prosím neskôr.' });
  }

  const errors = validate(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(' ') });
  }

  const { type, name, email, message, phone, address, date, time } = req.body;
  const isBooking = type === 'booking';
  const validatedEmail = email.trim();

  // Every field is HTML-escaped before it touches an email body, so request
  // input can never inject markup/scripts into the outgoing HTML.
  const safe = {
    name: escapeHtml(name.trim()),
    email: escapeHtml(validatedEmail),
    message: escapeHtml(message.trim()),
    phone: isBooking ? escapeHtml(phone.trim()) : undefined,
    address: isBooking ? escapeHtml(address.trim()) : undefined,
    date: isBooking ? escapeHtml(formatDate(date.trim())) : undefined,
    time: isBooking ? escapeHtml(time.trim()) : undefined,
  };

  const companyEmail = isBooking ? companyBookingEmail(safe) : companyInquiryEmail(safe);
  const customerEmail = isBooking ? customerBookingEmail(safe) : customerInquiryEmail(safe);

  try {
    await resend.emails.send({
      from: 'TMS Hydra <info@tmshydra.com>',
      to: 'info@tmshydra.com',
      subject: companyEmail.subject,
      html: companyEmail.html,
    });

    // The confirmation only ever goes to the address that passed format
    // validation above — request input can never redirect it elsewhere —
    // and only after name + message also validated, so the endpoint can't be
    // driven as a bare open relay with a throwaway/missing name or body.
    await resend.emails.send({
      from: 'TMS Hydra <info@tmshydra.com>',
      to: validatedEmail,
      subject: customerEmail.subject,
      html: customerEmail.html,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Email error' });
  }
}
