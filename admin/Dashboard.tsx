import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, FileText, Briefcase, Search, Settings, LogOut, MessageSquare, Calendar, Home, Calculator, HardHat, Globe } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
      }
      setLoading(false);
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-8">
          <h2 className="text-2xl font-black tracking-tighter text-blue-500">TMS CMS</h2>
        </div>
        <nav className="flex-grow px-4 space-y-2 overflow-y-auto">
          <Link to="/admin" className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-800 transition-all font-bold text-sm">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <div className="pt-4 pb-2 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Inbox</div>
          <Link to="/admin/bookings" className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-800 transition-all font-bold text-sm">
            <Calendar className="w-5 h-5" /> Bookings
          </Link>
          <Link to="/admin/leads" className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-800 transition-all font-bold text-sm">
            <MessageSquare className="w-5 h-5" /> Leads
          </Link>
          <div className="pt-4 pb-2 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Content</div>
          <Link to="/admin/homepage" className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-800 transition-all font-bold text-sm">
            <Home className="w-5 h-5" /> Homepage
          </Link>
          <Link to="/admin/pages" className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-800 transition-all font-bold text-sm">
            <FileText className="w-5 h-5" /> Pages
          </Link>
          <Link to="/admin/services" className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-800 transition-all font-bold text-sm">
            <HardHat className="w-5 h-5" /> Services
          </Link>
          <Link to="/admin/projects" className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-800 transition-all font-bold text-sm">
            <Briefcase className="w-5 h-5" /> Projects
          </Link>
          <div className="pt-4 pb-2 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">System</div>
          <Link to="/admin/calculator" className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-800 transition-all font-bold text-sm">
            <Calculator className="w-5 h-5" /> Calculator
          </Link>
          <Link to="/admin/seo-cities" className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-800 transition-all font-bold text-sm">
            <Globe className="w-5 h-5" /> SEO City Pages
          </Link>
          <Link to="/admin/seo" className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-800 transition-all font-bold text-sm">
            <Search className="w-5 h-5" /> SEO
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-800 transition-all font-bold text-sm">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-red-900/20 text-red-400 transition-all font-bold text-sm"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
