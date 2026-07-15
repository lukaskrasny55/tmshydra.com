import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, MapPin, Phone, Calculator } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface PageContent {
  title: string;
  meta_title: string;
  meta_description: string;
  content: string;
}

const serviceNames: Record<string, string> = {
  'hydroizolacia-plochej-strechy': 'Hydroizolácia plochej strechy',
  'zateplenie-plochej-strechy': 'Zateplenie plochej strechy',
  'oprava-plochej-strechy': 'Oprava plochej strechy'
};

const cityData: Record<string, any> = {
  
  nitra: {
    title: 'Hydroizolácie plochých striech Nitra',
    description:
      'Profesionálne hydroizolácie plochých striech v Nitre a okolí. PVC fólie, rekonštrukcie striech, zateplenie a servis strešných systémov.',
  },

  'nove-zamky': {
    title: 'Hydroizolácie plochých striech Nové Zámky',
    description:
      'Realizujeme hydroizolácie plochých striech v Nových Zámkoch a okolí. Moderné PVC fólie, zateplenie a rekonštrukcie striech.',
  },

  trnava: {
    title: 'Hydroizolácie plochých striech Trnava',
    description:
      'TMS HYDRA zabezpečuje profesionálne hydroizolácie plochých striech v Trnave. Kvalitné materiály a dlhoročné skúsenosti.',
  },

  
  bratislava: {
    title: 'Hydroizolácie plochých striech Bratislava',
    description:
      'Profesionálne hydroizolácie plochých striech v Bratislave a okolí. PVC fólie, rekonštrukcie striech, zateplenie a servis strešných systémov.',
  },

  trencin: {
    title: 'Hydroizolácie plochých striech Trenčín',
    description:
      'Realizujeme hydroizolácie plochých striech v Trenčíne a okolí. Moderné PVC fólie, zateplenie a rekonštrukcie striech.',
  },

  zilina: {
    title: 'Hydroizolácie plochých striech Žilina',
    description:
      'Profesionálne hydroizolácie plochých striech v Žiline a okolí. PVC fólie, rekonštrukcie striech a zateplenie plochých striech.',
  },

  'banska-bystrica': {
    title: 'Hydroizolácie plochých striech Banská Bystrica',
    description:
      'TMS HYDRA zabezpečuje hydroizolácie plochých striech v Banskej Bystrici. Kvalitné materiály a profesionálna realizácia.',
  },

  martin: {
    title: 'Hydroizolácie plochých striech Martin',
    description:
      'Profesionálne hydroizolácie a rekonštrukcie plochých striech v Martine a okolí.',
  },

  prievidza: {
    title: 'Hydroizolácie plochých striech Prievidza',
    description:
      'Kompletné hydroizolácie plochých striech v Prievidzi. PVC fólie, opravy a zateplenie striech.',
  },

  komarno: {
    title: 'Hydroizolácie plochých striech Komárno',
    description:
      'Realizujeme profesionálne hydroizolácie plochých striech v Komárne a okolí.',
  },

  levice: {
    title: 'Hydroizolácie plochých striech Levice',
    description:
      'TMS HYDRA poskytuje hydroizolácie plochých striech v Leviciach s dôrazom na kvalitu a životnosť.',
  },

  topolcany: {
    title: 'Hydroizolácie plochých striech Topoľčany',
    description:
      'Profesionálne hydroizolácie a rekonštrukcie plochých striech v Topoľčanoch.',
  },

   sala: {
    title: 'Hydroizolácie plochých striech Sala',
    description:
      'Kompletné hydroizolačné služby pre ploché strechy vo Sali a okolí.',
  },

   galanta: {
    title: 'Hydroizolácie plochých striech Galanta',
    description:
      'Kompletné hydroizolačné služby pre ploché strechy vo Galante a okolí.',
  },

   surany: {
    title: 'Hydroizolácie plochých striech suranoch',
    description:
      'Kompletné hydroizolačné služby pre ploché strechy vo suranoch a okolí.',
  },

   zvolen: {
    title: 'Hydroizolácie plochých striech Zvolen',
    description:
      'Kompletné hydroizolačné služby pre ploché strechy vo Zvolene a okolí.',
  },

   sladkovicovo: {
    title: 'Hydroizolácie plochých striech sladkovicovo',
    description:
      'Kompletné hydroizolačné služby pre ploché strechy vo sladkovicove a okolí.',
  },

   'dunajska-streda': {
    title: 'Hydroizolácie plochých striech dunajskej strede',
    description:
      'Kompletné hydroizolačné služby pre ploché strechy vo dunajskej strede a okolí.',
  },

   samorin: {
    title: 'Hydroizolácie plochých striech samorine',
    description:
      'Kompletné hydroizolačné služby pre ploché strechy vo samorine a okolí.',
  },


};

export const SeoCityPage: React.FC = () => {
  const { service, city } = useParams<{ service: string; city: string }>();

  const [pageData, setPageData] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  const formattedCity = city
    ? city.charAt(0).toUpperCase() + city.slice(1)
    : '';

  const serviceName = service
    ? serviceNames[service] || service.replace(/-/g, ' ')
    : '';

  const currentCityData = city
  ? cityData[city]
  : null;

  useEffect(() => {
const generatedContent = {
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

    setPageData(generatedContent);
    setLoading(false);
  }, [service, city, formattedCity]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Page not found
      </div>
    );
  }

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
      }
    },
    "areaServed": {
      "@type": "City",
      "name": formattedCity
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{pageData.meta_title}</title>
        <meta
          name="description"
          content={pageData.meta_description}
        />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
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

              <div className="mt-16">
  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-8">
    Často kladené otázky
  </h3>

  <div className="space-y-6">

    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
      <h4 className="font-black text-lg mb-3">
        Koľko stojí hydroizolácia plochej strechy v meste {formattedCity}?
      </h4>

      <p className="text-slate-600 leading-relaxed">
        Cena závisí od veľkosti strechy, typu materiálu a rozsahu rekonštrukcie.
        Kontaktujte TMS HYDRA pre bezplatnú obhliadku a cenovú ponuku.
      </p>
    </div>

    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
      <h4 className="font-black text-lg mb-3">
        Ako dlho trvá realizácia?
      </h4>

      <p className="text-slate-600 leading-relaxed">
        Väčšina realizácií trvá niekoľko dní v závislosti od rozsahu prác,
        počasia a typu strešného systému.
      </p>
    </div>

    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
      <h4 className="font-black text-lg mb-3">
        Poskytujete obhliadku zdarma?
      </h4>

      <p className="text-slate-600 leading-relaxed">
        Áno. TMS HYDRA poskytuje bezplatné obhliadky a odborné poradenstvo
        pre ploché strechy v meste {formattedCity} a okolí.
      </p>
    </div>

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
