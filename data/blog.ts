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
  {
    slug: 'kolko-stoji-hydroizolacia-plochej-strechy',
    title: 'Koľko stojí hydroizolácia plochej strechy? Faktory ceny',
    metaDescription: 'Z čoho sa skladá cena hydroizolácie plochej strechy: rozloha, materiál, stav podkladu, zateplenie a detaily. Praktický prehľad pred cenovou ponukou.',
    excerpt: 'Cena hydroizolácie plochej strechy nezávisí len od počtu metrov štvorcových. Prehľad faktorov, ktoré ovplyvňujú konečnú sumu, a ako si ju správne porovnať.',
    publishedDate: '2026-11-10',
    readingTime: '6 min čítania',
    content: [
      'Otázka, koľko stojí hydroizolácia plochej strechy, patrí medzi najčastejšie, no jednoduchá odpoveď neexistuje. Cena za meter štvorcový sa môže medzi dvoma strechami líšiť niekoľkonásobne a závisí od toho, čo všetko sa na streche robí. Orientačné ceny od 15 € za m2 uvádzame v cenníku na stránke o cene hydroizolácie, no konečnú sumu vždy určí až obhliadka konkrétnej strechy.',
      'Prvým faktorom je rozloha a členitosť strechy. Pri väčších plochách klesá cena za meter štvorcový, pretože fixné náklady na prípravu, dopravu a zariadenie staveniska sa rozložia na viac metrov. Naopak, malá strecha s množstvom prestupov, komínov a atík vychádza na meter štvorcový drahšie, lebo detaily sa robia ručne a zaberú viac času než rovná plocha.',
      'Druhým faktorom je zvolený materiál. PVC fólia býva najčastejšou voľbou s dobrým pomerom ceny a výkonu, TPO je modernejšia alternatíva bez zmäkčovadiel a EPDM s najvyššou životnosťou je spravidla drahšia pri obstaraní, ale lacnejšia z pohľadu desaťročí. Rozdiel nie je len v cene materiálu, ale aj v hrúbke fólie a spôsobe montáže. Podrobné porovnanie nájdete v článku o rozdieloch medzi PVC, TPO a EPDM fóliou.',
      'Tretím faktorom je stav existujúcej strechy. Ak je stará skladba suchá a pevná, môže niekedy slúžiť ako podklad a práce sú lacnejšie. Ak je však premočená, pozdvihnutá alebo poškodená, treba ju odstrániť a prípadne vymeniť aj tepelnú izoláciu. Skrytú vlhkosť v skladbe často vidno až po odkrytí, preto je dôležitá odborná obhliadka pred ponukou.',
      'Štvrtým faktorom je zateplenie a spádovanie. Ak sa pri rekonštrukcii pridáva tepelná izolácia alebo spádové kliny na lepšie odvodnenie, cena stúpa, no výsledok je dlhodobo výhodnejší: strecha lepšie odvádza vodu a znižuje sa strata tepla. Do ceny vstupujú aj parozábrana, nové vpuste, atiky a klampiarske prvky.',
      'Poslednými položkami sú prístup a logistika. Zdvih materiálu na strechu, lešenie, likvidácia odpadu zo starej skladby alebo vzdialenosť stavby môžu tvoriť citeľnú časť rozpočtu. Pri porovnávaní ponúk preto nepozerajte len na cenu za m2, ale na to, čo presne obsahujú: skladbu vrstiev, hrúbku fólie, detaily, odvoz odpadu a záruku. Najlacnejšia ponuka často vynecháva práve položky, ktoré sa neskôr dopláca.',
      'Spoľahlivý spôsob, ako získať presnú cenu, je bezplatná obhliadka: technik posúdi stav strechy, premeria plochu a navrhne riešenie aj rozpočet. Cenová ponuka by mala obsahovať rozsah prác, použité materiály a záručné podmienky, aby ste mohli porovnať viac ponúk na rovnakom základe.',
    ],
  },
  {
    slug: 'zatekanie-plochej-strechy-pricina-a-riesenie',
    title: 'Zateká plochá strecha? Najčastejšie príčiny a čo robiť',
    metaDescription: 'Prečo zateká plochá strecha: porucha detailov, vpustí, spojov fólie či zvyšková vlhkosť. Čo urobiť hneď a kedy stačí oprava, kedy rekonštrukcia.',
    excerpt: 'Zatekanie plochej strechy nemusí znamenať výmenu celej hydroizolácie. Najčastejšie príčiny poruchy, prvé kroky a rozhodnutie medzi opravou a rekonštrukciou.',
    publishedDate: '2026-11-10',
    readingTime: '5 min čítania',
    content: [
      'Zatekanie plochej strechy je nepríjemné, ale nie vždy znamená, že treba vymeniť celú hydroizoláciu. Skutočná príčina býva často na malom mieste a správna diagnostika rozhodne o tom, či postačí lokálna oprava, alebo je potrebná rekonštrukcia. Najčastejšie ide o jednu z niekoľkých typických porúch.',
      'Najčastejšou príčinou sú netesné detaily: napojenia na atiky, okolie komínov, svetlíkov a prestupov inštalácií. Tu sa hydroizolácia zvyčajne zahýba a namáha, a práve tu vzniká väčšina porúch. Druhou častou príčinou je upchatá alebo poškodená strešná vpusť či žľab, pri ktorých sa voda zdrží a nájde si cestu cez najslabšie miesto.',
      'Ďalším dôvodom môže byť porušenie samotnej fólie alebo pásov: prasknutie, mechanické poškodenie padajúcou vetvou či krupobitím, rozchodené spoje alebo degradácia materiálu po rokoch UV žiarenia. Ak sa na povrchu objavia bubliny alebo vlny, signalizujú, že hydroizolácia stráca priľnavosť k podkladu.',
      'Treba rátať aj s tým, že miesto škvrny na strope nemusí byť presne pod miestom poruchy. Voda môže po konštrukcii stekať horizontálne aj niekoľko metrov, kým sa objaví vo vnútri. Preto samotné opravenie strechy tesne nad škvrnou často nepomôže a dôkladná diagnostika je lacnejšia než opakované opravy naslepo.',
      'Čo urobiť hneď: zdokumentujte škvrny a miesta zatekania fotografiou s dátumom, pri akútnom zatekaní podložte nádobu a v rámci bezpečnosti zistite, či voda nepreniká k elektrickej inštalácii. Na strechu nelezte za dažďa ani po námraze. Z dlhodobého hľadiska neodporúčame zalepovať miesto lacnými tmelmi bez zistenia príčiny, pretože to býva len dočasné riešenie.',
      'Rozhodnutie o oprave alebo rekonštrukcii závisí od rozsahu. Ak je poškodené len jedno miesto a zvyšok hydroizolácie je v dobrom stave, často stačí lokálna oprava. Ak je materiál po životnosti, premočená je aj tepelná izolácia alebo sa porucha opakuje, výhodnejšia je rekonštrukcia. Oba prípady posúdi technik pri obhliadke priamo na streche.',
    ],
  },
  {
    slug: 'zateplenie-plochej-strechy-pir-eps-spadove-kliny',
    title: 'Zateplenie plochej strechy: PIR, EPS a spádové kliny',
    metaDescription: 'Ako sa zateplenie plochej strechy skladá: parozábrana, tepelná izolácia PIR alebo EPS, spádové kliny a hydroizolácia. Čo zvoliť a na čo si dať pozor.',
    excerpt: 'Zateplenie plochej strechy je viac než pridanie izolantu. Prehľad skladby, rozdielov medzi PIR a EPS, úlohy spádových klinov a toho, prečo sa robí spolu s hydroizoláciou.',
    publishedDate: '2026-11-10',
    readingTime: '6 min čítania',
    content: [
      'Zateplenie plochej strechy je jedným z najúčinnejších spôsobov, ako znížiť straty tepla budovy, keďže strecha patrí medzi plochy, ktorými uniká najviac tepla. Správne zateplenie však nie je len vrstva izolantu: je to premyslená skladba, v ktorej každá vrstva plní svoju funkciu a musí fungovať spolu s hydroizoláciou.',
      'Typická skladba zateplenej plochej strechy začína nosnou konštrukciou, na ktorú sa podľa potreby aplikuje penetračný náter a parozábrana. Parozábrana bráni prenikaniu vodnej pary z vnútra budovy do izolácie, kde by sa mohla zrážať. Nad ňou nasleduje tepelná izolácia a nakoniec hydroizolačná vrstva, ktorá chráni celú skladbu pred vodou.',
      'Z izolantov sa najčastejšie používajú PIR dosky a expandovaný polystyrén (EPS). PIR má pri rovnakej hrúbke lepšiu tepelnoizolačnú schopnosť, takže pri obmedzenej výške skladby (napríklad pri atikách či prahoch) umožňuje dosiahnuť potrebný odpor s menšou hrúbkou. EPS je cenovo dostupnejší a veľmi rozšírený, hodí sa najmä tam, kde výška skladby nie je obmedzená. Presnú voľbu a hrúbku určuje tepelnotechnické posúdenie konkrétnej budovy.',
      'Dôležitou súčasťou skladby sú spádové kliny. Plochá strecha nie je úplne rovná: potrebuje mierny spád, aby voda odtekala k vpustiam a nezostávala stáť na povrchu. Ak pôvodná strecha spád nemá alebo sa po rokoch prehla, dá sa spád vytvoriť klinmi z EPS, ktoré sa kladú nad tepelnú izoláciu alebo sú jej súčasťou. Takto sa pri zateplení rieši aj problém stojatej vody.',
      'Príkladom takéhoto riešenia je naša realizácia obecného a kultúrneho domu v Čechách: strecha s plochou 945 m2 dostala parozábranu s hliníkovou vložkou, tepelnú izoláciu PIR hrúbky 80 mm a EPS spádové kliny, na ktorých sú položené asfaltové pásy SBS a APAO. Rovnaký princíp platí pri každom type strechy, len skladba a materiály sa prispôsobujú objektu.',
      'Zateplenie a hydroizoláciu sa oplatí riešiť spolu. Tepelná izolácia musí byť chránená pred vlhkosťou, inak stráca vlastnosti, a odkrývať strechu dvakrát je zbytočne drahé. Ak sa v rámci rekonštrukcie rieši nová hydroizolácia, je ideálny čas posúdiť aj tepelnú izoláciu a spádovanie. Na posúdenie skladby a návrh riešenia pre vašu strechu stačí bezplatná obhliadka.',
    ],
  },
  {
    slug: 'asfaltove-pasy-vs-folia-plocha-strecha',
    title: 'Asfaltové pásy alebo fólia na plochú strechu? Rozdiely',
    metaDescription: 'Porovnanie asfaltových pásov SBS a APAO s fóliami PVC, TPO a EPDM pre plochú strechu: skladba, montáž, životnosť a vhodnosť použitia.',
    excerpt: 'Plochú strechu možno zaizolovať asfaltovými pásmi alebo fóliou. Prehľad vlastností oboch riešení a toho, kedy sa ktoré hodí.',
    publishedDate: '2026-11-10',
    readingTime: '5 min čítania',
    content: [
      'Pri hydroizolácii plochej strechy sa rozhodujete medzi dvoma veľkými skupinami materiálov: modifikovanými asfaltovými pásmi a syntetickými fóliami (PVC, TPO, EPDM). Oba prístupy sú osvedčené, no líšia sa skladbou, spôsobom montáže aj vhodnosťou pre rôzne typy striech.',
      'Asfaltové pásy sú tradičným riešením, ktoré sa dnes vyrába v moderných modifikovaných variantoch. Pásy SBS sú modifikované elastomérom, ktorý im dodáva pružnosť aj pri nízkych teplotách. Pásy APAO sa používajú najmä ako vrchná vrstva a často majú povrch s minerálnym posypom, ktorý chráni asfalt pred slnkom. Hydroizolácia z pásov sa zvyčajne robí viacvrstvovo: podkladný a vrchný pás sa navzájom prekrývajú a spájajú.',
      'Montáž asfaltových pásov prebieha natavovaním plameňom alebo použitím samolepiacich pásov, ktoré sa kladú bez otvoreného ohňa. Samolepiaca termoaktívna podkladová vrstva sa osvedčila najmä pri objektoch, kde je potrebné obmedziť riziko pri práci s plameňom. Viacvrstvová skladba je odolná voči mechanickému poškodeniu, čo oceníte najmä na strechách s pohybom osôb.',
      'Fólie PVC, TPO a EPDM sú jednovrstvové systémy, ktoré sa spájajú zváraním horúcim vzduchom (PVC a TPO) alebo lepením (EPDM). Sú ľahšie než viacvrstvová skladba z pásov, rýchlejšie sa kladú na veľké plochy a ponúkajú svetlé varianty s vyššou odrazivosťou slnečného žiarenia. Odlišnosti medzi týmito tromi fóliami popisuje samostatný článok v Poradni.',
      'Čo si vybrať, závisí od objektu. Pásy sú vhodné tam, kde je strecha exponovaná mechanickému namáhaniu alebo sa očakáva presná kombinácia s existujúcou asfaltovou skladbou. Fólie sa osvedčia pri rekonštrukcii rodinných a bytových domov a väčších ploch, kde záleží na rýchlosti montáže a nižšej hmotnosti. Pri rozhodovaní zohráva úlohu aj stav podkladu, požiadavky na zateplenie a rozpočet.',
      'Spoločné pre oba typy je, že kvalita výsledku stojí na detailoch: atikách, prestupoch, vpustiach a príprave podkladu. Ktorý materiál je pre vašu strechu najvhodnejší, najjednoduchšie posúdime pri bezplatnej obhliadke.',
    ],
  },
];
