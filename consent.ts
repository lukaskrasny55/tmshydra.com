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
// Only the ad_* signals move with the visitor's choice. analytics_storage is
// left out on purpose and stays granted (set in GoogleAnalytics.tsx) — see
// the comment there for why gating it behind consent silently killed all GA4
// measurement from 11.8. to 19.8.2026.
export function pushConsentToGtag(value: ConsentValue | null): void {
  if (typeof window === 'undefined' || typeof (window as any).gtag !== 'function') {
    return;
  }
  const adState = value === 'accepted' ? 'granted' : 'denied';
  (window as any).gtag('consent', 'update', {
    ad_storage: adState,
    ad_user_data: adState,
    ad_personalization: adState,
  });
}

export function setStoredConsent(value: ConsentValue): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, value);
  pushConsentToGtag(value);
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
