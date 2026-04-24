import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Award,
  MapPin,
} from 'lucide-react';
import { AppView } from '../types';

interface HeroProps {
  onNavigate: (view: AppView) => void;
}

const galleryImages = [
  'vh1.jpg', 'vh2.jpg', 'vh3.jpg', 'vh4.jpg',
  'nz1.jpg', 'nz2.jpg', 'nz3.jpg', 'nz4.jpg',
  'ns1.jpg', 'ns2.jpg', 'ns3.jpg', 'ns4.jpg',
  'bl1.jpeg', 'bl2.jpeg', 'bl3.jpeg',
  'bdv1.jpeg', 'bdv2.jpg', 'bdv3.jpg',
  'b1.jpg', 'b2.jpg', 'b3.jpg',
  't1.jpg', 't2.jpg', 't3.jpg',
  '1.png'
];

export const Hero: React.FC<HeroProps> = () => {
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [mobileImage, setMobileImage] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    window.addEventListener('resize', checkMobile);

    const shuffled = [...galleryImages].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
    setMobileImage(
      galleryImages[Math.floor(Math.random() * galleryImages.length)]
    );

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative w-full bg-slate-900 text-white py-12 lg:py-20 overflow-x-hidden flex items-center">
      <div className="absolute inset-0">
        <img
          src="1.png"
          alt="background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight">
              Vaša strecha,
              <span className="text-blue-500 block">naša zodpovednosť.</span>
            </h1>

            <p className="mt-6 text-slate-300 text-lg max-w-xl">
              Špecialisti na hydroizoláciu a zateplenie plochých striech.
              Prinášame kvalitu, ktorá vydrží generácie.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() =>
                  document
                    .getElementById('calculator')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="bg-white/10 border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition"
              >
                Vypočítať cenu
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById('calendar')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="bg-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                Bezplatná obhliadka
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              {[
                ['Kvalitné materiály', ShieldCheck],
                ['Skúsený tím', Users],
                ['Záruka 2-15 rokov', Award],
                ['Pôsobíme po SR', MapPin],
              ].map(([text, Icon]: any, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-sm font-semibold text-slate-300">
                    {text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 h-[250px] sm:h-[350px] lg:h-[420px] bg-slate-900">

              {isMobile ? (
                <img
                  src={mobileImage}
                  alt="mobile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <motion.div
                  className="flex h-full gap-4 py-8"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {[...shuffledImages, ...shuffledImages].map((img, i) => (
                    <div key={i} className="w-[280px] h-full flex-shrink-0">
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl text-slate-900 hidden sm:block">
              <div className="text-4xl font-black text-blue-600">12+</div>
              <div className="text-sm font-bold uppercase text-slate-500">
                rokov skúseností
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
