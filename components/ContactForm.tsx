import React, { useState } from 'react';
import { User, Mail, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { trackConversion } from './GoogleAds';

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Chyba odoslania');
      }

      setIsSubmitted(true);
      trackConversion('form');
    } catch (err) {
      alert('Chyba pri odoslaní správy. Skúste to prosím neskôr, alebo nám rovno zavolajte.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <p className="text-lg font-bold text-slate-900 mb-1">Správa odoslaná!</p>
        <p className="text-slate-600 text-sm">Ozveme sa vám čo najskôr.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          required
          type="text"
          placeholder="Meno a priezvisko"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white focus:border-blue-500 focus:ring-0 outline-none transition-all"
        />
      </div>
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          required
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white focus:border-blue-500 focus:ring-0 outline-none transition-all"
        />
      </div>
      <div className="relative">
        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="tel"
          placeholder="Telefón (nepovinné, pre rýchlejšiu odpoveď)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white focus:border-blue-500 focus:ring-0 outline-none transition-all"
        />
      </div>
      <div className="relative">
        <MessageSquare className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
        <textarea
          required
          placeholder="Vaša správa"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={4}
          maxLength={2000}
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white focus:border-blue-500 focus:ring-0 outline-none transition-all resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Send className="w-5 h-5" />
        {isSubmitting ? 'Odosielam...' : 'Odoslať správu'}
      </button>
    </form>
  );
};
