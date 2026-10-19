import { useEffect, useState } from 'react';

export type ConsentValue = 'accepted' | 'rejected';

const STORAGE_KEY = 'cookie-consent';
const CONSENT_EVENT = 'cookie-consent-changed';

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === 'accepted' || value === 'rejected' ? value : null;
}

// Pushes the visitor's choice into Google's Consent Mode v2 signals. Safe to
// call before gtag.js has finished loading — gtag() just queues onto
// window.dataLayer, and Google applies the update once the tag is ready.
//
// 10/2026 (audit item 3) -- ALL four signals now follow the visitor's real
// choice, including analytics_storage. Previously analytics_storage stayed
// granted for everyone, so rejecting cookies did not stop Google Analytics.
// The Google tag itself (and Meta Pixel) are no longer even loaded until the
// visitor accepts -- see GoogleAnalytics.tsx / MetaPixel.tsx. Consequence to
// keep in mind: GA4 now only reports visitors who accepted. Leads are still
// counted completely, server-side, by api/send-email.js (notifyGA4).
export function pushConsentToGtag(value: ConsentValue | null): void {
  if (typeof window === 'undefined' || typeof (window as any).gtag !== 'function') {
    return;
  }
  const state = value === 'accepted' ? 'granted' : 'denied';
  (window as any).gtag('consent', 'update', {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  });
}

// Removes the Google Analytics / Google Ads / Meta cookies this site may have
// set, so that rejecting or withdrawing consent really leaves nothing behind.
export function clearTrackingCookies(): void {
  if (typeof document === 'undefined') {
    return;
  }
  const host = window.location.hostname;
  const parts = host.split('.');
  const parent = parts.length > 2 ? '.' + parts.slice(-2).join('.') : '.' + host;
  const domains = ['', host, '.' + host, parent];
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (/^(_ga|_gid|_gat|_gcl|_fbp|_fbc|FPLC)/.test(name)) {
      domains.forEach((d) => {
        document.cookie =
          name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
      });
    }
  });
}

const SETTINGS_EVENT = 'cookie-settings-open';

// Re-opens the cookie banner so a visitor can change or withdraw consent.
export function openCookieSettings(): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}

export const COOKIE_SETTINGS_EVENT = SETTINGS_EVENT;

export function setStoredConsent(value: ConsentValue): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, value);
  pushConsentToGtag(value);
  if (value === 'rejected') {
    clearTrackingCookies();
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function useConsent(): ConsentValue | null {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    setConsent(getStoredConsent());

    const handleChange = () => setConsent(getStoredConsent());
    window.addEventListener(CONSENT_EVENT, handleChange);
    window.addEventListener('storage', handleChange);

    return () => {
      window.removeEventListener(CONSENT_EVENT, handleChange);
      window.removeEventListener('storage', handleChange);
    };
  }, []);

  return consent;
}
