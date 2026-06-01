import React, { useEffect } from 'react';

interface SeoProps {
  slug: string;
}

export const Seo: React.FC<SeoProps> = ({ slug }) => {
  useEffect(() => {
    const seoData: Record<string, any> = {
      home: {
        title: 'TMS HYDRA | Hydroizolácie a zateplenie plochých striech',
        description: 'Profesionálne hydroizolácie a zateplenie plochých striech. PVC fólie, rekonštrukcie striech, servis a opravy strešných systémov po celom Slovensku. TMS HYDRA.',
        keywords: 'hydroizolácia, strechy, TMS HYDRA',
      },
      services: {
        title: 'Naše služby | TMS HYDRA',
        description: 'Kompletné služby pre ploché strechy.',
        keywords: 'hydroizolácie, servis striech',
      },
      contact: {
        title: 'Kontakt | TMS HYDRA',
        description: 'Kontaktujte nás pre cenovú ponuku.',
        keywords: 'kontakt, TMS HYDRA',
      },
    };

    const data = seoData[slug];

    if (data) {
      document.title = data.title;

      let metaDesc = document.querySelector('meta[name="description"]');

      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }

      metaDesc.setAttribute('content', data.description);

      let metaKeywords = document.querySelector('meta[name="keywords"]');

      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }

      metaKeywords.setAttribute('content', data.keywords);
    }
  }, [slug]);

  return null;
};
