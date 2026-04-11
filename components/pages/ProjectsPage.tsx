import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { getPageSections } from '../../lib/cms';
import { HeroSection } from '../HeroSection';

interface Props {
  onBack: () => void;
}

interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  image_url: string;
  gallery?: string[];
}

export const ProjectsPage: React.FC<Props> = ({ onBack }) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [sections, setSections] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const img = (file: string) => `${import.meta.env.BASE_URL}${file}`;

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageSections('projects');
      setSections(data);
    };

    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setProjects(
          data.map((p) => ({
            ...p,
            gallery: p.image_url.includes(',')
              ? p.image_url.split(',').map((x: string) => x.trim())
              : [p.image_url],
          }))
        );
      } else {
        const defaultProjects: Project[] = [
          {
            id: '1',
            title: 'Villa Hasčák',
            location: 'Bratislava',
            description:
              'Kompletná rekonštrukcia hydroizolačného systému.',
            image_url: 'vh1.jpg',
            gallery: ['vh1.jpg', 'vh2.jpg', 'vh3.jpg', 'vh4.jpg'],
          },
          {
            id: '2',
            title: 'Oprava plochej strechy',
            location: 'Nové Zámky',
            description:
              'Lokálne opravy a celoplošné pretesnenie.',
            image_url: 'nz1.jpg',
            gallery: ['nz1.jpg', 'nz2.jpg', 'nz3.jpg', 'nz4.jpg'],
          },
          {
            id: '3',
            title: 'Novostavba',
            location: 'Kolta',
            description:
              'Zateplenie a pokládka TPO fólie.',
            image_url: 'ns1.jpg',
            gallery: ['ns1.jpg', 'ns2.jpg', 'ns3.jpg', 'ns4.jpg'],
          },
          {
            id: '4',
            title: 'Biela lepenka',
            location: 'Pezinok',
            description:
              'Hydroizolačná stierka a dlažba.',
            image_url: 'bl1.jpeg',
            gallery: ['bl1.jpeg', 'bl2.jpeg', 'bl3.jpeg'],
          },
          {
            id: '5',
            title: 'Bytovka',
            location: 'Dubnica nad Váhom',
            description:
              'Realizácia novej strechy.',
            image_url: 'bdv1.jpeg',
            gallery: ['bdv1.jpeg', 'bdv2.jpg', 'bdv3.jpg'],
          },
          {
            id: '6',
            title: 'Zelená strecha',
            location: 'Belgicko',
            description:
              'Prémiová TPO fólia.',
            image_url: 'b1.jpg',
            gallery: ['b1.jpg', 'b2.jpg', 'b3.jpg'],
          },
        ];

        setProjects(defaultProjects);
      }

      setLoading(false);
    };

    fetchContent();
    fetchProjects();
  }, []);

  const openGallery = (project: Project) => {
    setCurrentProject(project);
    setCurrentImageIndex(0);
    setGalleryOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentProject) return;

    setCurrentImageIndex(
      (prev) => (prev + 1) % currentProject.gallery!.length
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentProject) return;

    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + currentProject.gallery!.length) %
        currentProject.gallery!.length
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection
        title={sections.title_main || 'NAŠE'}
        accentTitle={sections.title_accent || 'REALIZÁCIE'}
        subtitle={
          sections.subtitle ||
          'Prezrite si výber našich prác.'
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-bold">
            Načítavam realizácie...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <div
                key={p.id}
                onClick={() => openGallery(p)}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-100 group cursor-pointer"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={img(p.gallery?.[0] || p.image_url)}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                      <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs font-bold text-blue-600 uppercase mb-1">
                    {p.location}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {p.title}
                  </h3>

                  <p className="text-slate-600">
                    {p.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-blue-600 text-sm font-bold">
                    <span>Zobraziť galériu</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {galleryOpen && currentProject && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4"
          onClick={closeGallery}
        >
          <button
            className="absolute top-6 right-6 text-white"
            onClick={closeGallery}
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative w-full max-w-5xl flex items-center justify-center">
            <button
              className="absolute left-0 sm:-left-16 text-white p-4 z-10"
              onClick={prevImage}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <img
              src={img(
                currentProject.gallery![currentImageIndex]
              )}
              alt={currentProject.title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="absolute right-0 sm:-right-16 text-white p-4 z-10"
              onClick={nextImage}
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </div>

          <div className="mt-6 text-center text-white">
            <h4 className="font-bold text-xl">
              {currentProject.title}
            </h4>

            <p className="text-white/60 text-sm mt-1">
              Fotografia {currentImageIndex + 1} z{' '}
              {currentProject.gallery!.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
