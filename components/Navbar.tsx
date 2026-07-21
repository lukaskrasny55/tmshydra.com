
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ROUTE_PATHS } from '../routePaths';

interface NavbarProps {
  showCalculator?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ showCalculator = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'O nás', path: ROUTE_PATHS.about },
    { label: 'Naše služby', path: ROUTE_PATHS.services },
    { label: 'Ostatné služby', path: ROUTE_PATHS.otherServices },
    { label: 'Realizácie', path: ROUTE_PATHS.projects },
    { label: 'Technológie', path: ROUTE_PATHS.tech },
    { label: 'Kontakt', path: ROUTE_PATHS.contact },
  ];

  const closeMenu = () => setIsOpen(false);

  const scrollToCalculator = () => {
    if (location.pathname === ROUTE_PATHS.home) {
      document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`${ROUTE_PATHS.home}#calculator`);
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Brand Section */}
          <Link
            to={ROUTE_PATHS.home}
            className="flex items-center cursor-pointer group py-2"
            onClick={closeMenu}
          >
            <img
              src="logo1.png"
              alt="TMS-HYDRA - Hydroizolácie a zatepľovanie plochých striech"
              className="h-[60px] sm:h-[72px] w-auto transition-transform duration-300 group-hover:scale-105 object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[13px] font-bold transition-colors hover:text-blue-600 whitespace-nowrap ${
                  location.pathname === item.path ? 'text-blue-600' : 'text-slate-600'
                }`}
              >
                {item.label}
              </Link>
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

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-blue-600 p-2"
            >
              {isOpen ? <X className="w-10 h-10" /> : <Menu className="w-10 h-10" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-6 animate-in slide-in-from-top duration-300 shadow-xl">
          <div className="flex flex-col space-y-2 px-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`text-xl font-bold py-5 px-6 rounded-2xl text-left transition-colors ${
                  location.pathname === item.path ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
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
