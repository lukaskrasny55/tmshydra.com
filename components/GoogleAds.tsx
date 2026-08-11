import React from 'react';

// The AW- tag is configured together with GA in GoogleAnalytics.tsx (single
// shared gtag.js load, see the Consent Mode v2 comment there) — this
// component no longer injects its own script. Kept as a no-op so existing
// <GoogleAds /> usage in App.tsx doesn't need to change.
export const GoogleAds: React.FC = () => null;

const ADS_ID = 'AW-18181546633';
const CONVERSION_LABEL = 'HeRnCMjHydQcEInF0d1D';

// Fires unconditionally. Previously this checked getStoredConsent() and
// silently no-op'd unless the visitor had explicitly clicked "Súhlasím" —
// that was the bug: it dropped every conversion from anyone who hadn't
// actively accepted cookies, which was most visitors, even though they'd
// just genuinely submitted a form/booking/call. Google Consent Mode (see
// GoogleAnalytics.tsx) is what now decides whether this becomes a full
// cookied conversion or a cookieless modeled one based on the visitor's
// actual choice — that distinction belongs in gtag's consent state, not in
// a second, separate gate here.
export const trackConversion = (eventName: 'form' | 'booking' | 'call') => {
  if (typeof window === 'undefined' || typeof (window as any).gtag !== 'function') {
    return;
  }
  (window as any).gtag('event', 'conversion', {
    send_to: `${ADS_ID}/${CONVERSION_LABEL}`,
  });
};
