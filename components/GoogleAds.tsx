import React from 'react';

// The AW- tag is configured together with GA in GoogleAnalytics.tsx (single
// shared gtag.js load, see the Consent Mode v2 comment there) — this
// component no longer injects its own script. Kept as a no-op so existing
// <GoogleAds /> usage in App.tsx doesn't need to change.
export const GoogleAds: React.FC = () => null;

const ADS_ID = 'AW-18181546633';

// 7.9.2026 (night) -- previously ALL three event types (form/booking/call)
// shared one single label (f_vWCNWBw-kcEInF0d1D, "Odoslanie formulára pre
// potenciálnych zákazníkov (2)"), so Google Ads could not tell a contact-form
// lead apart from a phone-call click or a price-quote request from the
// Calculator -- everything landed on one conversion action. User confirmed
// real form leads (>=3) were undercounted (only 1 ever recorded), and asked
// for calls and price-quote requests to be tracked as their own distinct,
// working conversion types. Created two new conversion actions in Google Ads
// (event snippets, same AW-18181546633 account) and split the label per
// event type below. The original label stays as the "form"/"booking" one
// (unchanged, still the account's primary lead action); "call" and "quote"
// now get their own.
const CONVERSION_LABELS: Record<'form' | 'booking' | 'call' | 'quote', string> = {
  form: 'f_vWCNWBw-kcEInF0d1D',
  booking: 'f_vWCNWBw-kcEInF0d1D',
  call: 'HMtWCKjc2PAcEInF0d1D',
  quote: 'wCTYCK3b2PAcEInF0d1D',
};

// Fires unconditionally. Previously this checked getStoredConsent() and
// silently no-op'd unless the visitor had explicitly clicked "Súhlasím" —
// that was the bug: it dropped every conversion from anyone who hadn't
// actively accepted cookies, which was most visitors, even though they'd
// just genuinely submitted a form/booking/call. Google Consent Mode (see
// GoogleAnalytics.tsx) is what now decides whether this becomes a full
// cookied conversion or a cookieless modeled one based on the visitor's
// actual choice — that distinction belongs in gtag's consent state, not in
// a second, separate gate here.
export const trackConversion = (eventName: 'form' | 'booking' | 'call' | 'quote') => {
  if (typeof window === 'undefined') {
    return;
  }

  const label = CONVERSION_LABELS[eventName];

  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'conversion', {
      send_to: `${ADS_ID}/${label}`,
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
  }

  // Belt-and-suspenders fallback, fired unconditionally alongside the gtag
  // call above. Confirmed live, repeatedly, on this account: gtag('event',
  // 'conversion', ...) pushes correctly into dataLayer (consent fully
  // granted, correct label, destination registered in
  // window.google_tag_manager) but gtag.js's internal engine never actually
  // emits the resulting network beacon — zero requests to
  // googleadservices.com/doubleclick.net show up in
  // performance.getEntriesByType('resource') no matter what. Root cause is
  // inside gtag.js itself, not this code or the label. A manually
  // constructed classic image-pixel hit to the same conversion action,
  // tested live, DOES go out and get logged. Firing it directly guarantees
  // Google Ads receives a signal instead of silently getting nothing, while
  // the gtag.js issue stays unresolved. This won't carry full click-level
  // (GCLID) attribution the way a working gtag.js would, but for a
  // secondary/non-bid-optimizing goal, an unattributed conversion beats a
  // missing one. 28.8.2026.
  try {
    const conversionId = ADS_ID.replace('AW-', '');
    const img = new Image(1, 1);
    img.src = `https://www.googleadservices.com/pagead/conversion/${conversionId}/?label=${label}&guid=ON&script=0`;
  } catch {
    // Never let a tracking pixel break the actual user-facing flow.
  }
};
