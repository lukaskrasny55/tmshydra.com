import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Save, Calculator } from 'lucide-react';

interface CalculatorSettings {
  id: string;
  price_single: number;
  price_double: number;
  price_triple_pir: number;
  price_mpvc: number;
  discount_percentage: number;
  minimum_order_price: number;
}

export const CalculatorEditor: React.FC = () => {
  const [settings, setSettings] = useState<CalculatorSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase.from('calculator_settings').select('*').single();
    if (error) {
      console.error(error);
      // If no settings exist, create default
      if (error.code === 'PGRST116') {
        const { data: newData } = await supabase.from('calculator_settings').insert([{
          price_single: 22,
          price_double: 33,
          price_triple_pir: 70,
          price_mpvc: 28
        }]).select().single();
        setSettings(newData);
      }
    } else {
      setSettings(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    const { error } = await supabase.from('calculator_settings').update(settings).eq('id', settings.id);
    if (error) alert('Error saving: ' + error.message);
    else alert('Calculator settings updated!');
    setSaving(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Calculator Settings</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Jednovrstvová (€/m²)</label>
            <input
              type="number"
              value={settings?.price_single || 0}
              onChange={(e) => setSettings({ ...settings!, price_single: parseFloat(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Dvojvrstvová (€/m²)</label>
            <input
              type="number"
              value={settings?.price_double || 0}
              onChange={(e) => setSettings({ ...settings!, price_double: parseFloat(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Trojvrstvová PIR (€/m²)</label>
            <input
              type="number"
              value={settings?.price_triple_pir || 0}
              onChange={(e) => setSettings({ ...settings!, price_triple_pir: parseFloat(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">mPVC fólia (€/m²)</label>
            <input
              type="number"
              value={settings?.price_mpvc || 0}
              onChange={(e) => setSettings({ ...settings!, price_mpvc: parseFloat(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Zľava (%)</label>
            <input
              type="number"
              value={settings?.discount_percentage || 0}
              onChange={(e) => setSettings({ ...settings!, discount_percentage: parseFloat(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Min. cena objednávky (€)</label>
            <input
              type="number"
              value={settings?.minimum_order_price || 0}
              onChange={(e) => setSettings({ ...settings!, minimum_order_price: parseFloat(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
