import React from 'react';
import { HeroSection } from '../HeroSection';

const Section: React.FC<{ heading: string; children: React.ReactNode }> = ({ heading, children }) => (
  <div className="bg-slate-50 rounded-3xl border border-slate-100 p-8 sm:p-10">
    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">
      {heading}
    </h2>
    <div className="text-slate-600 text-lg leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        title="OCHRANA"
        accentTitle="OSOBNÝCH ÚDAJOV"
        subtitle="Zásady spracovania osobných údajov (GDPR)."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-12">
          Posledná aktualizácia: júl 2026
        </p>

        <div className="space-y-8">
          <Section heading="1. Prevádzkovateľ">
            <p>Prevádzkovateľom osobných údajov je:</p>
            <p>
              TMSHYDRA s.r.o.
              <br />
              Krížna 79
              <br />
              941 11 Palárikovo
              <br />
              Slovensko
              <br />
              IČO: 57 086 699
              <br />
              DIČ: 2122561485
              <br />
              E-mail:{' '}
              <a href="mailto:info@tmshydra.com" className="text-blue-600 hover:underline">
                info@tmshydra.com
              </a>
              <br />
              Telefón:{' '}
              <a href="tel:+421911551354" className="text-blue-600 hover:underline">
                +421 911 551 354
              </a>
            </p>
          </Section>

          <Section heading="2. Aké údaje spracúvame">
            <p>Prostredníctvom webovej stránky môžeme spracúvať:</p>
            <ul className="list-disc marker:text-blue-600 pl-5 space-y-2">
              <li>meno a priezvisko,</li>
              <li>e-mailovú adresu,</li>
              <li>telefónne číslo,</li>
              <li>obsah správy odoslanej cez kontaktný alebo rezervačný formulár,</li>
              <li>technické údaje o návšteve webu (IP adresa, typ zariadenia, prehliadač, cookies).</li>
            </ul>
          </Section>

          <Section heading="3. Účel spracúvania">
            <p>Osobné údaje spracúvame za účelom:</p>
            <ul className="list-disc marker:text-blue-600 pl-5 space-y-2">
              <li>vybavenia dopytov a komunikácie,</li>
              <li>vypracovania cenových ponúk,</li>
              <li>plnenia zmluvných povinností,</li>
              <li>zlepšovania fungovania webovej stránky,</li>
              <li>marketingových aktivít na základe súhlasu používateľa.</li>
            </ul>
          </Section>

          <Section heading="4. Právny základ">
            <p>Spracúvanie prebieha podľa čl. 6 ods. 1 GDPR na základe:</p>
            <ul className="list-disc marker:text-blue-600 pl-5 space-y-2">
              <li>súhlasu dotknutej osoby,</li>
              <li>plnenia zmluvy,</li>
              <li>zákonných povinností,</li>
              <li>oprávneného záujmu prevádzkovateľa.</li>
            </ul>
          </Section>

          <Section heading="5. Cookies">
            <p>
              Web používa nevyhnutné cookies na správne fungovanie stránky. Po udelení súhlasu
              môžu byť používané analytické a marketingové cookies (napr. Google Analytics a
              Google Ads) na meranie návštevnosti a efektivity reklamy. Podrobnosti nájdete v
              našich Zásadách používania súborov cookie.
            </p>
          </Section>

          <Section heading="6. Google služby">
            <p>Ak používateľ udelí súhlas, web môže využívať:</p>
            <ul className="list-disc marker:text-blue-600 pl-5 space-y-2">
              <li>Google Analytics 4,</li>
              <li>Google Ads Conversion Tracking.</li>
            </ul>
            <p>
              Tieto služby môžu spracúvať technické údaje podľa podmienok spoločnosti Google.
              Niektoré z týchto služieb môžu prenášať údaje mimo Európskeho hospodárskeho
              priestoru; spoločnosť Google v takom prípade postupuje na základe štandardných
              zmluvných doložiek schválených Európskou komisiou.
            </p>
          </Section>

          <Section heading="7. Doba uchovávania">
            <p>
              Údaje z kontaktného a rezervačného formulára uchovávame najdlhšie 12 mesiacov od
              poslednej komunikácie, pokiaľ právne predpisy nevyžadujú dlhšiu dobu. Marketingové
              údaje spracúvame do odvolania súhlasu.
            </p>
          </Section>

          <Section heading="8. Príjemcovia údajov">
            <p>
              Osobné údaje môžu byť sprístupnené poskytovateľovi hostingu, poskytovateľovi
              e-mailových služieb, spoločnosti Google (pri udelení súhlasu) a zmluvným IT
              dodávateľom, vždy v rozsahu nevyhnutnom na poskytovanie služieb.
            </p>
          </Section>

          <Section heading="9. Práva dotknutej osoby">
            <p>
              Máte právo na prístup k údajom, ich opravu, vymazanie, obmedzenie spracúvania,
              prenosnosť údajov, namietať proti spracúvaniu, odvolať súhlas a podať sťažnosť Úradu
              na ochranu osobných údajov SR.
            </p>
          </Section>

          <Section heading="10. Kontakt">
            <p>Ak máte otázky týkajúce sa ochrany osobných údajov, kontaktujte nás:</p>
            <p>
              TMSHYDRA s.r.o.
              <br />
              E-mail:{' '}
              <a href="mailto:info@tmshydra.com" className="text-blue-600 hover:underline">
                info@tmshydra.com
              </a>
              <br />
              Tel.:{' '}
              <a href="tel:+421911551354" className="text-blue-600 hover:underline">
                +421 911 551 354
              </a>
            </p>
          </Section>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-20 mb-8">
          Zásady používania súborov cookie
        </h2>

        <div className="space-y-8">
          <Section heading="Čo sú súbory cookie">
            <p>
              Súbory cookie sú malé textové súbory, ktoré navštívené webové stránky ukladajú do
              internetového prehliadača. Ich využívanie umožňuje správne fungovanie mnohých
              služieb a zlepšuje používateľský komfort pri prehliadaní webu.
            </p>
            <p>
              Tieto súbory nám neposkytujú prístup k vášmu počítaču ani k osobným údajom, pokiaľ
              ich sami dobrovoľne neposkytnete. Ich úlohou je zapamätať si informácie o vašej
              návšteve, napríklad vaše nastavenia, preferencie, údaje potrebné na bezpečné
              používanie stránky alebo anonymné štatistiky návštevnosti.
            </p>
          </Section>

          <Section heading="Aké cookies používame">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-2">
                Nevyhnutné cookies
              </h3>
              <p>
                Zabezpečujú základné fungovanie webu (napr. zapamätanie si vášho súhlasu s
                cookies). Bez nich by stránka nefungovala správne. Tieto sa ukladajú vždy, bez
                ohľadu na váš súhlas.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-2">
                Analytické cookies (len po udelení súhlasu)
              </h3>
              <p>
                Používame Google Analytics na meranie návštevnosti a správania používateľov na
                webe (napr. cookies _ga, _gid). Pomáhajú nám pochopiť, ako web funguje a čo
                zlepšiť.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-2">
                Marketingové cookies (len po udelení súhlasu)
              </h3>
              <p>
                Používame Google Ads na meranie účinnosti reklamných kampaní a sledovanie
                konverzií (napr. cookie súvisiaci s parametrom gclid). Tieto cookies nám umožňujú
                vyhodnotiť, či reklama viedla k dopytu alebo rezervácii.
              </p>
            </div>
          </Section>

          <Section heading="Ako spravovať súhlas">
            <p>
              Pri prvej návšteve webu vám ponúkneme možnosť súhlasiť alebo odmietnuť použitie
              analytických a marketingových cookies prostredníctvom lišty v spodnej časti
              obrazovky. Vaše rozhodnutie si môžete kedykoľvek zmeniť vymazaním cookies vo vašom
              prehliadači, čím sa vám lišta so súhlasom zobrazí znova.
            </p>
            <p>
              Vďaka súborom cookie je každá ďalšia návšteva webovej stránky pohodlnejšia, rýchlejšia
              a efektívnejšia, pretože stránka si dokáže zapamätať niektoré informácie z vašej
              predchádzajúcej návštevy.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};
