import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '../routePaths';
import { getStoredConsent, setStoredConsent, COOKIE_SETTINGS_EVENT, type ConsentValue } from '../consent';

export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStoredConsent() === null);

    // Lets a visitor re-open the banner (footer link "Nastavenia cookies")
    // to change or withdraw their choice at any time.
    const open = () => setVisible(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, open);
  }, []);

  const handleChoice = (value: ConsentValue) => {
    setStoredConsent(value);
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] bg-slate-900 text-slate-300 border-t border-slate-800 px-4 py-5 sm:py-4 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <p className="text-sm leading-relaxed flex-grow text-center sm:text-left">
          Používame cookies na analytické a marketingové účely len s vaším súhlasom. Súhlas môžete kedykoľvek zmeniť alebo odvolať cez odkaz „Nastavenia cookies“ v pätičke. Viac informácií nájdete v{' '}
          <Link
            to={ROUTE_PATHS.privacyPolicy}
            className="text-blue-400 hover:text-blue-300 underline"
          >
            ochrane osobných údajov
          </Link>
          .
        </p>

        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => handleChoice('rejected')}
            className="px-5 py-2.5 rounded-xl font-bold text-sm border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            Odmietnuť
          </button>
          <button
            onClick={() => handleChoice('accepted')}
            className="px-5 py-2.5 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Súhlasím
          </button>
        </div>
      </div>
    </div>
  );
};
