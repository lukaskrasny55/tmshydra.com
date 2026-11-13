import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  ArrowRight,
  ClipboardCheck,
  FileText,
  ShieldCheck,
  Building2,
  Droplets,
  Layers,
  Euro,
  Users,
} from 'lucide-react';
import { ProcessSection } from '../ProcessSection';
import { Testimonials } from '../Testimonials';
import { BookingCalendar } from '../BookingCalendar';
import { ROUTE_PATHS } from '../../routePaths';
import { trackConversion } from '../GoogleAds';

const PHONE_NUMBER = '+421911551354';
const PHONE_DISPLAY = '+421 911 551 354';

const benefits = [
  {
    icon: ClipboardCheck,
    title: 'Bezplatná obhliadka a písomná ponuka',
    desc: 'Strechu zmeriame, zistíme príčinu zatekania a pripravíme ponuku s rozpisom prác a materiálov, ktorú môžete predložiť vlastníkom alebo zastupiteľstvu.',
  },
  {
    icon: ShieldCheck,
    title: 'Záruka až 15 rokov',
    desc: 'Záruka sa vzťahuje na vodotesnosť hydroizolácie a kvalitu prác. Presný rozsah uvádzame priamo v ponuke.',
  },
  {
    icon: Euro,
    title: 'Cena od 15 €/m²',
    desc: 'Orientačná cena závisí od stavu strechy a zvoleného systému. Pri bytových domoch ponúkame jednovrstvové aj dvojvrstvové riešenia, so zateplením aj bez.',
  },
  {
    icon: Users,
    title: 'Jeden kontakt od ponuky po odovzdanie',
    desc: 'S vami alebo správcom komunikuje jedna osoba. Termíny, postup prác aj odovzdanie strechy máte vždy jasné.',
  },
];

const problems = [
  {
    icon: Droplets,
    title: 'Zatekanie do bytov na najvyššom podlaží',
    desc: 'Najčastejšie ho spôsobujú poškodené detaily okolo atík, vpustí a prestupov, nie celá plocha strechy. Preto najprv zisťujeme príčinu a až potom navrhujeme rozsah.',
  },
  {
    icon: Layers,
    title: 'Dožitá krytina alebo fólia',
    desc: 'Pri starých asfaltových pásoch či fólii v zlom stave odporúčame celkovú obnovu, ideálne spolu so spádovou tepelnou izoláciou.',
  },
  {
    icon: Building2,
    title: 'Strata tepla cez strechu',
    desc: 'Obnovu hydroizolácie sa oplatí spojiť so zateplením. Strecha patrí medzi plochy, ktorými uniká najviac tepla.',
  },
];

const references = [
  {
    title: 'Bytový dom, Petržalka',
    detail: 'približne 500 m², panelový dom',
    text: 'Pôvodnú PVC fóliu v zlom stave sme demontovali a strechu obnovili so spádovou tepelnou izoláciou a dvojvrstvovým hydroizolačným systémom.',
  },
  {
    title: 'Bytový dom č. 562, Bešeňov',
    detail: 'približne 380 m²',
    text: 'Dlhodobé zatekanie do bytov sme vyriešili novou hydroizolačnou fóliou vrátane detailov atík, vpustí a prestupov.',
  },
  {
    title: 'Bytový dom, Martin',
    detail: 'približne 400 m²',
    text: 'Kompletná obnova plochej strechy novou PVC hydroizoláciou po rokoch zatekania.',
    to: `${ROUTE_PATHS.projects}/strecha-bytovky-martin`,
  },
  {
    title: 'Bytový dom, Trenčín',
    detail: 'približne 350 m²',
    text: 'Rekonštrukcia plochej strechy: nová PVC fólia a klampiarske prvky.',
    to: `${ROUTE_PATHS.projects}/rekonstrukcia-bytovky-trencin`,
  },
];

const faqs = [
  {
    q: 'Koľko stojí obnova strechy bytového domu?',
    a: 'Orientačne od 15 €/m², výsledná suma závisí od stavu pôvodnej strechy, zvoleného systému (jednovrstvový alebo dvojvrstvový, so zateplením alebo bez) a množstva detailov ako atiky, vpuste a prestupy. Presnú cenu určíme po bezplatnej obhliadke a pošleme ju písomne.',
  },
  {
    q: 'Dostaneme ponuku, ktorú môžeme predložiť vlastníkom?',
    a: 'Áno. Po obhliadke pripravíme písomnú cenovú ponuku s rozpisom prác a materiálov, ktorú môže správca alebo zástupca vlastníkov použiť pri rozhodovaní.',
  },
  {
    q: 'Aká je záruka?',
    a: 'Na naše realizácie poskytujeme záruku až 15 rokov. Presný rozsah a dĺžku záruky uvádzame v cenovej ponuke podľa zvoleného materiálu a typu realizácie.',
  },
  {
    q: 'Pracujete aj mimo okolia Nových Zámkov?',
    a: 'Áno, pôsobíme po celom Slovensku. Bytové domy sme obnovovali napríklad v Bratislave, Bešeňove, Dubnici, Martine a Trenčíne.',
  },
  {
    q: 'Je obhliadka naozaj zadarmo?',
    a: 'Áno, obhliadka a cenová ponuka sú bezplatné a nezáväzné.',
  },
];

export const BytoveDomyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 py-14 sm:py-12 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 transform translate-x-32"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <Building2 className="w-4 h-4" />
            Pre správcov, SVB a bytové domy
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tighter mb-4 leading-tight uppercase">
            Hydroizolácia strechy <span className="text-blue-500">bytového domu</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl font-medium leading-relaxed mb-8">
            Zatekanie, dožitá krytina alebo vysoké straty tepla? Obnovujeme ploché strechy bytových domov po celom Slovensku. Bezplatná obhliadka, písomná ponuka a záruka až 15 rokov.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#calendar"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
            >
              Dohodnúť bezplatnú obhliadku
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => trackConversion('call')}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
            >
              <Phone className="w-5 h-5" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((b) => (
            <div key={b.title} className="bg-white rounded-[2rem] shadow-lg border border-slate-100 p-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                <b.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="font-black text-slate-900 mb-2 text-base">{b.title}</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-lg border border-slate-100 p-8 mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">
            Najčastejšie problémy striech bytových domov
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((p) => (
              <div key={p.title}>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                  <p.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-black text-slate-900 mb-2">{p.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mb-8">
            Naše realizácie bytových domov
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {references.map((r) => (
              <div key={r.title} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <h3 className="font-black text-slate-900">{r.title}</h3>
                </div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-3">{r.detail}</div>
                <p className="text-slate-600 text-sm leading-relaxed">{r.text}</p>
                {r.to && (
                  <Link
                    to={r.to}
                    className="inline-flex items-center gap-1 text-blue-600 font-bold text-sm mt-3 hover:text-blue-700"
                  >
                    Zobraziť realizáciu
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProcessSection />
      <Testimonials />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-20">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mb-8 text-center">
          Časté otázky správcov a vlastníkov
        </h2>
        <div className="space-y-4">
          {faqs.map((item) => (
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
