import { useEffect } from 'react';
import { getStoredConsent } from '../consent';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = 'G-9XC82FWJMG';

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
// Verified live: gtag.js loaded fine, but no /collect request ever fired.
// GA4's basic hit doesn't set an ad/cross-site identifying cookie and isn't
// used for personalization, so treating it like the ad signals below was
// overly strict and cost us all measurement for 8 days straight.
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

    // 7.9.2026 -- reverted back to loading gtag.js via the GA4 ID alone,
    // with NO Ads (AW-) config call at all. History of what was tried before
    // this, so it isn't repeated:
    //   - single script via GA4 ID, + config(ADS_ID) alongside it: GA4 measured
    //     correctly, but Ads conversions never registered.
    //   - single script via ADS_ID, + config(GA_MEASUREMENT_ID) alongside it
    //     (25.8-7.9.2026): got Ads conversions "working" (they weren't --
    //     see GoogleAds.tsx), but broke GA4 completely -- zero sessions/users
    //     recorded site-wide for 3+ weeks. A second `config()` call for a
    //     destination other than the one in the script's `id=` query param
    //     does not reliably initialize on this account, in either direction.
    //   - TWO separate <script> tags, one per destination: broke BOTH at
    //     once (confirmed via GA4 DebugView + live network capture). Do not
    //     retry this without re-testing both destinations live first.
    // The AW- destination is intentionally not loaded/configured via gtag.js
    // here at all anymore. It doesn't need to be: GoogleAds.tsx's
    // trackConversion() already fires Ads conversions via a manually
    // constructed <img> pixel that talks to googleadservices.com directly --
    // proven to work independently of gtag.js/dataLayer entirely (see the
    // comment there, 28.8.2026). Its gtag('event','conversion',...) call is
    // now inert (no configured destination to send to) but harmless, and is
    // left in place as a no-op in case a working multi-destination setup
    // (e.g. a real Google Tag Manager container) replaces this later.
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  }, []);

  return null;
}