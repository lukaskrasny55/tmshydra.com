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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 leading-tight">
              {sections.subtitle || 'Vitajte vo svete TMS-HYDRA.'}
              <span className="block text-blue-600 text-xl mt-2">{sections.tagline || 'Príbeh o odbornosti a rodinnom záväzku.'}</span>
            </h2>
            
            <div className="prose prose-slate lg:prose-lg max-w-none text-slate-600 space-y-6">
              <p>{sections.intro_text || 'Moje meno je Tomáš Solnoky a som zakladateľom tejto spoločnosti. Za každým projektom, každou hydroizoláciou a každým zateplením plochej strechy stojí nielen naša odbornosť, ale aj hlboký osobný príbeh a záväzok. Príbeh o rodine, budúcnosti a tej najvyššej kvalite, ktorú si zaslúžite.'}</p>
              <p>{sections.story_text || 'Moja cesta k profesionálnym strechám začala pred viac ako desiatimi rokmi v Belgicku. Nebola to cesta skratiek – začínal som priamo na streche, s horákom, hydroizoláciou a tepelnými izoláciami v rukách. Belgicko ma naučilo precíznosti, európskym štandardom a tomu, že pri hydroizolácii neexistujú kompromisy – buď je to urobené dokonale, alebo to nefunguje.'}</p>
              <p>{sections.cta_text || 'V TMS-HYDRA nespájame len vrstvy izolácie, spájame odborné skúsenosti s poctivým prístupom k našim zákazníkom. Dovoľte nám postarať sa o vašu strechu s rovnakou precíznosťou, akú vyžadujeme sami od seba.'}</p>
            </div>

            <div className="bg-blue-50 p-8 rounded-3xl border-l-4 border-blue-600 my-10">
              <h3 className="text-xl font-bold text-slate-900 mb-4">{sections.symbolism_title || 'Symbolika nášho mena'}</h3>
              <p className="mb-4">
                {sections.symbolism_text_1 || 'Tie tri písmená – T.M.S. – majú pre mňa obrovský význam. Sú to iniciály mojich dvoch synov: Tomáš a Matias, a moje priezvisko Solnoky. Toto logo nie je len značka, je to symbol nášej budúcnosti a záväzku, ktorý pre nich budujem.'}
              </p>
              <p>
                {sections.symbolism_text_2 || 'Prečo HYDRA? Pretože naša práca je o krotení vody. HYDRA evokuje silu, odolnosť a schopnosť chrániť pred vlhkosťou, ktorá môže narušiť štruktúru každej budovy. Je to o vytvorení nepriepustného štítu, ktorý vydrží roky.'}
              </p>
            </div>

            <p className="text-slate-600">
              {sections.protection_text || 'Pre mňa a moju rodinu je každá strecha, ktorú realizujeme, akoby bola naša vlastná. Viem, aká dôležitá je ochrana, spoľahlivosť a dlhá životnosť. Preto kladieme dôraz na najmodernejšie technológie, najkvalitnejšie materiály a precíznosť v každom detaile.'}
            </p>

            <p className="font-medium text-slate-900">
              {sections.partnership_text || 'Keď si vyberiete TMS-HYDRA, nevyberáte si len dodávateľa. Vyberáte si partnera, ktorý berie svoju prácu osobne, s rodinnou zodpovednosťou and s víziou odolnej a trvácnej budúcnosti. Pretože rovnako ako chránim svoju rodinu, chceme chrániť aj tú vašu.'}
            </p>

            {/* Feature Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <Users className="w-8 h-8 text-blue-600 mb-4" />
                <h4 className="font-bold mb-2">{sections.feature_1_title || 'Osobný prístup'}</h4>
                <p className="text-slate-600 text-sm">{sections.feature_1_text || 'Každý projekt riešim osobne so zodpovednosťou otca a odborníka.'}</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <ShieldCheck className="w-8 h-8 text-blue-600 mb-4" />
                <h4 className="font-bold mb-2">{sections.feature_2_title || 'Európska kvalita'}</h4>
                <p className="text-slate-600 text-sm">{sections.feature_2_text || 'Skúsenosti z Belgicka pretavené do každého detailu vašej strechy.'}</p>
              </div>
            </div>
          </div>
          
          {/* Visual Side */}
          <div className="sticky top-28 space-y-8">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] lg:aspect-auto">
              <img 
                src={sections.founder_image || "https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&q=80&w=800"} 
                alt={sections.founder_name || "Tomáš Solnoky - Zakladateľ TMS-HYDRA"} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
              <Heart className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5" />
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-2">{sections.promise_title || 'Náš sľub'}</h4>
                <p className="text-slate-400 text-sm leading-relaxed italic">
                  "{sections.promise_text || 'Rovnako ako chránim svoju rodinu, budem chrániť aj tú vašu – pevnými a spoľahlivými strechami.'}"
                </p>
                <div className="mt-4 font-bold text-blue-400">— {sections.promise_author || 'Tomáš Solnoky'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
