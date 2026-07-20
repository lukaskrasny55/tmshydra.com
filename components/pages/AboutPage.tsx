import React from 'react';
import { HeroSection } from '../HeroSection';

interface Props {
  onBack: () => void;
}

export const AboutPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white">

      <HeroSection
        title="O"
        accentTitle="NÁS"
        subtitle="Príbeh o odbornosti, rodinnom záväzku a precíznej práci."
      />

      {/* O NÁS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div className="max-w-5xl mb-20">
            <p className="text-sm font-black uppercase tracking-[0.4em] text-blue-600 mb-6">
              O spoločnosti
            </p>

            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase mb-8">
              VITAJTE VO SVETE
              <br />
              <span className="text-blue-600">
                TMS-HYDRA
              </span>
            </h2>

            <p className="text-2xl text-slate-500 font-medium leading-relaxed">
              Príbeh o odbornosti, rodinnom záväzku a precíznej práci,
              ktorá chráni strechy na dlhé roky.
            </p>
          </div>

          {/* CONTENT */}
          <div className="grid lg:grid-cols-2 gap-20 items-start">

            {/* LEFT */}
            <div className="space-y-10">

              <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-200">
                <p className="text-slate-700 text-lg leading-relaxed font-medium">
                  Moje meno je <strong>Tomáš Solnoky</strong> a som zakladateľom spoločnosti TMS-HYDRA.
                  Za každým projektom, každou hydroizoláciou a každým zateplením plochej strechy
                  stojí nielen odbornosť, ale aj hlboký osobný príbeh a záväzok.
                </p>

                <p className="text-slate-700 text-lg leading-relaxed font-medium mt-6">
                  Moja cesta začala pred viac ako desiatimi rokmi v Belgicku.
                  Začínal som priamo na streche — s horákom, hydroizoláciou
                  a tepelnými izoláciami v rukách.
                </p>

                <p className="text-slate-700 text-lg leading-relaxed font-medium mt-6">
                  Belgicko ma naučilo precíznosti, európskym štandardom
                  a tomu, že pri hydroizolácii neexistujú kompromisy.
                  Buď je práca urobená dokonale, alebo nefunguje.
                  Preto v TMS-HYDRA nespájame len vrstvy izolácie —
                  spájame odborné skúsenosti s poctivým prístupom k zákazníkom.
                </p>

                <p className="text-slate-700 text-lg leading-relaxed font-medium mt-6">
                  Už od malička som vedel, že chcem chrániť to najdôležitejšie —
                  domovy, v ktorých žijeme, aj miesta, kde sa cítime bezpečne.
                  Svoje skúsenosti som preto pretavil do práce s plochými strechami:
                  strecha je srdcom každého domu, štítom pred nepriazňou počasia.
                  Zahraničná prax ma naučila techniku, rodina ma naučila zodpovednosti.
                </p>

                <p className="text-slate-700 text-lg leading-relaxed font-medium mt-6">
                  TMS-HYDRA sa hydroizoláciám plochých striech venuje od roku 2015 —
                  riešime strechy, balkóny, terasy, podzemné garáže aj izoláciu
                  základových dosiek, výhradne s certifikovanými materiálmi,
                  a rovnako radi obnovujeme staré strechy k životu.
                </p>
              </div>

              <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl">
                <h3 className="text-3xl font-black uppercase tracking-tight mb-6">
                  Symbolika nášho mena
                </h3>

                <p className="text-blue-50 text-lg leading-relaxed font-medium">
                  Keď som zakladal túto firmu, chcel som, aby niesla odkaz
                  presahujúci bežné podnikanie — aby bola odrazom mojich
                  najväčších hodnôt. Tak sa zrodilo TMS-HYDRA.
                </p>

                <p className="text-blue-50 text-lg leading-relaxed font-medium mt-6">
                  Tie tri písmená — <strong>T.M.S.</strong> — majú pre mňa obrovský význam.
                  Sú to iniciály mojich dvoch synov:
                  <strong> Tomáš a Matias</strong>,
                  a moje priezvisko <strong>Solnoky</strong>.
                </p>

                <p className="text-blue-50 text-lg leading-relaxed font-medium mt-6">
                  Toto logo nie je len značka.
                  Je to symbol budúcnosti a záväzku,
                  ktorý budujem pre svoju rodinu.
                </p>

                <div className="h-px bg-white/20 my-8"></div>

                <p className="text-blue-50 text-lg leading-relaxed font-medium">
                  <strong>HYDRA</strong> symbolizuje silu,
                  odolnosť a ochranu pred vodou — napokon, naša práca
                  je práve o krotení vody. Našou úlohou je vytvárať
                  spoľahlivý ochranný štít, ktorý vydrží dlhé roky.
                </p>

                <p className="text-blue-50 text-lg leading-relaxed font-medium mt-6">
                  Keď si vyberiete TMS-HYDRA, nevyberáte si len dodávateľa —
                  vyberáte si partnera, ktorý k práci pristupuje s rodinnou
                  zodpovednosťou. Rovnako ako chránim svoju rodinu, chceme
                  spoľahlivou a pevnou strechou chrániť aj tú vašu.
                </p>
              </div>

            </div>

            {/* RIGHT */}
            <div className="space-y-10">

              <div className="relative overflow-hidden rounded-[3rem] border border-slate-200 shadow-2xl">
                <img
                  src="/1.png"
                  alt="Tomáš Solnoky - TMS HYDRA"
                  className="w-full h-[500px] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                <div className="absolute bottom-10 left-10 right-10">
                  <p className="text-white text-3xl font-black uppercase tracking-tight leading-tight">
                    Každú strechu realizujeme,
                    akoby bola naša vlastná.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6">
                    <span className="text-white text-2xl font-black">T</span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">
                    Osobný prístup
                  </h3>

                  <p className="text-slate-600 leading-relaxed font-medium">
                    Každý projekt riešim osobne
                    so zodpovednosťou otca a odborníka.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6">
                    <span className="text-white text-2xl font-black">EU</span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">
                    Európska kvalita
                  </h3>

                  <p className="text-slate-600 leading-relaxed font-medium">
                    Skúsenosti z Belgicka pretavené
                    do každého detailu vašej strechy.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
