// Shared source of truth for the poradenská sekcia (blog) content. Mirrors
// the pattern in data/projects.ts — used by BlogPage.tsx (listing),
// BlogPostPage.tsx (individual article) and scripts/generate-sitemap.mjs +
// scripts/prerender.mjs so every article gets its own crawlable URL.
//
// Content is general, well-established roofing/hydroizolácia industry
// knowledge (material properties, maintenance schedules) aimed at the kind
// of long-tail search queries a template landing page can't rank for -
// deliberately not making specific claims about TMS-HYDRA beyond what's
// already stated elsewhere on the site (bezplatná obhliadka, záruka do 15
// rokov).

export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  publishedDate: string;
  readingTime: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ako-casto-kontrolovat-plochu-strechu',
    title: 'Ako často kontrolovať plochú strechu? Praktický harmonogram',
    metaDescription: 'Ako často a kedy kontrolovať plochú strechu, čo pri kontrole sledovať a prečo je pravidelná údržba lacnejšia než oprava zatekania.',
    excerpt: 'Plochá strecha si na rozdiel od sedlovej vyžaduje pravidelnejšiu pozornosť. Prinášame jednoduchý harmonogram, kedy a čo kontrolovať.',
    publishedDate: '2026-08-11',
    readingTime: '5 min čítania',
    content: [
      'Plochá strecha je z pohľadu odvodnenia náročnejšia konštrukcia než sedlová - voda z nej neodteká sama vplyvom sklonu, ale je odkázaná na funkčné vpuste, žľaby a správne spádovanie. Práve preto sa pri plochých strechách odporúča pravidelnejšia kontrola než pri klasických šikmých strechách, kde stačí prehliadka raz za niekoľko rokov.',
      'Základné pravidlo znie: dve pravidelné kontroly ročne, plus mimoriadna kontrola po každej výraznej udalosti. Prvá pravidelná kontrola patrí na jar, hneď po zime - vtedy sa najlepšie odhalia škody spôsobené mrazom, ťarchou snehu alebo zamŕzajúcou vodou v škárach a detailoch. Druhá kontrola patrí na jeseň, pred príchodom zimy, keď je dôležité overiť, že odtokové systémy nie sú upchané spadnutým lístím a strecha je pripravená zvládnuť záťaž snehu.',
      'Mimoriadnu kontrolu si zaslúži strecha po každej silnejšej búrke s krupobitím, po extrémne silnom vetre alebo po neobvykle vysokej snehovej nádielke. Mechanické poškodenie hydroizolačnej fólie spôsobené padajúcimi vetvami alebo krupobitím nemusí byť na prvý pohľad viditeľné, no aj malý zásah do membrány môže časom viesť k zatekaniu.',
      'Čo presne pri kontrole sledovať: po prvé, stojatú vodu na povrchu strechy dlhšie ako 48 hodín po daždi - to je typický signál problému so spádovaním alebo upchatým odvodnením. Po druhé, stav spojov a zvarov hydroizolačnej fólie, najmä v okolí atík, komínov a prestupov inštalácií, kde vzniká najviac porúch. Po tretie, bubliny, vlny alebo praskliny na povrchu fólie, ktoré signalizujú stratu priľnavosti alebo degradáciu materiálu. Po štvrté, stav klampiarskych prvkov a oplechovania - skorodované alebo uvoľnené prvky treba riešiť skôr, než spôsobia zatekanie.',
      'Kontrolu vnútorných priestorov pod strechou netreba podceňovať ani medzi obhliadkami - vlhkostné mapy na strope, odlupujúca sa omietka alebo zvýšená vlhkosť vzduchu v horných podlažiach sú často prvým príznakom, že sa niečo deje skôr, než je problém viditeľný zvonka.',
      'Laická kontrola zvládne odhaliť viditeľné problémy, no odbornú diagnostiku stavu hydroizolácie, jej priľnavosti a zvyšnej životnosti dokáže spoľahlivo posúdiť len skúsený technik. Bezplatná odborná obhliadka je preto rozumnou investíciou času aj vtedy, keď strecha na pohľad problém nemá - odhalí začínajúce poškodenia v čase, keď je oprava ešte lacná, namiesto toho, keď už treba riešiť rozsiahle zatekanie.',
    ],
  },
  {
    slug: 'pvc-vs-tpo-vs-epdm-folia-rozdiely',
    title: 'PVC vs TPO vs EPDM fólia: aký je rozdiel a čo si vybrať',
    metaDescription: 'Porovnanie PVC, TPO a EPDM hydroizolačných fólií pre plochú strechu - materiál, životnosť, montáž aj cena. Ktorá fólia je pre váš projekt najvhodnejšia.',
    excerpt: 'Tri najpoužívanejšie hydroizolačné materiály pre ploché strechy majú rozdielne vlastnosti aj cenu. Prehľad, ktorý pomôže pri rozhodovaní.',
    publishedDate: '2026-08-11',
    readingTime: '6 min čítania',
    content: [
      'Pri hydroizolácii plochej strechy sa dnes najčastejšie stretnete s tromi typmi fóliových materiálov - PVC, TPO a EPDM. Každý má iné zloženie, spôsob montáže aj cenovú kategóriu, a voľba správneho materiálu ovplyvňuje životnosť aj celkové náklady na strechu na desaťročia dopredu.',
      'PVC fólia (polyvinylchlorid) je na trhu najdlhšie a stále patrí medzi najpoužívanejšie riešenia. Jej výhodou je dobrý pomer ceny a výkonu, jednoduchá a rýchla montáž zváraním horúcim vzduchom, ktorá vytvára pevný a spoľahlivý spoj, a široká dostupnosť materiálu v rôznych hrúbkach a farbách vrátane svetlých (bielych) variantov s vyššou odrazivosťou slnečného žiarenia. Životnosť kvalitnej PVC fólie sa bežne pohybuje okolo 25-30 rokov.',
      'TPO fólia (termoplastický polyolefín) je modernejšia alternatíva, ktorá rieši jednu z hlavných slabín PVC - obsah zmäkčovadiel, ktoré časom migrujú z materiálu von a fólia postupne stráca pružnosť a krehne. TPO zmäkčovadlá neobsahuje, preto si dlhšie zachováva pružnosť, a navyše je lepšie recyklovateľná. Montuje sa podobne ako PVC, zváraním horúcim vzduchom. Práve pre tieto vlastnosti sa TPO čoraz častejšie volí pri nových stavbách.',
      'EPDM je syntetický kaučuk a z troch materiálov ponúka najvyššiu elasticitu - dokáže sa naťahovať a vracať do pôvodného tvaru bez poškodenia, čo je výhoda pri konštrukciách, kde dochádza k teplotným dilatáciám alebo mierny pohybom podkladu. Spoje sa pri EPDM nezvárajú, ale lepia špeciálnymi pásmi. Životnosť kvalitne zrealizovanej EPDM strechy môže presiahnuť 50 rokov, čo z nej robí najtrvácnejší z troch materiálov, spravidla za vyššiu obstarávaciu cenu.',
      'Ktorý materiál zvoliť závisí od konkrétnej strechy: PVC je vyvážená voľba pre bežnú rekonštrukciu rodinného domu, kde je dôležitý pomer ceny a kvality. TPO sa oplatí najmä pri novostavbách alebo tam, kde je dôraz na dlhšiu životnosť bez zmäkčovadiel. EPDM je vhodná investícia tam, kde majiteľ chce minimálnu údržbu na čo najdlhší horizont, prípadne pri strechách s väčšími nárokmi na elasticitu materiálu.',
      'Vo všetkých troch prípadoch platí, že samotný materiál je len jednou časťou rovnice - rovnako dôležité je precízne spracovanie detailov (atiky, prestupy, vpuste) a kvalita podkladu. Aj najlepšia fólia zle namontovaná na nepripravený podklad nevydrží deklarovanú životnosť. Preto sa oplatí materiál aj rozsah prác konzultovať priamo pri obhliadke strechy, kde technik odporučí riešenie na mieru danej konštrukcii a rozpočtu.',
    ],
  },
  {
    slug: 'priznaky-ze-plocha-strecha-potrebuje-rekonstrukciu',
    title: '5 príznakov, že plochá strecha potrebuje rekonštrukciu',
    metaDescription: 'Stojatá voda, bubliny na fólii, vyššie účty za kúrenie - päť signálov, že plochá strecha už nespĺňa svoju funkciu a treba riešiť rekonštrukciu.',
    excerpt: 'Niektoré problémy plochej strechy sú viditeľné hneď, iné sa prejavia až vyššími účtami za kúrenie. Päť signálov, ktoré netreba prehliadnuť.',
    publishedDate: '2026-08-11',
    readingTime: '4 min čítania',
    content: [
      'Plochá strecha zvyčajne neupozorňuje na problém jednou dramatickou udalosťou - poškodenie sa väčšinou vyvíja postupne a prvé príznaky sú ľahko prehliadnuteľné. Tu je päť signálov, ktoré je dobré brať vážne skôr, než sa z malého problému stane rozsiahle zatekanie.',
      '1. Stojatá voda, ktorá na streche zostáva dlhšie ako 48 hodín po daždi. Plochá strecha má mať mierny spád, ktorý vodu odvádza k vpustiam. Ak sa na povrchu tvoria kaluže, ktoré neodtekajú, ide buď o problém so spádovaním, upchaté odvodnenie, alebo sadnutie podkladu. Dlhodobo stojaca voda výrazne zaťažuje hydroizoláciu a urýchľuje jej degradáciu.',
      '2. Bubliny, vlny alebo praskliny na povrchu fólie. Tieto vizuálne zmeny signalizujú stratu priľnavosti hydroizolácie k podkladu alebo degradáciu materiálu vplyvom UV žiarenia a poveternostných podmienok. Aj keď strecha ešte nezateká, ide o jasný signál, že životnosť materiálu sa blíži ku koncu.',
      '3. Rastúce náklady na vykurovanie bez zjavnej príčiny. Ak sa tepelná izolácia pod hydroizoláciou premočí alebo degraduje, výrazne stráca svoje izolačné vlastnosti - a to sa prejaví na účtoch za kúrenie skôr, než sa objaví viditeľné zatekanie dovnútra budovy.',
      '4. Vlhkostné mapy, škvrny alebo odlupujúca sa omietka na stropoch najvyššieho podlažia. Toto je už priamy dôkaz, že voda preniká cez strešnú konštrukciu dovnútra. Miesto vnútornej škvrny často nezodpovedá presne miestu poruchy na streche - voda môže po konštrukcii stiecť inam, preto je namieste odborná diagnostika, nie len lokálna oprava tam, kde je škvrna vidieť.',
      '5. Vek strechy nad 20-25 rokov pri starších materiáloch (staršie asfaltové pásy, prvé generácie PVC fólií). Aj keď strecha momentálne nezateká, materiály tohto veku sú za hranicou svojej plánovanej životnosti a riziko náhlej poruchy rastie - najmä po tuhej zime alebo búrke. V takom prípade sa oplatí preventívna obhliadka radšej skôr než neskôr.',
      'Spoločný menovateľ všetkých piatich signálov je jednoduchý: čím skôr sa problém odhalí, tým lacnejšie a menej invazívne je riešenie. Lokálna oprava poškodeného úseku býva podstatne lacnejšia než rekonštrukcia po rokoch zanedbaného zatekania, ktoré stihlo poškodiť aj nosnú konštrukciu. Bezplatná obhliadka je preto najlacnejší krok, ktorý môže majiteľ strechy urobiť - bez ohľadu na to, či nakoniec pôjde o drobnú opravu, alebo je čas na kompletnú rekonštrukciu.',
    ],
  },
];
