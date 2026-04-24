import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { HeroSection } from '../HeroSection';

interface Props {
  onBack: () => void;
}

interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  gallery: string[];
}

export const ProjectsPage: React.FC<Props> = ({ onBack }) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projects: Project[] = [
    {
      id: '1',
      title: 'Villa Hasčák',
      location: 'Bratislava',
      description: 'Kompletná rekonštrukcia hydroizolácie.',
      gallery: ['vh1.jpg', 'vh2.jpg', 'vh3.jpg', 'vh4.jpg']
    },
    {
      id: '2',
      title: 'Oprava strechy',
      location: 'Nové Zámky',
      description: 'Lokálne opravy a pretesnenie strechy.',
      gallery: ['nz1.jpg', 'nz2.jpg', 'nz3.jpg', 'nz4.jpg']
    },
    {
      id: '3',
      title: 'Novostavba',
      location: 'Kolta',
      description: 'Zateplenie + TPO fólia.',
      gallery: ['ns1.jpg', 'ns2.jpg', 'ns3.jpg', 'ns4.jpg']
    },
    {
      id: '4',
      title: 'Bytový dom',
      location: 'Dubnica',
      description: 'Nová strecha bytového domu.',
      gallery: ['bdv1.jpeg', 'bdv2.jpg', 'bdv3.jpg']
    },
    {
  id: '5',
  title: 'Biela lepenka',
  location: 'Pezinok',
  description: 'Pochôdzna terasa s hydroizoláciou.',
  gallery: ['bl1.jpeg', 'bl2.jpeg', 'bl3.jpeg']
},
{
  id: '6',
  title: 'Zelená strecha',
  location: 'Belgicko',
  description: 'Prémiová TPO fólia na administratívnom objekte.',
  gallery: ['b1.jpg', 'b2.jpg', 'b3.jpg']
}
  ];

  const openGallery = (project: Project) => {
    setCurrentProject(project);
    setCurrentImageIndex(0);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const nextImage = () => {
    if (!currentProject) return;
    setCurrentImageIndex((prev) =>
      (prev + 1) % currentProject.gallery.length
    );
  };

  const prevImage = () => {
    if (!currentProject) return;
    setCurrentImageIndex((prev) =>
      (prev - 1 + currentProject.gallery.length) %
      currentProject.gallery.length
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <HeroSection
        title="NAŠE"
        accentTitle="REALIZÁCIE"
        subtitle="Ukážky našich realizácií."
      />

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {projects.map((p) => (
          <div
            key={p.id}
            onClick={() => openGallery(p)}
            className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition"
          >
            <img
              src={p.gallery[0]}
              className="h-64 w-full object-cover"
            />

            <div className="p-6">
              <div className="text-blue-600 text-sm font-bold uppercase mb-2">
                {p.location}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {p.title}
              </h3>

              <p className="text-slate-600 mb-4">
                {p.description}
              </p>

              <div className="flex items-center gap-2 text-blue-600 font-bold">
                <Maximize2 size={18} />
                Otvoriť galériu
              </div>
            </div>
          </div>
        ))}

      </div>

      {galleryOpen && currentProject && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">

          <button
            onClick={closeGallery}
            className="absolute top-6 right-6 text-white"
          >
            <X size={36} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 text-white"
          >
            <ChevronLeft size={48} />
          </button>

          <img
            src={currentProject.gallery[currentImageIndex]}
            className="max-w-[90%] max-h-[85vh] rounded-2xl"
          />

          <button
            onClick={nextImage}
            className="absolute right-6 text-white"
          >
            <ChevronRight size={48} />
          </button>

        </div>
      )}

    </div>
  );
};
