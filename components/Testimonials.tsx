import React from 'react';
import { Star, Quote } from 'lucide-react';

const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps/search/?api=1&query=TMS-Hydra+s.r.o.+Pal%C3%A1rikovo';

const reviews = [
  {
    name: 'Gábor Pandi',
    text: 'Pána Solnokyho a jeho tím môžem len odporučiť. Na obhliadku prišiel veľmi rýchlo, dohodli sme sa na detailoch, a to aj v priebehu realizácie. Odporučil profesionálne riešenie. Perfektná komunikácia, pracovali čisto a profesionálne. Všetko prebehlo tak, ako sme sa dohodli, a včas podľa dohody.',
  },
  {
    name: 'Hektor Siegel',
    text: 'Potrebovali sme riešiť poškodenú krytinu na streche garáže. Komunikácia bola bezproblémová, prišli na čas a presne vedeli, kde je problém. Všetko prebehlo podľa dohody a strecha je teraz bez problémov. Určite odporúčam.',
  },
  {
    name: 'Martina Šuhajdová',
    text: 'Som maximálne spokojná, môžem len doporučiť!',
  },
];

const Stars: React.FC = () => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-blue-500 text-blue-500" />
    ))}
  </div>
);

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-3">
            Referencie
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase mb-4">
            Čo o nás hovoria zákazníci
          </h2>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition"
          >
            <Stars />
            <span className="font-black text-slate-900">5,0</span>
            <span className="text-slate-500 text-sm">z 8 Google recenzií</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100 flex flex-col"
            >
              <Quote className="w-8 h-8 text-blue-200 mb-4" />
              <Stars />
              <p className="text-slate-600 text-sm leading-relaxed my-4 flex-1">
                {r.text}
              </p>
              <p className="font-bold text-slate-900">{r.name}</p>
              <p className="text-xs text-slate-400 uppercase tracking-wide">Google recenzia</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
