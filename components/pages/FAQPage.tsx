import React from 'react';
import { HeroSection } from '../HeroSection';
import { FAQ } from '../FAQ';

export const FAQPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection
        title="ČASTÉ"
        accentTitle="OTÁZKY"
        subtitle="Odpovede na to, čo nás zákazníci pýtajú najčastejšie – cena, materiály, dĺžka realizácie aj záruka."
      />

      <FAQ />
    </div>
  );
};
