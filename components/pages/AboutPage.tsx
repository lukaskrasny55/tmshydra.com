import React from 'react';
import { ShieldCheck, CheckCircle2, Hammer } from 'lucide-react';
import { HeroSection } from '../HeroSection';

interface Props {
  onBack: () => void;
}

export const AboutPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection
        title="O NÁS"
        accentTitle="TMS HYDRA"
        subtitle="Profesionálne hydroizolácie a zateplenie plochých striech."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="1.png"
              alt="TMS Hydra"
              className="rounded-[3rem] shadow-2xl"
            />
          </div>

          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-8 uppercase">
              Spoľahlivý partner pre ploché strechy
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              TMS HYDRA sa špecializuje na hydroizolácie,
              rekonštrukcie a zateplenie plochých striech.
              Používame moderné technológie a certifikované materiály.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <ShieldCheck className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-black text-xl mb-2">
                    Certifikované systémy
                  </h3>
                  <p className="text-slate-600">
                    Používame iba overené materiály.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-black text-xl mb-2">
                    Záruka kvality
                  </h3>
                  <p className="text-slate-600">
                    Dôraz na detail a precízne prevedenie.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Hammer className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-black text-xl mb-2">
                    Dlhoročné skúsenosti
                  </h3>
                  <p className="text-slate-600">
                    Realizujeme projekty po celom Slovensku.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
