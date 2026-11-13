import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Award,
  MapPin,
  Facebook,
  Instagram,
  Star,
  Euro,
} from 'lucide-react';
import { GOOGLE_REVIEWS_URL, GOOGLE_REVIEWS_RATING, GOOGLE_REVIEWS_COUNT_LABEL } from '../data/reviews.js';

const stats: [string, any][] = [
  ['Kvalitné materiály', ShieldCheck],
  ['Skúsený tím', Users],
  ['Záruka 2-15 rokov', Award],
  ['Pôsobíme po SR', MapPin],
];

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full bg-slate-900 text-white py-14 sm:py-16 lg:py-32 overflow-hidden flex items-center min-h-[480px] sm:min-h-[560px] lg:min-h-[640px]">
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
          <h1 className="text-3xl sm:text-3xl lg:text-4xl font-black leading-tight">
            Hydroizolácia a zateplenie plochých striech
          </h1>

          <p className="mt-5 text-slate-200 text-base sm:text-lg max-w-xl">
            Komplexné riešenia plochých striech pre rodinné domy, bytové a priemyselné objekty.
            Realizujeme hydroizolácie, zateplenie a opravy.
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
              Vypočítať orientačnú cenu
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

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition"
              aria-label={`Google hodnotenie ${GOOGLE_REVIEWS_RATING} ${GOOGLE_REVIEWS_COUNT_LABEL}`}
            >
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </span>
              <span className="font-black">{GOOGLE_REVIEWS_RATING}</span>
              <span className="text-slate-500">{GOOGLE_REVIEWS_COUNT_LABEL}</span>
            </a>
            <span className="inline-flex items-center gap-2 font-semibold text-slate-100">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              Záruka až 15 rokov
            </span>
            <span className="inline-flex items-center gap-2 font-semibold text-slate-100">
              <Euro className="w-5 h-5 text-blue-400" />
              Cena od 15 €/m²
            </span>
          </div>

          <p className="mt-4 text-slate-400 text-sm italic">
            Vaša strecha, naša zodpovednosť.
          </p>

          <div className="flex items-center gap-3 mt-6">
            <a
              href="https://www.facebook.com/TMS.hydra.s.o.s"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TMS-HYDRA na Facebooku"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/tms_hydra/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TMS-HYDRA na Instagrame"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition"
            >
              <Instagram className="w-4 h-4" />
            </a>
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
