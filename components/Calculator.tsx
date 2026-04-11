
import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, Info } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Calculator: React.FC = () => {
  const [area, setArea] = useState<number>(50);
  const [type, setType] = useState<'water' | 'both'>('water');
  const [condition, setCondition] = useState<'good' | 'bad'>('good');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('calculator_settings').select('*').single();
      if (data) setSettings(data);
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    // Business logic using dynamic settings with fallbacks
    const baseRate = settings?.base_price_per_m2 ?? 45;
    const insulationRate = settings?.insulation_price_per_m2 ?? 18;
    const waterproofingRate = settings?.waterproofing_price_per_m2 ?? 25;
    const premiumMultiplier = settings?.premium_material_multiplier ?? 1.25;
    const discount = settings?.discount_percentage ?? 0;
    const minPrice = settings?.minimum_order_price ?? 1200;

    let rate = baseRate + waterproofingRate;
    if (type === 'both') {
      rate += insulationRate;
    }

    const conditionMultiplier = condition === 'bad' ? premiumMultiplier : 1.0;
    
    let total = area * rate * conditionMultiplier;
    
    // Apply discount if exists in settings
    if (discount > 0) {
      total = total * (1 - discount / 100);
    }

    // Ensure minimum price
    total = Math.max(total, minPrice);

    setPriceRange({
      min: Math.round(total * 0.95),
      max: Math.round(total * 1.15)
    });
  }, [area, type, condition, settings]);

  return (
    <section id="calculator" className="py-12 bg-white w-full max-w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-4">
            <CalcIcon className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Orientačná kalkulačka ceny</h2>
          <p className="text-lg text-slate-600">Získajte rýchly odhad nákladov na vašu strechu za pár sekúnd.</p>
        </div>

        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Input Area */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                  Plocha strechy (m²)
                </label>
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 text-xl font-bold transition-all"
                  min="10"
                />
                <input 
                  type="range" 
                  min="10" 
                  max="500" 
                  value={area} 
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full mt-4 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                  Rozsah prác
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setType('water')}
                    className={`py-4 px-4 rounded-xl font-bold border-2 transition-all ${
                      type === 'water' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    Iba izolácia
                  </button>
                  <button
                    onClick={() => setType('both')}
                    className={`py-4 px-4 rounded-xl font-bold border-2 transition-all ${
                      type === 'both' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    Zateplenie + Izolácia
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                  Stav podkladu
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setCondition('good')}
                    className={`py-4 px-4 rounded-xl font-bold border-2 transition-all ${
                      condition === 'good' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    Udržiavaný
                  </button>
                  <button
                    onClick={() => setCondition('bad')}
                    className={`py-4 px-4 rounded-xl font-bold border-2 transition-all ${
                      condition === 'bad' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    Poškodený
                  </button>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 flex flex-col justify-center text-center shadow-inner">
              <span className="text-slate-500 font-medium mb-2 uppercase tracking-widest text-sm">Odhadovaná investícia</span>
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-6">
                {priceRange.min.toLocaleString('sk-SK')}€ – {priceRange.max.toLocaleString('sk-SK')}€
              </div>
              
              <div className="flex items-start gap-3 text-left p-4 bg-amber-50 rounded-xl mb-8 border border-amber-100">
                <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 leading-relaxed">
                  Tento výpočet je orientačný. Skutočná cena závisí od členitosti strechy, výberu materiálu a aktuálneho stavu.
                </p>
              </div>

              <button 
                onClick={() => document.getElementById('calendar')?.scrollIntoView()}
                className="w-full bg-slate-900 text-white py-5 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg active:scale-95"
              >
                Chcem presnú cenovú ponuku
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
