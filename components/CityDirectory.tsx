import React from 'react';
import { Link } from 'react-router-dom';
import { cityData, cityMeta, serviceNames } from '../data/cities.js';

// Plain list of every service x city landing page, grouped by service. Gives
// all of those pages a crawlable link from the main navigation (Služby).
export const CityDirectory: React.FC = () => (
  <section className="mt-24">
    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">
      Naše služby v jednotlivých mestách
    </h2>
    <p className="text-slate-600 mb-10 max-w-3xl">
      Ploché strechy riešime po celom Slovensku. Vyberte si službu a mesto, v ktorom potrebujete obhliadku alebo cenovú ponuku.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Object.entries(serviceNames).map(([service, label]) => (
        <div key={service} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <h3 className="text-lg font-black text-slate-900 mb-4">{label}</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {Object.keys(cityData).map((city) => (
              <li key={city}>
                <Link to={`/sluzby/${service}/${city}`} className="text-blue-600 font-medium hover:underline">
                  {cityMeta[city]?.name || city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);
