import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Save } from 'lucide-react';
import { getPageSections, updatePageSection } from '../lib/cms';

interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  updated_at: string;
}

export const PagesManager: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [sections, setSections] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    if (selectedPage?.slug === 'about') {
      fetchSections(selectedPage.slug);
    } else {
      setSections({});
    }
  }, [selectedPage]);

  const fetchPages = async () => {
    const { data, error } = await supabase.from('pages').select('*').order('slug');
    if (error) console.error(error);
    else setPages(data || []);
    setLoading(false);
  };

  const fetchSections = async (slug: string) => {
    const data = await getPageSections(slug);
    setSections(data);
  };

  const getPageSectionKeys = (slug: string) => {
    switch (slug) {
      case 'home':
        return [
          { key: 'hero_title', label: 'Hero Title' },
          { key: 'hero_highlight_text', label: 'Highlight Text' },
          { key: 'hero_description', label: 'Hero Description' },
          { key: 'hero_button_primary_text', label: 'Primary Button Text' },
          { key: 'hero_button_secondary_text', label: 'Secondary Button Text' },
          { key: 'hero_background_image', label: 'Background Image URL' },
          { key: 'hero_side_image', label: 'Side Image URL' },
          { key: 'hero_side_image_alt', label: 'Side Image Alt' },
          { key: 'hero_trust_number', label: 'Trust Number (e.g. 12+)' },
          { key: 'hero_trust_text', label: 'Trust Text (e.g. Rokov skúseností)' },
          { key: 'hero_features', label: 'Features List (JSON Array)', type: 'textarea' }
        ];
      case 'about':
        return [
          { key: 'hero_title', label: 'Hero Title' },
          { key: 'subtitle', label: 'Subtitle' },
          { key: 'tagline', label: 'Tagline' },
          { key: 'intro_text', label: 'Intro Text', type: 'textarea' },
          { key: 'story_text', label: 'Story Text', type: 'textarea' },
          { key: 'cta_text', label: 'CTA Text', type: 'textarea' },
          { key: 'symbolism_title', label: 'Symbolism Title' },
          { key: 'symbolism_text_1', label: 'Symbolism Text 1', type: 'textarea' },
          { key: 'symbolism_text_2', label: 'Symbolism Text 2', type: 'textarea' },
          { key: 'protection_text', label: 'Protection Text', type: 'textarea' },
          { key: 'partnership_text', label: 'Partnership Text', type: 'textarea' },
          { key: 'feature_1_title', label: 'Feature 1 Title' },
          { key: 'feature_1_text', label: 'Feature 1 Text' },
          { key: 'feature_2_title', label: 'Feature 2 Title' },
          { key: 'feature_2_text', label: 'Feature 2 Text' },
          { key: 'founder_image', label: 'Founder Image URL' },
          { key: 'founder_name', label: 'Founder Name' },
          { key: 'promise_title', label: 'Promise Title' },
          { key: 'promise_text', label: 'Promise Text', type: 'textarea' },
          { key: 'promise_author', label: 'Promise Author' }
        ];
      case 'services':
        return [
          { key: 'title_main', label: 'Title Main' },
          { key: 'title_accent', label: 'Title Accent' },
          { key: 'subtitle', label: 'Subtitle', type: 'textarea' }
        ];
      case 'tech':
        return [
          { key: 'title_main', label: 'Title Main' },
          { key: 'title_accent', label: 'Title Accent' },
          { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
          { key: 'compositions', label: 'Roof Compositions (JSON)', type: 'textarea' }
        ];
      case 'projects':
        return [
          { key: 'title_main', label: 'Title Main' },
          { key: 'title_accent', label: 'Title Accent' },
          { key: 'subtitle', label: 'Subtitle', type: 'textarea' }
        ];
      case 'contact':
        return [
          { key: 'title_main', label: 'Title Main' },
          { key: 'title_accent', label: 'Title Accent' },
          { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
          { key: 'address_line1', label: 'Address Line 1' },
          { key: 'address_line2', label: 'Address Line 2' },
          { key: 'address_line3', label: 'Address Line 3' },
          { key: 'country', label: 'Country' },
          { key: 'phone', label: 'Phone (Internal)' },
          { key: 'phone_display', label: 'Phone (Display)' }
        ];
      default:
        return [];
    }
  };

  const handleSave = async () => {
    if (!selectedPage) return;
    setSaving(true);
    setMessage(null);

    try {
      const sectionKeys = getPageSectionKeys(selectedPage.slug);
      for (const { key } of sectionKeys) {
        await updatePageSection(selectedPage.slug, key, sections[key] || '');
      }

      const { error } = await supabase
        .from('pages')
        .update({
          title: selectedPage.title,
          content: selectedPage.content,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedPage.id);

      if (error) throw error;
      setMessage('Saved successfully!');
    } catch (error: any) {
      setMessage('Error saving: ' + error.message);
    } finally {
      setSaving(false);
      fetchPages();
    }
  };

  const handleSectionChange = (key: string, value: string) => {
    setSections(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Pages Manager</h1>
        {selectedPage && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>

      {message && (
        <div className={`p-4 rounded-xl font-bold text-sm ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Page</h3>
          <div className="space-y-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setSelectedPage(page)}
                className={`w-full text-left p-4 rounded-2xl font-bold transition-all ${selectedPage?.id === page.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'}`}
              >
                {page.title} <span className="block text-[10px] opacity-50 uppercase tracking-widest mt-1">/{page.slug}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8">
          {selectedPage ? (
            <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Page Title</label>
                <input
                  type="text"
                  value={selectedPage.title}
                  onChange={(e) => setSelectedPage({ ...selectedPage, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
                />
              </div>

              <div className="space-y-6">
                {getPageSectionKeys(selectedPage.slug).map(({ key, label, type }) => (
                  <div key={key} className="space-y-3">
                    <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">{label}</label>
                    {type === 'textarea' ? (
                      <textarea
                        rows={4}
                        value={sections[key] || ''}
                        onChange={(e) => handleSectionChange(key, e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={sections[key] || ''}
                        onChange={(e) => handleSectionChange(key, e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
                      />
                    )}
                  </div>
                ))}

                {getPageSectionKeys(selectedPage.slug).length === 0 && (
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Content (JSON or Text)</label>
                    <textarea
                      rows={15}
                      value={selectedPage.content}
                      onChange={(e) => setSelectedPage({ ...selectedPage, content: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-mono text-sm resize-none"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-slate-100 rounded-[3rem] border-2 border-dashed border-slate-200 text-slate-400 font-bold">
              Select a page to edit
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
