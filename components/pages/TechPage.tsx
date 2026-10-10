import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Zap, AlertTriangle, Phone, ArrowRight } from 'lucide-react';
import { HeroSection } from '../HeroSection';
import { trackConversion } from '../GoogleAds';
import { ROUTE_PATHS } from '../../routePaths';

interface Props {
  onBack: () => void;
}

interface Layer {
  text: string;
  // Preparatory step (penetračný náter, systémové lepidlo) — shown, but not
  // numbered because it is not counted as a functional layer.
  prep?: boolean;
}

interface ProtectSystem {
  code: string;
  name: string;
  tagline: string;
  usage: string;
  image: string;
  imageAlt: string;
  layers: Layer[];
  note?: string;
}

const systems: ProtectSystem[] = [
  {
    code: '1PROTECT',
    name: 'BASIC',
    tagline: 'Cenovo dostupná obnova hydroizolácie.',
    usage: 'Jednoduchá obnova existujúcej asfaltovej strechy bez zateplenia.',
    image: '/protect/1protect-basic.webp',
    imageAlt: 'TMS-HYDRA 1Protect Basic – postup obnovy hydroizolácie plochej strechy',
    layers: [
      { text: 'Penetračný náter', prep: true },
      { text: 'Vrchná hydroizolačná vrstva APAO' },
    ],
  },
  {
    code: '2PROTECT',
    name: 'STANDARD',
    tagline: 'Vyššia bezpečnosť a životnosť vďaka dvom hydroizolačným vrstvám.',
    usage: 'Rekonštrukcia bez zateplenia s dvojvrstvovou hydroizolačnou ochranou.',
    image: '/protect/2protect-standard.webp',
    imageAlt: 'TMS-HYDRA 2Protect Standard – dvojvrstvová hydroizolácia plochej strechy',
    layers: [
      { text: 'Penetračný náter', prep: true },
      { text: 'Podkladná hydroizolačná vrstva' },
      { text: 'Vrchná hydroizolačná vrstva APAO' },
    ],
  },
  {
    code: '3PROTECT',
    name: 'PLUS',
    tagline: 'Zateplenie a nová hydroizolácia s využitím pôvodnej vrstvy.',
    usage: 'Zateplenie existujúcej asfaltovej strechy bez realizácie novej parozábrany.',
    image: '/protect/3protect-plus.webp',
    imageAlt: 'TMS-HYDRA 3Protect Plus – zateplenie plochej strechy PIR na pôvodnom asfaltovom podklade',
    layers: [
      { text: 'Existujúca asfaltová vrstva ako parotesná vrstva' },
      { text: 'Systémové lepidlo', prep: true },
      { text: 'PIR tepelná izolácia' },
      { text: 'Termoaktívna vrstva' },
      { text: 'Vrchná hydroizolačná vrstva APAO' },
    ],
    note:
      'Systém 3Protect Plus je možné použiť iba vtedy, keď kontrolné sondy preukážu, že pôvodná asfaltová hydroizolácia je suchá, pevná, súdržná, vzduchotesná a vhodná na prevzatie funkcie parotesnej vrstvy. Pri nevyhovujúcom stave sa použije 4Protect Premium s novou parozábranou.',
  },
  {
    code: '4PROTECT',
    name: 'PREMIUM',
    tagline: 'Maximálna tepelná a hydroizolačná ochrana bez závislosti od pôvodného pásu.',
    usage: 'Kompletné rekonštrukcie a nové strechy s celou novou skladbou.',
    image: '/protect/4protect-premium.webp',
    imageAlt: 'TMS-HYDRA 4Protect Premium – kompletná rekonštrukcia plochej strechy so zateplením',
    layers: [
      { text: 'Penetračný náter', prep: true },
      { text: 'Nová parozábrana' },
      { text: 'PIR tepelná izolácia' },
      { text: 'Termoaktívna vrstva' },
      { text: 'Vrchná hydroizolačná vrstva APAO' },
    ],
  },
];

const comparison = [
  { system: '1Protect Basic', hydro: '1 vrstva', pir: 'Nie', vapor: 'Nie', level: 'Základná' },
  { system: '2Protect Standard', hydro: '2 vrstvy', pir: 'Nie', vapor: 'Nie', level: 'Štandardná' },
  { system: '3Protect Plus', hydro: '2 vrstvy', pir: 'Áno', vapor: 'Nie, využíva sa vhodný pôvodný', level: 'Rozšírená' },
  { system: '4Protect Premium', hydro: '2 vrstvy', pir: 'Áno', vapor: 'Áno', level: 'Najvyššia' },
];

