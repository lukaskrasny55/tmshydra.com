import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Trash2, Save, RefreshCw, Search, MapPin, Globe } from 'lucide-react';

interface SeoCityPage {
  id: string;
  service: string;
  city: string;
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  content: string;
}

const services = [
  { id: 'hydroizolacia-plochej-strechy', name: 'Hydroizolácia plochej strechy' },
  { id: 'zateplenie-plochej-strechy', name: 'Zateplenie plochej strechy' },
  { id: 'oprava-plochej-strechy', name: 'Oprava plochej strechy' }
];

const defaultCities = [
  'Bratislava', 'Trnava', 'Nitra', 'Trenčín', 'Žilina', 'Banská Bystrica', 'Prešov', 'Košice'
];

export const SeoCityPagesManager: React.FC = () => {
  const [pages, setPages] = useState<SeoCityPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<Partial<SeoCityPage> | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    const { data, error } = await supabase
      .from('seo_city_pages')
      .select('*')
      .order('city', { ascending: true });
    if (error) console.error(error);
    else setPages(data || []);
    setLoading(false);
  };

  const generateContent = (service: string, city: string) => {
    const serviceName = services.find(s => s.id === service)?.name || service;
    const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
    
    return {
      title: `${serviceName} ${formattedCity}`,
      meta_title: `${serviceName} ${formattedCity} | TMS-HYDRA`,
      meta_description: `Profesionálna ${serviceName.toLowerCase()} v meste ${formattedCity}. Kontaktujte TMS-HYDRA pre bezplatnú obhliadku strechy.`,
      content: `Naša spoločnosť TMS-HYDRA poskytuje profesionálne služby ${serviceName.toLowerCase()} v meste ${formattedCity}. Špecializujeme sa na hydroizolácie a zateplenie plochých striech s využitím moderných technológií a kvalitných materiálov.`
    };
  };

  const handleSave = async () => {
    if (!editingPage?.service || !editingPage?.city) return;
    setSaving(true);
    
    const slug = `${editingPage.service}/${editingPage.city.toLowerCase()}`;
    const dataToSave = {
      ...editingPage,
      slug,
      city: editingPage.city.toLowerCase()
    };

    const { error } = editingPage.id 
      ? await supabase.from('seo_city_pages').update(dataToSave).eq('id', editingPage.id)
      : await supabase.from('seo_city_pages').insert([dataToSave]);

    if (error) alert('Error saving: ' + error.message);
    else {
      setEditingPage(null);
      fetchPages();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    const { error } = await supabase.from('seo_city_pages').delete().eq('id', id);
    if (error) alert('Error deleting: ' + error.message);
    else fetchPages();
  };

  const regenerateContent = () => {
    if (!editingPage?.service || !editingPage?.city) return;
    const generated = generateContent(editingPage.service, editingPage.city);
    setEditingPage({ ...editingPage, ...generated });
  };

  const filteredPages = pages.filter(p => 
    p.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">SEO City Pages</h1>
        <button
          onClick={() => setEditingPage({})}
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all"
        >
          <Plus className="w-5 h-5" /> Add SEO Page
        </button>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
        <div className="relative mb-8">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text"
            placeholder="Search by city or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-16 pr-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-100">
                <th className="pb-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">City</th>
                <th className="pb-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Service</th>
                <th className="pb-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Slug</th>
                <th className="pb-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.map((page) => (
                <tr key={page.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-4 font-bold text-slate-900 capitalize">{page.city}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium">
                    {services.find(s => s.id === page.service)?.name || page.service}
                  </td>
                  <td className="py-4 px-4">
                    <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">/sluzby/{page.slug}</code>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setEditingPage(page)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(page.id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] p-10 shadow-2xl space-y-8 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                {editingPage.id ? 'Edit SEO Page' : 'New SEO Page'}
              </h2>
              <button 
                onClick={regenerateContent}
                className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-700"
              >
                <RefreshCw className="w-4 h-4" /> Regenerate AI Content
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">City</label>
                  <input
                    type="text"
                    list="cities-list"
                    value={editingPage.city || ''}
                    onChange={(e) => setEditingPage({ ...editingPage, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
                    placeholder="e.g. Bratislava"
                  />
                  <datalist id="cities-list">
                    {defaultCities.map(c => <option key={c} value={c} />)}
                  </datalist>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Service</label>
                  <select
                    value={editingPage.service || ''}
                    onChange={(e) => setEditingPage({ ...editingPage, service: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
                  >
                    <option value="">Select Service</option>
                    {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Page Title</label>
                  <input
                    type="text"
                    value={editingPage.title || ''}
                    onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Meta Title</label>
                  <input
                    type="text"
                    value={editingPage.meta_title || ''}
                    onChange={(e) => setEditingPage({ ...editingPage, meta_title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Meta Description</label>
                  <textarea
                    rows={3}
                    value={editingPage.meta_description || ''}
                    onChange={(e) => setEditingPage({ ...editingPage, meta_description: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Main Content</label>
              <textarea
                rows={8}
                value={editingPage.content || ''}
                onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold resize-none"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-grow bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save SEO Page'}
              </button>
              <button
                onClick={() => setEditingPage(null)}
                className="px-10 bg-slate-100 text-slate-500 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
