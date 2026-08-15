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

  // Also fire a plain GA4 event (no send_to restriction, so it goes to the
  // GA4 property configured in GoogleAnalytics.tsx, not just Google Ads).
  // GA4 counts events without requiring cookie consent, unlike the Google
  // Ads conversion above — on a small site like this, the Ads conversion
  // rarely gets counted because Google's cookieless modeling needs far more
  // traffic than we get. This gives us a reliable, consent-independent
  // count of real leads. Mark "generate_lead" as a key event in the GA4
  // admin UI to see it as a conversion there too.
  (window as any).gtag('event', 'generate_lead', {
    lead_type: eventName,
  });
};
