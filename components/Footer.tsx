
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { ROUTE_PATHS } from '../routePaths';
import { trackConversion } from './GoogleAds';

const PHONE_NUMBER = '+421911551354';
const PHONE_DISPLAY = '+421 911 551 354';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <Link to={ROUTE_PATHS.home}>
                <img
                  src="logo1.png"
                  alt="TMS-HYDRA"
                  className="h-16 w-auto brightness-0 invert object-contain cursor-pointer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/200x100/FFFFFF/000000?text=TMS+HYDRA';
                  }}
                />
              </Link>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6">
              Sme vaším spoľahlivým partnerom v oblasti hydroizolácie a zatepľovania plochých striech. Kvalita a precíznosť sú u nás na prvom mieste.
            </p>

            <div className="space-y-3 mb-6">
              <a
                href={`tel:${PHONE_NUMBER}`}
                onClick={() => trackConversion('call')}
                className="flex items-center gap-3 text-sm font-bold text-white hover:text-blue-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                {PHONE_DISPLAY}
              </a>
              <a
                href="mailto:info@tmshydra.com"
                className="flex items-center gap-3 text-sm hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                info@tmshydra.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/TMS.hydra.s.o.s"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TMS-HYDRA na Facebooku"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/tms_hydra/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TMS-HYDRA na Instagrame"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Rýchle odkazy</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to={ROUTE_PATHS.about} className="hover:text-blue-400 transition-colors">O nás</Link></li>
              <li><Link to={ROUTE_PATHS.services} className="hover:text-blue-400 transition-colors">Naše služby</Link></li>
              <li><Link to={ROUTE_PATHS.otherServices} className="hover:text-blue-400 transition-colors">Ostatné služby</Link></li>
              <li><Link to={ROUTE_PATHS.projects} className="hover:text-blue-400 transition-colors">Realizácie</Link></li>
              <li><Link to={ROUTE_PATHS.tech} className="hover:text-blue-400 transition-colors">Technológie</Link></li>
              <li><Link to={ROUTE_PATHS.faq} className="hover:text-blue-400 transition-colors">Časté otázky</Link></li>
              <li><Link to={ROUTE_PATHS.sosLanding} className="hover:text-blue-400 transition-colors">Zateká strecha? SOS zásah</Link></li>
              <li><Link to={ROUTE_PATHS.contact} className="hover:text-blue-400 transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Právne informácie</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to={ROUTE_PATHS.privacyPolicy} className="hover:text-blue-400 transition-colors">Ochrana osobných údajov (GDPR)</Link></li>
              <li><Link to={ROUTE_PATHS.terms} className="hover:text-blue-400 transition-colors">Obchodné podmienky</Link></li>
              <li><p className="mt-4 text-slate-400">IČO: 57 086 699<br />DIČ: 2122561485</p></li>
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
