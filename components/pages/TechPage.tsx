
import React, { useEffect, useState } from 'react';
import { ShieldCheck, CheckCircle2, Zap } from 'lucide-react';
import { getPageSections } from '../../lib/cms';
import { HeroSection } from '../HeroSection';

interface Props {
  onBack: () => void;
}

export const TechPage: React.FC<Props> = ({ onBack }) => {
  const [sections, setSections] = useState<Record<string, string>>({});
  const [roofCompositions, setRoofCompositions] = useState<any[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageSections('tech');
      setSections(data);
      if (data.compositions) {
        try {
          setRoofCompositions(JSON.parse(data.compositions));
        } catch (e) {
          console.error('Error parsing compositions', e);
        }
      }
    };
    fetchContent();
  }, []);

  // Fallback compositions if not in DB
  const defaultCompositions = [
    {
      title: 'JEDNOPLÁŠŤOVÁ PLOCHÁ STRECHA',
      subtitle: 'Skladba vrstiev jednoplášťovej plochej strechy:',
      image: 't1.jpg',
      layers: [
        'ŽELEZOBETÓNOVÁ DOSKA PLOCHEJ STRECHY',
        'BETÓNOVÝ SPÁDOVÝ POTER',
        'PENETRAČNÝ NÁTER',
        'SBS MODIFIKOVANÝ ASFALTOVANÝ PÁS PAROZÁBRANA',
        'TEPELNÁ IZOLÁCIA',
        'SAMOLEPIACI ASFALTOVANÝ PÁS',
        'SBS MODIFIKOVANÉ ASFALTOVANÉ PÁSY',
        'KOTVIACE SKRUTKY',
        'ATIKA',
        'OPLECHOVANIE ATIKY',
        'KLIN Z MINERÁLNEJ VLNY'
      ]
    },
    {
      title: 'EXTENZÍVNA STRECHA',
      subtitle: 'Tento typ strechy - extenzívna zelená strecha, nie je určený na aktívne využívanie, ide však o najľahšiu a najlacnejšiu variantu vegetačnej strechy. Porast tvoria suchomilné druhy rastlín. Kvôli nízkej váhe je tento typ strechy možné realizovať na takmer všetkých strešných konštrukciách.',
      image: 't2.jpg',
      layers: [
        'Vegetácia a podkladová vrstva (vrstva substrátu)',
        'Filtračná vrstva',
        'Drenážna vrstva',
        'Separačná vrstva',
        'Ochrana proti prerastaniu koreňov a hydroizolácia',
        'Tepelná izolácia',
        'Parotesná zábrana',
        'Konštrukcia strechy'
      ]
    },
    {
      title: 'POCHÔDZNA STRECHA, TERASA S DLAŽBOU NA REKTIFIKAČNÝCH TERČOCH',
      subtitle: 'Skladba vrstiev pochôdznej strechy s dlažbou na rektifikačných terčoch:',
      image: 't3.jpg',
      layers: [
        'NOSNÁ ŽELEZOBETÓNOVÁ KONŠTRUKCIA',
        'PENETRAČNÝ NÁTER',
        'PAROZÁBRANA ASFALTOVANÝ PÁS',
        'TEPELNÁ IZOLÁCIA EPS 150 S',
        'TEPELNÁ IZOLÁCIA PUR/PIR IZOLAČNÉ DOSKY',
        'HYDROIZOLAČNÁ STREŠNÁ FÓLIA',
        'REKTIFIKAČNÉ TERČE PRE UKLADANIE DLAŽBY',
        'DLAŽBA TERASOVÁ'
      ]
    }
  ];

  const displayCompositions = roofCompositions.length > 0 ? roofCompositions : defaultCompositions;

  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection 
        title={sections.title_main || 'MODERNÉ'} 
        accentTitle={sections.title_accent || 'TECHNOLÓGIE'} 
        subtitle={sections.subtitle || 'Používame len certifikované materiály od svetových lídrov v oblasti hydroizolácií.'} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        {displayCompositions.map((comp, idx) => (
          <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img src={comp.image} alt={comp.title} className="w-full aspect-video object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
            
            <div className={`${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight uppercase tracking-tighter">
                {comp.title}
              </h2>
              <p className="text-slate-600 mb-10 text-lg leading-relaxed font-medium">
                {comp.subtitle}
              </p>
              
              <div className="space-y-3">
                {comp.layers.map((layer, lIdx) => (
                  <div key={lIdx} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-black text-xs shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                      {lIdx + 1}
                    </div>
                    <span className="text-slate-700 font-bold text-sm pt-1.5 uppercase tracking-wide">
                      {layer}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Section */}
      <div className="bg-white border-y border-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">Certifikované systémy</h3>
              <p className="text-slate-500 text-sm font-medium">Používame výhradne materiály od renomovaných výrobcov s platnými certifikátmi.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">Záruka až 15 rokov</h3>
              <p className="text-slate-500 text-sm font-medium">Za kvalitou našej práce si stojíme, preto poskytujeme nadštandardné záruky.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">Inovácie</h3>
              <p className="text-slate-500 text-sm font-medium">Neustále sledujeme trendy a implementujeme najnovšie technologické postupy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
