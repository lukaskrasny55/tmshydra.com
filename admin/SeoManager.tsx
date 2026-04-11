import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Save, Upload } from 'lucide-react';

interface SeoEntry {
  id: string;
  page_slug: string;
  meta_title: string;
  meta_description: string;
  keywords: string;
  og_image: string;
}

export const SeoManager: React.FC = () => {
  const [seoEntries, setSeoEntries] = useState<SeoEntry[]>([]);
  const [selectedSeo, setSelectedSeo] = useState<SeoEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSeo();
  }, []);

  const fetchSeo = async () => {
    const { data, error } = await supabase.from('seo').select('*').order('page_slug');
    if (error) console.error(error);
    else setSeoEntries(data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!selectedSeo) return;
    setSaving(true);
    const { error } = await supabase.from('seo').update(selectedSeo).eq('id', selectedSeo.id);
    if (error) alert('Error saving SEO: ' + error.message);
    else alert('SEO saved successfully!');
    setSaving(false);
    fetchSeo();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !selectedSeo) return;
    setUploading(true);
    const file = e.target.files[0];
    const fileName = `seo-${selectedSeo.page_slug}-${Math.random()}.${file.name.split('.').pop()}`;
    
    const { error: uploadError } = await supabase.storage.from('projects').upload(fileName, file);
    if (uploadError) alert('Error uploading: ' + uploadError.message);
    else {
      const { data: { publicUrl } } = supabase.storage.from('projects').getPublicUrl(fileName);
      setSelectedSeo({ ...selectedSeo, og_image: publicUrl });
    }
    setUploading(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">SEO Manager</h1>
        {selectedSeo && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save SEO'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Page</h3>
          <div className="space-y-2">
            {seoEntries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setSelectedSeo(entry)}
                className={`w-full text-left p-4 rounded-2xl font-bold transition-all ${selectedSeo?.id === entry.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'}`}
              >
                {entry.page_slug.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8">
          {selectedSeo ? (
            <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Meta Title</label>
                <input
                  type="text"
                  value={selectedSeo.meta_title}
                  onChange={(e) => setSelectedSeo({ ...selectedSeo, meta_title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Meta Description</label>
                <textarea
                  rows={3}
                  value={selectedSeo.meta_description}
                  onChange={(e) => setSelectedSeo({ ...selectedSeo, meta_description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold resize-none"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Keywords (comma separated)</label>
                <input
                  type="text"
                  value={selectedSeo.keywords}
                  onChange={(e) => setSelectedSeo({ ...selectedSeo, keywords: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">OG Image URL</label>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    value={selectedSeo.og_image}
                    onChange={(e) => setSelectedSeo({ ...selectedSeo, og_image: e.target.value })}
                    className="flex-grow bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
                  />
                  <label className="cursor-pointer bg-slate-900 text-white p-4 rounded-2xl hover:bg-slate-800 transition-all">
                    <Upload className="w-5 h-5" />
                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-slate-100 rounded-[3rem] border-2 border-dashed border-slate-200 text-slate-400 font-bold">
              Select a page to edit SEO
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
