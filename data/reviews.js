// Shared source of truth for real Google reviews, used on the homepage
// (Testimonials.tsx) and on the SEO city landing pages (SeoCityPage.tsx) so
// trust signals show up wherever a visitor actually lands, not just on "/".

export const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps/search/?api=1&query=TMS-Hydra+s.r.o.+Pal%C3%A1rikovo';
export const GOOGLE_REVIEWS_RATING = '5,0';
export const GOOGLE_REVIEWS_COUNT_LABEL = 'z 8 Google recenzií';

export const reviews = [
  {
    name: 'Gábor Pandi',
    text: 'Pána Solnokyho a jeho tím môžem len odporučiť. Na obhliadku prišiel veľmi rýchlo, dohodli sme sa na detailoch, a to aj v priebehu realizácie. Odporučil profesionálne riešenie. Perfektná komunikácia, pracovali čisto a profesionálne. Všetko prebehlo tak, ako sme sa dohodli, a včas podľa dohody.',
  },
  {
    name: 'Hektor Siegel',
    text: 'Potrebovali sme riešiť poškodenú krytinu na streche garáže. Komunikácia bola bezproblémová, prišli na čas a presne vedeli, kde je problém. Všetko prebehlo podľa dohody a strecha je teraz bez problémov. Určite odporúčam.',
  },
  {
    name: 'Martina Šuhajdová',
    text: 'Som maximálne spokojná, môžem len doporučiť!',
  },
];
