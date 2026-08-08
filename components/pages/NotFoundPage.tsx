import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ROUTE_PATHS } from '../../routePaths';

const usefulLinks = [
  { label: 'Naše služby', path: ROUTE_PATHS.services },
  { label: 'Realizácie', path: ROUTE_PATHS.projects },
  { label: 'Časté otázky', path: ROUTE_PATHS.faq },
  { label: 'Kontakt', path: ROUTE_PATHS.contact },
];

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-32">
      <Helmet>
        <title>Stránka sa nenašla (404) | TMS HYDRA</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="text-center max-w-xl">
        <div className="text-7xl font-black text-slate-200 mb-4">404</div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">
          Stránka sa nenašla
        </h1>
        <p className="text-slate-600 mb-10">
          Adresa, ktorú hľadáte, na webe neexistuje alebo bola presunutá. Skúste niektorú z týchto stránok.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {usefulLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="bg-white border border-slate-200 text-slate-700 px-5 py-3 rounded-xl font-bold hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to={ROUTE_PATHS.home}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
        >
          Späť na domovskú stránku
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};
