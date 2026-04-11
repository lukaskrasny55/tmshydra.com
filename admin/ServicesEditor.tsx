import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Trash2, Upload, Save, MoveUp, MoveDown } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  short_description: string;
  full_description: string;
  icon: string;
  image_url: string;
  display_order: number;
}

export const ServicesEditor: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) console.error(error);
    else setServices(data || []);
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `service-${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) {
      alert('Error uploading image: ' + uploadError.message);
    } else {
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);
      setEditingService(prev => ({ ...prev, image_url: publicUrl }));
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!editingService?.title) return;
    setSaving(true);
    const { error } = editingService.id 
      ? await supabase.from('services').update(editingService).eq('id', editingService.id)
      : await supabase.from('services').insert([{ ...editingService, display_order: services.length }]);

    if (error) alert('Error saving: ' + error.message);
    else {
      setEditingService(null);
      fetchServices();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) alert('Error deleting: ' + error.message);
    else fetchServices();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Services Editor</h1>
        <button
          onClick={() => setEditingService({})}
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all"
        >
          <Plus className="w-5 h-5" /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex items-center justify-between group">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                {service.image_url ? (
                  <img src={service.image_url} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">No Image</div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-1">{service.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-1 max-w-md">{service.short_description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setEditingService(service)}
                className="p-4 bg-slate-50 text-slate-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                <Save className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleDelete(service.id)}
                className="p-4 bg-slate-50 text-slate-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl rounded-[3rem] p-10 shadow-2xl space-y-8 overflow-y-auto max-h-[90vh]">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
              {editingService.id ? 'Edit Service' : 'New Service'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Title</label>
                  <input
                    type="text"
                    value={editingService.title || ''}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Icon Name (Lucide)</label>
                  <input
                    type="text"
                    value={editingService.icon || ''}
                    onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
                    placeholder="Search, HardHat, etc."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Short Description</label>
                  <textarea
                    rows={3}
                    value={editingService.short_description || ''}
                    onChange={(e) => setEditingService({ ...editingService, short_description: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold resize-none"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Full Description</label>
                  <textarea
                    rows={6}
                    value={editingService.full_description || ''}
                    onChange={(e) => setEditingService({ ...editingService, full_description: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Image</label>
                  <div className="flex items-center gap-6">
                    {editingService.image_url && (
                      <img src={editingService.image_url} className="w-20 h-20 rounded-xl object-cover border border-slate-200" />
                    )}
                    <label className="flex-grow cursor-pointer bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-slate-100 transition-all">
                      <Upload className="w-6 h-6 text-slate-400 mb-1" />
                      <span className="text-xs font-bold text-slate-500">{uploading ? 'Uploading...' : 'Upload Image'}</span>
                      <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="flex-grow bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Service'}
              </button>
              <button
                onClick={() => setEditingService(null)}
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
