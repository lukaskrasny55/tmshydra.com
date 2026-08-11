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
// with ad/analytics storage defaulting to denied until the visitor accepts.
// This replaces the old approach of not loading gtag.js at all until consent
// was accepted — that blocked ALL measurement (not just cookies) for anyone
// who hadn't yet clicked through the banner, which in practice was most
// visitors. Consent Mode lets Google send cookieless "modeled" pings for
// denied/undecided visitors instead of nothing, while still respecting their
// choice — no ad cookie is set and no personalization happens without
// explicit consent.
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
    const initialState = stored === 'accepted' ? 'granted' : 'denied';
    gtag('consent', 'default', {
      ad_storage: initialState,
      ad_user_data: initialState,
      ad_personalization: initialState,
      analytics_storage: initialState,
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
