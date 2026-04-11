import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Briefcase, FileText, Clock, TrendingUp } from 'lucide-react';

export const Stats: React.FC = () => {
  const [stats, setStats] = useState({
    projects: 0,
    pages: 0,
    lastUpdate: 'N/A'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [projectsRes, pagesRes] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact' }),
        supabase.from('pages').select('id, updated_at', { count: 'exact' })
      ]);

      const lastUpdate = pagesRes.data?.reduce((latest, page) => {
        const pageDate = new Date(page.updated_at);
        return pageDate > latest ? pageDate : latest;
      }, new Date(0));

      setStats({
        projects: projectsRes.count || 0,
        pages: pagesRes.count || 0,
        lastUpdate: lastUpdate && lastUpdate.getTime() > 0 ? lastUpdate.toLocaleString('sk-SK') : 'N/A'
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) return <div className="animate-pulse space-y-8">
    <div className="h-12 bg-slate-200 rounded-xl w-1/4"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => <div key={i} className="h-48 bg-slate-200 rounded-[2.5rem]"></div>)}
    </div>
  </div>;

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Dashboard Overview</h1>
        <div className="flex items-center gap-2 text-blue-600 font-bold text-sm bg-blue-50 px-4 py-2 rounded-full">
          <TrendingUp className="w-4 h-4" />
          <span>System Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Projects Stat */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 group hover:border-blue-200 transition-all">
          <div className="mb-6 p-4 bg-blue-50 w-fit rounded-2xl group-hover:scale-110 transition-transform">
            <Briefcase className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-5xl font-black text-slate-900 mb-2">{stats.projects}</div>
          <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Total Projects</div>
        </div>

        {/* Pages Stat */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 group hover:border-blue-200 transition-all">
          <div className="mb-6 p-4 bg-blue-50 w-fit rounded-2xl group-hover:scale-110 transition-transform">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-5xl font-black text-slate-900 mb-2">{stats.pages}</div>
          <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Managed Pages</div>
        </div>

        {/* Last Update Stat */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 group hover:border-blue-200 transition-all">
          <div className="mb-6 p-4 bg-blue-50 w-fit rounded-2xl group-hover:scale-110 transition-transform">
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-xl font-black text-slate-900 mb-2">{stats.lastUpdate}</div>
          <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">Last Content Update</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 transform translate-x-32"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-4 tracking-tight">Welcome back, Admin.</h2>
          <p className="text-slate-400 max-w-xl mb-8 font-medium">
            Manage your website content, track leads, and update your portfolio from this central dashboard.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all">
              View Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
