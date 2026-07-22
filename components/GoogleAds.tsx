import React, { useEffect } from 'react';
import { useConsent, getStoredConsent } from '../consent';

const ADS_ID = 'AW-18181546633';
const CONVERSION_LABEL = 'HeRnCMjHydQcEInF0d1D';

export const GoogleAds: React.FC = () => {
  const consent = useConsent();

  useEffect(() => {
    if (consent !== 'accepted') {
      return;
    }

    const adsScript = document.createElement('script');
    adsScript.async = true;
    adsScript.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
    document.head.appendChild(adsScript);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${ADS_ID}');
    `;

    document.head.appendChild(inlineScript);
  }, [consent]);

  return null;
};

export const trackConversion = (eventName: 'form' | 'booking') => {
  // Mirrors the gate in GoogleAds/GoogleAnalytics: gtag is only ever defined
  // once consent is accepted, but we check consent explicitly too so this
  // never fires a conversion if consent was accepted then later revoked
  // without a page reload.
  if (getStoredConsent() !== 'accepted') {
    return;
  }

  if ((window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      send_to: `${ADS_ID}/${CONVERSION_LABEL}`,
    });
  }
};
