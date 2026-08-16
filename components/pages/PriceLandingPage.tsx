import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import { HeroSection } from '../HeroSection';
import { ProcessSection } from '../ProcessSection';
import { Testimonials } from '../Testimonials';
import { BookingCalendar } from '../BookingCalendar';
import { ROUTE_PATHS } from '../../routePaths';
import { trackConversion } from '../GoogleAds';

const PHONE_NUMBER = '+421911551354';
const PHONE_DISPLAY = '+421 911 551 354';

const priceTiers = [
  {
    label: 'Samotná hydroizolačná fólia (jednovrstvový systém)',
    price: '15 – 30 €/m²',
  },
  {
    label: 'Neizolovaná plochá strecha – kompletná skladba',
    price: '30 – 50 €/m²',
  },
  {
    label: 'Izolovaná plochá strecha (s tepelnou izoláciou)',
    price: '80 – 100 €/m²',
  },
  {
    label: 'Pochôdzna terasa',
    price: 'od 140 €/m²',
  },
  {
    label: 'Zelená strecha (extenzívna)',
    price: 'od 170 €/m²',
  },
];

const faqSnippets = [
  {
    q: 'Koľko stojí hydroizolácia plochej strechy?',
    a: 'Cena sa vždy odvíja od stavu pôvodnej strechy, zvolenej fólie a veľkosti plochy. Presné číslo vám vieme povedať až po bezplatnej obhliadke, kde zmeriame strechu, posúdime jej stav a navrhneme riešenie na mieru.',
  },
  {
    q: 'Aký je rozdiel medzi PVC, TPO a EPDM fóliou?',
    a: 'PVC a TPO fólie majú životnosť okolo 40 – 50 rokov, EPDM kaučuková fólia vydrží pri správnej montáži aj 50 až 80 rokov. Ktorý materiál je pre vašu strechu najvhodnejší, vám radi odporučíme priamo na mieste.',
  },
];

export const PriceLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection
        title="HYDROIZOLÁCIA PLOCHEJ STRECHY"
        accentTitle="CENA A OBHLIADKA ZADARMO"
        subtitle="Orientačné ceny podľa typu strechy, overené materiály PVC, TPO a EPDM a bezplatná obhliadka priamo u vás. Zistite, koľko bude stáť vaša strecha."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20 pb-8">
        <div className="flex flex-wrap gap-4 mb-16">
          <a
            href={`tel:${PHONE_NUMBER}`}
            onClick={() => trackConversion('call')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
          >
            <Phone className="w-5 h-5" />
            Zavolajte: {PHONE_DISPLAY}
          </a>
          <a
            href="#calendar"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all"
          >
            Dohodnúť bezplatnú obhliadku
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* CENNÍK */}
        <div className="bg-white rounded-[2.5rem] shadow-lg border border-slate-100 p-8 sm:p-8 mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">
            Orientačný cenník
          </h2>
          <p className="text-slate-500 mb-8">
            Skutočná cena závisí od stavu strechy, sklonu, materiálu a dostupnosti objektu. Presnú a záväznú cenovú ponuku pripravíme vždy až po bezplatnej obhliadke priamo na mieste.
          </p>

          <div className="space-y-3">
            {priceTiers.map((tier) => (
              <div
                key={tier.label}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <span className="font-bold text-slate-700">{tier.label}</span>
                <span className="text-blue-600 font-black text-lg whitespace-nowrap">{tier.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PREČO MY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-slate-900 text-white p-8 sm:p-8 rounded-[2.5rem] mb-16">
          {[
            { label: 'Záruka', val: '15 rokov' },
            { label: 'Pohotovosť', val: '48 hodín' },
            { label: 'Skúsenosti', val: '12+ rokov' },
            { label: 'Obhliadka', val: 'Zadarmo' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-xl sm:text-2xl font-black mb-1">{item.val}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProcessSection />
      <Testimonials />

      {/* MINI FAQ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-20">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mb-8 text-center">
          Časté otázky o cene
        </h2>
        <div className="space-y-4">
          {faqSnippets.map((item) => (
            <div key={item.q} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="font-black text-slate-900 mb-2">{item.q}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to={ROUTE_PATHS.faq}
            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700"
          >
            Zobraziť všetky časté otázky
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <BookingCalendar />
    </div>
  );
};
