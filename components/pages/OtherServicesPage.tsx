
import React from 'react';
import { HeroSection } from '../HeroSection';
import { Droplets, Wind, Sun, Zap, Leaf, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onBack: () => void;
  onNavigateToContact: () => void;
}

export const OtherServicesPage: React.FC<Props> = ({ onBack, onNavigateToContact }) => {
  const otherServices = [
    {
      title: 'Zvodové systémy',
      subtitle: 'pre odvodnenie vody',
      icon: Droplets,
      desc: 'Kompletná montáž a servis odkvapových systémov pre efektívny odvod dažďovej vody z vašej strechy.'
    },
    {
      title: 'Odvetranie strechy',
      subtitle: 'optimálna klíma',
      icon: Wind,
      desc: 'Inštalácia ventilačných prvkov pre zabezpečenie cirkulácie vzduchu a prevenciu vlhkosti v strešnom plášti.'
    },
    {
      title: 'Montáž svetlíkov',
      subtitle: 'prirodzené svetlo',
      icon: Sun,
      desc: 'Osadenie strešných svetlíkov pre presvetlenie interiéru prirodzeným denným svetlom a zabezpečenie vetrania.'
    },
    {
      title: 'Bleskozvody',
      subtitle: 'montáž a revízie',
      icon: Zap,
      desc: 'Profesionálna inštalácia systémov ochrany pred bleskom vrátane certifikovaných revíznych správ.'
    },
    {
      title: 'Zelené strechy',
      subtitle: 'ekologické riešenia',
      icon: Leaf,
      desc: 'Návrh a realizácia vegetačných striech, ktoré zlepšujú tepelnú izoláciu a zvyšujú estetickú hodnotu objektu.'
    },
    {
      title: 'Skúšky tesnosti',
      subtitle: 'hydroizolácií',
      icon: ShieldAlert,
      desc: 'Diagnostika a overovanie nepriepustnosti hydroizolačných vrstiev pomocou moderných testovacích metód.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection 
        title="OSTATNÉ" 
        accentTitle="SLUŽBY" 
        subtitle="Doplnkové riešenia pre vašu strechu. Od odvodnenia a svetlíkov až po moderné zelené strechy a revízie bleskozvodov." 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-24">
        {/* Intro Card */}
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white mb-16 shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-blue-600/20 transition-colors"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/20">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-4 italic">
                Ponúkame aj <span className="text-blue-500">ostatné služby</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-3xl italic">
                Okrem hlavných hydroizolačných prác zabezpečujeme široké spektrum doplnkových služieb, ktoré sú nevyhnutné pre správne fungovanie a dlhú životnosť vašej strechy.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherServices.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl border border-slate-100 hover:border-blue-100 transition-all group"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-500">
                <service.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-1">{service.title}</h3>
              <div className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">{service.subtitle}</div>
              <p className="text-slate-500 text-sm leading-relaxed italic mb-8">
                {service.desc}
              </p>
              <button 
                onClick={onNavigateToContact}
                className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-widest hover:text-blue-600 transition-colors group/btn"
              >
                Mám záujem
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="bg-white inline-block p-12 rounded-[4rem] shadow-2xl border border-slate-100 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tighter uppercase italic">
              Potrebujete <span className="text-blue-600">špecifické riešenie?</span>
            </h2>
            <p className="text-slate-500 text-lg mb-10 max-w-2xl mx-auto italic">
              Ak ste nenašli službu, ktorú hľadáte, neváhajte nás kontaktovať. Radi si vypočujeme vaše požiadavky a navrhneme individuálne riešenie pre vašu stavbu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onNavigateToContact}
                className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]"
              >
                KONTAKTOVAŤ NÁS
              </button>
              <button 
                onClick={onBack}
                className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-slate-800 transition-all active:scale-[0.98]"
              >
                SPÄŤ NA HLAVNÚ STRÁNKU
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
