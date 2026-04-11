
import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Send, CheckCircle, Copy, Check } from 'lucide-react';
import { trackConversion } from '../GoogleAds';
import { supabase } from '../../lib/supabase';
import { getPageSections } from '../../lib/cms';
import { HeroSection } from '../HeroSection';

interface Props {
  onBack: () => void;
}

export const ContactPage: React.FC<Props> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sections, setSections] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageSections('contact');
      setSections(data);
    };
    fetchContent();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from('leads').insert([formData]);

    if (!error) {
      setSubmitted(true);
      trackConversion('form');
    } else {
      alert('Chyba pri odosielaní správy. Skúste to prosím neskôr.');
    }
  };

  const copyNumber = () => {
    navigator.clipboard.writeText(sections.phone || '+421911551354');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection 
        title={sections.title_main || 'KONTAKTUJTE'} 
        accentTitle={sections.title_accent || 'NÁS'} 
        subtitle={sections.subtitle || 'Sme pripravení vyriešiť váš problém so strechou. Ozvite sa nám telefonicky alebo správou.'} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Info Side (Layout from Image) */}
          <div className="lg:col-span-5 space-y-16">
            
            {/* Adresa */}
            <div className="group">
              <div className="flex items-center gap-6 mb-8">
                <div className="p-5 bg-slate-50 rounded-[1.5rem] group-hover:bg-blue-50 transition-colors border border-slate-100">
                  <MapPin className="w-10 h-10 text-slate-900 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-widest border-b-4 border-blue-500 pb-1">ADRESA</h3>
              </div>
              <div className="text-slate-600 text-2xl font-bold leading-tight pl-24">
                <p>{sections.address_line1 || 'Krížna 79'}</p>
                <p>{sections.address_line2 || 'Palárikovo'}</p>
                <p>{sections.address_line3 || '941 11'}</p>
                <p className="text-blue-600 uppercase text-sm mt-4 tracking-[0.3em]">{sections.country || 'Slovensko'}</p>
              </div>
            </div>

            {/* Kontakty Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors border border-slate-100">
                    <Phone className="w-6 h-6 text-slate-900 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 tracking-widest uppercase border-b-2 border-blue-500 pb-1">TECHNIK</h3>
                </div>
                <div className="pl-16">
                  <a href={`tel:${sections.phone || '+421911551354'}`} className="text-xl font-bold text-slate-700 hover:text-blue-600 transition-colors block mb-2">
                    {sections.phone_display || '+421 911 551 354'}
                  </a>
                  <button 
                    onClick={copyNumber}
                    className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-500 uppercase tracking-wider"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Skopírované' : 'Kopírovať číslo'}
                  </button>
                </div>
              </div>

              <div className="group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors border border-slate-100">
                    <Phone className="w-6 h-6 text-slate-900 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 tracking-widest uppercase border-b-2 border-blue-500 pb-1">KANCELÁRIA</h3>
                </div>
                <div className="pl-16">
                  <a href={`tel:${sections.phone || '+421911551354'}`} className="text-xl font-bold text-slate-700 hover:text-blue-600 transition-colors block">
                    {sections.phone_display || '+421 911 551 354'}
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 p-10 sm:p-16 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -translate-y-16 translate-x-16"></div>
              
              {submitted ? (
                <div className="text-center py-20 animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-blue-500/30">
                    <CheckCircle className="w-14 h-14 text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-white mb-4">MÁME TO!</h3>
                  <p className="text-slate-400 text-lg mb-12">Vaša požiadavka je u nás. Ozveme sa vám hneď, ako to bude možné.</p>
                  <button 
                    onClick={() => setSubmitted(false)} 
                    className="bg-white text-slate-900 px-12 py-5 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all active:scale-95"
                  >
                    NAPÍSAŤ ZNOVA
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10">
                  <div className="mb-12">
                    <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Rýchly dopyt</h3>
                    <p className="text-slate-500 text-lg font-medium">Pripravíme vám ponuku do 24 hodín.</p>
                  </div>

                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Meno a priezvisko</label>
                        <input 
                          required 
                          type="text" 
                          className="w-full bg-slate-800/40 border border-slate-800 focus:border-blue-500 rounded-2xl px-6 py-5 outline-none transition-all text-white placeholder:text-slate-700 font-bold" 
                          placeholder="Tomáš Solnoky" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Telefónne číslo</label>
                        <input 
                          required 
                          type="tel" 
                          className="w-full bg-slate-800/40 border border-slate-800 focus:border-blue-500 rounded-2xl px-6 py-5 outline-none transition-all text-white placeholder:text-slate-700 font-bold" 
                          placeholder="+421 ..." 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Vaša správa</label>
                      <textarea 
                        required 
                        rows={5} 
                        className="w-full bg-slate-800/40 border border-slate-800 focus:border-blue-500 rounded-[2rem] px-6 py-5 outline-none transition-all text-white placeholder:text-slate-700 font-bold resize-none" 
                        placeholder="Napíšte nám viac o vašej streche..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-blue-600/20 active:scale-[0.98]"
                    >
                      <Send className="w-6 h-6" />
                      ODOSLAŤ DOPYT
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
