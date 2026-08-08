import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Phone, MapPin, Ruler, Layers, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../../data/projects';
import { ROUTE_PATHS } from '../../routePaths';
import { trackConversion } from '../GoogleAds';
import { localBusinessSchema } from '../Seo';

const PHONE_NUMBER = '+421911551354';
const PHONE_DISPLAY = '+421 911 551 354';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-32">
        <div className="text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-4">Realizácia sa nenašla</h1>
          <Link to={ROUTE_PATHS.projects} className="text-blue-600 font-bold hover:underline">
            Späť na všetky realizácie
          </Link>
        </div>
      </div>
    );
  }

  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const url = `https://www.tmshydra.com${ROUTE_PATHS.projects}/${project.slug}`;
  const title = `${project.title} – ${project.location} | TMS HYDRA realizácie`;

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % project.gallery.length);
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + project.gallery.length) % project.gallery.length);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={project.metaDescription} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TMS-HYDRA" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={project.metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`https://www.tmshydra.com${project.gallery[0]}`} />
        <meta property="og:locale" content="sk_SK" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={project.metaDescription} />
        <meta name="twitter:image" content={`https://www.tmshydra.com${project.gallery[0]}`} />

        <script type="application/ld+json" id="local-business-schema">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      {/* HEADER */}
      <div className="bg-slate-900 py-14 sm:py-16 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 transform translate-x-32"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to={ROUTE_PATHS.projects}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Späť na realizácie
          </Link>

          <div className="flex items-center gap-2 text-blue-400 font-bold mb-4 uppercase tracking-widest text-sm">
            <MapPin className="w-4 h-4" />
            <span>{project.location}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter mb-4 leading-tight uppercase">
            {project.title}
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl font-medium leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20 pb-8">

        {/* FACTS STRIP */}
        {(project.area || project.system) && (
          <div className="flex flex-wrap gap-4 mb-12">
            <div className="flex items-center gap-3 bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-4">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-slate-700">{project.location}</span>
            </div>
            {project.area && (
              <div className="flex items-center gap-3 bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-4">
                <Ruler className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-slate-700">{project.area}</span>
              </div>
            )}
            {project.system && (
              <div className="flex items-center gap-3 bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-4">
                <Layers className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-slate-700">{project.system}</span>
              </div>
            )}
          </div>
        )}

        {/* GALLERY */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {project.gallery.map((img, i) => (
            <button
              key={img}
              onClick={() => setLightboxIndex(i)}
              className={`rounded-2xl overflow-hidden ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
            >
              <img
                src={img}
                alt={`${project.title} – ${project.location} (foto ${i + 1}/${project.gallery.length})`}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              />
            </button>
          ))}
        </div>

        {/* LONG DESCRIPTION */}
        <div className="bg-white rounded-[2.5rem] shadow-lg border border-slate-100 p-8 sm:p-12 mb-16 max-w-4xl">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6">
            O realizácii
          </h2>
          <p className="text-slate-600 leading-relaxed">
            {project.longDescription}
          </p>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 sm:p-12 mb-16 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-2">
              Chcete podobnú realizáciu?
            </h2>
            <p className="text-slate-400">
              Bezplatná obhliadka, jasná cenová ponuka a záruka až 15 rokov.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => trackConversion('call')}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all whitespace-nowrap"
            >
              <Phone className="w-5 h-5" />
              {PHONE_DISPLAY}
            </a>
            <Link
              to={`${ROUTE_PATHS.contact}#calendar`}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-xl font-bold hover:bg-white/20 transition-all whitespace-nowrap"
            >
              Dohodnúť obhliadku
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* OTHER PROJECTS */}
        {otherProjects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-8">
              Ďalšie realizácie
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherProjects.map((p) => (
                <Link
                  key={p.id}
                  to={`${ROUTE_PATHS.projects}/${p.slug}`}
                  className="bg-white rounded-[2rem] shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all block border border-slate-100"
                >
                  <img
                    src={p.gallery[0]}
                    alt={`${p.title} – ${p.location}`}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <div className="text-blue-600 text-xs font-bold uppercase mb-2">{p.location}</div>
                    <h3 className="text-lg font-bold">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button onClick={() => setLightboxIndex(null)} className="absolute top-6 right-6 text-white">
            <X size={36} />
          </button>
          <button onClick={prevImage} className="absolute left-6 text-white">
            <ChevronLeft size={48} />
          </button>
          <img
            src={project.gallery[lightboxIndex]}
            alt={`${project.title} – ${project.location} (foto ${lightboxIndex + 1}/${project.gallery.length})`}
            className="max-w-[90%] max-h-[85vh] rounded-2xl"
          />
          <button onClick={nextImage} className="absolute right-6 text-white">
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </div>
  );
};
