import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Save, Upload, Image as ImageIcon } from 'lucide-react';

export const HomepageEditor: React.FC = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchHomepage();
  }, []);

  const fetchHomepage = async () => {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'home')
      .single();
    
    if (!error && data) {
      try {
        setContent(JSON.parse(data.content));
      } catch (e) {
        setContent({});
      }
    }
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `hero-bg-${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) {
      alert('Error uploading image: ' + uploadError.message);
    } else {
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);
      setContent({ ...content, hero_background_image: publicUrl });
    }
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('pages')
      .update({
        content: JSON.stringify(content),
        updated_at: new Date().toISOString()
      })
      .eq('slug', 'home');

    if (error) alert('Error saving: ' + error.message);
    else alert('Homepage updated successfully!');
    setSaving(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Homepage Editor</h1>
        <button
          onClick={handleSave}
          disabled={saving || uploading}
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100 space-y-12">
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Hero Title</label>
            <input
              type="text"
              value={content?.hero_title || ''}
              onChange={(e) => setContent({ ...content, hero_title: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Hero Highlight Text</label>
            <input
              type="text"
              value={content?.hero_highlight_text || ''}
              onChange={(e) => setContent({ ...content, hero_highlight_text: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Hero Description</label>
            <textarea
              rows={3}
              value={content?.hero_description || ''}
              onChange={(e) => setContent({ ...content, hero_description: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Primary Button Text</label>
              <input
                type="text"
                value={content?.hero_button_primary_text || ''}
                onChange={(e) => setContent({ ...content, hero_button_primary_text: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Secondary Button Text</label>
              <input
                type="text"
                value={content?.hero_button_secondary_text || ''}
                onChange={(e) => setContent({ ...content, hero_button_secondary_text: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Hero Background Image</label>
            <div className="flex items-center gap-8">
              {content?.hero_background_image && (
                <div className="w-48 h-32 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-lg">
                  <img src={content.hero_background_image} className="w-full h-full object-cover" />
                </div>
              )}
              <label className="flex-grow cursor-pointer bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-slate-100 transition-all group">
                <Upload className="w-8 h-8 text-slate-400 mb-2 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm font-bold text-slate-500">{uploading ? 'Uploading...' : 'Upload New Hero Image'}</span>
                <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
