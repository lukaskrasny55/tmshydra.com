import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
  slug: string;
}

const seoData: Record<string, { title: string; description: string; keywords: string }> = {
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
  about: {
    title: 'O nás | TMS HYDRA',
    description: 'TMS HYDRA je rodinná firma Tomáša Solnokyho s 12-ročnou praxou z Belgicka. Hydroizolácie a zateplenie plochých striech s osobným, poctivým prístupom.',
    keywords: 'o nás, TMS HYDRA, Tomáš Solnoky',
  },
  'other-services': {
    title: 'Ostatné služby | TMS HYDRA',
    description: 'Zvodové systémy, odvetranie striech, svetlíky, bleskozvody, zelené strechy a skúšky tesnosti hydroizolácií – doplnkové služby pre vašu strechu.',
    keywords: 'doplnkové služby, bleskozvody, zelené strechy',
  },
  projects: {
    title: 'Realizácie | TMS HYDRA',
    description: 'Pozrite si naše realizácie hydroizolácií a zateplení plochých striech – rodinné domy, bytové domy aj novostavby po celom Slovensku.',
    keywords: 'realizácie, referencie, TMS HYDRA',
  },
  tech: {
    title: 'Technológie | TMS HYDRA',
    description: 'Certifikované strešné systémy a skladby – jednoplášťové, extenzívne zelené aj pochôdzne strechy. Záruka až 15 rokov na naše realizácie.',
    keywords: 'technológie, hydroizolačné systémy, TMS HYDRA',
  },
  contact: {
    title: 'Kontakt | TMS HYDRA',
    description: 'Kontaktujte nás pre cenovú ponuku.',
    keywords: 'kontakt, TMS HYDRA',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'TMS HYDRA',
  image: 'https://www.tmshydra.com/logo1.png',
  url: 'https://www.tmshydra.com',
  telephone: '+421911551354',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'SK',
  },
  description: 'Hydroizolácie a zateplenie plochých striech po celom Slovensku.',
  areaServed: 'Slovensko',
  serviceType: [
    'Hydroizolácie plochých striech',
    'Zateplenie plochých striech',
    'Rekonštrukcie striech',
  ],
};

export const Seo: React.FC<SeoProps> = ({ slug }) => {
  const data = seoData[slug];

  if (!data) {
    return null;
  }

  return (
    <Helmet>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <meta name="keywords" content={data.keywords} />
      <script type="application/ld+json" id="local-business-schema">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};
