import React, { useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';

export const Calculator: React.FC = () => {
  const [area, setArea] = useState(100);
  const [type, setType] = useState('single');

  const prices = {
    single: 22,
    double: 33,
    pir: 70,
    mpvc: 28,
  };

  const total = area * prices[type as keyof typeof prices];

  return (
    <section id="calculator" className="py-20 bg-slate-100">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        <div className="flex items-center gap-3 mb-8">
          <CalcIcon className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-black">Kalkulačka ceny strechy</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <div>
            <label className="font-bold block mb-2">Rozloha (m²)</label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="font-bold block mb-2">Typ strechy</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="single">Jednovrstvová</option>
              <option value="double">Dvojvrstvová</option>
              <option value="pir">Trojvrstvová PIR</option>
              <option value="mpvc">mPVC fólia</option>
            </select>
          </div>

        </div>

        <div className="mt-10 bg-blue-600 text-white rounded-2xl p-8 text-center">
          <div className="text-lg font-bold">Orientačná cena</div>
          <div className="text-5xl font-black mt-2">
            {total.toLocaleString()} €
          </div>
        </div>
      </div>
    </section>
  );
};
