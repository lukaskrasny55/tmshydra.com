import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Save } from 'lucide-react';

interface Settings {
  id: string;
  site_name: string;
  google_ads_id: string;
  google_tag_manager_id: string;
  conversion_event_form: string;
  conversion_event_booking: string;
  show_calculator: boolean;
}

export const SettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase.from('settings').select('*').single();
    if (error) console.error(error);
    else setSettings(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    const { error } = await supabase.from('settings').update(settings).eq('id', settings.id);
    if (error) alert('Error saving settings: ' + error.message);
    else alert('Settings saved successfully!');
    setSaving(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Marketing Settings</h1>
        {settings && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save Settings'}
          </button>
        )}
      </div>

      {settings ? (
        <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100 space-y-12">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Site Name</label>
            <input
              type="text"
              value={settings.site_name}
              onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
              placeholder="TMS-HYDRA"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Google Ads ID</label>
              <input
                type="text"
                value={settings.google_ads_id}
                onChange={(e) => setSettings({ ...settings, google_ads_id: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
                placeholder="AW-XXXXXXXXX"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Google Tag Manager ID</label>
              <input
                type="text"
                value={settings.google_tag_manager_id}
                onChange={(e) => setSettings({ ...settings, google_tag_manager_id: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
                placeholder="GTM-XXXXXXX"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Conversion Event: Form Submit</label>
              <input
                type="text"
                value={settings.conversion_event_form}
                onChange={(e) => setSettings({ ...settings, conversion_event_form: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
                placeholder="form_submission"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Conversion Event: Booking</label>
              <input
                type="text"
                value={settings.conversion_event_booking}
                onChange={(e) => setSettings({ ...settings, conversion_event_booking: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
                placeholder="booking_complete"
              />
            </div>
            <div className="space-y-3 flex items-center gap-4 pt-6">
              <button
                type="button"
                onClick={() => setSettings({ ...settings, show_calculator: !settings.show_calculator })}
                className={`w-14 h-8 rounded-full transition-all relative ${settings.show_calculator ? 'bg-blue-600' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${settings.show_calculator ? 'left-7' : 'left-1'}`} />
              </button>
              <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Zobraziť kalkulačku na webe</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 text-red-600 p-8 rounded-2xl font-bold">
          Error: Settings not found in database. Please ensure the 'settings' table has at least one row.
        </div>
      )}
    </div>
  );
};
