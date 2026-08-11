import React from 'react';
import { Phone } from 'lucide-react';
import { trackConversion } from './GoogleAds';

const PHONE_NUMBER = '+421911551354';

// Mobile-only floating call button. Most visitors here are on a phone, and a
// roofing customer dealing with an active leak often just wants to call
// rather than fill in a form — the number was previously only reachable via
// the header/footer, which scroll out of view. z-40 keeps it below the
// cookie banner (z-[60]) so the two never fight for the same tap.
export const MobileCallBar: React.FC = () => {
  return (
    <a
      href={`tel:${PHONE_NUMBER}`}
      onClick={() => trackConversion('call')}
      className="md:hidden fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-blue-600 text-white pl-4 pr-5 py-3.5 rounded-full shadow-lg shadow-blue-600/30 font-bold active:bg-blue-700 transition-colors"
      aria-label="Zavolať TMS Hydra"
    >
      <Phone className="w-5 h-5" />
      Zavolať
    </a>
  );
};

export default MobileCallBar;