export const TechPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection
        title="HYDROIZOLAČNÉ SYSTÉMY"
        accentTitle="TMS-HYDRA PROTECT"
        subtitle="Štyri úrovne ochrany. Jedno poctivé remeslo."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Úvod + prehľad */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-6 leading-tight uppercase tracking-tighter">
              Produktová rada Protect
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium mb-4">
              Produktová rada TMS-Hydra Protect rozdeľuje realizované riešenia podľa počtu novo
              zhotovených hlavných funkčných vrstiev. Umožňuje zákazníkovi jednoducho porovnať rozsah
              obnovy, mieru ochrany aj možnosť zateplenia strechy.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Penetračný náter a systémové lepidlo sa do počtu vrstiev nezapočítavajú. Konečná skladba
              sa vždy potvrdzuje po obhliadke, kontrolných sondách a posúdení existujúceho podkladu.
            </p>
            <p className="text-blue-600 font-black uppercase tracking-wide">
              Od obnovy hydroizolácie až po kompletné zateplenie strechy.
            </p>
          </div>

          <div className="max-w-md mx-auto w-full">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="/protect/protect-prehlad.webp"
                alt="TMS-HYDRA Protect – prehľad hydroizolačných systémov 1Protect Basic až 4Protect Premium"
                width={1080}
                height={1350}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Jednotlivé systémy */}
        <div className="space-y-24">
          {systems.map((s, idx) => (
            <section
              key={s.code}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="max-w-md mx-auto w-full rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                  <img
                    src={s.image}
                    alt={s.imageAlt}
                    width={1080}
                    height={1350}
                    loading="lazy"
                    className="w-full h-auto"
                  />
                </div>
              </div>

              <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="inline-block bg-slate-900 text-yellow-400 font-black px-4 py-1.5 rounded-lg tracking-widest text-sm mb-4">
                  {s.code} {s.name}
                </div>

                <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight uppercase tracking-tighter">
                  {s.tagline}
                </h2>

                <p className="text-slate-600 text-lg leading-relaxed font-medium mb-8">
                  <span className="font-black text-slate-900">Použitie: </span>
                  {s.usage}
                </p>

                <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-4">
                  Skladba
                </h3>

                <div className="space-y-3">
                  {(() => {
                    let n = 0;
                    return s.layers.map((layer, lIdx) => {
                      if (!layer.prep) n += 1;
                      return (
                        <div key={lIdx} className="flex items-start gap-4">
                          {layer.prep ? (
                            <div className="w-8 h-8 border-2 border-blue-200 text-blue-400 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xs">
                              •
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-black text-xs shadow-lg shadow-blue-600/20">
                              {n}
                            </div>
                          )}
                          <span
                            className={`pt-1.5 text-sm uppercase tracking-wide ${
                              layer.prep ? 'text-slate-500 font-semibold' : 'text-slate-700 font-bold'
                            }`}
                          >
                            {layer.text}
                            {layer.prep && (
                              <span className="normal-case tracking-normal font-medium text-slate-400">
                                {' '}
                                (nezapočítava sa do vrstiev)
                              </span>
                            )}
                          </span>
                        </div>
                      );
                    });
                  })()}
                </div>

                {s.note && (
                  <div className="mt-8 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-900 leading-relaxed">
                      <span className="font-black">Dôležité technické upozornenie: </span>
                      {s.note}
                    </p>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Porovnanie */}
        <section className="mt-28">
          <h2 className="text-3xl font-black text-slate-900 mb-8 leading-tight uppercase tracking-tighter text-center">
            Porovnanie systémov
          </h2>

          <div className="overflow-x-auto rounded-3xl shadow-xl border border-slate-100 bg-white">
            <table className="w-full min-w-[640px] text-left">
              <thead className="bg-slate-900 text-white text-xs uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4 font-black">Systém</th>
                  <th className="px-6 py-4 font-black">Nová hydroizolácia</th>
                  <th className="px-6 py-4 font-black">PIR zateplenie</th>
                  <th className="px-6 py-4 font-black">Nová parozábrana</th>
                  <th className="px-6 py-4 font-black">Úroveň</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 text-sm">
                {comparison.map((row, i) => (
                  <tr key={row.system} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                    <td className="px-6 py-4 font-black text-slate-900">{row.system}</td>
                    <td className="px-6 py-4 font-medium">{row.hydro}</td>
                    <td className="px-6 py-4 font-medium">{row.pir}</td>
                    <td className="px-6 py-4 font-medium">{row.vapor}</td>
                    <td className="px-6 py-4 font-black text-blue-600">{row.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Výzva */}
        <section className="mt-16 bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3">
            Nie ste si istí, ktorý systém je pre vašu strechu?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8 font-medium">
            Konečnú skladbu vždy určíme po bezplatnej obhliadke a kontrolných sondách. Keď strechu, tak poriadne.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={ROUTE_PATHS.contact}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              Bezplatná obhliadka
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+421911551354"
              onClick={() => trackConversion('call')}
              className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              +421 911 551 354
            </a>
          </div>
        </section>
      </div>

      <div className="bg-white border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8 text-blue-600" />
              </div>

              <h3 className="text-xl font-black uppercase tracking-tight">
                Certifikované systémy
              </h3>

              <p className="text-slate-500 text-sm font-medium">
                Používame výhradne materiály od renomovaných výrobcov s platnými certifikátmi.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-blue-600" />
              </div>

              <h3 className="text-xl font-black uppercase tracking-tight">
                Záruka až 15 rokov
              </h3>

              <p className="text-slate-500 text-sm font-medium">
                Za kvalitou našej práce si stojíme, preto poskytujeme nadštandardné záruky.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>

              <h3 className="text-xl font-black uppercase tracking-tight">
                Inovácie
              </h3>

              <p className="text-slate-500 text-sm font-medium">
                Neustále sledujeme trendy a implementujeme najnovšie technologické postupy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
