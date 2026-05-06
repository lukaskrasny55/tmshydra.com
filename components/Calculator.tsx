import React, { useState } from 'react';
import {
  Calculator as CalcIcon,
  Info,
  Home,
  Building2,
  Factory,
  Check,
  Layers,
  Send
} from 'lucide-react';

type BuildingType = 'family' | 'apartment' | 'industrial';
type RoofSystem = 'single' | 'double' | 'triple_pir' | 'mpvc';

export const Calculator: React.FC = () => {
  const [area, setArea] = useState<number>(100);
  const [buildingType, setBuildingType] =
    useState<BuildingType>('family');

  const [selectedSystem, setSelectedSystem] =
    useState<RoofSystem>('single');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const systems = [
    {
      id: 'single',
      label: 'Jednovrstvová skladba strechy',
      description: 'Základné riešenie pre nenáročné objekty'
    },
    {
      id: 'double',
      label: 'Dvojvrstvová skladba strechy',
      description: 'Zvýšená odolnosť a dlhšia životnosť'
    },
    {
      id: 'triple_pir',
      label: 'Trojvrstvová skladba so zateplením PIR 80mm',
      description: 'Prémiové zateplenie a hydroizolácia'
    },
    {
      id: 'mpvc',
      label: 'Jednovrstvová skladba s mPVC fóliou',
      description: 'Moderné riešenie s vysokou flexibilitou'
    }
  ];

  const handleSubmitLead = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: leadForm.name,
          email: leadForm.email,
          message: `
Typ objektu: ${buildingType}
Plocha: ${area} m²
Systém: ${selectedSystem}
Telefón: ${leadForm.phone}
          `
        })
      });

      if (!response.ok) {
        throw new Error('Chyba odoslania');
      }

      setIsSubmitted(true);
    } catch (err) {
      alert('Chyba pri odoslaní formulára.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="calculator"
      className="py-20 bg-slate-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-blue-600 rounded-3xl mb-6">
            <CalcIcon className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase">
            Profesionálna kalkulačka ceny
          </h2>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Získajte nezáväznú cenovú ponuku.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-6">
                Typ objektu
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: 'family',
                    label: 'Rodinný dom',
                    icon: Home
                  },
                  {
                    id: 'apartment',
                    label: 'Bytový dom',
                    icon: Building2
                  },
                  {
                    id: 'industrial',
                    label: 'Priemyselný objekt',
                    icon: Factory
                  }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      setBuildingType(
                        item.id as BuildingType
                      )
                    }
                    className={`flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all ${
                      buildingType === item.id
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-slate-50 border-slate-100'
                    }`}
                  >
                    <item.icon className="w-8 h-8" />
                    <span className="font-bold text-sm uppercase">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-6">
                Veľkosť strechy
              </h3>

              <input
                type="range"
                min="10"
                max="1000"
                value={area}
                onChange={(e) =>
                  setArea(Number(e.target.value))
                }
                className="w-full"
              />

              <div className="text-center mt-6 text-3xl font-black">
                {area} m²
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-6">
                Typ systému
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {systems.map((sys) => (
                  <button
                    key={sys.id}
                    onClick={() =>
                      setSelectedSystem(
                        sys.id as RoofSystem
                      )
                    }
                    className={`p-6 rounded-3xl border-2 text-left ${
                      selectedSystem === sys.id
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-slate-50 border-slate-100'
                    }`}
                  >
                    <div className="flex justify-between mb-3">
                      <Layers className="w-6 h-6" />
                      {selectedSystem === sys.id && (
                        <Check className="w-5 h-5" />
                      )}
                    </div>

                    <div className="font-black text-sm uppercase mb-2">
                      {sys.label}
                    </div>

                    <p className="text-xs">
                      {sys.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white sticky top-24">
              {!isSubmitted ? (
                <>
                  <h3 className="text-center text-blue-400 uppercase font-black tracking-widest mb-8">
                    Cenová ponuka
                  </h3>

                  <form
                    onSubmit={handleSubmitLead}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      placeholder="Meno"
                      required
                      value={leadForm.name}
                      onChange={(e) =>
                        setLeadForm((prev) => ({
                          ...prev,
                          name: e.target.value
                        }))
                      }
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={leadForm.email}
                      onChange={(e) =>
                        setLeadForm((prev) => ({
                          ...prev,
                          email: e.target.value
                        }))
                      }
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                    />

                    <input
                      type="tel"
                      placeholder="Telefón"
                      value={leadForm.phone}
                      onChange={(e) =>
                        setLeadForm((prev) => ({
                          ...prev,
                          phone: e.target.value
                        }))
                      }
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2"
                    >
                      {isSubmitting
                        ? 'Odosielam...'
                        : 'Získať ponuku'}

                      {!isSubmitting && (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>

                  <h4 className="text-xl font-bold mb-2">
                    Požiadavka odoslaná
                  </h4>

                  <p className="text-slate-400 text-sm">
                    Ozveme sa vám čo najskôr.
                  </p>
                </div>
              )}

              <div className="mt-8 flex items-start gap-3 text-left p-4 bg-slate-800 rounded-2xl">
                <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />

                <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                  Presná cena bude určená po obhliadke.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
