import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ShieldCheck, CheckCircle2, Zap, ArrowRight, MapPin, Phone, Calculator } from 'lucide-react';
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

export const SeoCityPage: React.FC = () => {
  const { service, city } = useParams<{ service: string; city: string }>();
  const [pageData, setPageData] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  const formattedCity = city ? city.charAt(0).toUpperCase() + city.slice(1) : '';
  const serviceName = service ? serviceNames[service] || service.replace(/-/g, ' ') : '';

  useEffect(() => {
    const fetchPage = async () => {
      if (!service || !city) return;

      try {
        const slug = `${service}/${city}`;
        const { data, error } = await supabase
          .from('seo_city_pages')
          .select('*')
          .eq('slug', slug)
          .single();

        if (!error && data) {
          setPageData(data);
        } else {
          // Generate default content if not found
          const generatedContent = {
            title: `${serviceName} ${formattedCity}`,
            meta_title: `${serviceName} ${formattedCity} | TMS-HYDRA`,
            meta_description: `Profesionálna ${serviceName.toLowerCase()} v meste ${formattedCity}. Kontaktujte TMS-HYDRA pre bezplatnú obhliadku strechy.`,
            content: `Naša spoločnosť TMS-HYDRA poskytuje profesionálne služby ${serviceName.toLowerCase()} v meste ${formattedCity}. Špecializujeme sa na hydroizolácie a zateplenie plochých striech s využitím moderných technológií a kvalitných materiálov.`
          };
          setPageData(generatedContent);
        }
      } catch (err) {
        console.error('Error fetching SEO city page:', err);
        // Fallback for network error
        const fallbackContent = {
          title: `${serviceName} ${formattedCity}`,
          meta_title: `${serviceName} ${formattedCity} | TMS-HYDRA`,
          meta_description: `Profesionálna ${serviceName.toLowerCase()} v meste ${formattedCity}.`,
          content: `Naša spoločnosť TMS-HYDRA poskytuje profesionálne služby v meste ${formattedCity}.`
        };
        setPageData(fallbackContent);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [service, city, serviceName, formattedCity]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!pageData) return <div className="min-h-screen flex items-center justify-center">Page not found</div>;

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
        <meta name="description" content={pageData.meta_description} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <div className="bg-slate-900 pt-32 pb-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 transform translate-x-32"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-blue-500 font-bold mb-6 uppercase tracking-widest text-sm">
            <MapPin className="w-4 h-4" />
            <span>{formattedCity}</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter mb-8 uppercase leading-[0.9]">
            {serviceName} <br />
            <span className="text-blue-500">{formattedCity}</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl font-medium leading-relaxed">
            {pageData.meta_description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/#calendar" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
              Bezplatná obhliadka <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/#calculator" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center gap-2">
              <Calculator className="w-5 h-5" /> Kalkulačka ceny
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-12">
            <div className="prose prose-xl prose-slate max-w-none">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-6">Profesionálne služby v meste {formattedCity}</h2>
              <p className="text-slate-600 leading-relaxed">
                {pageData.content}
              </p>
              
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mt-12 mb-6">Prečo si vybrať TMS-HYDRA?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                {[
                  'Certifikované materiály (TPO, PVC, Asfalt)',
                  'Záruka na prácu až 15 rokov',
                  'Bezplatná obhliadka a nacenenie',
                  'Skúsený tím odborníkov',
                  'Rýchla realizácia',
                  'Osobný prístup'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="font-bold text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mt-12 mb-6">Náš proces realizácie</h3>
              <div className="space-y-6 not-prose">
                {[
                  { t: 'Obhliadka', d: 'Prídeme k vám, zameriame strechu a posúdime jej stav.' },
                  { t: 'Cenová ponuka', d: 'Vypracujeme detailný rozpočet na mieru vašim potrebám.' },
                  { t: 'Realizácia', d: 'Odborná montáž s dôrazom na každý detail a kvalitu spojov.' },
                  { t: 'Odovzdanie', d: 'Kontrola kvality a odovzdanie hotového diela so zárukou.' }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-black flex-shrink-0">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 uppercase mb-1">{step.t}</h4>
                      <p className="text-slate-500">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
              <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">Potrebujete poradiť?</h3>
              <p className="text-slate-400 mb-8 font-medium">
                Naši technici sú vám k dispozícii pre konzultácie v meste {formattedCity}.
              </p>
              <a href="tel:+421911551354" className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all mb-4">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Zavolajte nám</div>
                  <div className="text-lg font-black">+421 911 551 354</div>
                </div>
              </a>
              <Link to="/#contact" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                Napíšte nám
              </Link>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
              <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">Naše Služby</h3>
              <div className="space-y-3">
                <Link 
                  to="/sluzby"
                  className="block p-4 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all mb-4 text-center"
                >
                  Všetky služby
                </Link>
                {Object.entries(serviceNames).map(([slug, name]) => (
                  <Link 
                    key={slug}
                    to={`/sluzby/${slug}/${city}`}
                    className={`block p-4 rounded-xl font-bold transition-all ${service === slug ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
