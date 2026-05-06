import React from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Zap,
  Droplets
} from 'lucide-react';

import { HeroSection } from '../HeroSection';
import { ProcessSection } from '../ProcessSection';

interface Props {
  onBack: () => void;
  onNavigateToContact: () => void;
}

export const ServicesPage: React.FC<Props> = ({
  onBack,
  onNavigateToContact
}) => {

  return (
    <div className="min-h-screen bg-slate-50">

      <HeroSection
        title="NAŠE"
        accentTitle="SLUŽBY"
        subtitle="Komplexný cyklus starostlivosti o ploché strechy. Od diagnostiky až po urgentný zásah v havarijných stavoch."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-32">

        <ProcessSection />

        {/* QUALITY BADGES */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 bg-white p-12 rounded-[3.5rem] shadow-lg border border-slate-100">

          {[
            {
              label: 'Záruka',
              val: '15 ROKOV',
              icon: <ShieldCheck className="w-6 h-6" />
            },
            {
              label: 'Pohotovosť',
              val: '48 HODÍN',
              icon: <Zap className="w-6 h-6" />
            },
            {
              label: 'Skúsenosti',
              val: '12+ ROKOV',
              icon: <CheckCircle2 className="w-6 h-6" />
            },
            {
              label: 'Ochrana',
              val: '100% VODE',
              icon: <Droplets className="w-6 h-6" />
            }
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center space-y-3"
            >
              <div className="text-blue-600">
                {item.icon}
              </div>

              <div className="text-2xl font-black text-slate-900">
                {item.val}
              </div>

              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                {item.label}
              </div>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};
