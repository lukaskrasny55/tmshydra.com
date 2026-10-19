import { useEffect } from 'react';
import { getStoredConsent, clearTrackingCookies } from '../consent';

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

const PIXEL_ID = '282001144327521';

// 10/2026 (audit item 3: cookies and measurement) -- Meta Pixel now follows
// the visitor's cookie choice instead of always loading:
//   - no choice yet / rejected  -> fbevents.js is not loaded, nothing is sent
//   - accepted                  -> pixel loads, PageView and conversions sent
//   - withdrawn later           -> fbq('consent','revoke'), events stop,
//                                  Meta cookies (_fbp/_fbc) removed
// This replaces the earlier "always load, use Limited Data Use" approach,
// which is not a consent mechanism under EU rules.
let loaded = false;
let enabled = false;

function enablePixel() {
  enabled = true;

  if (loaded) {
    // Re-accepted after a withdrawal: the pixel is already on the page.
    window.fbq('consent', 'grant');
    window.fbq('track', 'PageView');
    return;
  }
  loaded = true;

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

  window.fbq('init', PIXEL_ID);
  window.fbq('track', 'PageView');
}

function disablePixel() {
  enabled = false;
  if (loaded && typeof window.fbq === 'function') {
    window.fbq('consent', 'revoke');
  }
  clearTrackingCookies();
}

export default function MetaPixel() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const apply = () => {
      if (getStoredConsent() === 'accepted') {
        enablePixel();
      } else {
        disablePixel();
      }
    };

    apply();
    window.addEventListener('cookie-consent-changed', apply);
    return () => window.removeEventListener('cookie-consent-changed', apply);
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
  // Nothing is sent unless the visitor currently has cookies accepted.
  if (!enabled || typeof window === 'undefined' || typeof window.fbq !== 'function') {
    return;
  }
  const metaEvent = META_EVENTS[eventName];
  try {
    window.fbq('track', metaEvent, { content_category: eventName });
  } catch {
    // Never let a tracking pixel break the actual user-facing flow.
  }
};
