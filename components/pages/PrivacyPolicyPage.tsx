import React from 'react';
import { HeroSection } from '../HeroSection';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        title="OCHRANA"
        accentTitle="OSOBNÝCH ÚDAJOV"
        subtitle="Zásady spracovania osobných údajov (GDPR)."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-slate-600 text-lg leading-relaxed">
          Text sa pripravuje – aktualizujeme čoskoro.
        </p>
      </div>
    </div>
  );
};
