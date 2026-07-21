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

export function setStoredConsent(value: ConsentValue): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, value);
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
