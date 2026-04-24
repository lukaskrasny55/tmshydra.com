
import React from 'react';
import { Search, ClipboardList, HardHat, Wrench, PhoneCall, Zap } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const materials = [
    'Asfaltové pásy', 'TPO fólie', 'PVC fólie', 'EPDM-Firestone', 
    'Resitrix', 'Alutrix', 'PUR/PIR dosky', 'Svetlíky'
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-4">
            Ako <span className="text-blue-600">pracujeme</span>
          </h2>
          <div className="w-16 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Päť krokov k vašej chránenej streche</p>
        </div>

        {/* Process Flow */}
        <div className="space-y-8">
          {[
            {
              num: '01',
              title: 'Obhliadka a posúdenie',
              desc: 'Dôkladne skontrolujeme stav strechy a identifikujeme prípadné problémy.',
              icon: Search,
            },
            {
              num: '02',
              title: 'Návrh riešenia',
              desc: 'Navrhneme najefektívnejšie riešenie na mieru, vrátane výberu vhodných materiálov a technológií.',
              icon: ClipboardList,
              showMaterials: true
            },
            {
              num: '03',
              title: 'Realizácia',
              desc: 'Precízne realizujeme práce s dôrazom na kvalitu, detaily a dodržanie dohodnutých termínov.',
              icon: HardHat,
            },
          ].map((step, idx) => (
            <div 
              key={step.num} 
              className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 group ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-shrink-0 relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-900 flex items-center justify-center relative group-hover:-translate-y-1 transition-transform duration-500 shadow-xl" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                   <div className="absolute inset-[1.5px] bg-slate-900 flex items-center justify-center p-5" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                     <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
                   </div>
                   <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-full left-1/2 w-px h-8 bg-gradient-to-b from-blue-500/50 to-transparent z-0"></div>
                )}
              </div>

              <div className={`flex-grow bg-slate-50/50 p-6 sm:p-10 rounded-[2rem] shadow-sm hover:shadow-md border border-slate-100 hover:border-blue-100 transition-all text-center md:text-left relative overflow-hidden ${idx % 2 === 1 ? 'md:text-right' : ''}`}>
                <div className={`absolute top-2 ${idx % 2 === 1 ? 'left-6' : 'right-6'} text-6xl font-black text-slate-200 opacity-20 transition-opacity group-hover:opacity-30`}>{step.num}</div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 tracking-tighter uppercase">{step.title}</h3>
                <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl font-medium italic">
                  {step.desc}
                </p>
                {step.showMaterials && (
                  <div className={`flex flex-wrap gap-1.5 mt-6 ${idx % 2 === 1 ? 'justify-end' : 'justify-start'}`}>
                    {materials.map((m, i) => (
                      <span key={i} className="px-2.5 py-0.5 bg-white text-slate-400 text-[9px] font-bold rounded-full border border-slate-100 uppercase tracking-widest">
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Support Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 items-stretch">
          <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white flex flex-col justify-center hover:shadow-xl transition-all duration-500 relative overflow-hidden group border border-slate-800">
            <div className="absolute top-8 right-10 text-7xl font-black text-white/5 opacity-40 group-hover:opacity-60 transition-opacity">04</div>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 bg-blue-600/10 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                   <Wrench className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-black tracking-tighter uppercase italic">Servis a údržba</h3>
            </div>
            <p className="text-slate-400 leading-relaxed text-lg mb-0 italic">
              Ponúkame doplnkové služby pravidelných prehliadok, čistenia a údržby strechy, aby bola dlhodobo spoľahlivá.
            </p>
          </div>

          <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-lg flex flex-col justify-between border border-blue-500/50">
            <div className="absolute top-8 right-10 text-7xl font-black text-white/10 group-hover:opacity-20 transition-opacity">05</div>
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-20 h-20 bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                  <PhoneCall className="w-10 h-10 text-white" />
                </div>
                <div className="flex items-center gap-3 bg-black/10 px-3 py-1 rounded-full border border-white/10">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-[9px] font-black tracking-widest uppercase">SOS 24/7</span>
                </div>
              </div>
              <h3 className="text-3xl font-black mb-6 tracking-tighter uppercase italic text-white drop-shadow-md">SOS - TMS</h3>
              <p className="text-blue-50 text-xl leading-relaxed mb-8 italic font-medium">
                Urgentné zabezpečenie plochej strechy do 48 hodín zásahovým tímom.
              </p>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-sm text-white py-4 rounded-2xl font-black text-center text-sm flex items-center justify-center gap-2 border border-white/5">
               TMS EMERGENCY TEAM <Zap className="w-4 h-4 text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
