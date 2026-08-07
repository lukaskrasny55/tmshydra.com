import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Camera, ShieldAlert, Wrench } from 'lucide-react';
import { ProcessSection } from '../ProcessSection';
import { Testimonials } from '../Testimonials';
import { BookingCalendar } from '../BookingCalendar';
import { ROUTE_PATHS } from '../../routePaths';
import { trackConversion } from '../GoogleAds';

const PHONE_NUMBER = '+421911551354';
const PHONE_DISPLAY = '+421 911 551 354';

const steps = [
  {
    icon: Camera,
    title: 'Zaznamenajte miesto zatekania',
    desc: 'Ak je to bezpečné, odfoťte miesto, kadiaľ preteká voda. Pomôže nám to pri telefonickej diagnostike aj pri príprave zásahu.',
  },
  {
    icon: ShieldAlert,
    title: 'Zavolajte nám',
    desc: 'Náš SOS tím zasiahne do 48 hodín a strechu provizórne zabezpečí, aby sa škoda ďalej nezväčšovala.',
  },
  {
    icon: Wrench,
    title: 'Pripravíme trvalé riešenie',
    desc: 'Po zastabilizovaní strechy navrhneme opravu, ktorá problém vyrieši natrvalo – s bezplatnou obhliadkou a jasnou cenovou ponukou.',
  },
];

const faqSnippets = [
  {
    q: 'Strecha mi zateká, čo mám robiť?',
    a: 'V prvom rade nás kontaktujte – v prípade havarijného stavu vieme zasiahnuť do 48 hodín a strechu provizórne zabezpečiť, aby sa škoda nezväčšovala. Následne pripravíme trvalé riešenie problému. Neodporúčame čakať, pretože vlhkosť postupne poškodzuje aj konštrukciu pod krytinou.',
  },
  {
    q: 'Je obhliadka strechy naozaj zadarmo a bez záväzkov?',
    a: 'Áno. Prídeme si strechu pozrieť, zmeriame ju, poradíme a pripravíme cenovú ponuku úplne zadarmo a bez akéhokoľvek záväzku objednať si prácu.',
  },
];

export const SosLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 py-14 sm:py-16 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 transform translate-x-32"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            SOS – havarijný zásah do 48 hodín
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter mb-4 leading-tight uppercase">
            Zateká vám <span className="text-blue-500">plochá strecha?</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl font-medium leading-relaxed mb-8">
            Neriešte to sami a neodkladajte to. Náš SOS tím vaše strechu provizórne zabezpečí do 48 hodín a následne pripraví trvalé riešenie – bezplatne vám ju najprv obhliadneme.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => trackConversion('call')}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Volať teraz: {PHONE_DISPLAY}
            </a>
            <a
              href="#calendar"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
            >
              Nie je to súrne? Dohodnúť obhliadku
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20 pb-8">
        {/* ČO ROBIŤ */}
        <div className="bg-white rounded-[2.5rem] shadow-lg border border-slate-100 p-8 sm:p-12 mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">
            Čo robiť, keď strecha zateká
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.title}>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-black text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PREČO MY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-slate-900 text-white p-10 sm:p-12 rounded-[2.5rem] mb-16">
          {[
            { label: 'Zásah do', val: '48 hodín' },
            { label: 'Skúsenosti', val: '12+ rokov' },
            { label: 'Záruka na opravu', val: '15 rokov' },
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
          Časté otázky o havarijnom zásahu
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
