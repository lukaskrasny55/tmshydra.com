// Shared source of truth for the realizácie (portfolio) content. Used by
// components/pages/ProjectsPage.tsx (gallery listing), components/pages/ProjectDetailPage.tsx
// (individual project pages), components/FeaturedProjects.tsx (homepage teaser),
// and scripts/generate-sitemap.mjs + scripts/prerender.mjs so every project
// always gets its own crawlable, prerendered URL.

export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  description: string;
  longDescription: string;
  metaDescription: string;
  area?: string;
  system?: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: '19',
    slug: 'obecny-a-kulturny-dom-cechy',
    title: 'Obecný a kultúrny dom',
    location: 'Čechy',
    description: 'Realizácia plochej strechy obecného a kultúrneho domu.',
    metaDescription: 'Realizácia plochej strechy obecného a kultúrneho domu v obci Čechy – fotodokumentácia od pôvodného stavu po hotové dielo.',
    longDescription: 'Plochá strecha obecného a kultúrneho domu v obci Čechy – fotodokumentácia realizácie od pôvodného stavu cez jednotlivé fázy prác až po hotové dielo.',
    gallery: ['/cz1.webp', '/cz2.webp', '/cz3.webp', '/cz4.webp', '/cz5.webp', '/cz6.webp', '/cz7.webp', '/cz8.webp', '/cz9.webp', '/cz10.webp', '/cz11.webp', '/cz12.webp', '/cz13.webp', '/cz14.webp', '/cz15.webp', '/cz16.webp', '/cz17.webp', '/cz18.webp', '/cz19.webp']
  }
