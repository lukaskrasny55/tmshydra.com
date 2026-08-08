import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HeroSection } from '../HeroSection';
import { ROUTE_PATHS } from '../../routePaths';
import { projects } from '../../data/projects';

interface Props {
  onBack: () => void;
}

export const ProjectsPage: React.FC<Props> = () => {
  return (
    <div className="min-h-screen bg-slate-50">

      <HeroSection
        title="NAŠE"
        accentTitle="REALIZÁCIE"
        subtitle="Ukážky našich realizácií."
      />

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {projects.map((p) => (
          <Link
            key={p.id}
            to={`${ROUTE_PATHS.projects}/${p.slug}`}
            className="bg-white rounded-[2.5rem] shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col"
          >
            <img
              src={p.gallery[0]}
              alt={`${p.title} – ${p.location}`}
              className="h-64 w-full object-cover"
            />

            <div className="p-6 flex flex-col flex-1">
              <div className="text-blue-600 text-sm font-bold uppercase mb-2">
                {p.location}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {p.title}
              </h3>

              <p className="text-slate-600 mb-4 font-medium">
                {p.description}
              </p>

              <div className="flex items-center gap-2 text-blue-600 font-bold mt-auto">
                Pozrieť realizáciu
                <ArrowRight size={18} />
              </div>
            </div>
          </Link>
        ))}

      </div>

    </div>
  );
};
