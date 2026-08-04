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
      gallery: ['/vh1.jpg', '/vh2.jpg', '/vh3.jpg', '/vh4.jpg']
    },
    {
      id: '2',
      title: 'Oprava strechy',
      location: 'Nové Zámky',
      description: 'Lokálne opravy a pretesnenie strechy.',
      gallery: ['/nz1.jpg', '/nz2.jpg', '/nz3.jpg', '/nz4.jpg']
    },
    {
      id: '3',
      title: 'Novostavba',
      location: 'Kolta',
      description: 'Zateplenie + TPO fólia.',
      gallery: ['/ns1.jpg', '/ns2.jpg', '/ns3.jpg', '/ns4.jpg']
    },
    {
      id: '4',
      title: 'Bytový dom',
      location: 'Dubnica',
      description: 'Nová strecha bytového domu.',
      gallery: ['/bdv1.jpeg', '/bdv2.jpg', '/bdv3.jpg']
    },
    {
      id: '5',
      title: 'Biela lepenka',
      location: 'Pezinok',
      description: 'Pochôdzna terasa s hydroizoláciou.',
      gallery: ['/bl1.jpeg', '/bl2.jpeg', '/bl3.jpeg']
    },
    {
      id: '6',
      title: 'Zelená strecha',
      location: 'Belgicko',
      description: 'Prémiová TPO fólia na administratívnom objekte.',
      gallery: ['/b1.jpg', '/b2.jpg', '/b3.jpg']
    },
    {
      id: '7',
      title: 'EPDM strecha',
      location: 'Modra',
      description: 'Hydroizolácia plochej strechy rodinného domu fóliou EPDM.',
      gallery: ['/md1.jpg', '/md2.jpg', '/md3.jpg', '/md4.jpg', '/md5.jpg']
    },
    {
      id: '8',
      title: 'Zateplená plechová strecha',
      location: 'Bratislava',
      description: 'Zateplenie a hydroizolácia plechovej strechy PIR doskami.',
      gallery: ['/bap1.jpg', '/bap2.jpg', '/bap3.jpg', '/bap4.jpg', '/bap5.jpg']
    },
    {
      id: '9',
      title: 'Rekonštrukcia strechy',
      location: 'Rovensko',
      description: 'Kompletná rekonštrukcia strechy rodinného domu.',
      gallery: ['/rv1.jpg', '/rv2.jpg', '/rv3.jpg', '/rv4.jpg', '/rv5.jpg']
    },
    {
      id: '10',
      title: 'Nová strecha RD',
      location: 'Plavecké Podhradie',
      description: 'Nová hydroizolácia a zateplenie strechy rodinného domu.',
      gallery: ['/pp1.jpg', '/pp2.jpg', '/pp3.jpg', '/pp4.jpg', '/pp5.jpg']
    },
    {
      id: '11',
      title: 'Biela strecha',
      location: 'Senec',
      description: 'Pochôdzna terasa a strecha s bielou PVC fóliou.',
      gallery: ['/sc1.jpg', '/sc2.jpg', '/sc3.jpg', '/sc4.jpg', '/sc5.jpg']
    },
    {
      id: '12',
      title: 'Strecha bytovky',
      location: 'Martin',
      description: 'Kompletná výmena strechy bytového domu.',
      gallery: ['/mt1.jpg', '/mt2.jpg', '/mt3.jpg', '/mt4.jpg', '/mt5.jpg']
    },
    {
      id: '13',
      title: 'Rekonštrukcia bytovky',
      location: 'Trenčín',
      description: 'Rekonštrukcia plochej strechy bytového domu.',
      gallery: ['/tn1.jpg', '/tn2.jpg', '/tn3.jpg', '/tn4.jpg', '/tn5.jpg']
    },
    {
      id: '14',
      title: 'Nová strecha domu',
      location: 'Krnča',
      description: 'Hydroizolácia a zateplenie strechy rodinného domu.',
      gallery: ['/kr1.jpg', '/kr2.jpg', '/kr3.jpg', '/kr4.jpg', '/kr5.jpg']
    },
    {
      id: '15',
      title: 'Panelová strecha',
      location: 'Bratislava - Petržalka',
      description: 'Obnova strechy bytového domu na sídlisku.',
      gallery: ['/pz1.jpg', '/pz2.jpg', '/pz3.jpg', '/pz4.jpg', '/pz5.jpg']
    },
    {
      id: '16',
      title: 'Strecha rodinného domu',
      location: 'Nesvady',
      description: 'Hydroizolácia strechy rodinného domu PVC fóliou.',
      gallery: ['/nsv1.jpg', '/nsv2.jpg', '/nsv3.jpg', '/nsv4.jpg', '/nsv5.jpg']
    },
    {
      id: '17',
      title: 'Bytovka č. 562',
      location: 'Bešeňov',
      description: 'Kompletná rekonštrukcia strechy bytového domu.',
      gallery: ['/bs1.jpg', '/bs2.jpg', '/bs3.jpg', '/bs4.jpg', '/bs5.jpg']
    },
    {
      id: '18',
      title: 'Strecha na kľúč',
      location: 'Nové Zámky',
      description: 'Realizácia novej strechy rodinného domu od návrhu po odovzdanie.',
      gallery: ['/nzb1.jpg', '/nzb2.jpg', '/nzb3.jpg', '/nzb4.jpg', '/nzb5.jpg']
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
            className="bg-white rounded-[2.5rem] shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <img
              src={p.gallery[0]}
              alt={`${p.title} – ${p.location}`}
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
            alt={`${currentProject.title} – ${currentProject.location} (foto ${currentImageIndex + 1}/${currentProject.gallery.length})`}
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
