// Service-specific copy for the SEO city landing pages (/sluzby/:service/:city).
// "hydroizolacia-plochej-strechy" keeps the original per-city title/description
// from data/cities.js (returns null here); the other two services get their own
// title, description, intro and FAQ so the 57 pages are not near-duplicates.

export const cityLocatives = {
  nitra: 'v Nitre',
  'nove-zamky': 'v Nových Zámkoch',
  trnava: 'v Trnave',
  bratislava: 'v Bratislave',
  trencin: 'v Trenčíne',
  zilina: 'v Žiline',
  'banska-bystrica': 'v Banskej Bystrici',
  martin: 'v Martine',
  prievidza: 'v Prievidzi',
  komarno: 'v Komárne',
  levice: 'v Leviciach',
  topolcany: 'v Topoľčanoch',
  sala: 'v Šali',
  galanta: 'v Galante',
  surany: 'v Šuranoch',
  zvolen: 'vo Zvolene',
  sladkovicovo: 'v Sládkovičove',
  'dunajska-streda': 'v Dunajskej Strede',
  samorin: 'v Šamoríne',
};

export function getServiceCopy(service, cityName, cityKey) {
  const loc = cityLocatives[cityKey] || `v meste ${cityName}`;

  if (service === 'zateplenie-plochej-strechy') {
    return {
      title: `Zateplenie plochej strechy ${cityName}`,
      metaDescription: `Zateplenie plochej strechy ${loc} a okolí – návrh skladby, tepelná izolácia a nová hydroizolácia v jednom. Bezplatná obhliadka a cenová ponuka od TMS HYDRA.`,
      intro: `Zateplenie plochej strechy ${loc} riešime ako celok: posúdime súčasnú skladbu strechy, navrhneme vhodnú tepelnú izoláciu a hneď na ňu položíme novú hydroizolačnú vrstvu. Tým znižujete tepelné straty a zároveň predlžujete životnosť strechy. Pri obhliadke vám navrhneme skladbu aj materiály podľa konkrétneho objektu.`,
      faq: [
        {
          question: `Koľko stojí zateplenie plochej strechy ${loc}?`,
          answer: 'Cena závisí od plochy strechy, hrúbky a typu izolácie a stavu existujúcej skladby. Presnú cenu stanovíme po bezplatnej obhliadke v cenovej ponuke.',
        },
        {
          question: 'Dá sa zatepliť strecha bez odstránenia starej hydroizolácie?',
          answer: 'Záleží na stave starej skladby. Ak je suchá a pevná, môže sa použiť ako podklad; ak je premočená alebo poškodená, je potrebné ju odstrániť. Rozhodneme pri obhliadke.',
        },
        {
          question: 'Prečo sa zateplenie robí spolu s hydroizoláciou?',
          answer: 'Tepelná izolácia musí byť chránená pred vlhkosťou. Nová hydroizolačná vrstva na zateplení zabezpečí vodotesnosť a zároveň chráni izoláciu, preto obe vrstvy navrhujeme spolu.',
        },
      ],
    };
  }

  if (service === 'oprava-plochej-strechy') {
    return {
      title: `Oprava plochej strechy ${cityName}`,
      metaDescription: `Zatekáva vám plochá strecha ${loc}? Oprava netesností, lokálne opravy aj celková rekonštrukcia hydroizolácie. Bezplatná obhliadka od TMS HYDRA.`,
      intro: `Oprava plochej strechy ${loc} začína zistením príčiny zatekania – netesný detail, poškodená fólia, prasknutá lepenka alebo nefunkčný odtok. Podľa stavu navrhneme buď lokálnu opravu, alebo rekonštrukciu hydroizolácie. Na obhliadku prídeme zdarma a povieme vám, čo je skutočne potrebné opraviť.`,
      faq: [
        {
          question: `Koľko stojí oprava zatekajúcej plochej strechy ${loc}?`,
          answer: 'Cena závisí od rozsahu poškodenia a typu strechy. Lokálna oprava je lacnejšia než nová hydroizolácia celej plochy. Po bezplatnej obhliadke vám pripravíme cenovú ponuku.',
        },
        {
          question: 'Stačí strechu opraviť lokálne, alebo je potrebná rekonštrukcia?',
          answer: 'Ak je poškodené len jedno miesto a zvyšok hydroizolácie je v poriadku, často stačí lokálna oprava. Pri veľkom opotrebovaní alebo premočenej skladbe je vhodnejšia rekonštrukcia celej plochy. Zistíme to pri obhliadke.',
        },
        {
          question: 'Dá sa zatekajúca strecha opraviť rýchlo?',
          answer: 'Pri akútnom zatekaní sa snažíme prísť na obhliadku čo najskôr. Zavolajte nám a dohodneme ďalší postup.',
        },
      ],
    };
  }

  return null;
}
