import React, { useState } from 'react';
import {
  Home,
  Building2,
  Factory,
  Layers3,
  Check,
} from 'lucide-react';

export const Calculator: React.FC = () => {
  const [objectType, setObjectType] = useState('house');
  const [area, setArea] = useState(100);
  const [system, setSystem] = useState('single');

  const systems = [
    {
      id: 'single',
      title: 'JEDNOVRSTVOVÁ SKLADBA STRECHY',
      price: 22,
      desc: 'Základné riešenie pre nenáročné objekty',
    },
    {
      id: 'double',
      title: 'DVOJVRSTVOVÁ SKLADBA STRECHY',
      price: 33,
      desc: 'Zvýšená odolnosť a dlhšia životnosť',
    },
    {
      id: 'pir',
      title: 'TROJVRSTVOVÁ SKLADBA SO ZATEPLENÍM PIR 80MM',
      price: 70,
      desc: 'Prémiové zateplenie a hydroizolácia',
    },
    {
      id: 'mpvc',
      title: 'JEDNOVRSTVOVÁ SKLADBA S MPVC FÓLIOU',
      price: 28,
      desc: 'Moderné riešenie s vysokou flexibilitou',
    },
  ];

  const selected = systems.find((s) => s.id === system)!;

  const base = area * selected.price;
  const vat = base * 0.2;
  const total = base + vat;

  const objectBtn =
    'rounded-3xl p-6 border text-center font-black transition-all flex flex-col items-center gap-3 min-h-[120px] justify-center';

  return (
    <section id="calculator" className="py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.7fr_0.8fr] gap-8">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            {/* STEP 1 */}
            <div className="bg-white rounded-[2rem] shadow-xl p-8">
              <div className="text-xs font-black tracking-[0.25em] text-blue-600 mb-6 uppercase">
                1 Typ objektu
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={() => setObjectType('house')}
                  className={`${objectBtn} ${
                    objectType === 'house'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <Home className="w-8 h-8" />
                  RODINNÝ DOM
                </button>

                <button
                  onClick={() => setObjectType('flat')}
                  className={`${objectBtn} ${
                    objectType === 'flat'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <Building2 className="w-8 h-8" />
                  BYTOVÝ DOM
                </button>

                <button
                  onClick={() => setObjectType('industry')}
                  className={`${objectBtn} ${
                    objectType === 'industry'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <Factory className="w-8 h-8" />
                  PRIEMYSELNÝ OBJEKT
                </button>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="bg-white rounded-[2rem] shadow-xl p-8">
              <div className="text-xs font-black tracking-[0.25em] text-blue-600 mb-6 uppercase">
                2 Veľkosť strechy
              </div>

              <div className="grid md:grid-cols-[180px_1fr] gap-8 items-center">
                <div className="bg-slate-50 rounded-2xl px-6 py-6 text-center">
                  <div className="text-5xl font-black text-slate-900 leading-none">
                    {area}
                  </div>
                  <div className="text-slate-400 font-bold mt-2">m²</div>
                </div>

                <div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />

                  <div className="flex justify-between text-xs font-bold text-slate-400 mt-2">
                    <span>10 m²</span>
                    <span>500 m²</span>
                    <span>1000 m²</span>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="bg-white rounded-[2rem] shadow-xl p-8">
              <div className="text-xs font-black tracking-[0.25em] text-blue-600 mb-6 uppercase">
                3 Typ strešného systému
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {systems.map((item) => {
                  const active = system === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setSystem(item.id)}
                      className={`rounded-3xl p-6 text-left border transition-all relative ${
                        active
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xl'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      {active && (
                        <div className="absolute top-4 right-4">
                          <Check className="w-5 h-5" />
                        </div>
                      )}

                      <Layers3 className="w-6 h-6 mb-4" />

                      <div className="font-black text-sm leading-tight">
                        {item.title}
                      </div>

                      <div className="mt-2 text-sm font-bold opacity-90">
                        {item.price} €/m²
                      </div>

                      <div className="mt-4 text-sm opacity-80">
                        {item.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div className="sticky top-28 bg-[#07142f] text-white rounded-[2rem] p-8 shadow-2xl">
              <div className="text-xs tracking-[0.3em] uppercase font-black text-blue-400 mb-8">
                Rekapitulácia ponuky
              </div>

              <div className="space-y-5 text-sm font-bold">
                <div className="flex justify-between">
                  <span className="text-white/70">Cena za m²</span>
                  <span>{selected.price.toFixed(2)} €</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/70">Cena systému</span>
                  <span>{base.toLocaleString()} €</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/70">Doplnky</span>
                  <span>0 €</span>
                </div>

                <div className="border-t border-white/10 pt-5 flex justify-between">
                  <span className="text-white/70">Cena bez DPH</span>
                  <span>{base.toLocaleString()} €</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/70">DPH (20%)</span>
                  <span>{vat.toLocaleString()} €</span>
                </div>
              </div>

              <div className="mt-8 bg-[#0d2454] border border-blue-500/20 rounded-3xl p-8 text-center">
                <div className="text-xs uppercase tracking-[0.25em] text-blue-300 font-black">
                  Celková investícia s DPH
                </div>

                <div className="text-5xl font-black mt-4">
                  {total.toLocaleString()} €
                </div>
              </div>

              <div className="mt-8 bg-white/5 rounded-2xl p-5 text-xs text-white/70 leading-relaxed">
                Tento výpočet je orientačný. Presná cenová ponuka bude
                určená po bezplatnej obhliadke strechy.
              </div>

              <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 transition-all rounded-2xl py-5 font-black text-lg shadow-xl">
                POŽIADAŤ O OBHLIADKU
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
