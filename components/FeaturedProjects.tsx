import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTE_PATHS } from '../routePaths';

const featured = [
  {
    title: 'Villa Hasčák',
    location: 'Bratislava',
    description: 'Kompletná rekonštrukcia hydroizolácie.',
    image: '/vh1.webp',
    slug: 'villa-hascak-bratislava',
  },
  {
    title: 'Panelová strecha',
    location: 'Bratislava - Petržalka',
    description: 'Obnova strechy bytového domu na sídlisku.',
    image: '/pz1.webp',
    slug: 'panelova-strecha-petrzalka',
  },
  {
    title: 'Zelená strecha',
    location: 'Belgicko',
    description: 'Prémiová TPO fólia na administratívnom objekte.',
    image: '/b1.webp',
    slug: 'zelena-strecha-belgicko',
  },
];

export const FeaturedProjects: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-3">
            Naše realizácie
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase">
            Presvedčte sa sami
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-4">
            Výber z desiatok dokončených realizácií po celom Slovensku aj v zahraničí.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featured.map((p) => (
            <Link
              key={p.title}
              to={`${ROUTE_PATHS.projects}/${p.slug}`}
              className="bg-white rounded-[2.5rem] shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all block border border-slate-100"
            >
              <img
                src={p.image}
                alt={`${p.title} – ${p.location}`}
                loading="lazy"
                className="h-56 w-full object-cover"
              />
              <div className="p-6">
                <div className="text-blue-600 text-xs font-bold uppercase mb-2">
                  {p.location}
                </div>
                <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                <p className="text-slate-600 text-sm">{p.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to={ROUTE_PATHS.projects}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all"
          >
            Zobraziť všetky realizácie
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
