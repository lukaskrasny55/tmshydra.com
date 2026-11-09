import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { cityData, cityMeta } from '../data/cities.js';

const primaryService = 'hydroizolacia-plochej-strechy';

// Every city page is linked from the homepage (the main cities first) so
// search engines can reach all of them from the strongest page of the site.
const mainCities = ['bratislava', 'nitra', 'trnava', 'zilina', 'trencin', 'banska-bystrica', 'nove-zamky', 'komarno'];
const featuredCities: { slug: string; label: string }[] = [
  ...mainCities,
  ...Object.keys(cityData).filter((key) => !mainCities.includes(key)),
].map((slug) => ({ slug, label: cityMeta[slug]?.name || slug }));

export const CityLinks: React.FC = () => {
  const cities = featuredCities.filter((c) => cityData[c.slug]);

  if (cities.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-900 text-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-blue-400 font-bold mb-4 uppercase tracking-widest text-sm">
          <MapPin className="w-4 h-4" />
          <span>Pôsobíme po celom Slovensku</span>
        </div>

        <h2 className="text-3xl sm:text-3xl font-black uppercase tracking-tight mb-10">
          Pôsobíme vo vašom meste
        </h2>

        <div className="flex flex-wrap gap-4">
          {cities.map(({ slug, label }) => (
            <Link
              key={slug}
              to={`/sluzby/${primaryService}/${slug}`}
              className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all font-bold text-slate-300 flex items-center gap-2"
            >
              {label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
