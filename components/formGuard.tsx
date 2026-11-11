import React, { useRef, useState } from 'react';

// Client side of the anti-bot protection for the contact form, calculator and
// booking form. The server (api/_formGuard.js, api/send-email.js) re-checks
// everything — this layer exists so real visitors get a clear message instead
// of a generic error, and so a script that drives the page still does not
// fire an Ads / Meta conversion. Keep the content rules below in sync with
// api/_formGuard.js.

// A real person needs well over this to fill in the form, even with autofill.
export const MIN_FILL_MS = 2500;

function caseTransitions(word: string): number {
  let n = 0;
  for (let i = 1; i < word.length; i++) {
    const prev = word[i - 1];
    const cur = word[i];
    if (prev !== prev.toUpperCase() && cur !== cur.toLowerCase()) n++;
  }
  return n;
}

export function validateName(name: string): string | null {
  const n = name.trim();
  if (n.length < 2) return 'Zadajte prosím meno a priezvisko.';
  const valid =
    /^[\p{L}\p{N}][\p{L}\p{N}\p{M} .,'’&\-/]*$/u.test(n) &&
    /\p{L}{2}/u.test(n) &&
    !n.split(/\s+/).some((w) => w.length > 30 || caseTransitions(w) >= 2);
  return valid ? null : 'Zadajte prosím meno a priezvisko tak, ako sa bežne píšu.';
}

export function validatePhone(phone: string): string | null {
  const p = phone.replace(/[\s\-./()]/g, '');
  const ok = /^\+\d{9,15}$/.test(p) || /^00\d{9,15}$/.test(p) || /^0\d{8,9}$/.test(p);
  if (!ok || new Set(p.replace(/\D/g, '')).size <= 3) {
    return 'Zadajte telefón vo formáte 0911 123 456 alebo +421 911 123 456.';
  }
  return null;
}

export function validateMessage(message: string): string | null {
  const urls = message.match(/https?:\/\/|www\./gi) || [];
  const gibberish = message.split(/\s+/).some((t) => /^\p{L}{12,}$/u.test(t) && caseTransitions(t) >= 3);
  if (urls.length >= 2 || gibberish) {
    return 'Napíšte nám prosím niekoľko viet vlastnými slovami.';
  }
  return null;
}

// Hidden field that humans never see or fill (off-screen, not display:none,
// because simple bots skip display:none fields). Named neutrally and with
// autocomplete off so browser autofill does not populate it.
export const HoneypotField: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => (
  <div
    aria-hidden="true"
    style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
  >
    <label>
      Nevypĺňajte toto pole
      <input
        type="text"
        name="contact_extra"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  </div>
);

export interface FormGuard {
  honeypot: string;
  setHoneypot: (v: string) => void;
  /** Fields to merge into the /api/send-email request body. */
  payload: () => { contact_extra: string; elapsedMs: number };
  /** True when the honeypot is filled or the form was submitted implausibly fast. */
  looksAutomated: () => boolean;
  /** Restart the fill timer (e.g. after a validation error). */
  resetTimer: () => void;
}

export function useFormGuard(): FormGuard {
  const startedAt = useRef<number>(Date.now());
  const [honeypot, setHoneypot] = useState('');
  return {
    honeypot,
    setHoneypot,
    payload: () => ({ contact_extra: honeypot, elapsedMs: Date.now() - startedAt.current }),
    looksAutomated: () => honeypot.trim().length > 0 || Date.now() - startedAt.current < MIN_FILL_MS,
    resetTimer: () => {
      startedAt.current = Date.now();
    },
  };
}

// True when the server accepted the request but deliberately dropped it as
// bot traffic (see send-email.js) — no conversion should be counted for it.
export async function wasIgnored(response: Response): Promise<boolean> {
  try {
    const data = await response.clone().json();
    return data?.ignored === true;
  } catch {
    return false;
  }
}
