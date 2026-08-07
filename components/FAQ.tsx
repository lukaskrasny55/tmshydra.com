import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { ROUTE_PATHS } from '../routePaths';

const faqItems = [
  {
    question: 'Koľko stojí hydroizolácia plochej strechy?',
    answer:
      'Cena sa vždy odvíja od stavu pôvodnej strechy, zvolenej fólie a veľkosti plochy – orientačne sa pohybuje od 15 do vyše 100 €/m² podľa rozsahu prác. Presné číslo vám vieme povedať až po bezplatnej obhliadke, kde zmeriame strechu, posúdime jej stav a navrhneme riešenie, ktoré sedí na váš rozpočet aj potreby.',
    link: { label: 'Pozrite si orientačný cenník', path: ROUTE_PATHS.priceLanding },
  },
  {
    question: 'Aký je rozdiel medzi PVC, TPO a EPDM fóliou?',
    answer:
      'Všetky tri patria medzi najspoľahlivejšie hydroizolačné materiály, líšia sa však životnosťou a spôsobom spracovania. PVC a TPO fólie sa zvárajú horúcim vzduchom a majú životnosť okolo 40 – 50 rokov, EPDM kaučuková fólia vydrží pri správnej montáži aj 50 až 80 rokov a je veľmi pružná. Ktorý materiál je pre vašu strechu najvhodnejší, vám radi odporučíme priamo na mieste podľa tvaru strechy, sklonu a zaťaženia.',
  },
  {
    question: 'Ako dlho trvá rekonštrukcia plochej strechy?',
    answer:
      'Bežná rekonštrukcia rodinného domu zvyčajne zaberie 5 až 10 pracovných dní, pri rozsiahlejších prácach so zateplením alebo opravou konštrukcie počítajte s 2 až 3 týždňami. Presný termín aj dĺžku realizácie si dohodneme vopred, aby ste presne vedeli, čo očakávať a kedy bude strecha hotová.',
  },
  {
    question: 'Akú záruku poskytujete na vykonané práce?',
    answer:
      'Na naše realizácie poskytujeme záruku až 15 rokov. Za tú dobu sme si vybudovali skúsenosti z viac ako 12 rokov praxe na Slovensku aj v zahraničí, takže viete, že strecha zostane tesná dlhodobo, nielen počas záručnej doby.',
  },
  {
    question: 'Strecha mi zateká, čo mám robiť?',
    answer:
      'V prvom rade nás kontaktujte – v prípade havarijného stavu vieme zasiahnuť do 48 hodín a strechu provizórne zabezpečiť, aby sa škoda nezväčšovala. Následne pripravíme trvalé riešenie problému. Neodporúčame čakať, pretože vlhkosť postupne poškodzuje aj konštrukciu pod krytinou.',
  },
  {
    question: 'Je obhliadka strechy naozaj zadarmo a bez záväzkov?',
    answer:
      'Áno. Prídeme si strechu pozrieť, zmeriame ju, poradíme a pripravíme cenovú ponuku úplne zadarmo a bez akéhokoľvek záväzku objednať si prácu. Až potom sa vy rozhodnete, či a ako budeme pokračovať.',
  },
  {
    question: 'Pôsobíte len v okolí Palárikova, alebo aj inde na Slovensku?',
    answer:
      'Sídlime v Palárikove, no realizácie robíme po celom Slovensku – od rodinných domov až po bytové a priemyselné objekty. Máme skúsenosti aj so zákazkami v zahraničí, napríklad v Belgicku.',
  },
  {
    question: 'Dá sa plochá strecha zatepliť dodatočne, bez búrania pôvodnej krytiny?',
    answer:
      'Vo väčšine prípadov áno – existujúca skladba sa dá dodatočne zatepliť novou vrstvou tepelnej izolácie a prekryť novou hydroizolačnou fóliou, bez nutnosti búrať pôvodnú strechu až na nosnú konštrukciu. Konkrétne riešenie ale vždy závisí od stavu a skladby vašej strechy, preto je najspoľahlivejšie posúdiť to priamo na mieste.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <Helmet>
        <script type="application/ld+json" id="faq-schema">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-3">
            Časté otázky
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase">
            Čo vás zaujíma najčastejšie
          </h2>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                >
                  <span className="font-bold text-slate-900">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed">
                    <p>{item.answer}</p>
                    {item.link && (
                      <Link
                        to={item.link.path}
                        className="inline-flex items-center gap-1 mt-3 text-blue-600 font-bold hover:text-blue-700"
                      >
                        {item.link.label}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
