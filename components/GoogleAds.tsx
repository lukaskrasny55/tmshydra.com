import React, { useEffect } from 'react';
import { useConsent } from '../consent';

export const GoogleAds: React.FC = () => {
  const consent = useConsent();

  useEffect(() => {
    if (consent !== 'accepted') {
      return;
    }

    const adsId = 'AW-XXXXXXXXXX';

    const adsScript = document.createElement('script');
    adsScript.async = true;
    adsScript.src = `https://www.googletagmanager.com/gtag/js?id=${adsId}`;
    document.head.appendChild(adsScript);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${adsId}');
    `;

    document.head.appendChild(inlineScript);
  }, [consent]);

  return null;
};

export const trackConversion = (eventName: 'form' | 'booking') => {
  if ((window as any).gtag) {
    (window as any).gtag('event', 'conversion');
  }
};
