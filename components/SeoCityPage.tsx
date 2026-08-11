import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, MapPin, Phone, Calculator, Quote } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { cityData, serviceNames } from '../data/cities.js';
import { GOOGLE_REVIEWS_URL, GOOGLE_REVIEWS_RATING, GOOGLE_REVIEWS_COUNT_LABEL, reviews } from '../data/reviews.js';
import { Stars } from './Testimonials';
import GoogleAnalytics from './GoogleAnalytics';
import { trackConversion } from './GoogleAds';
import { CookieConsent } from './CookieConsent';
import { MobileCallBar } from './MobileCallBar';

interface PageContent {
  title: string;
  meta_title: string;
  meta_description: string;
  content: string;
}

export const SeoCityPage: React.FC = () => {
  const { service, city } = useParams<{ service: string; city: string }>();

  const formattedCity = city
    ? city.charAt(0).toUpperCase() + city.slice(1)
    : '';

  const serviceName = service
    ? serviceNames[service] || service.replace(/-/g, ' ')
    : '';

  const currentCityData = city
  ? cityData[city]
  : null;

  const pageData: PageContent = {
    title:
      currentCityData?.title ||
      `${serviceName} ${formattedCity}`,

    meta_title:
      (currentCityData?.title || `${serviceName} ${formattedCity}`) +
      ' | TMS HYDRA',

    meta_description:
      currentCityData?.description ||
      `Profesionálna ${serviceName.toLowerCase()} v meste ${formattedCity}. Kontaktujte TMS HYDRA pre bezplatnú obhliadku strechy.`,

    content:
      currentCityData?.description ||
      `Naša spoločnosť TMS HYDRA poskytuje profesionálne služby ${serviceName.toLowerCase()} v meste ${formattedCity}.`
  };

  const canonicalUrl = `https://www.tmshydra.com/sluzby/${service}/${city}`;
  const ogImage = 'https://www.tmshydra.com/logo1.png';

  // Kept as data (not just JSX) so the FAQPage schema below stays word-for-word
  // identical to what actually renders further down the page — Google
  // requires that match for the FAQ rich-result to be eligible at all.
  const faqItems = [
    {
      question: `Koľko stojí hydroizolácia plochej strechy v meste ${formattedCity}?`,
      answer: 'Cena závisí od veľkosti strechy, typu materiálu a rozsahu rekonštrukcie. Kontaktujte TMS HYDRA pre bezplatnú obhliadku a cenovú ponuku.',
    },
    {
      question: 'Ako dlho trvá realizácia?',
      answer: 'Väčšina realizácií trvá niekoľko dní v závislosti od rozsahu prác, počasia a typu strešného systému.',
    },
    {
      question: 'Poskytujete obhliadku zdarma?',
      answer: `Áno. TMS HYDRA poskytuje bezplatné obhliadky a odborné poradenstvo pre ploché strechy v meste ${formattedCity} a okolí.`,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "provider": {
      "@type": "LocalBusiness",
      "name": "TMS-HYDRA",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": formattedCity,
        "addressCountry": "SK"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "8"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": formattedCity
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      {/* This route sits outside <Layout> (see App.tsx), so it never picked
          up analytics/tracking or the cookie banner that every other page
          gets automatically — these SEO landing pages were completely
          invisible to Google Ads/Analytics regardless of the Consent Mode
          fix in GoogleAnalytics.tsx. Mounted directly here instead. */}
      <GoogleAnalytics />
      <CookieConsent />
      <MobileCallBar />
      <Helmet>
        <title>{pageData.meta_title}</title>
        <meta
          name="description"
          content={pageData.meta_description}
        />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TMS-HYDRA" />
        <meta property="og:title" content={pageData.meta_title} />
        <meta property="og:description" content={pageData.meta_description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content="sk_SK" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.meta_title} />
        <meta name="twitter:description" content={pageData.meta_description} />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>

      <div className="bg-slate-900 pt-32 pb-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 transform translate-x-32"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-blue-400 font-bold mb-6 uppercase tracking-widest text-sm">
            <MapPin className="w-4 h-4" />
            <span>{formattedCity}</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter mb-8 uppercase leading-[0.9]">
            {serviceName}
            <br />
            <span className="text-blue-500">
              {formattedCity}
            </span>
          </h1>

          <p className="text-slate-400 text-xl max-w-2xl font-medium leading-relaxed">
            {pageData.meta_description}
          </p>

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl hover:bg-white/20 transition-all"
          >
            <Stars />
            <span className="font-black text-white">{GOOGLE_REVIEWS_RATING}</span>
            <span className="text-slate-300 text-sm">{GOOGLE_REVIEWS_COUNT_LABEL}</span>
          </a>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/#calendar"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              Bezplatná obhliadka
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/#calculator"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Kalkulačka ceny
            </Link>
          </div>
        </div>
      </div>

      
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          <div className="lg:col-span-8 space-y-12">
            <div className="prose prose-xl prose-slate max-w-none">

              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-6">
                Profesionálne služby v meste {formattedCity}
              </h2>

              <p className="text-slate-600 leading-relaxed">
                {pageData.content}
              </p>

              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mt-12 mb-6">
                Prečo si vybrať TMS-HYDRA?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                {[
                  'Certifikované materiály',
                  'Záruka až 15 rokov',
                  'Bezplatná obhliadka',
                  'Skúsený tím',
                  'Rýchla realizácia',
                  'Osobný prístup'
                ].map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />

                                        <span className="font-bold text-slate-700">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-16 not-prose">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-8">
                  Čo o nás hovoria zákazníci
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.slice(0, 2).map((r) => (
                    <div
                      key={r.name}
                      className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col"
                    >
                      <Quote className="w-6 h-6 text-blue-200 mb-3" />
                      <Stars />
                      <p className="text-slate-600 text-sm leading-relaxed my-3 flex-1">
                        {r.text}
                      </p>
                      <p className="font-bold text-slate-900 text-sm">{r.name}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wide">Google recenzia</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-16">
  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-8">
    Často kladené otázky
  </h3>

  <div className="space-y-6">

    {faqItems.map((item) => (
      <div key={item.question} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <h4 className="font-black text-lg mb-3">
          {item.question}
        </h4>

        <p className="text-slate-600 leading-relaxed">
          {item.answer}
        </p>
      </div>
    ))}

  </div>


                

            </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">

            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">

              <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">
                Potrebujete poradiť?
              </h3>

              <p className="text-slate-400 mb-8 font-medium">
                Naši technici sú vám k dispozícii pre konzultácie v meste {formattedCity}.
              </p>

              <a
                href="tel:+421911551354"
                onClick={() => trackConversion('call')}
                className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all mb-4"
              >
                <div className="p-3 bg-blue-600 rounded-xl">
                  <Phone className="w-6 h-6 text-white" />
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Zavolajte nám
                  </div>

                  <div className="text-lg font-black">
                    +421 911 551 354
                  </div>
                </div>
              </a>

              <Link
                to="/#contact"
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                Napíšte nám
              </Link>

<div className="mt-24 border-t border-white/10 pt-12">

  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">
    Pôsobíme aj v ďalších mestách
  </h3>

  <div className="flex flex-wrap gap-4">

    {Object.keys(cityData).map((cityKey) => (

      <Link
        key={cityKey}
        to={`/sluzby/${service}/${cityKey}`}
        className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all font-bold text-slate-300"
      >
        {cityKey.replace(/-/g, ' ')}
      </Link>

    ))}

  </div>

</div>

            </div>

          </div>

        </div>
      </div>
    </div>
    
 );
};

export default SeoCityPage;
