import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  showCalculator?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  showCalculator = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'O nás', view: AppView.ABOUT },
    { label: 'Naše služby', view: AppView.SERVICES },
    { label: 'Realizácie', view: AppView.PROJECTS },
    { label: 'Technológie', view: AppView.TECH },
    { label: 'Kontakt', view: AppView.CONTACT },
  ];

  const handleNav = (view: AppView) => {
    onNavigate(view);
    setIsOpen(false);
  };

  const scrollToCalculator = () => {
    if (currentView !== AppView.HOME) {
      onNavigate(AppView.HOME);

      setTimeout(() => {
        document
          .getElementById('calculator')
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document
        .getElementById('calculator')
        ?.scrollIntoView({ behavior: 'smooth' });
    }

    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* LOGO */}
          <div
            className="flex items-center cursor-pointer group py-2"
            onClick={() => handleNav(AppView.HOME)}
          >
         <img
  src={`${import.meta.env.BASE_URL}logo1.png`}
  alt="TMS-HYDRA"
  className="h-[60px] sm:h-[72px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
/>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNav(item.view)}
                className={`text-[13px] font-bold transition-colors hover:text-blue-600 whitespace-nowrap ${
                  currentView === item.view
                    ? 'text-blue-600'
                    : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}

            {showCalculator && (
              <button
                onClick={scrollToCalculator}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/20 active:scale-95 ml-2 text-[13px] whitespace-nowrap"
              >
                Vypočítať cenu
              </button>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-blue-600 p-2"
            >
              {isOpen ? (
                <X className="w-10 h-10" />
              ) : (
                <Menu className="w-10 h-10" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-6 animate-in slide-in-from-top duration-300 shadow-xl">
          <div className="flex flex-col space-y-2 px-4">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNav(item.view)}
                className={`text-xl font-bold py-5 px-6 rounded-2xl text-left transition-colors ${
                  currentView === item.view
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            {showCalculator && (
              <button
                onClick={scrollToCalculator}
                className="mt-6 bg-blue-600 text-white w-full py-6 rounded-2xl font-black text-lg shadow-xl"
              >
                Vypočítať cenu (Kalkulačka)
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
