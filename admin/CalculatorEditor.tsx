import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Save, Calculator } from 'lucide-react';

interface CalculatorSettings {
  id: string;
  base_price_per_m2: number;
  insulation_price_per_m2: number;
  waterproofing_price_per_m2: number;
  premium_material_multiplier: number;
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
        const { data: newData } = await supabase.from('calculator_settings').insert([{}]).select().single();
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Base Price (€/m²)</label>
            <input
              type="number"
              value={settings?.base_price_per_m2 || 0}
              onChange={(e) => setSettings({ ...settings!, base_price_per_m2: parseFloat(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Insulation Price (€/m²)</label>
            <input
              type="number"
              value={settings?.insulation_price_per_m2 || 0}
              onChange={(e) => setSettings({ ...settings!, insulation_price_per_m2: parseFloat(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Waterproofing Price (€/m²)</label>
            <input
              type="number"
              value={settings?.waterproofing_price_per_m2 || 0}
              onChange={(e) => setSettings({ ...settings!, waterproofing_price_per_m2: parseFloat(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Premium Multiplier</label>
            <input
              type="number"
              step="0.1"
              value={settings?.premium_material_multiplier || 1}
              onChange={(e) => setSettings({ ...settings!, premium_material_multiplier: parseFloat(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Discount (%)</label>
            <input
              type="number"
              value={settings?.discount_percentage || 0}
              onChange={(e) => setSettings({ ...settings!, discount_percentage: parseFloat(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Min. Order Price (€)</label>
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