,
  {
    id: '1',
    slug: 'villa-hascak-bratislava',
    title: 'Vila Hasčák',
    location: 'Bratislava',
    description: 'Obnova hydroizolácie plochej strechy.',
    metaDescription: 'Obnova hydroizolácie plochej strechy rodinnej vily v Bratislave – nová vrchná vrstva z asfaltových pásov APAO s minerálnym posypom a dôkladné opracovanie atík a prestupov.',
    longDescription: 'Na rodinnej vile v Bratislave sme realizovali obnovu hydroizolácie plochej strechy. Pôvodná hydroizolácia už neplnila svoju funkciu a objavovali sa prvé príznaky zatekania. Po posúdení stavu strechy sme aplikovali novú vrchnú hydroizolačnú vrstvu z asfaltových pásov modifikovaných APAO s ochranným minerálnym posypom.\n\nSúčasťou rekonštrukcie bolo aj dôkladné opracovanie detailov – atík, prestupov a napojení na odkvapový systém, ktoré bývajú pri plochých strechách častým miestom porúch. Precízne zhotovenie spojov a detailov je základom spoľahlivej ochrany pred zatekaním a dlhej životnosti strechy.\n\nRekonštrukcie plochých striech realizujeme na rodinných a bytových domoch, komerčných budovách aj priemyselných halách po celom Bratislavskom kraji – od diagnostiky a návrhu vhodného riešenia až po odovzdanie hotového diela.',
    gallery: ['/vh1.webp', '/vh2.webp', '/vh3.webp', '/vh4.webp']
  },
  {
    id: '2',
    slug: 'oprava-strechy-nove-zamky',
    title: 'Oprava strechy',
    location: 'Nové Zámky',
    description: 'Obnova hydroizolácie systémom 1Protect Basic.',
    metaDescription: 'Obnova hydroizolácie plochej strechy rodinného domu v Nových Zámkoch systémom 1Protect Basic – lokálne opravy podkladu, penetrácia a nová vrstva z SBS asfaltových pásov.',
    system: '1Protect Basic',
    longDescription: 'Na rodinnom dome v Nových Zámkoch sme realizovali jednovrstvovú rekonštrukciu hydroizolácie plochej strechy systémom 1Protect Basic.\n\nPred aplikáciou novej hydroizolácie sme vykonali lokálne opravy pôvodnej vrstvy a odstránili vzniknuté bubliny, aby sme zabezpečili vhodný podklad pre ďalšie práce. Následne sme aplikovali penetráciu a zhotovili novú hydroizolačnú vrstvu z SBS modifikovaných asfaltových pásov s ochranným minerálnym posypom v tehlovočervenej farbe.\n\nObnova zahŕňala celú plochu strechy vrátane opracovania atík, prestupov a napojení na odvodnenie. Dôraz sme kládli na dôkladné natavenie pásov a precízne zhotovenie spojov a detailov.\n\nSystém 1Protect Basic predstavuje riešenie obnovy hydroizolácie pre strechy, ktorých technický stav umožňuje aplikáciu novej vrstvy bez výmeny celej pôvodnej skladby. Vhodnosť tohto postupu vždy posudzujeme podľa stavu konkrétnej strechy.\n\nRekonštrukcie plochých striech rodinných domov, bytových domov, administratívnych a priemyselných hál realizujeme v Nových Zámkoch a okolí aj v ďalších regiónoch Slovenska – od posúdenia stavu a návrhu technického riešenia až po odovzdanie hotového diela.',
    gallery: ['/nz1.webp', '/nz2.webp', '/nz3.webp', '/nz4.webp', '/nz5.webp', '/nz6.webp', '/nz7.webp', '/nz8.webp', '/nz9.webp', '/nz10.webp']
  },
  {
    id: '3',
    slug: 'novostavba-kolta',
    title: 'Novostavba',
    location: 'Kolta',
    description: 'Zateplenie, vyspádovanie a SBS hydroizolácia Sika.',
    metaDescription: 'Plochá strecha novostavby administratívnej budovy v obci Kolta – EPS zateplenie so spádovými klinmi a hydroizolácia z SBS asfaltových pásov Sika.',
    system: 'SBS asfaltové pásy Sika, EPS',
    longDescription: 'Pri novostavbe administratívnej budovy spoločnosti KATEA s.r.o. v obci Kolta sme realizovali plochú strechu vrátane zateplenia, vyspádovania a hydroizolácie z kvalitných certifikovaných SBS modifikovaných asfaltových pásov od výrobcu Sika.\n\nTepelnú izoláciu strechy tvoria dosky z EPS polystyrénu doplnené o polystyrénové spádové kliny, ktoré vytvárajú potrebný sklon na odvádzanie dažďovej vody k strešným vpustom. Táto skladba prispieva k tepelnej ochrane budovy a správnemu odvodneniu strechy.\n\nPri zhotovení hydroizolácie sme kládli dôraz na dôkladné spojenie asfaltových pásov a precízne opracovanie všetkých detailov – atík, prestupov inštalácií a napojení na strešné vpusty. Kvalita týchto miest je zásadná pre spoľahlivú ochranu budovy pred zatekaním.\n\nPloché strechy na novostavbách rodinných a bytových domov, administratívnych budovách aj priemyselných halách realizujeme na celom západnom Slovensku – od návrhu vhodnej skladby cez zateplenie a vyspádovanie až po dokončenie hydroizolácie a odovzdanie hotového diela.',
    gallery: ['/ns1.webp', '/ns2.webp', '/ns3.webp', '/ns4.webp', '/ns5.webp', '/ns6.webp', '/ns7.webp']
  },
  {
    id: '4',
    slug: 'bytovy-dom-dubnica',
    title: 'Bytový dom',
    location: 'Dubnica',
    description: 'Nová strecha bytového domu.',
    metaDescription: 'Nová strecha bytového domu v Dubnici po rokoch zatekania – kompletná hydroizolácia, klampiarske prvky a odvodnenie.',
    longDescription: 'Bytový dom v Dubnici potreboval kompletne novú strechu po rokoch opakovaného zatekania spôsobeného zastaranou a poškodenou pôvodnou krytinou. Realizovali sme odstránenie starej skladby a montáž novej hydroizolačnej vrstvy vrátane všetkých klampiarskych prvkov, atík a odvodňovacieho systému, ktoré sú pri bytových domoch najčastejšou príčinou porúch. Pri realizáciách na obytných budovách kladieme dôraz na minimalizáciu obmedzení pre obyvateľov počas prác a na dodržanie harmonogramu dohodnutého so správcom domu. Výsledkom je strecha, ktorá dlhodobo ochráni budovu pred vlhkosťou a zastaví opakované náklady na provizórne opravy, ktoré si vyžadovali predchádzajúce roky. Rekonštrukcie striech bytových domov patria medzi naše kľúčové realizácie – vieme poradiť aj s výberom materiálu a postupu tak, aby zodpovedal rozpočtu spoločenstva vlastníkov.',
    gallery: ['/bdv1.webp', '/bdv2.webp', '/bdv3.webp']
  },
  {
    id: '5',
    slug: 'biela-lepenka-pezinok',
    title: 'Biela lepenka',
    location: 'Pezinok',
    description: 'Pochôdzna terasa s hydroizoláciou.',
    metaDescription: 'Hydroizolácia pochôdznej terasy bielou PVC fóliou v Pezinku – nižšie tepelné namáhanie, riešené spádovanie a odvodnenie.',
    system: 'Biela PVC fólia',
    longDescription: 'V Pezinku sme realizovali hydroizoláciu pochôdznej terasy bielou PVC fóliou, ktorá kombinuje funkčnosť hydroizolačnej vrstvy s praktickým využitím terasy ako plnohodnotného obytného priestoru. Svetlý povrch bielej fólie odráža slnečné žiarenie, čím výrazne znižuje tepelné namáhanie konštrukcie a predlžuje jej životnosť v porovnaní s tmavými materiálmi. Súčasťou realizácie bolo aj riešenie spádovania a odvodnenia terasy, aby na povrchu nezostávala stagnujúca voda, ktorá je najčastejšou príčinou predčasného opotrebovania hydroizolácie. Fólia bola mechanicky kotvená a všetky spoje boli zvárané horúcim vzduchom pre maximálnu vodotesnosť. Pochôdzne terasy s bielou PVC fóliou realizujeme čoraz častejšie – sú obľúbenou voľbou pri rodinných domoch, kde majitelia chcú funkčný vonkajší priestor bez kompromisov na kvalite hydroizolácie.',
    gallery: ['/bl1.webp', '/bl2.webp', '/bl3.webp']
  },
  {
    id: '6',
    slug: 'zelena-strecha-belgicko',
    title: 'Zelená strecha',
    location: 'Belgicko',
    description: 'Zateplenie a hydroizolácia strechy pod zelenú strechu.',
    metaDescription: 'Zateplenie a hydroizolácia plochej strechy novostavby administratívneho objektu v Belgicku – PIR izolácia, asfaltové pásy odolné proti prerastaniu koreňov a skladba pre zelenú strechu.',
    system: 'Zelená strecha, PIR, asfaltové pásy',
    longDescription: 'Na novostavbe administratívneho objektu v Belgicku sme realizovali zateplenie a hydroizoláciu plochej strechy so skladbou určenou pre zelenú strechu.\n\nNa železobetónovú dosku sme aplikovali penetráciu a parozábranu. Nasledovala tepelná izolácia z PIR dosiek, termoaktívna podkladová hydroizolačná vrstva a vrchná vrstva z asfaltových pásov odolných proti prerastaniu koreňov. Na takto pripravenom podklade bola následne zhotovená zelená strecha.\n\nDôležitou súčasťou realizácie bolo precízne opracovanie atík, strešných prestupov a odvodňovacích detailov. Pri zelených strechách je kvalita hydroizolácie a jej napojení obzvlášť dôležitá, pretože po dokončení vegetačného súvrstvia je prístup k týmto vrstvám náročnejší.\n\nVýsledná skladba spája tepelnú ochranu budovy, ochranu pred zatekaním a výhody vegetačnej strechy, ktorá pomáha zadržiavať dažďovú vodu a obmedzovať prehrievanie strešného povrchu.\n\nMedzinárodné projekty realizujeme s rovnakým dôrazom na kvalitu spracovania a dodržanie termínov ako zákazky na Slovensku. Skúsenosti z komerčných realizácií v zahraničí následne zúročujeme aj pri projektoch pre slovenských klientov.',
    gallery: ['/b1.webp', '/b2.webp', '/b3.webp']
  },
  {
    id: '7',
    slug: 'epdm-strecha-modra',
    title: 'EPDM strecha',
    location: 'Modra',
    description: 'Hydroizolácia plochej strechy rodinného domu fóliou EPDM.',
    metaDescription: 'Hydroizolácia strechy rodinného domu v Modre kaučukovou fóliou EPDM na ploche cca 110 m² – životnosť presahujúca 50 rokov.',
    area: '110 m²',
    system: 'EPDM Rubercover',
    longDescription: 'Pri rekonštrukcii strechy rodinného domu v Modre sme zvolili hydroizoláciu kaučukovou fóliou EPDM Rubercover s celkovou plochou približne 110 m². EPDM fólia patrí medzi najodolnejšie hydroizolačné materiály na trhu – jej životnosť presahuje 50 rokov a vyniká vysokou pružnosťou, ktorá jej umožňuje bez poškodenia zvládať teplotné rozťažnosti aj pohyby strešnej konštrukcie. Fólia bola mechanicky kotvená a všetky spoje spracované špeciálnymi lepenými pásmi, čím sme dosiahli maximálnu vodotesnosť bez nutnosti zvárania horúcim vzduchom. Pred samotnou realizáciou sme dôkladne skontrolovali a pripravili podklad strechy tak, aby nová skladba vydržala desiatky rokov bez potreby ďalšieho zásahu. EPDM fólie odporúčame najmä tam, kde je dôraz na dlhú životnosť a minimálnu údržbu – ideálne pre rodinné domy aj menšie komerčné objekty.',
    gallery: ['/md6.webp', '/md1.webp', '/md2.webp', '/md3.webp', '/md4.webp', '/md5.webp', '/md7.webp']
  },
  {
    id: '8',
    slug: 'zateplena-plechova-strecha-bratislava',
    title: 'Zateplená plechová strecha',
    location: 'Bratislava',
    description: 'Zateplenie a hydroizolácia plechovej strechy PIR doskami.',
    metaDescription: 'Zateplenie plechovej strechy v Bratislave PIR doskami (80 mm) na ploche cca 150 m² a hydroizolácia PVC fóliou.',
    area: '150 m²',
    system: 'PIR 80 mm + PVC fólia',
    longDescription: 'Plechová strecha objektu v Bratislave trpela výraznými tepelnými stratami, ktoré sa prejavovali na vysokých nákladoch na vykurovanie priľahlých priestorov. Naším riešením bolo kompletné zateplenie plochy približne 150 m² pomocou PIR izolačných dosiek s hrúbkou 80 mm, ktoré patria medzi najúčinnejšie tepelnoizolačné materiály na trhu, a následné prekrytie certifikovanou PVC hydroizolačnou fóliou. Táto kombinácia výrazne zlepšila tepelnoizolačné vlastnosti strechy a zároveň zabezpečila jej dlhodobú vodotesnosť. Realizácia na plechovej streche si vyžadovala špecifický kotviaci systém prispôsobený existujúcej nosnej konštrukcii, ktorý sme navrhli v spolupráci so statikom. Zateplenie plechových striech patrí medzi realizácie, ktoré sa investorom vrátia už v priebehu niekoľkých vykurovacích sezón vďaka výraznej úspore energie.',
    gallery: ['/bap6.webp', '/bap1.webp', '/bap2.webp', '/bap3.webp', '/bap4.webp', '/bap5.webp', '/bap7.webp', '/bap8.webp']
  },
  {
    id: '9',
    slug: 'rekonstrukcia-strechy-rovensko',
    title: 'Rekonštrukcia strechy',
    location: 'Slovensko',
    description: 'Kompletná rekonštrukcia strechy rodinného domu.',
    metaDescription: 'Kompletná rekonštrukcia plochej strechy rodinného domu na Slovensku na ploche cca 130 m² – nová PVC hydroizolácia a klampiarske prvky.',
    area: '130 m²',
    system: 'PVC fólia',
    longDescription: 'Rodinný dom na Slovensku mal strechu na konci svojej životnosti, preto sme v spolupráci s partnerskou realizačnou firmou pristúpili ku kompletnej výmene celej skladby na ploche približne 130 m². Práce zahŕňali odstránenie pôvodnej krytiny, montáž novej PVC hydroizolačnej fólie a kompletné klampiarske prvky vrátane odkvapového systému a oplechovania atík. Spolupráca s ďalšou realizačnou firmou nám umožnila zvládnuť projekt v požadovanom termíne aj pri väčšom rozsahu prác. Pri kompletných rekonštrukciách vždy odporúčame dôkladné posúdenie stavu krovu a nosnej konštrukcie ešte pred začatím prác, aby sa predišlo dodatočným nákladom počas realizácie. Výsledkom je strecha s dlhou životnosťou, ktorá rieši nielen aktuálne problémy so zatekaním, ale aj budúce nároky na tepelnú a hydroizolačnú ochranu domu.',
    gallery: ['/rv1.webp', '/rv2.webp', '/rv3.webp', '/rv4.webp', '/rv5.webp']
  },
  {
    id: '10',
    slug: 'nova-strecha-rd-plavecke-podhradie',
    title: 'Nová strecha RD',
    location: 'Plavecké Podhradie',
    description: 'Nová hydroizolácia a zateplenie strechy rodinného domu.',
    metaDescription: 'Nová skladba plochej strechy novostavby v Plaveckom Podhradí na ploche cca 140 m² – zateplenie a hydroizolácia PVC fóliou.',
    area: '140 m²',
    system: 'PVC fólia',
    longDescription: 'Pri novostavbe rodinného domu v Plaveckom Podhradí sme realizovali kompletnú skladbu plochej strechy s plochou približne 140 m² v spolupráci s partnerskou realizačnou firmou. Postup zahŕňal parozábranu, tepelnú izoláciu a finálnu hydroizolačnú PVC fóliu, ktorá je overeným štandardom pre nové plochy strechy vďaka jednoduchej aplikácii zváraním horúcim vzduchom a dlhej životnosti. Pri novostavbách je kľúčové vyriešiť všetky detaily – prestupy inštalácií, atiky a odvodnenie – už počas hrubej stavby, aby sa predišlo komplikáciám po dokončení objektu. Výsledná strecha spĺňa aktuálne požiadavky na energetickú úspornosť a poskytuje spoľahlivú ochranu domu na desaťročia dopredu. Realizácie plochých striech pri novostavbách robíme v spolupráci s partnerskými firmami po celom západnom Slovensku.',
    gallery: ['/pp1.webp', '/pp2.webp', '/pp3.webp', '/pp4.webp', '/pp5.webp']
  },
  {
    id: '11',
    slug: 'biela-strecha-senec',
    title: 'Biela strecha',
    location: 'Senec',
    description: 'Pochôdzna terasa a strecha s bielou PVC fóliou.',
    metaDescription: 'Hydroizolácia strechy a pochôdznej terasy bielou PVC fóliou v Senci na ploche cca 90 m².',
    area: '90 m²',
    system: 'Biela PVC fólia',
    longDescription: 'Na Záhradníckej ulici v Senci sme zrealizovali hydroizoláciu strechy a priľahlej pochôdznej terasy bielou PVC fóliou na ploche približne 90 m². Svetlý povrch fólie odráža výrazne viac slnečného žiarenia než tmavé materiály, čím znižuje tepelné namáhanie strešnej konštrukcie a predlžuje jej životnosť. Terasa zároveň slúži majiteľom ako plnohodnotný pochôdzny priestor bez kompromisov na kvalite hydroizolácie pod ňou. Súčasťou realizácie bolo aj precízne riešenie spádovania, aby sa na povrchu nezhromažďovala voda, a osadenie odtokových prvkov. Biele PVC fólie sú v posledných rokoch čoraz obľúbenejšou voľbou pri rodinných domoch v okolí Bratislavy a Senca, kde investori oceňujú kombináciu estetiky, funkčnosti a nižšej tepelnej záťaže objektu počas letných mesiacov.',
    gallery: ['/sc1.webp', '/sc2.webp', '/sc3.webp', '/sc4.webp', '/sc5.webp']
  },
  {
    id: '12',
    slug: 'strecha-bytovky-martin',
    title: 'Strecha bytovky',
    location: 'Martin',
    description: 'Kompletná výmena strechy bytového domu.',
    metaDescription: 'Kompletná obnova plochej strechy bytového domu v Martine na ploche cca 400 m² – nová PVC hydroizolácia po rokoch zatekania.',
    area: '400 m²',
    system: 'PVC fólia',
    longDescription: 'Bytový dom v Martine si vyžadoval komplexnú obnovu plochej strechy s plochou približne 400 m² po rokoch zanedbanej údržby a opakovaného zatekania do bytov na najvyššom podlaží. Realizovali sme novú hydroizoláciu PVC fóliou vrátane všetkých detailov okolo atík, strešných vpustí a technologických prestupov, ktoré boli hlavnou príčinou predchádzajúcich porúch. Pri realizáciách takéhoto rozsahu je kľúčová dôkladná príprava harmonogramu v spolupráci so správcom bytového domu, aby sa minimalizovali obmedzenia pre obyvateľov. Po dokončení prác sme vykonali kontrolu vodotesnosti všetkých kritických spojov a detailov. Výsledkom je strecha, ktorá trvalo odstránila opakované zatekanie a výrazne znížila náklady spoločenstva vlastníkov na provizórne opravy, ktoré si vyžadovali predchádzajúce roky.',
    gallery: ['/mt1.webp', '/mt2.webp', '/mt3.webp', '/mt4.webp', '/mt5.webp']
  },
  {
    id: '13',
    slug: 'rekonstrukcia-bytovky-trencin',
    title: 'Rekonštrukcia bytovky',
    location: 'Trenčín',
    description: 'Rekonštrukcia plochej strechy bytového domu.',
    metaDescription: 'Rekonštrukcia plochej strechy bytového domu v Trenčíne na ploche cca 350 m² – nová PVC fólia a klampiarske prvky.',
    area: '350 m²',
    system: 'PVC fólia',
    longDescription: 'Bytový dom v Trenčíne dlhodobo trápili opakované problémy so zatekaním spôsobené zastaranou a na viacerých miestach poškodenou hydroizoláciou plochej strechy s celkovou plochou približne 350 m². Po odstránení poškodených vrstiev pôvodnej krytiny sme aplikovali novú hydroizolačnú PVC fóliu a kompletne obnovili všetky klampiarske prvky vrátane oplechovania atík a odkvapového systému. Táto kombinácia zabezpečuje streche spoľahlivú ochranu pred vlhkosťou na dlhé desaťročia dopredu. Rekonštrukcie strechy bytových domov realizujeme s dôrazom na minimalizáciu zásahov do bežného chodu domácností a s presným dodržaním dohodnutého harmonogramu. Spoločenstvám vlastníkov bytov vieme poradiť aj s výberom optimálneho materiálu a postupu vzhľadom na rozpočet a stav existujúcej strešnej konštrukcie.',
    gallery: ['/tn1.webp', '/tn2.webp', '/tn3.webp', '/tn4.webp', '/tn5.webp']
  },
  {
    id: '14',
    slug: 'nova-strecha-domu-krnca',
    title: 'Nová strecha domu',
    location: 'Krnča',
    description: 'Hydroizolácia a zateplenie strechy rodinného domu.',
    metaDescription: 'Trojvrstvová skladba plochej strechy rodinného domu v Krnči na ploche cca 120 m² – zateplenie PIR doskami a PVC hydroizolácia.',
    area: '120 m²',
    system: 'PIR + PVC fólia',
    longDescription: 'Pre rodinný dom v Krnči sme navrhli a zrealizovali trojvrstvovú skladbu plochej strechy s plochou približne 120 m², ktorá kombinuje zateplenie PIR izolačnými doskami s finálnou hydroizolačnou PVC fóliou. PIR dosky patria medzi materiály s najvyššou tepelnoizolačnou účinnosťou pri zachovaní nízkej hrúbky skladby, čo bolo pri tomto projekte dôležitým parametrom. Certifikovaná PVC fólia zaisťuje dlhodobú funkčnosť strechy aj v náročnejších klimatických podmienkach vďaka odolnosti voči UV žiareniu, mrazu aj mechanickému namáhaniu. Všetky spoje boli zvárané horúcim vzduchom, čím sme dosiahli maximálnu vodotesnosť konštrukcie. Kombináciu kvalitnej tepelnej izolácie a hydroizolácie odporúčame najmä pri rodinných domoch, kde majitelia chcú riešiť energetickú úspornosť aj vodotesnosť strechy naraz, v jednej realizácii.',
    gallery: ['/kr1.webp', '/kr2.webp', '/kr3.webp', '/kr4.webp', '/kr5.webp']
  },
  {
    id: '15',
    slug: 'panelova-strecha-petrzalka',
    title: 'Panelová strecha',
    location: 'Bratislava - Petržalka',
    description: 'Obnova strechy bytového domu na sídlisku.',
    metaDescription: 'Rekonštrukcia plochej strechy panelového bytového domu na Iljušinovej ulici v Petržalke (cca 500 m²) – spádová tepelná izolácia, dvojvrstvová asfaltová hydroizolácia SBS a APAO, oprava atík a odvodnenia.',
    area: '500 m²',
    longDescription: 'Na Iljušinovej ulici v Petržalke sme realizovali rekonštrukciu plochej strechy panelového bytového domu s rozlohou približne 500 m², ktorá dlhodobo trpela zatekaním.\n\nRekonštrukcia pozostávala z demontáže pôvodnej PVC fólie, ktorá bola v zlom technickom stave. Strechu sme doplnili o spádovú tepelnú izoláciu na zlepšenie odvodu dažďovej vody a následne sme zhotovili dvojvrstvový hydroizolačný systém. Ten tvorí podkladová termoaktívna vrstva z asfaltových pásov modifikovaných SBS a vrchná hydroizolačná vrstva z asfaltových pásov modifikovaných APAO s ochranným minerálnym posypom.\n\nSúčasťou prác bola aj oprava atík, obnova odvodňovacieho systému a dôkladné opracovanie všetkých prestupov a napojení. Práve tieto detaily sú pri plochých strechách častým miestom porúch a vyžadujú precízne zhotovenie.\n\nObnova strechy bytového domu si vyžaduje dôslednú organizáciu prác a koordináciu so správcom aj obyvateľmi. Vďaka úprave spádovania a novej dvojvrstvovej hydroizolácii získala strecha spoľahlivú ochranu pred zatekaním a predpoklad dlhej životnosti.\n\nRekonštrukcie plochých striech bytových domov realizujeme po celej Bratislave – od diagnostiky a návrhu vhodnej skladby až po odovzdanie hotového diela.',
    gallery: ['/pz5.webp', '/pz1.webp', '/pz2.webp', '/pz3.webp', '/pz4.webp']
  },
  {
    id: '16',
    slug: 'strecha-rodinneho-domu-nesvady',
    title: 'Strecha rodinného domu',
    location: 'Nesvady',
    description: 'Hydroizolácia strechy rodinného domu PVC fóliou.',
    metaDescription: 'Hydroizolácia strechy rodinného domu v Nesvadoch PVC fóliou na ploche cca 100 m² – kompletné klampiarske prvky a odvodnenie.',
    area: '100 m²',
    system: 'PVC fólia',
    longDescription: 'Rodinný dom na Úzkej ulici v Nesvadoch dostal novú strechu s hydroizoláciou PVC fóliou na ploche približne 100 m². Súčasťou realizácie boli aj kompletné klampiarske prvky a odvodnenie, ktoré spolu s kvalitnou hydroizolačnou vrstvou zaisťujú strechu spoľahlivo slúžiť majiteľom bez zásahov na dlhé roky dopredu. PVC fólia bola zvolená pre svoju osvedčenú kombináciu odolnosti, jednoduchej aplikácie a priaznivého pomeru ceny a životnosti, čo z nej robí najčastejšie využívaný materiál pri rekonštrukciách plochých striech rodinných domov na Slovensku. Pred samotnou pokládkou sme dôkladne skontrolovali stav podkladu a v prípade potreby ho pripravili tak, aby nová hydroizolácia mala optimálne podmienky na dlhodobú funkčnosť. Realizácie rodinných domov v okrese Komárno patria medzi časté zákazky nášho tímu.',
    gallery: ['/nsv1.webp', '/nsv2.webp', '/nsv3.webp', '/nsv4.webp', '/nsv5.webp']
  },
  {
    id: '17',
    slug: 'bytovka-562-besenov',
    title: 'Bytovka č. 562',
    location: 'Bešeňov',
    description: 'Kompletná rekonštrukcia strechy bytového domu.',
    metaDescription: 'Kompletná rekonštrukcia strechy bytového domu v Bešeňove na ploche cca 380 m² – riešenie dlhodobého zatekania do bytov.',
    area: '380 m²',
    longDescription: 'Bytový dom č. 562 v Bešeňove prešiel kompletnou rekonštrukciou plochej strechy s celkovou plochou približne 380 m². Odstránili sme pôvodnú, na viacerých miestach poškodenú krytinu a nahradili ju novou hydroizolačnou fóliou vrátane všetkých detailov okolo atík, vpustí a technologických prestupov, ktoré boli hlavnou príčinou dlhodobého zatekania do bytov na najvyššom podlaží. Realizácia tohto rozsahu si vyžadovala presnú koordináciu s obyvateľmi domu a dodržanie dohodnutého harmonogramu, aby sa minimalizovali obmedzenia počas prác. Po dokončení sme vykonali dôkladnú kontrolu vodotesnosti všetkých kritických miest strechy. Výsledkom je strecha, ktorá trvalo vyriešila problémy so zatekaním a spoločenstvu vlastníkov ušetrí náklady na opakované provizórne opravy, ktoré si vyžadoval predchádzajúci nevyhovujúci stav strechy.',
    gallery: ['/bs1.webp', '/bs2.webp', '/bs3.webp', '/bs4.webp', '/bs5.webp']
  },
  {
    id: '18',
    slug: 'strecha-na-kluc-nove-zamky',
    title: 'Strecha na kľúč',
    location: 'Nové Zámky',
    description: 'Realizácia novej strechy rodinného domu od návrhu po odovzdanie.',
    metaDescription: 'Realizácia strechy na kľúč pre rodinný dom v Nových Zámkoch na ploche cca 130 m² – od návrhu až po hydroizoláciu PVC fóliou.',
    area: '130 m²',
    system: 'PVC fólia',
    longDescription: 'Pre rodinný dom na Bočnej ulici v Nových Zámkoch sme zabezpečili realizáciu strechy na kľúč s celkovou plochou približne 130 m² – od zamerania a návrhu skladby, cez zateplenie, až po finálnu hydroizoláciu PVC fóliou. Klient tak dostal kompletné riešenie bez nutnosti koordinovať viacero dodávateľov, čo výrazne zjednodušuje priebeh stavby aj pre investorov, ktorí nemajú skúsenosti so stavebným procesom. Súčasťou realizácie boli aj všetky klampiarske prvky a odvodňovací systém, riešené v úzkej nadväznosti na tepelnoizolačnú vrstvu. Služba realizácie strechy na kľúč je vhodná najmä pre stavebníkov, ktorí chcú mať istotu jedného zodpovedného dodávateľa od návrhu až po odovzdanie hotovej strechy. Tento prístup uplatňujeme pri čoraz väčšom počte projektov v regióne Nových Zámkov aj okolia.',
    gallery: ['/nzb1.webp', '/nzb2.webp', '/nzb3.webp', '/nzb4.webp', '/nzb5.webp']
  }
];
