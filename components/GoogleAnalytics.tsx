import { useEffect } from 'react';
import { getStoredConsent, clearTrackingCookies } from '../consent';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = 'G-9XC82FWJMG';

// 10/2026 (audit item 3: cookies and measurement) -- the Google tag is now
// loaded ONLY after the visitor accepts cookies, and it is switched off again
// when consent is rejected or withdrawn:
//   - no choice yet / rejected  -> gtag.js is not loaded, no Google cookies
//   - accepted                  -> tag loads, all consent signals "granted"
//   - withdrawn later           -> consent update "denied", GA hits disabled
//     (window['ga-disable-<ID>']), Google cookies removed
//
// Background for whoever touches this next: GA4 showed a hard zero from
// 11.8.2026 to 7.9.2026. Earlier comments blamed the shape of the script
// loading. The more likely reason is simply that analytics_storage was
// "denied" by default and almost nobody clicked "Súhlasím", so GA4 had nothing
// to report. Because of that, GA4 now reports ONLY visitors who accepted
// cookies. Leads are still counted completely, server-side, by
// api/send-email.js (notifyGA4), which sets no cookies.
//
// The two-<script>-tag loading shape (external loader + inline setup text) is
// kept exactly as before on purpose -- that is the shape that is known to
// work in production. Do not replace it with direct gtag() calls from React
// without checking GA4 Realtime live first.
let loaded = false;

function setDisabled(disabled: boolean) {
  (window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = disabled;
}

function enableAnalytics() {
  setDisabled(false);

  if (loaded) {
    // Re-accepted after an earlier withdrawal: tag is already on the page.
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      });
    }
    return;
  }
  loaded = true;

  // Script 1: external gtag.js loader.
  const loader = document.createElement('script');
  loader.async = true;
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(loader);

  // Script 2: a SEPARATE inline <script> tag with the dataLayer/gtag setup.
  // Consent defaults are "granted" because this only runs after acceptance.
  const inline = document.createElement('script');
  inline.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('consent', 'default', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `;
  document.head.appendChild(inline);
}

function disableAnalytics() {
  setDisabled(true);
  if (loaded && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  }
  clearTrackingCookies();
}

export default function GoogleAnalytics() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const apply = () => {
      if (getStoredConsent() === 'accepted') {
        enableAnalytics();
      } else {
        disableAnalytics();
      }
    };

    apply();
    window.addEventListener('cookie-consent-changed', apply);
    return () => window.removeEventListener('cookie-consent-changed', apply);
  }, []);

  return null;
}
