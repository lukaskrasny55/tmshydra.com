
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle, Send, User, Phone, Mail, MapPin } from 'lucide-react';
import { trackConversion } from './GoogleAds';
import { supabase } from '../lib/supabase';

export const BookingCalendar: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [booking, setBooking] = useState({
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const availableTimes = ['09:00', '11:00', '13:00', '15:00'];
  
  // Get next 5 working days
  const getNextDays = () => {
    const days = [];
    const now = new Date();
    let i = 1;
    while (days.length < 5 && i < 15) { // search up to 14 days ahead for 5 working days
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const dayOfWeek = d.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip Sunday (0) and Saturday (6)
        days.push(d);
      }
      i++;
    }
    return days;
  };

  const days = getNextDays();

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from('bookings').insert([{
      date: booking.date,
      time: booking.time,
      name: booking.name,
      phone: booking.phone,
      email: booking.email,
      address: booking.address
    }]);

    if (!error) {
      setStep(3);
      trackConversion('booking');
    } else {
      alert('Chyba pri odosielaní rezervácie. Skúste to prosím neskôr.');
    }
  };

  if (step === 3) {
    return (
      <section id="calendar" className="py-12 bg-slate-50 scroll-mt-20 w-full max-w-full">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-100 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Požiadavka odoslaná!</h2>
            <p className="text-lg text-slate-600 mb-8">
              Ďakujeme, {booking.name}. Budeme vás kontaktovať ohľadom potvrdenia termínu <strong>{new Date(booking.date).toLocaleDateString('sk-SK')}</strong> o <strong>{booking.time}</strong>.
            </p>
            <button 
              onClick={() => { setStep(1); setBooking({ date: '', time: '', name: '', phone: '', email: '', address: '' }); }}
              className="text-blue-600 font-bold hover:underline"
            >
              Naplánovať ďalšiu obhliadku
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="calendar" className="py-12 bg-slate-50 scroll-mt-20 border-t border-slate-100 w-full max-w-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-4">
            <CalendarIcon className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Rezervujte si bezplatnú obhliadku</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Vyberte si termín, ktorý vám vyhovuje. Prídeme, zameriame a poradíme vám najlepšie riešenie pre vašu strechu.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          <div className="flex flex-col md:flex-row">
            {/* Steps indicator */}
            <div className="bg-slate-900 md:w-64 p-8 text-white">
              <div className="space-y-8">
                <div className={`flex items-center gap-4 ${step === 1 ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step === 1 ? 'bg-blue-600 border-blue-600' : 'border-slate-500'}`}>1</div>
                  <span className="font-semibold">Termín</span>
                </div>
                <div className={`flex items-center gap-4 ${step === 2 ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step === 2 ? 'bg-blue-600 border-blue-600' : 'border-slate-500'}`}>2</div>
                  <span className="font-semibold">Údaje</span>
                </div>
              </div>
            </div>

            <div className="flex-grow p-8 sm:p-12">
              {step === 1 ? (
                <div className="animate-in slide-in-from-right duration-300">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-blue-600" />
                    Vyberte deň
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
                    {days.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => setBooking({ ...booking, date: d.toISOString() })}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          booking.date === d.toISOString() 
                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                            : 'bg-white border-slate-100 hover:border-blue-200 text-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold uppercase opacity-60 mb-1">
                          {d.toLocaleDateString('sk-SK', { weekday: 'short' })}
                        </div>
                        <div className="text-lg font-bold">
                          {d.getDate()}.{d.getMonth() + 1}.
                        </div>
                      </button>
                    ))}
                  </div>

                  {booking.date && (
                    <div className="animate-in fade-in slide-in-from-top duration-300">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        Vyberte čas
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
                        {availableTimes.map((t) => (
                          <button
                            key={t}
                            onClick={() => setBooking({ ...booking, time: t })}
                            className={`py-3 rounded-xl border-2 font-bold transition-all ${
                              booking.time === t 
                                ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                                : 'bg-white border-slate-100 hover:border-blue-200 text-slate-700'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end mt-12">
                    <button
                      disabled={!booking.date || !booking.time}
                      onClick={() => setStep(2)}
                      className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold disabled:opacity-20 transition-all hover:bg-slate-800"
                    >
                      Pokračovať k údajom
                    </button>
                  </div>
                </div>
              ) : (
                <div className="animate-in slide-in-from-right duration-300">
                  <h3 className="text-xl font-bold mb-6">Vaše kontaktné údaje</h3>
                  <form onSubmit={handleBooking} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                          required
                          type="text"
                          placeholder="Meno a priezvisko"
                          value={booking.name}
                          onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-100 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                          required
                          type="tel"
                          placeholder="Telefónne číslo"
                          value={booking.phone}
                          onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-100 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        required
                        type="email"
                        placeholder="E-mail"
                        value={booking.email}
                        onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-100 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        required
                        type="text"
                        placeholder="Adresa obhliadky (mesto, ulica)"
                        value={booking.address}
                        onChange={(e) => setBooking({ ...booking, address: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-100 focus:border-blue-500 focus:ring-0 outline-none transition-all"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-slate-500 font-bold hover:text-slate-800"
                      >
                        Späť na výber termínu
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center gap-2"
                      >
                        <Send className="w-5 h-5" />
                        Odoslať rezerváciu
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
