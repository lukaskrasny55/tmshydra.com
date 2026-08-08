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
    id: '1',
    slug: 'villa-hascak-bratislava',
    title: 'Villa Hasčák',
    location: 'Bratislava',
    description: 'Kompletná rekonštrukcia hydroizolácie.',
    metaDescription: 'Kompletná rekonštrukcia hydroizolácie plochej strechy rodinnej vily v Bratislave – nová fólia, ošetrenie atík a detailov, dlhá životnosť bez zatekania.',
    longDescription: 'Pri rodinnej vile v Bratislave sme realizovali kompletnú rekonštrukciu hydroizolácie plochej strechy. Pôvodná skladba už neplnila svoju funkciu a objavovali sa prvé príznaky zatekania, preto sme pristúpili k dôkladnej diagnostike a následnej výmene celej hydroizolačnej vrstvy za certifikovanú fóliu s vysokou odolnosťou voči UV žiareniu a poveternostným vplyvom. Súčasťou realizácie bolo aj ošetrenie všetkých detailov – atík, prestupov a odkvapového systému, ktoré sú pri plochých strechách najčastejším miestom porúch. Vďaka precíznemu prevedeniu a použitiu overených materiálov získala strecha dlhú životnosť bez nutnosti ďalších zásahov. Realizácie tohto typu robíme na rodinných domoch po celom Bratislavskom kraji – od diagnostiky, cez návrh skladby, až po odovzdanie hotového diela s garanciou kvality.',
    gallery: ['/vh1.jpg', '/vh2.jpg', '/vh3.jpg', '/vh4.jpg']
  },
  {
    id: '2',
    slug: 'oprava-strechy-nove-zamky',
    title: 'Oprava strechy',
    location: 'Nové Zámky',
    description: 'Lokálne opravy a pretesnenie strechy.',
    metaDescription: 'Lokálna oprava a pretesnenie zatekajúcej plochej strechy rodinného domu v Nových Zámkoch – cielená oprava namiesto nákladnej výmeny celej skladby.',
    longDescription: 'Plochá strecha rodinného domu v Nových Zámkoch trpela opakovaným zatekaním v oblasti prestupov a spojov hydroizolácie. Namiesto plošnej výmeny celej skladby sme zvolili cielenú lokálnu opravu – identifikovali sme presné miesta porúch, odstránili poškodené úseky pôvodnej krytiny a nahradili ich novým, dôkladne privareným materiálom vrátane pretesnenia všetkých kritických detailov. Tento prístup je pre majiteľov rodinných domov často ekonomickejším riešením, ak je zvyšná časť strechy ešte v dobrom technickom stave. Po dokončení opravy sme zrealizovali kontrolu vodotesnosti, aby sme mali istotu, že problém so zatekaním je definitívne vyriešený. Lokálne opravy plochých striech robíme na celom Slovensku a odporúčame ich vždy, keď to stav strechy objektívne umožňuje – ušetria čas aj náklady oproti kompletnej rekonštrukcii.',
    gallery: ['/nz1.jpg', '/nz2.jpg', '/nz3.jpg', '/nz4.jpg']
  },
  {
    id: '3',
    slug: 'novostavba-kolta',
    title: 'Novostavba',
    location: 'Kolta',
    description: 'Zateplenie + TPO fólia.',
    metaDescription: 'Kompletná skladba plochej strechy novostavby v Kolte – zateplenie a hydroizolácia TPO fóliou od základov, riešené už v hrubej stavbe.',
    system: 'TPO fólia',
    longDescription: 'Pri novostavbe rodinného domu v obci Kolta sme od základov riešili kompletnú skladbu plochej strechy vrátane zateplenia a hydroizolácie TPO fóliou. TPO fólia patrí medzi moderné hydroizolačné materiály s vynikajúcou odolnosťou voči UV žiareniu, mechanickému poškodeniu aj teplotným výkyvom, a preto je čoraz obľúbenejšou voľbou pri nových stavbách. Zateplenie sme navrhli s dôrazom na aktuálne požiadavky na energetickú hospodárnosť budov, aby strecha dlhodobo prispievala k nízkym nákladom na vykurovanie. Všetky detaily – atiky, prestupy inštalácií aj odvodnenie – sme riešili už vo fáze hrubej stavby v úzkej spolupráci so stavebníkom, čo je pri novostavbách kľúčové pre bezproblémové fungovanie strechy na desiatky rokov dopredu. Realizácie plochých striech pri novostavbách robíme na celom západnom Slovensku.',
    gallery: ['/ns1.jpg', '/ns2.jpg', '/ns3.jpg', '/ns4.jpg']
  },
  {
    id: '4',
    slug: 'bytovy-dom-dubnica',
    title: 'Bytový dom',
    location: 'Dubnica',
    description: 'Nová strecha bytového domu.',
    metaDescription: 'Nová strecha bytového domu v Dubnici po rokoch zatekania – kompletná hydroizolácia, klampiarske prvky a odvodnenie.',
    longDescription: 'Bytový dom v Dubnici potreboval kompletne novú strechu po rokoch opakovaného zatekania spôsobeného zastaranou a poškodenou pôvodnou krytinou. Realizovali sme odstránenie starej skladby a montáž novej hydroizolačnej vrstvy vrátane všetkých klampiarskych prvkov, atík a odvodňovacieho systému, ktoré sú pri bytových domoch najčastejšou príčinou porúch. Pri realizáciách na obytných budovách kladieme dôraz na minimalizáciu obmedzení pre obyvateľov počas prác a na dodržanie harmonogramu dohodnutého so správcom domu. Výsledkom je strecha, ktorá dlhodobo ochráni budovu pred vlhkosťou a zastaví opakované náklady na provizórne opravy, ktoré si vyžadovali predchádzajúce roky. Rekonštrukcie striech bytových domov patria medzi naše kľúčové realizácie – vieme poradiť aj s výberom materiálu a postupu tak, aby zodpovedal rozpočtu spoločenstva vlastníkov.',
    gallery: ['/bdv1.jpeg', '/bdv2.jpg', '/bdv3.jpg']
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
    gallery: ['/bl1.jpeg', '/bl2.jpeg', '/bl3.jpeg']
  },
  {
    id: '6',
    slug: 'zelena-strecha-belgicko',
    title: 'Zelená strecha',
    location: 'Belgicko',
    description: 'Prémiová TPO fólia na administratívnom objekte.',
    metaDescription: 'Prémiová TPO fólia na plochej streche administratívneho objektu v Belgicku – medzinárodná realizácia TMS-HYDRA.',
    system: 'TPO fólia',
    longDescription: 'Pre administratívny objekt v Belgicku sme dodali a nainštalovali prémiovú TPO fóliu ako hydroizolačnú vrstvu plochej strechy. Táto zákazka potvrdzuje, že kvalitu a spoľahlivosť našich realizácií oceňujú aj klienti mimo Slovenska. TPO fólia bola zvolená pre svoju vysokú odolnosť voči poveternostným vplyvom, chemickú stabilitu a dlhú životnosť, čo sú kľúčové parametre pri komerčných a administratívnych budovách s vysokými nárokmi na bezúdržbovú prevádzku. Realizácia zahŕňala presné napojenie na všetky strešné prestupy, atiky a technologické zariadenia umiestnené na streche. Medzinárodné projekty realizujeme s rovnakým dôrazom na kvalitu spracovania a dodržanie termínov ako zákazky na Slovensku. Skúsenosti z komerčných realizácií v zahraničí následne zúročujeme aj pri projektoch pre slovenských klientov.',
    gallery: ['/b1.jpg', '/b2.jpg', '/b3.jpg']
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
    gallery: ['/md1.jpg', '/md2.jpg', '/md3.jpg', '/md4.jpg', '/md5.jpg']
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
    gallery: ['/bap1.jpg', '/bap2.jpg', '/bap3.jpg', '/bap4.jpg', '/bap5.jpg']
  },
  {
    id: '9',
    slug: 'rekonstrukcia-strechy-rovensko',
    title: 'Rekonštrukcia strechy',
    location: 'Rovensko',
    description: 'Kompletná rekonštrukcia strechy rodinného domu.',
    metaDescription: 'Kompletná rekonštrukcia plochej strechy rodinného domu v Rovensku na ploche cca 130 m² – nová PVC hydroizolácia a klampiarske prvky.',
    area: '130 m²',
    system: 'PVC fólia',
    longDescription: 'Rodinný dom v Rovensku mal strechu na konci svojej životnosti, preto sme v spolupráci s partnerskou realizačnou firmou pristúpili ku kompletnej výmene celej skladby na ploche približne 130 m². Práce zahŕňali odstránenie pôvodnej krytiny, montáž novej PVC hydroizolačnej fólie a kompletné klampiarske prvky vrátane odkvapového systému a oplechovania atík. Spolupráca s ďalšou realizačnou firmou nám umožnila zvládnuť projekt v požadovanom termíne aj pri väčšom rozsahu prác. Pri kompletných rekonštrukciách vždy odporúčame dôkladné posúdenie stavu krovu a nosnej konštrukcie ešte pred začatím prác, aby sa predišlo dodatočným nákladom počas realizácie. Výsledkom je strecha s dlhou životnosťou, ktorá rieši nielen aktuálne problémy so zatekaním, ale aj budúce nároky na tepelnú a hydroizolačnú ochranu domu.',
    gallery: ['/rv1.jpg', '/rv2.jpg', '/rv3.jpg', '/rv4.jpg', '/rv5.jpg']
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
    gallery: ['/pp1.jpg', '/pp2.jpg', '/pp3.jpg', '/pp4.jpg', '/pp5.jpg']
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
    gallery: ['/sc1.jpg', '/sc2.jpg', '/sc3.jpg', '/sc4.jpg', '/sc5.jpg']
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
    gallery: ['/mt1.jpg', '/mt2.jpg', '/mt3.jpg', '/mt4.jpg', '/mt5.jpg']
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
    gallery: ['/tn1.jpg', '/tn2.jpg', '/tn3.jpg', '/tn4.jpg', '/tn5.jpg']
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
    gallery: ['/kr1.jpg', '/kr2.jpg', '/kr3.jpg', '/kr4.jpg', '/kr5.jpg']
  },
  {
    id: '15',
    slug: 'panelova-strecha-petrzalka',
    title: 'Panelová strecha',
    location: 'Bratislava - Petržalka',
    description: 'Obnova strechy bytového domu na sídlisku.',
    metaDescription: 'Obnova strechy panelového bytového domu v Petržalke na ploche cca 500 m² – nová hydroizolácia a oprava odvodnenia.',
    area: '500 m²',
    longDescription: 'Na Iljušinovej ulici v Petržalke sme obnovovali strechu panelového bytového domu s plochou približne 500 m², ktorá dlhodobo trpela zatekaním spôsobeným opotrebovanou pôvodnou hydroizoláciou typickou pre panelové domy z minulého storočia. Nová hydroizolačná vrstva bola doplnená o opravu atík a kompletného odvodňovacieho systému, ktoré sú pri panelových strechách najčastejším zdrojom porúch. Realizácie na sídliskových panelových domoch si vyžadujú špecifický prístup – veľkú plochu strechy, množstvo technologických prestupov a koordináciu so správcovskou spoločnosťou aj obyvateľmi. Nová hydroizolácia rieši problém pri koreni a predlžuje životnosť strechy o desiatky rokov, čím sa spoločenstvu vlastníkov vrátia náklady na opakované provizórne opravy z predchádzajúcich rokov. Obnovu striech panelových domov realizujeme na sídliskách po celej Bratislave.',
    gallery: ['/pz1.jpg', '/pz2.jpg', '/pz3.jpg', '/pz4.jpg', '/pz5.jpg']
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
    gallery: ['/nsv1.jpg', '/nsv2.jpg', '/nsv3.jpg', '/nsv4.jpg', '/nsv5.jpg']
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
    gallery: ['/bs1.jpg', '/bs2.jpg', '/bs3.jpg', '/bs4.jpg', '/bs5.jpg']
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
    gallery: ['/nzb1.jpg', '/nzb2.jpg', '/nzb3.jpg', '/nzb4.jpg', '/nzb5.jpg']
  }
];
