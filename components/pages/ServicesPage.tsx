
import React, { useEffect, useState } from 'react';
import { Search, PencilRuler, HardHat, Wrench, PhoneCall, CheckCircle2, ShieldCheck, Zap, Droplets } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { getPageSections } from '../../lib/cms';
import * as LucideIcons from 'lucide-react';
import { HeroSection } from '../HeroSection';

interface Props {
  onBack: () => void;
  onNavigateToContact: () => void;
}

const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) return <HardHat className={className} />;
  return <IconComponent className={className} />;
};

export const ServicesPage: React.FC<Props> = ({ onBack, onNavigateToContact }) => {
  const [sections, setSections] = useState<Record<string, string>>({});
  const [services, setServices] = useState<any[]>([]);
  const materials = [
    'Asfaltové pásy', 'TPO fólie', 'PVC fólie', 'EPDM-Firestone', 
    'Resitrix', 'Alutrix', 'PUR/PIR dosky', 'Svetlíky'
  ];

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageSections('services');
      setSections(data);
    };

    const fetchServices = async () => {
      const { data } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });
      if (data) setServices(data);
    };

    fetchContent();
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection 
        title={sections.title_main || 'NAŠE'} 
        accentTitle={sections.title_accent || 'SLUŽBY'} 
        subtitle={sections.subtitle || 'Komplexný cyklus starostlivosti o ploché strechy. Od diagnostiky až po urgentný zásah v havarijných stavoch.'} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-32">
        {/* Main Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, idx) => (
            <div key={service.id} className={`bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 hover:border-blue-200 transition-all group ${idx === 1 ? 'md:scale-105 md:z-10' : ''}`}>
              <div className={`mb-8 p-5 w-fit rounded-3xl transition-transform duration-500 group-hover:scale-110 ${idx === 1 ? 'bg-blue-600 shadow-lg shadow-blue-600/20' : 'bg-blue-50'}`}>
                <DynamicIcon name={service.icon} className={`w-12 h-12 ${idx === 1 ? 'text-white' : 'text-blue-600'}`} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight uppercase">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">
                {service.short_description}
              </p>
              {idx === 1 && (
                <div className="flex flex-wrap gap-2">
                  {materials.map((m, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-full border border-slate-100 uppercase tracking-wider">
                      {m}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Fallback if no services in DB */}
          {services.length === 0 && (
            <>
              {/* Posúdenie */}
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 hover:border-blue-200 transition-all group">
                <div className="mb-8 p-5 bg-blue-50 w-fit rounded-3xl group-hover:scale-110 transition-transform duration-500">
                  <Search className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight uppercase">POSÚDENIE</h3>
                <p className="text-slate-600 leading-relaxed text-lg mb-6">
                  Detailná kontrola a diagnostika. Identifikujeme slabé miesta a navrhneme preventívne opatrenia skôr, než vznikne škoda.
                </p>
              </div>

              {/* Riešenie */}
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 hover:border-blue-200 transition-all group md:scale-105 md:z-10">
                <div className="mb-8 p-5 bg-blue-600 w-fit rounded-3xl shadow-lg shadow-blue-600/20">
                  <PencilRuler className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight uppercase">RIEŠENIE</h3>
                <p className="text-slate-600 leading-relaxed text-lg mb-8">
                  Návrh na mieru s cenovou ponukou zdarma. Naše riešenia kombinujú funkčnosť s maximálnou životnosťou.
                </p>
                <div className="flex flex-wrap gap-2">
                  {materials.map((m, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-full border border-slate-100 uppercase tracking-wider">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Realizácia */}
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 hover:border-blue-200 transition-all group">
                <div className="mb-8 p-5 bg-blue-50 w-fit rounded-3xl group-hover:scale-110 transition-transform duration-500">
                  <HardHat className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight uppercase">REALIZÁCIA</h3>
                <p className="text-slate-600 leading-relaxed text-lg mb-6">
                  Certifikované materiály a skúsený tím. Zaručujeme bezstarostný priebeh a výsledok, ktorý prekoná vaše očakávania.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Support Services Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Servis Card */}
          <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 flex flex-col justify-center hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-6 mb-10">
              <div className="p-5 bg-slate-900 rounded-3xl">
                <Wrench className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">SERVIS</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-xl mb-10">
              Pravidelné prehliadky a údržba predlžujú životnosť vašej strechy až o desiatky rokov. Ponúkame záručný aj pozáručný servis od 3 do 15 rokov.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-6 rounded-2xl">
                <div className="font-black text-blue-600 text-2xl mb-1">Pravidelnosť</div>
                <div className="text-slate-500 text-sm font-bold uppercase tracking-widest">Revízie striech</div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl">
                <div className="font-black text-slate-900 text-2xl mb-1">Údržba</div>
                <div className="text-slate-500 text-sm font-bold uppercase tracking-widest">Čistenie vtokov</div>
              </div>
            </div>
          </div>

          {/* SOS-HYDRA Card */}
          <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden group shadow-2xl border-2 border-blue-500/20">
            <div className="absolute top-0 right-0 w-full h-full bg-blue-600/5 pointer-events-none"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="bg-blue-600 p-6 rounded-3xl shadow-2xl shadow-blue-600/40">
                    <PhoneCall className="w-12 h-12 text-white" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.8)]"></span>
                    <span className="text-xs font-black tracking-widest uppercase">ACTIVE EMERGENCY 24/7</span>
                  </div>
                </div>
                <h3 className="text-3xl font-black mb-6 tracking-tighter italic">SOS-HYDRA</h3>
                <p className="text-slate-400 text-xl leading-relaxed mb-10 max-w-md">
                  Zateká vám? Náš zásahový tím dorazí <span className="text-blue-400 font-bold underline underline-offset-8">do 48 hodín</span>. Zastabilizujeme havarijný stav za fixnú cenu.
                </p>
              </div>
              <button 
                onClick={onNavigateToContact}
                className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xl hover:bg-blue-500 transition-all shadow-xl hover:shadow-blue-600/30 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                KONTAKTOVAŤ POHOTOVOSŤ
              </button>
            </div>
          </div>
        </div>

        {/* Global Quality Badges */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 bg-white p-12 rounded-[3.5rem] shadow-lg border border-slate-100">
          {[
            { label: 'Záruka', val: '15 ROKOV', icon: <ShieldCheck className="w-6 h-6" /> },
            { label: 'Pohotovosť', val: '48 HODÍN', icon: <Zap className="w-6 h-6" /> },
            { label: 'Skúsenosti', val: '12+ ROKOV', icon: <CheckCircle2 className="w-6 h-6" /> },
            { label: 'Ochrana', val: '100% VODE', icon: <Droplets className="w-6 h-6" /> }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-3">
              <div className="text-blue-600">{item.icon}</div>
              <div className="text-2xl font-black text-slate-900">{item.val}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
