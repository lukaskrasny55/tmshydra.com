import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Award,
  MapPin,
} from 'lucide-react';

const stats: [string, any][] = [
  ['Kvalitné materiály', ShieldCheck],
  ['Skúsený tím', Users],
  ['Záruka 2-15 rokov', Award],
  ['Pôsobíme po SR', MapPin],
];

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full bg-slate-900 text-white py-20 sm:py-24 lg:py-32 overflow-hidden flex items-center min-h-[480px] sm:min-h-[560px] lg:min-h-[640px]">
      <div className="absolute inset-0">
        <img
          src="/hero-1920.webp"
          srcSet="/hero-640.webp 640w, /hero-1024.webp 1024w, /hero-1920.webp 1717w"
          sizes="100vw"
          alt="Hydroizolácia plochej strechy TMS Hydra"
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover object-[70%_center] sm:object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))' }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight">
            Vaša strecha,
            <span className="text-blue-500 block">naša zodpovednosť.</span>
          </h1>

          <p className="mt-6 text-slate-200 text-lg max-w-xl">
            Špecialisti na hydroizoláciu a zateplenie plochých striech.
            Prinášame kvalitu, ktorá vydrží generácie.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() =>
                document
                  .getElementById('calculator')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="bg-white/10 border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition backdrop-blur-sm"
            >
              Vypočítať cenu
            </button>

            <button
              onClick={() =>
                document
                  .getElementById('calendar')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="bg-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              Bezplatná obhliadka
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-10 items-stretch">
            <div className="col-span-2 sm:col-span-1 min-h-[104px] bg-white p-6 rounded-2xl shadow-xl text-slate-900 flex flex-col justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="text-3xl font-black text-blue-600">12+</div>
              <div className="text-xs font-bold uppercase text-slate-500 mt-1">
                rokov skúseností
              </div>
            </div>
            {stats.map(([text, Icon], i) => (
              <div
                key={i}
                className="min-h-[104px] flex gap-4 items-center bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:bg-black/30 hover:border-white/20 hover:-translate-y-1"
              >
                <div className="w-11 h-11 bg-blue-600/20 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-sm font-semibold text-slate-100 leading-snug">
                  {text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
