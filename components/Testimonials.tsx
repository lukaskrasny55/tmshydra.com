import React from 'react';
import { Star, Quote } from 'lucide-react';
import { GOOGLE_REVIEWS_URL, GOOGLE_REVIEWS_RATING, GOOGLE_REVIEWS_COUNT_LABEL, reviews } from '../data/reviews.js';

export const Stars: React.FC = () => (
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
            <span className="font-black text-slate-900">{GOOGLE_REVIEWS_RATING}</span>
            <span className="text-slate-500 text-sm">{GOOGLE_REVIEWS_COUNT_LABEL}</span>
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
