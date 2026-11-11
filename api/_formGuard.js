// Anti-bot checks for the public forms (contact, calculator, booking).
// Added 11.11.2026 after two automated submissions (random-letter names like
// "SYaytSTlDaFhJCbewYV", a non-Slovak 10-digit phone, same e-mail from two
// different forms within seconds) landed in the inspections planner.
//
// File name starts with "_" so Vercel does not expose it as an API route.
// The client has a mirrored copy of the content rules in
// components/formGuard.ts (same thresholds) — keep both in sync.

// A real person needs well over this to type name + phone + e-mail + message,
// even with browser autofill. Anything faster is a script.
export const MIN_FILL_MS = 2500;
const MAX_FILL_MS = 2 * 24 * 60 * 60 * 1000;

// Counts "aB" boundaries (lower-case letter directly followed by an upper-case
// one). Real names have at most one ("McDonald", "DiCaprio"); random strings
// like "yDNAEeBMlfLbABXf" have many.
function caseTransitions(word) {
  let n = 0;
  for (let i = 1; i < word.length; i++) {
    const prev = word[i - 1];
    const cur = word[i];
    if (prev !== prev.toUpperCase() && cur !== cur.toLowerCase()) n++;
  }
  return n;
}

export function looksLikeGibberishName(name) {
  const words = String(name).trim().split(/\s+/);
  return words.some((w) => w.length > 30 || caseTransitions(w) >= 2);
}

export function isValidName(name) {
  if (typeof name !== 'string') return false;
  const n = name.trim();
  if (n.length < 2 || n.length > 100) return false;
  // Letters (incl. diacritics), digits for company names, and ordinary
  // punctuation used in names ("s.r.o.", "O'Brien", "Novák-Kováč", "Dom & Strecha").
  if (!/^[\p{L}\p{N}][\p{L}\p{N}\p{M} .,'’&\-/]*$/u.test(n)) return false;
  if (!/\p{L}{2}/u.test(n)) return false;
  return !looksLikeGibberishName(n);
}

export function isValidPhone(phone) {
  if (typeof phone !== 'string') return false;
  const p = phone.replace(/[\s\-./()]/g, '');
  const ok = /^\+\d{9,15}$/.test(p) || /^00\d{9,15}$/.test(p) || /^0\d{8,9}$/.test(p);
  if (!ok) return false;
  // 0000000000, 1111111111, 0909090909 ... are not phone numbers.
  const digits = p.replace(/\D/g, '');
  return new Set(digits).size > 3;
}

// Random-letter filler such as "UzSZnkBaWsEwmqwlJgw" in the message box, and
// link spam.
export function looksLikeSpamMessage(message) {
  const text = String(message);
  const urls = text.match(/https?:\/\/|www\./gi) || [];
  if (urls.length >= 2) return true;
  return text
    .split(/\s+/)
    .some((t) => /^\p{L}{12,}$/u.test(t) && caseTransitions(t) >= 3);
}

// Signals that are not about the content: filled honeypot or an implausibly
// fast submit. Returns a reason string, or null when nothing looks off.
// `elapsedMs` / `contact_extra` are sent by the site's own forms; a missing
// value is NOT treated as a bot signal (an old tab with a pre-update bundle
// would otherwise silently lose a real customer) — those requests still have
// to pass the content checks above.
export function botSignal(body) {
  const b = body || {};
  if (typeof b.contact_extra === 'string' && b.contact_extra.trim().length > 0) {
    return 'honeypot';
  }
  if (b.elapsedMs !== undefined) {
    const t = Number(b.elapsedMs);
    if (!Number.isFinite(t) || t < MIN_FILL_MS || t > MAX_FILL_MS) return 'timing';
  }
  return null;
}
