
import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, Info, Home, Building2, Factory, Check, Layers, Mail, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { trackConversion } from './GoogleAds';

type BuildingType = 'family' | 'apartment' | 'industrial';
type RoofSystem = 'single' | 'double' | 'triple_pir' | 'mpvc';

export const Calculator: React.FC = () => {
  const [area, setArea] = useState<number>(100);
  const [buildingType, setBuildingType] = useState<BuildingType>('family');
  const [selectedSystem, setSelectedSystem] = useState<RoofSystem>('single');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [results, setResults] = useState({
    pricePerM2: 0,
    systemPrice: 0,
    extrasPrice: 0,
    totalNoVat: 0,
    vat: 0,
    totalWithVat: 0
  });

  const [settings, setSettings] = useState<any>(null);

  const systems = [
    { id: 'single', label: 'Jednovrstvová skladba strechy', price: 22, description: 'Základné riešenie pre nenáročné objekty' },
    { id: 'double', label: 'Dvojvrstvová skladba strechy', price: 33, description: 'Zvýšená odolnosť a dlhšia životnosť' },
    { id: 'triple_pir', label: 'Trojvrstvová skladba so zateplením PIR 80mm', price: 70, description: 'Prémiové zateplenie a hydroizolácia' },
    { id: 'mpvc', label: 'Jednovrstvová skladba s mPVC fóliou', price: 28, description: 'Moderné riešenie s vysokou flexibilitou' },
  ];

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase.from('calculator_settings').select('*').single();
        if (error) throw error;
        if (data) setSettings(data);
      } catch (err) {
        console.error('Error fetching calculator settings:', err);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    // Pricing Logic
    const system = systems.find(s => s.id === selectedSystem);
    let basePricePerM2 = system?.price || 22;

    // Admin overrides if they exist
    if (settings) {
      if (selectedSystem === 'single' && settings.price_single) basePricePerM2 = settings.price_single;
      if (selectedSystem === 'double' && settings.price_double) basePricePerM2 = settings.price_double;
      if (selectedSystem === 'triple_pir' && settings.price_triple_pir) basePricePerM2 = settings.price_triple_pir;
      if (selectedSystem === 'mpvc' && settings.price_mpvc) basePricePerM2 = settings.price_mpvc;
    }

    // Building type modifier
    const modifiers: Record<BuildingType, number> = {
      family: 1.00,
      apartment: 0.95,
      industrial: 0.90
    };
    const modifier = modifiers[buildingType];

    // Area modifier
    let areaModifier = 1.0;
    if (area < 80) areaModifier = 1.10;
    if (area > 250) areaModifier = 0.92;

    const finalPricePerM2 = basePricePerM2 * modifier * areaModifier;
    const systemPrice = area * finalPricePerM2;

    const totalNoVat = systemPrice;
    const vat = totalNoVat * 0.20;
    const totalWithVat = totalNoVat + vat;

    setResults({
      pricePerM2: finalPricePerM2,
      systemPrice,
      extrasPrice: 0,
      totalNoVat,
      vat,
      totalWithVat
    });
  }, [area, buildingType, selectedSystem, settings]);

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.email || !leadForm.name) return;
    
    setIsSubmitting(true);
    try {
      const systemLabel = systems.find(s => s.id === selectedSystem)?.label;
      const bTypeLabel = buildingType === 'family' ? 'Rodinný dom' : buildingType === 'apartment' ? 'Bytový dom' : 'Priemyselný objekt';
      
      const message = `Dopyt z kalkulačky:
Plocha: ${area} m2
Typ objektu: ${bTypeLabel}
Systém: ${systemLabel}
Vypočítaná cena (DPH): ${results.totalWithVat.toLocaleString('sk-SK')} €`;

      const { error } = await supabase.from('leads').insert([{
        name: leadForm.name,
        phone: leadForm.phone,
        email: leadForm.email,
        message: message,
        status: 'new'
      }]);

      if (error) throw error;
      
      trackConversion('form');
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error submitting calculator lead:', err);
      alert('Chyba pri odosielaní. Skúste to prosím neskôr.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="calculator" className="py-20 bg-slate-50 w-full max-w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-blue-600 rounded-3xl mb-6 shadow-lg shadow-blue-600/20">
            <CalcIcon className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter uppercase">
            Profesionálna kalkulačka ceny
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            Získajte presnejší odhad nákladov na váš projekt na základe reálnych trhových cien.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inputs Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Building Type */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">1</span>
                Typ objektu
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'family', label: 'Rodinný dom', icon: Home },
                  { id: 'apartment', label: 'Bytový dom', icon: Building2 },
                  { id: 'industrial', label: 'Priemyselný objekt', icon: Factory },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setBuildingType(item.id as BuildingType)}
                    className={`flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all group ${
                      buildingType === item.id 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' 
                        : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-blue-200'
                    }`}
                  >
                    <item.icon className={`w-8 h-8 ${buildingType === item.id ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'}`} />
                    <span className="font-bold text-sm uppercase tracking-wider">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Area */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">2</span>
                Veľkosť strechy
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="w-full sm:w-1/3">
                  <div className="relative">
                    <input
                      type="number"
                      value={area}
                      onChange={(e) => setArea(Math.max(0, Number(e.target.value)))}
                      className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:ring-0 text-3xl font-black text-slate-900 transition-all outline-none"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">m²</span>
                  </div>
                </div>
                <div className="w-full sm:w-2/3">
                  <input 
                    type="range" 
                    min="10" 
                    max="1000" 
                    step="5"
                    value={area} 
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>10 m²</span>
                    <span>500 m²</span>
                    <span>1000 m²</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: System Type */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">3</span>
                Typ strešného systému
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {systems.map((sys) => (
                  <button
                    key={sys.id}
                    onClick={() => setSelectedSystem(sys.id as RoofSystem)}
                    className={`flex flex-col text-left p-6 rounded-3xl border-2 transition-all relative overflow-hidden group ${
                      selectedSystem === sys.id 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' 
                        : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-blue-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Layers className={`w-6 h-6 ${selectedSystem === sys.id ? 'text-white' : 'text-blue-500'}`} />
                      {selectedSystem === sys.id && <Check className="w-5 h-5 text-white" />}
                    </div>
                    <span className="font-black text-sm uppercase tracking-tight mb-1 leading-tight">{sys.label}</span>
                    <p className={`text-xs leading-relaxed ${selectedSystem === sys.id ? 'text-blue-50' : 'text-slate-500'}`}>
                      {sys.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-10 text-white shadow-2xl sticky top-24 border border-slate-800">
              <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.3em] mb-8 text-center">
                Rekapitulácia ponuky
              </h3>
              
              {!isSubmitted ? (
                <>
                  <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Cena systému</span>
                      <span className="font-black text-blue-400">Na vyžiadanie</span>
                    </div>
                    <div className="h-px bg-slate-800 my-6"></div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Plocha strechy</span>
                      <span className="font-black">{area} m²</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">DPH (20%)</span>
                      <span className="font-black text-blue-400">Vypočítame</span>
                    </div>
                  </div>

                  <div className="bg-blue-600/10 rounded-3xl p-6 border border-blue-500/20 text-center mb-8">
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2 block leading-relaxed">Cena bude zaslaná na váš e-mail</span>
                    <div className="text-2xl font-black text-white tracking-tighter uppercase">
                      Pripravujeme ponuku
                    </div>
                  </div>

                  <form onSubmit={handleSubmitLead} className="space-y-4">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Meno a priezvisko"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Váš e-mail"
                        required
                        value={leadForm.email}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        placeholder="Telefónne číslo"
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 mt-4"
                    >
                      {isSubmitting ? 'Odosielam...' : 'Získať cenu e-mailom'}
                      {!isSubmitting && <Send className="w-4 h-4" />}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Požiadavka odoslaná!</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    Vašu kalkuláciu sme prijali. Presnú cenovú ponuku vám doručíme na e-mail v najbližších hodinách.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-blue-500 font-bold text-xs uppercase tracking-widest hover:text-blue-400 transition-colors"
                  >
                    Vypočítať znova
                  </button>
                </div>
              )}

              <div className="mt-8 flex items-start gap-3 text-left p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-[9px] text-slate-400 leading-relaxed font-bold uppercase tracking-wider">
                  Pre získanie presnej ceny je potrebná bezplatná obhliadka, ktorú si môžete dohodnúť nižšie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
