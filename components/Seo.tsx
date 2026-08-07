import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PATH_BY_SLUG } from '../routePaths';

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
    description: 'Hydroizolácia, zateplenie a rekonštrukcia plochých striech – PVC, TPO a EPDM fólie, servis a SOS havarijný zásah do 48 hodín. Bezplatná obhliadka po celom Slovensku.',
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
    description: 'Kontaktujte TMS-HYDRA pre bezplatnú obhliadku alebo cenovú ponuku na hydroizoláciu a zateplenie plochej strechy. Palárikovo, pôsobíme po celom Slovensku.',
    keywords: 'kontakt, TMS HYDRA',
  },
  faq: {
    title: 'Časté otázky o hydroizolácii a zateplení striech | TMS HYDRA',
    description: 'Koľko stojí hydroizolácia plochej strechy, aký je rozdiel medzi PVC, TPO a EPDM fóliou, ako dlho trvá rekonštrukcia a akú záruku poskytujeme. Odpovede na najčastejšie otázky.',
    keywords: 'časté otázky, cena hydroizolácie strechy, PVC TPO EPDM, záruka na strechu, TMS HYDRA',
  },
  'privacy-policy': {
    title: 'Ochrana osobných údajov a cookies | TMS HYDRA',
    description: 'Zásady spracovania osobných údajov (GDPR) a používania súborov cookie na webe spoločnosti TMS HYDRA.',
    keywords: 'ochrana osobných údajov, GDPR, cookies, TMS HYDRA',
  },
  terms: {
    title: 'Obchodné podmienky | TMS HYDRA',
    description: 'Všeobecné obchodné podmienky spoločnosti TMS HYDRA.',
    keywords: 'obchodné podmienky, TMS HYDRA',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor',
  name: 'TMS-HYDRA s. r. o.',
  image: 'https://www.tmshydra.com/logo1.png',
  url: 'https://www.tmshydra.com',
  telephone: '+421911551354',
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Krížna 79',
    addressLocality: 'Palárikovo',
    postalCode: '94111',
    addressCountry: 'SK',
  },
  description: 'Hydroizolácie a zateplenie plochých striech po celom Slovensku.',
  areaServed: 'Slovensko',
  serviceType: [
    'Hydroizolácie plochých striech',
    'Zateplenie plochých striech',
    'Rekonštrukcie striech',
  ],
  sameAs: [
    'https://www.facebook.com/TMS.hydra.s.o.s',
    'https://www.instagram.com/tms_hydra/',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '8',
  },
};

export const Seo: React.FC<SeoProps> = ({ slug }) => {
  const data = seoData[slug];

  if (!data) {
    return null;
  }

  const path = PATH_BY_SLUG[slug] ?? '/';
  const url = `https://www.tmshydra.com${path === '/' ? '' : path}`;

  return (
    <Helmet>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <meta name="keywords" content={data.keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TMS-HYDRA" />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content="https://www.tmshydra.com/logo1.png" />
      <meta property="og:locale" content="sk_SK" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
      <meta name="twitter:image" content="https://www.tmshydra.com/logo1.png" />

      <script type="application/ld+json" id="local-business-schema">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};
