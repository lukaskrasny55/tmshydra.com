import React from 'react';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            Kontakt
          </h1>

          <p className="mt-6 text-xl text-slate-300 max-w-2xl">
            Kontaktujte nás pre bezplatnú obhliadku, cenovú ponuku alebo odbornú konzultáciu.
          </p>
        </div>
      </section>

      {/* KONTAKTNÉ INFORMÁCIE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-16">

            {/* ADRESA */}
            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200 shadow-sm">
              <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tight">
                Kontaktné údaje
              </h2>

              <div className="space-y-8">

                {/* ADRESA */}
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-3">
                    Adresa
                  </p>

                  <p className="text-3xl font-black text-slate-800 leading-tight">
                    Krížna 79<br />
                    Palárikovo<br />
                    94111
                  </p>

                  <p className="mt-4 text-lg font-bold tracking-[0.4em] text-blue-600 uppercase">
                    Slovensko
                  </p>
                </div>

                {/* ICO */}
                <div className="border-t border-slate-200 pt-8">
                  <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-3">
                    IČO
                  </p>

                  <p className="text-2xl font-black text-slate-800">
                    57 086 699
                  </p>
                </div>

                {/* DIC */}
                <div className="border-t border-slate-200 pt-8">
                  <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-3">
                    DIČ
                  </p>

                  <p className="text-2xl font-black text-slate-800">
                    2122561485
                  </p>
                </div>

                {/* EMAIL */}
                <div className="border-t border-slate-200 pt-8">
                  <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-5">
                    E-mail
                  </p>

                  <div className="space-y-4">

                    <a
                      href="mailto:info@tmshydra.com"
                      className="block text-xl font-black text-slate-800 hover:text-blue-600 transition"
                    >
                      info@tmshydra.com
                    </a>

                    <a
                      href="mailto:solnokytomas2@gmail.com"
                      className="block text-xl font-black text-slate-800 hover:text-blue-600 transition"
                    >
                      solnokytomas2@gmail.com
                    </a>

                  </div>
                </div>

              </div>
            </div>

            {/* TELEFÓNY */}
            <div className="space-y-8">

              {/* TECHNIK */}
              <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-5 mb-8">

                  <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-slate-800"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a2 2 0 011.94 1.515l.57 2.28a2 2 0 01-.45 1.91l-1.27 1.27a16 16 0 006.36 6.36l1.27-1.27a2 2 0 011.91-.45l2.28.57A2 2 0 0121 18.72V22a2 2 0 01-2 2h-1C9.163 24 0 14.837 0 3V2a2 2 0 012-2h1z"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">
                      Technik
                    </p>

                    <div className="w-24 h-1 bg-blue-600 mt-2 rounded-full"></div>
                  </div>
                </div>

                <a
                  href="tel:+421911551354"
                  className="text-4xl font-black text-slate-800 hover:text-blue-600 transition"
                >
                  +421 911 551 354
                </a>
              </div>

              {/* KANCELÁRIA */}
              <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-5 mb-8">

                  <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-slate-800"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a2 2 0 011.94 1.515l.57 2.28a2 2 0 01-.45 1.91l-1.27 1.27a16 16 0 006.36 6.36l1.27-1.27a2 2 0 011.91-.45l2.28.57A2 2 0 0121 18.72V22a2 2 0 01-2 2h-1C9.163 24 0 14.837 0 3V2a2 2 0 012-2h1z"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">
                      Kancelária
                    </p>

                    <div className="w-24 h-1 bg-blue-600 mt-2 rounded-full"></div>
                  </div>
                </div>

                <a
                  href="tel:+421911551354"
                  className="text-4xl font-black text-slate-800 hover:text-blue-600 transition"
                >
                  +421 911 551 354
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
