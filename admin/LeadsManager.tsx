import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MessageSquare, User, Phone, Trash2, CheckCircle, Clock } from 'lucide-react';

export const LeadsManager: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('leads').update({ status }).eq('id', id);
    fetchLeads();
  };

  const deleteLead = async (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      await supabase.from('leads').delete().eq('id', id);
      fetchLeads();
    }
  };

  if (loading) return <div>Loading leads...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black tracking-tight">LEADS</h2>
        <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          {leads.length} Total
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {leads.map((l) => (
          <div key={l.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <div className="space-y-6 flex-grow">
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    l.status === 'processed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {l.status}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                    <Clock className="w-3 h-3" />
                    {new Date(l.created_at).toLocaleString('sk-SK')}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-900 font-bold">
                      <User className="w-4 h-4 text-blue-500" /> {l.name}
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-sm">
                      <Phone className="w-4 h-4" /> {l.phone}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                      <p className="text-slate-700 text-sm italic">"{l.message}"</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex lg:flex-col gap-2 justify-end">
                <button 
                  onClick={() => updateStatus(l.id, 'processed')}
                  className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors"
                  title="Mark as Processed"
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => deleteLead(l.id)}
                  className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 hover:text-red-500 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {leads.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 font-bold">
            No leads found.
          </div>
        )}
      </div>
    </div>
  );
};
