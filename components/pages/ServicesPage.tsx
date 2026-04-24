
import React, { useEffect, useState } from 'react';
import { Search, ClipboardList, HardHat, Wrench, PhoneCall, CheckCircle2, ShieldCheck, Zap, Droplets, LayoutList, Hammer, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { getPageSections } from '../../lib/cms';
import * as LucideIcons from 'lucide-react';
import { HeroSection } from '../HeroSection';
import { ProcessSection } from '../ProcessSection';

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
        <ProcessSection />
        
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
