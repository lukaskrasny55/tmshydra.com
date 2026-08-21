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

// Mirrors BookingCalendar.tsx's client-side rules — the calendar UI only
// ever disables/hides invalid choices, so without this the server accepted
// any date/time a direct API call sent it (e.g. a weekend), even though the
// UI itself makes that impossible to select. Keep these two in sync if the
// booking window or slots ever change.
const AVAILABLE_TIMES = ['09:00', '11:00', '13:00', '15:00'];
const MAX_WEEKS_AHEAD = 8;

function isValidBookingDate(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const min = new Date(today);
  min.setDate(min.getDate() + 1); // earliest bookable day is tomorrow
  const max = new Date(today);
  max.setDate(max.getDate() + MAX_WEEKS_AHEAD * 7);

  const day = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const dow = day.getDay();
  if (dow === 0 || dow === 6) return false; // no weekend obhliadky
  return day >= min && day <= max;
}

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

  if (typeof phone !== 'string' || phone.trim().length === 0) {
    errors.push('Telefón je povinný.');
  }

  if (type === 'booking') {
    if (typeof address !== 'string' || address.trim().length === 0) {
      errors.push('Adresa je povinná pre rezerváciu.');
    }
    if (typeof date !== 'string' || date.trim().length === 0) {
      errors.push('Dátum je povinný pre rezerváciu.');
    } else if (!isValidBookingDate(date.trim())) {
      errors.push('Vybraný dátum nie je možné rezervovať (víkend alebo mimo dostupného obdobia).');
    }
    if (typeof time !== 'string' || time.trim().length === 0) {
      errors.push('Čas je povinný pre rezerváciu.');
    } else if (!AVAILABLE_TIMES.includes(time.trim())) {
      errors.push('Vybraný čas nie je dostupný.');
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

// Best-effort: forward the lead to the internal obhliadky/inspections app so
// it shows up in its planner too, without the customer having to be re-typed
// in by hand. This must never affect the response to the website visitor —
// any failure (app down, env vars missing, timeout) is swallowed silently.
// Uses raw (non-HTML-escaped) field values since this is data, not an email.
async function notifyInspectionsApp({ name, email, phone, address, message, date, time }) {
  const url = process.env.INSPECTIONS_WEBHOOK_URL;
  const secret = process.env.INSPECTIONS_WEBHOOK_SECRET;
  if (!url || !secret) {
    // Logged (not thrown) so this stays fire-and-forget for the visitor, but
    // a missing/misnamed env var is no longer invisible in Vercel logs.
    console.error('notifyInspectionsApp: missing INSPECTIONS_WEBHOOK_URL or INSPECTIONS_WEBHOOK_SECRET', {
      hasUrl: Boolean(url),
      hasSecret: Boolean(secret),
    });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(`${url.replace(/\/$/, '')}/api/web-inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        address,
        message,
        date,
        time,
        source: date ? 'booking' : 'web',
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      const bodyText = await res.text().catch(() => '');
      console.error('notifyInspectionsApp: non-OK response', res.status, bodyText.slice(0, 500));
    }
  } catch (err) {
    // Never rethrown — this must never affect the response to the website
    // visitor — but logged so failures (bad URL, network, timeout) are
    // diagnosable instead of silently vanishing.
    console.error('notifyInspectionsApp: request failed', err instanceof Error ? err.message : err);
  } finally {
    clearTimeout(timeout);
  }
}

// Server-side GA4 lead tracking, sent via Measurement Protocol straight from
// Vercel to Google — never touches the visitor's browser, so it can't be
// stopped by ad blockers/privacy tools the way the client-side gtag.js event
// can (confirmed: Consent Mode v2's gcs/gcd request parameters get caught by
// EasyPrivacy-style filter lists, which is why real leads stopped showing up
// in GA4 on 11 Aug even though the client-side code itself was correct).
// Fire-and-forget from the visitor's perspective is fine here since it's
// awaited internally (own try/catch, 3s timeout) same as notifyInspectionsApp.
async function notifyGA4(leadType) {
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_MP_API_SECRET;
  if (!measurementId || !apiSecret) {
    console.error('notifyGA4: missing GA4_MEASUREMENT_ID or GA4_MP_API_SECRET', {
      hasMeasurementId: Boolean(measurementId),
      hasApiSecret: Boolean(apiSecret),
    });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  try {
    const res = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: 'POST',
        // No real client_id available server-side (this never touches the
        // visitor's browser/cookie) — a fresh random id per lead is fine,
        // GA4 still counts the event; it just isn't tied to that visitor's
        // earlier (client-side, possibly-blocked) session.
        body: JSON.stringify({
          client_id: `server.${Date.now()}.${Math.random().toString(36).slice(2)}`,
          events: [{ name: 'generate_lead', params: { lead_type: leadType, source: 'server' } }],
        }),
        signal: controller.signal,
      }
    );
    if (!res.ok) {
      console.error('notifyGA4: non-OK response', res.status, (await res.text().catch(() => '')).slice(0, 300));
    }
  } catch (err) {
    console.error('notifyGA4: request failed', err instanceof Error ? err.message : err);
  } finally {
    clearTimeout(timeout);
  }
}

function companyInquiryEmail({ name, email, phone, message }) {
  return {
    subject: `Nový dopyt z webu – ${forHeader(name)}`,
    html: wrapEmail(`
      <h2 style="color:${BRAND.heading};margin-bottom:16px;">Nový dopyt z webu</h2>
      <p><b>Meno:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      ${phone ? `<p><b>Telefón:</b> ${phone}</p>` : ''}
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
  const hasPhone = typeof phone === 'string' && phone.trim().length > 0;
  const safe = {
    name: escapeHtml(name.trim()),
    email: escapeHtml(validatedEmail),
    message: escapeHtml(message.trim()),
    phone: hasPhone ? escapeHtml(phone.trim()) : undefined,
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

    // Awaited (not fire-and-forget): Vercel freezes the serverless instance
    // right after the response is sent, so an un-awaited call here was
    // getting killed mid-flight before its fetch (or even its error log)
    // could complete — this is why leads silently never reached the
    // inspections app. notifyInspectionsApp has its own try/catch and 5s
    // timeout, so this still can never turn into an error response for the
    // website visitor; it just makes sure the call actually finishes first.
    await notifyInspectionsApp({
      name: name.trim(),
      email: validatedEmail,
      phone: hasPhone ? phone.trim() : undefined,
      address: isBooking ? address.trim() : undefined,
      message: message.trim(),
      date: isBooking ? date.trim() : undefined,
      time: isBooking ? time.trim() : undefined,
    });

    // Same reasoning as notifyInspectionsApp above: awaited, not
    // fire-and-forget, so Vercel doesn't freeze the instance mid-request.
    await notifyGA4(isBooking ? 'booking' : 'form');

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Email error' });
  }
}
