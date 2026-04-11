import React from 'react';

interface HeroSectionProps {
  title: string;
  accentTitle?: string;
  subtitle?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title, accentTitle, subtitle }) => {
  return (
    <div className="bg-slate-900 py-12 sm:py-14 text-white mb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 transform translate-x-32"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter mb-4 leading-tight uppercase">
          {title} {accentTitle && <span className="text-blue-500">{accentTitle}</span>}
        </h1>
        {subtitle && (
          <p className="text-slate-400 text-lg max-w-2xl font-medium leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
