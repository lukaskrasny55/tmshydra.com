import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Trash2, Upload, Save } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  image_url: string;
  created_at: string;
}

export const ProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    else setProjects(data || []);
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('projects')
      .upload(filePath, file);

    if (uploadError) {
      alert('Error uploading image: ' + uploadError.message);
    } else {
      const { data: { publicUrl } } = supabase.storage.from('projects').getPublicUrl(filePath);
      setEditingProject(prev => ({ ...prev, image_url: publicUrl }));
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!editingProject?.title) return;
    setSaving(true);
    const { error } = editingProject.id 
      ? await supabase.from('projects').update(editingProject).eq('id', editingProject.id)
      : await supabase.from('projects').insert([editingProject]);

    if (error) alert('Error saving project: ' + error.message);
    else {
      setEditingProject(null);
      fetchProjects();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) alert('Error deleting project: ' + error.message);
    else fetchProjects();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Projects Manager</h1>
        <button
          onClick={() => setEditingProject({})}
          className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all"
        >
          <Plus className="w-5 h-5" /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 group">
            <div className="h-48 overflow-hidden relative">
              <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => setEditingProject(project)}
                  className="bg-white/90 backdrop-blur p-3 rounded-xl text-slate-900 hover:bg-white transition-all shadow-lg"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(project.id)}
                  className="bg-red-500/90 backdrop-blur p-3 rounded-xl text-white hover:bg-red-500 transition-all shadow-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">{project.location}</div>
              <h3 className="text-xl font-black text-slate-900 mb-2">{project.title}</h3>
              <p className="text-slate-500 text-sm line-clamp-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl space-y-8 overflow-y-auto max-h-[90vh]">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
              {editingProject.id ? 'Edit Project' : 'New Project'}
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Title</label>
                <input
                  type="text"
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Location</label>
                <input
                  type="text"
                  value={editingProject.location || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Description</label>
                <textarea
                  rows={4}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-bold resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Image</label>
                <div className="flex items-center gap-6">
                  {editingProject.image_url && (
                    <img src={editingProject.image_url} className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-100" />
                  )}
                  <label className="flex-grow cursor-pointer bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-slate-100 transition-all">
                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-sm font-bold text-slate-500">{uploading ? 'Uploading...' : 'Click to upload image'}</span>
                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="flex-grow bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Project'}
              </button>
              <button
                onClick={() => setEditingProject(null)}
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
