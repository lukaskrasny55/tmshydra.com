import React, { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const GoogleAds: React.FC = () => {
  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase.from('settings').select('*').single();
      if (!error && data && data.google_ads_id) {
        // GTM Script
        if (data.google_tag_manager_id) {
          const gtmScript = document.createElement('script');
          gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${data.google_tag_manager_id}');`;
          document.head.appendChild(gtmScript);
        }

        // Google Ads Script
        const adsScript = document.createElement('script');
        adsScript.async = true;
        adsScript.src = `https://www.googletagmanager.com/gtag/js?id=${data.google_ads_id}`;
        document.head.appendChild(adsScript);

        const inlineScript = document.createElement('script');
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${data.google_ads_id}');
        `;
        document.head.appendChild(inlineScript);
      }
    };

    fetchSettings();
  }, []);

  return null;
};

export const trackConversion = async (eventName: 'form' | 'booking') => {
  const { data, error } = await supabase.from('settings').select('*').single();
  if (!error && data) {
    const eventId = eventName === 'form' ? data.conversion_event_form : data.conversion_event_booking;
    if (eventId && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': `${data.google_ads_id}/${eventId}`,
      });
    }
  }
};
