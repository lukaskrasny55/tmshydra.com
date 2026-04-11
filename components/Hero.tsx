import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { AppView } from '../types';
import { supabase } from '../lib/supabase';
import { getPageSections } from '../lib/cms';

interface HeroProps {
  onNavigate: (view: AppView) => void;
}

const galleryImages = [
  "vh1.jpg", "vh2.jpg", "vh3.jpg", "vh4.jpg",
  "nz1.jpg", "nz2.jpg", "nz3.jpg", "nz4.jpg",
  "ns1.jpg", "ns2.jpg", "ns3.jpg", "ns4.jpg",
  "bl1.jpeg", "bl2.jpeg", "bl3.jpeg",
  "bdv1.jpeg", "bdv2.jpg", "bdv3.jpg",
  "b1.jpg", "b2.jpg", "b3.jpg",
  "t1.jpg", "t2.jpg", "t3.jpg",
  "1.png"
];

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [sections, setSections] = useState<Record<string, string>>({});
  const [showCalculator, setShowCalculator] = useState(true);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [mobileImage, setMobileImage] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Shuffle images on mount
    const shuffled = [...galleryImages].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
    setMobileImage(galleryImages[Math.floor(Math.random() * galleryImages.length)]);

    const fetchContent = async () => {
      const data = await getPageSections('home');
      setSections(data);
    };

    const fetchSettings = async () => {
      const { data } = await supabase.from('settings').select('show_calculator').single();
      if (data && typeof data.show_calculator === 'boolean') {
        setShowCalculator(data.show_calculator);
      }
    };

    fetchContent();
    fetchSettings();
  }, []);

  const heroTitle = sections.hero_title || 'Vaša strecha, naša zodpovednosť.';
  const highlightText = sections.hero_highlight_text || 'zodpovednosť';

  return (
    <section className="relative w-full max-w-full bg-slate-900 text-white py-12 lg:py-20 overflow-x-hidden min-h-[50vh] md:min-h-[60vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={sections.hero_background_image || 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&q=80&w=1920'} 
          className="w-full h-full object-cover opacity-30"
          alt="Hero Background"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600 opacity-10 skew-x-12 transform translate-x-20 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="mb-12 lg:mb-0 flex flex-col gap-4 max-w-full">
            <h1 className="text-[clamp(2rem,8vw,3rem)] md:text-4xl lg:text-5xl font-black leading-[0.9] tracking-tighter uppercase max-w-full break-words">
              {heroTitle.split(highlightText).map((part: string, i: number, arr: any[]) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="text-blue-500">{highlightText}</span>}
                </React.Fragment>
              ))}
            </h1>
            <p className="text-base sm:text-xl text-slate-300 max-w-full sm:max-w-lg leading-relaxed font-medium">
              {sections.hero_description || 'Špecialisti na hydroizoláciu a zateplenie plochých striech. Prinášame kvalitu, ktorá vydrží generácie.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6 w-full">
              {showCalculator && (
                <button 
                  onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all text-center"
                >
                  {sections.hero_button_secondary_text || 'Vypočítať cenu'}
                </button>
              )}
              <button 
                onClick={() => document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-blue-600/20"
              >
                {sections.hero_button_primary_text || 'Bezplatná obhliadka'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(sections.hero_features ? JSON.parse(sections.hero_features) : [
                'Kvalitné materiály (TPO, PVC)',
                'Záruka až 15 rokov',
                'Certifikovaný tím odborníkov',
                'Osobný prístup and poradenstvo'
              ]).map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-slate-300 text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative max-w-full">
              <div className="rounded-3xl overflow-x-auto md:overflow-hidden scroll-smooth pb-4 shadow-2xl border-4 border-slate-800 h-[220px] sm:h-[300px] lg:h-[400px] relative bg-slate-900 flex-nowrap">
                {/* Film strip holes top */}
                <div className="absolute top-0 left-0 right-0 h-8 flex justify-around items-center z-20 pointer-events-none opacity-50">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-slate-900 rounded-sm"></div>
                  ))}
                </div>
                
                {isMobile ? (
                  <div className="h-full w-full py-10 px-4">
                    <img 
                      src={mobileImage} 
                      alt="Gallery Mobile"
                      className="h-full w-full object-cover rounded-lg shadow-lg"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <motion.div 
                    className="flex h-full py-10 gap-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ 
                      duration: 40, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  >
                    {shuffledImages.length > 0 && [...shuffledImages, ...shuffledImages].map((img, i) => (
                      <div key={i} className="h-full flex-shrink-0 w-[280px]">
                        <img 
                          src={img} 
                          alt={`Gallery ${i}`}
                          className="h-full w-full object-cover rounded-lg shadow-lg sm:min-w-[300px]"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Film strip holes bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-8 flex justify-around items-center z-20 pointer-events-none opacity-50">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-slate-900 rounded-sm"></div>
                  ))}
                </div>
                
                {/* Overlay to give it a "film" look */}
                <div className="absolute inset-0 pointer-events-none border-[12px] border-slate-900/20 rounded-[inherit]"></div>
              </div>
            {/* Trust badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl text-slate-900 hidden sm:block z-20">
              <div className="text-4xl font-bold text-blue-600">{sections.hero_trust_number || '12+'}</div>
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">{sections.hero_trust_text || 'Rokov skúseností'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};