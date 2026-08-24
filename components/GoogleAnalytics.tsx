import { useEffect } from 'react';
import { getStoredConsent } from '../consent';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = 'G-9XC82FWJMG';
const ADS_ID = 'AW-18181546633';

// Google Consent Mode v2 ("advanced" mode): gtag.js loads on every visit,
// with ad storage defaulting to denied until the visitor accepts. This
// replaces the old approach of not loading gtag.js at all until consent was
// accepted — that blocked ALL measurement (not just cookies) for anyone who
// hadn't yet clicked through the banner, which in practice was most visitors.
//
// analytics_storage is granted unconditionally (not gated on consent) — this
// was NOT the case from 11.8. to 19.8.2026, and it silently broke GA4
// entirely: with analytics_storage denied, Google's "cookieless modeled
// pings" promise turned out to require far more traffic than this site gets,
// so denied/undecided visitors (the vast majority) produced literally zero
// network requests to google-analytics.com — not modeled data, nothing.
// Verified live: gtag.js loaded fine, but no /collect request ever fired.
// GA4's basic hit doesn't set an ad/cross-site identifying cookie and isn't
// used for personalization, so treating it like the ad signals below was
// overly strict and cost us all measurement for 8 days straight.
// ad_storage/ad_user_data/ad_personalization stay consent-gated below and in
// consent.ts — those genuinely drive remarketing/ad personalization and need
// real opt-in.
let initialized = false;

export default function GoogleAnalytics() {
  useEffect(() => {
    if (initialized || typeof window === 'undefined') {
      return;
    }
    initialized = true;

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    const stored = getStoredConsent();
    const adState = stored === 'accepted' ? 'granted' : 'denied';
    gtag('consent', 'default', {
      ad_storage: adState,
      ad_user_data: adState,
      ad_personalization: adState,
      analytics_storage: 'granted',
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
    gtag('config', ADS_ID);
  }, []);

  return null;
}
