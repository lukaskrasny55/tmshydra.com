import React from 'react';
import { HeroSection } from '../HeroSection';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        title="OBCHODNÉ"
        accentTitle="PODMIENKY"
        subtitle="Všeobecné obchodné podmienky spoločnosti TMS HYDRA."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-slate-600 text-lg leading-relaxed">
          Text sa pripravuje – aktualizujeme čoskoro.
        </p>
      </div>
    </div>
  );
};
