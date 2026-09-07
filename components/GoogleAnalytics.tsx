import { useEffect } from 'react';
import { getStoredConsent } from '../consent';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = 'G-9XC82FWJMG';

// 7.9.2026 (evening) -- root cause finally isolated by correlating GA4's own
// daily Active Users report against deploy history: GA4 measured real
// traffic every single day through 10.8.2026, then dropped to a hard,
// unbroken zero starting 11.8.2026 -- and stayed at zero through every fix
// attempted since (24.8 analytics_storage grant, 25.8 Ads-ID-first, 27.8 dual
// script, 27.8 revert, 7.9 morning GA4-ID-only rewrite). The 11.8.2026 commit
// ("Marketing plan Faza 1/2/4: Consent Mode v2...") is the exact point GA4
// broke, and it changed more than just the consent defaults: it also
// replaced how gtag() gets called. Before 11.8, this component appended TWO
// <script> tags -- one external (the gtag.js loader) and a second, separate
// inline <script> whose CONTENT was the literal dataLayer/gtag/js/config
// code, parsed and run by the browser as real script text. From 11.8 onward,
// that second script tag was dropped in favor of calling gtag() as plain JS
// function calls from inside this React effect. Every fix attempt since kept
// that "call gtag() directly from React" shape and only ever changed which
// ID(s) it configured -- none of them restored a single day of data. That
// points at the shape itself, not the consent/ID details layered on top of
// it, so this restores the original two-<script>-tag shape (the one
// combination not yet tried since 11.8), while keeping the real fixes made
// along the way:
//   - loading is unconditional now (11.8's actual intended change, unrelated
//     to the regression) -- no more full-blocking of measurement for anyone
//     who hasn't yet clicked the cookie banner.
//   - analytics_storage stays granted unconditionally (24.8 fix, still
//     correct) -- only ad_storage/ad_user_data/ad_personalization follow the
//     visitor's real consent choice (here and in consent.ts).
//   - the Ads (AW-) destination is intentionally NOT loaded/configured via
//     gtag.js here. It doesn't need to be: GoogleAds.tsx's trackConversion()
//     fires Ads conversions via its own manual <img> pixel straight to
//     googleadservices.com, proven to work independently of gtag.js/
//     dataLayer entirely (see the comment there, 28.8.2026).
// If this does NOT restore GA4 data either, the problem is not in this
// component's code shape at all (every plausible variant of it will have
// been tried) and points at something account/domain-level on Google's side
// -- next step would be GA4 Measurement Protocol sent server-side (bypasses
// the browser/gtag.js entirely), mirroring the pattern already proven to
// work for lead events in api/send-email.js's notifyGA4().
let initialized = false;

export default function GoogleAnalytics() {
  useEffect(() => {
    if (initialized || typeof window === 'undefined') {
      return;
    }
    initialized = true;

    const stored = getStoredConsent();
    const adState = stored === 'accepted' ? 'granted' : 'denied';

    // Script 1: external gtag.js loader. Same role as pre-11.8.
    const loader = document.createElement('script');
    loader.async = true;
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(loader);

    // Script 2: a SEPARATE inline <script> tag whose text content is the
    // dataLayer/gtag setup and the consent/js/config calls -- run by the
    // browser as parsed script text, not as plain JS calls from this React
    // component. This is the one thing that changed on 11.8.2026 when GA4
    // measurement stopped; restoring it is the point of this change. Do not
    // "simplify" this back into direct gtag() calls from React without
    // re-verifying live in GA4 Realtime first -- that exact simplification is
    // what broke it.
    const inline = document.createElement('script');
    inline.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('consent', 'default', {
        ad_storage: '${adState}',
        ad_user_data: '${adState}',
        ad_personalization: '${adState}',
        analytics_storage: 'granted'
      });
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    `;
    document.head.appendChild(inline);
  }, []);

  return null;
}
