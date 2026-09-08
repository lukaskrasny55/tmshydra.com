import { useEffect } from 'react';
import { getStoredConsent } from '../consent';

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

const PIXEL_ID = '282001144327521';

// 8.9.2026 -- Meta Pixel base install. Mirrors the shape that's actually
// proven to work for GA4 in GoogleAnalytics.tsx: load unconditionally (don't
// gate the base PageView behind the cookie banner -- that's what silently
// killed GA4 measurement for a month, see the comment there) and instead let
// the visitor's consent choice narrow what Meta is allowed to DO with the
// data via dataProcessingOptions, not whether the pixel loads at all.
//
// - No consent yet / rejected: fire with Limited Data Use (LDU) enabled --
//   Meta still counts the event for basic measurement but restricts it from
//   ads personalization/targeting use. This is Meta's own mechanism for
//   "measure, but don't use for ads targeting", not a full opt-out.
// - Accepted: normal processing, full ad measurement/optimization value.
//
// pushConsentToGtag() in consent.ts already updates Google's Consent Mode
// when the visitor changes their choice via the cookie banner; this module
// listens for that same 'cookie-consent-changed' event so Meta's processing
// mode updates immediately too, without a page reload.
let initialized = false;

function applyDataProcessingOptions() {
  if (typeof window.fbq !== 'function') {
    return;
  }
  const consent = getStoredConsent();
  if (consent === 'accepted') {
    window.fbq('dataProcessingOptions', []);
  } else {
    // LDU flag on, geo code 0/0 = let Meta infer region-based LDU rules.
    window.fbq('dataProcessingOptions', ['LDU'], 0, 0);
  }
}

export default function MetaPixel() {
  useEffect(() => {
    if (initialized || typeof window === 'undefined') {
      return;
    }
    initialized = true;

    // Standard Meta Pixel base code (fbevents.js loader + init + PageView).
    (function (f: any, b: Document, e: string, v: string) {
      if (f.fbq) return;
      const n: any = (f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s.parentNode?.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    applyDataProcessingOptions();
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');

    const handleConsentChange = () => applyDataProcessingOptions();
    window.addEventListener('cookie-consent-changed', handleConsentChange);
    return () => window.removeEventListener('cookie-consent-changed', handleConsentChange);
  }, []);

  return null;
}

// Same eventName vocabulary as trackConversion() in GoogleAds.tsx, so the
// call sites there can fire both in one place without every component that
// calls trackConversion() needing to know Meta exists.
const META_EVENTS: Record<'form' | 'booking' | 'call' | 'quote', string> = {
  form: 'Lead',
  booking: 'Schedule',
  call: 'Contact',
  quote: 'Lead',
};

export const trackMetaEvent = (eventName: 'form' | 'booking' | 'call' | 'quote') => {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
    return;
  }
  const metaEvent = META_EVENTS[eventName];
  try {
    window.fbq('track', metaEvent, { content_category: eventName });
  } catch {
    // Never let a tracking pixel break the actual user-facing flow.
  }
};
