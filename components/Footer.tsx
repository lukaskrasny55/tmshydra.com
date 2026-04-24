
import React from 'react';
import { AppView } from '../types';

interface FooterProps {
  onNavigate?: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (view: AppView) => {
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="logo1.png" 
                alt="TMS-HYDRA" 
                className="h-16 w-auto brightness-0 invert object-contain cursor-pointer" 
                onClick={() => handleNav(AppView.HOME)}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/200x100/FFFFFF/000000?text=TMS+HYDRA';
                }}
              />
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Sme vaším spoľahlivým partnerom v oblasti hydroizolácie a zatepľovania plochých striech. Kvalita a precíznosť sú u nás na prvom mieste.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Rýchle odkazy</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => handleNav(AppView.ABOUT)} className="hover:text-blue-400 transition-colors">O nás</button></li>
              <li><button onClick={() => handleNav(AppView.SERVICES)} className="hover:text-blue-400 transition-colors">Naše služby</button></li>
              <li><button onClick={() => handleNav(AppView.OTHER_SERVICES)} className="hover:text-blue-400 transition-colors">Ostatné služby</button></li>
              <li><button onClick={() => handleNav(AppView.PROJECTS)} className="hover:text-blue-400 transition-colors">Realizácie</button></li>
              <li><button onClick={() => handleNav(AppView.TECH)} className="hover:text-blue-400 transition-colors">Technológie</button></li>
              <li><button onClick={() => handleNav(AppView.CONTACT)} className="hover:text-blue-400 transition-colors">Kontakt</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Právne informácie</h4>
            <ul className="space-y-4 text-sm">
              <li><button className="hover:text-blue-400 transition-colors">Ochrana osobných údajov (GDPR)</button></li>
              <li><button className="hover:text-blue-400 transition-colors">Obchodné podmienky</button></li>
              <li><p className="mt-4 text-slate-500">IČO: 12345678<br />DIČ: 2021234567</p></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs">
          <p>© {new Date().getFullYear()} TMS-HYDRA. Všetky práva vyhradené.</p>
          <p className="mt-2 sm:mt-0 italic">S láskou k remeslu a detailom.</p>
        </div>
      </div>
    </footer>
  );
};
