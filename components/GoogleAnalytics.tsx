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
// accepted -- that blocked ALL measurement (not just cookies) for anyone who
// hadn't yet clicked through the banner, which in practice was most visitors.
//
// analytics_storage is granted unconditionally (not gated on consent) -- this
// was NOT the case from 11.8. to 19.8.2026, and it silently broke GA4
// entirely: with analytics_storage denied, Google's "cookieless modeled
// pings" promise turned out to require far more traffic than this site gets,
// so denied/undecided visitors (the vast majority) produced literally zero
// network requests to google-analytics.com -- not modeled data, nothing.
// ad_storage/ad_user_data/ad_personalization stay consent-gated below and in
// consent.ts -- those genuinely drive remarketing/ad personalization and need
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

    // Each measurement destination needs its OWN <script src="...?id=..."> load
    // to actually register in gtag.js's internal container list
    // (window.google_tag_manager). A single script load plus two `config`
    // calls looks like it should work per Google's generic docs, but
    // empirically, for this account, only the ID that appears in the script
    // `src` ever truly initializes -- the second `config` call gets pushed to
    // dataLayer but never produces real network pings. We hit this in both
    // directions: loading via GA_MEASUREMENT_ID alone left Ads conversions
    // dead (0 pings for a week, fixed earlier), and loading via ADS_ID alone
    // then left GA4 dead (0 requests to google-analytics.com, confirmed via
    // live network capture). Loading one script per ID -- exactly what
    // Google's own per-product install snippets do -- fixes both at once.
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);

    const adsScript = document.createElement('script');
    adsScript.async = true;
    adsScript.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
    document.head.appendChild(adsScript);

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
    gtag('config', ADS_ID);
  }, []);

  return null;
}