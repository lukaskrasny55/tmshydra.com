import React, { useEffect, useState } from 'react';
import { Users, Target, ShieldCheck, Heart } from 'lucide-react';
import { getPageSections } from '../../lib/cms';
import { HeroSection } from '../HeroSection';

interface Props {
  onBack: () => void;
}

export const AboutPage: React.FC<Props> = ({ onBack }) => {
  const [sections, setSections] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchSections = async () => {
      const data = await getPageSections('about');
      setSections(data);
    };
    fetchSections();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection title={sections.hero_title || 'O nás'} />

      {/* Main Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight uppercase tracking-tighter">
              {sections.subtitle || 'Vitajte vo svete TMS-HYDRA.'}
              <span className="block text-blue-600 text-xl mt-2 normal-case italic font-bold tracking-normal">{sections.tagline || 'Príbeh o odbornosti a rodinnom záväzku.'}</span>
            </h2>
            
            <div className="prose prose-slate lg:prose-lg max-w-none text-slate-600 space-y-6 text-lg leading-relaxed">
              <p>{sections.intro_text || 'Moje meno je Tomáš Solnoky a som zakladateľom tejto spoločnosti. Za každým projektom, každou hydroizoláciou a každým zateplením plochej strechy stojí nielen naša odbornosť, ale aj hlboký osobný príbeh a záväzok. Príbeh o rodine, budúcnosti a tej najvyššej kvalite, ktorú si zaslúžite.'}</p>
              <p>{sections.story_text || 'Moja cesta k profesionálnym strechám začala pred viac ako desiatimi rokmi v Belgicku. Nebola to cesta skratiek – začínal som priamo na streche, s horákom, hydroizoláciou a tepelnými izoláciami v rukách. Belgicko ma naučilo precíznosti, európskym štandardom a tomu, že pri hydroizolácii neexistujú kompromisy – buď je to urobené dokonale, alebo to nefunguje.'}</p>
              <p>{sections.cta_text || 'V TMS-HYDRA nespájame len vrstvy izolácie, spájame odborné skúsenosti s poctivým prístupom k našim zákazníkom. Dovoľte nám postarať sa o vašu strechu s rovnakou precíznosťou, akú vyžadujeme sami od seba.'}</p>
            </div>

            <div className="bg-slate-900 p-8 sm:p-12 rounded-[2.5rem] text-white my-10 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <h3 className="text-2xl font-black text-blue-500 mb-6 uppercase tracking-tight">{sections.symbolism_title || 'Symbolika nášho mena'}</h3>
              <div className="space-y-4 text-slate-300 text-lg leading-relaxed italic">
                <p>
                  {sections.symbolism_text_1 || 'Tie tri písmená – T.M.S. – majú pre mňa obrovský význam. Sú to iniciály mojich dvoch synov: Tomáš a Matias, a moje priezvisko Solnoky. Toto logo nie je len značka, je to symbol nášej budúcnosti a záväzku, ktorý pre nich budujem.'}
                </p>
                <p>
                  {sections.symbolism_text_2 || 'Prečo HYDRA? Pretože naša práca je o krotení vody. HYDRA evokuje silu, odolnosť a schopnosť chrániť pred vlhkosťou, ktorá môže narušiť štruktúru každej budovy. Je to o vytvorení nepriepustného štítu, ktorý vydrží roky.'}
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                {sections.protection_text || 'Pre mňa a moju rodinu je každá strecha, ktorú realizujeme, akoby bola naša vlastná. Viem, aká dôležitá je ochrana, spoľahlivosť a dlhá životnosť. Preto kladieme dôraz na najmodernejšie technológie, najkvalitnejšie materiály a precíznosť v každom detaile.'}
              </p>

              <p className="font-bold text-slate-900 italic">
                {sections.partnership_text || 'Keď si vyberiete TMS-HYDRA, nevyberáte si len dodávateľa. Vyberáte si partnera, ktorý berie svoju prácu osobne, s rodinnou zodpovednosťou and s víziou odolnej a trvácnej budúcnosti. Pretože rovnako ako chránim svoju rodinu, chceme chrániť aj tú vašu.'}
              </p>
            </div>

            {/* Feature Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-200 transition-colors shadow-sm">
                <Users className="w-10 h-10 text-blue-600 mb-6" />
                <h4 className="font-black text-slate-900 uppercase tracking-tight mb-3 italic">{sections.feature_1_title || 'Osobný prístup'}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{sections.feature_1_text || 'Každý projekt riešim osobne so zodpovednosťou otca a odborníka.'}</p>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-200 transition-colors shadow-sm">
                <ShieldCheck className="w-10 h-10 text-blue-600 mb-6" />
                <h4 className="font-black text-slate-900 uppercase tracking-tight mb-3 italic">{sections.feature_2_title || 'Európska kvalita'}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{sections.feature_2_text || 'Skúsenosti z Belgicka pretavené do každého detailu vašej strechy.'}</p>
              </div>
            </div>

            {/* Promise Card - Integrated */}
            <div className="bg-blue-600 p-10 sm:p-14 rounded-[3rem] text-white shadow-2xl relative overflow-hidden mt-16 text-center transform hover:scale-[1.02] transition-transform duration-500">
              <Heart className="absolute -right-8 -bottom-8 w-48 h-48 text-white/10" />
              <div className="relative z-10 space-y-6">
                <h4 className="text-xl font-black uppercase tracking-widest text-blue-100">{sections.promise_title || 'Náš sľub'}</h4>
                <p className="text-2xl sm:text-3xl font-black leading-tight italic">
                  "{sections.promise_text || 'Rovnako ako chránim svoju rodinu, budem chrániť aj tú vašu – pevnými a spoľahlivými strechami.'}"
                </p>
                <div className="pt-4">
                  <div className="inline-block px-6 py-2 bg-slate-900/20 backdrop-blur-sm rounded-full font-bold text-white tracking-widest uppercase text-xs">
                    — {sections.promise_author || 'Tomáš Solnoky'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
