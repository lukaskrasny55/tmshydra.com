
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Calculator } from './components/Calculator';
import { BookingCalendar } from './components/BookingCalendar';
import { Footer } from './components/Footer';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { OtherServicesPage } from './components/pages/OtherServicesPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { TechPage } from './components/pages/TechPage';
import { ContactPage } from './components/pages/ContactPage';
import { ProcessSection } from './components/ProcessSection';
import { AppView } from './types';
import { Seo } from './components/Seo';
import { GoogleAds } from './components/GoogleAds';

// Admin Imports
import { Dashboard } from './admin/Dashboard';
import { Login } from './admin/Login';
import { PagesManager } from './admin/PagesManager';
import { ProjectsManager } from './admin/ProjectsManager';
import { SeoManager } from './admin/SeoManager';
import { SettingsManager } from './admin/SettingsManager';
import { BookingsManager } from './admin/BookingsManager';
import { LeadsManager } from './admin/LeadsManager';
import { Stats } from './admin/Stats';
import { HomepageEditor } from './admin/HomepageEditor';
import { CalculatorEditor } from './admin/CalculatorEditor';
import { ServicesEditor } from './admin/ServicesEditor';
import { SeoCityPagesManager } from './admin/SeoCityPagesManager';
import { SeoCityPage } from './components/SeoCityPage';

const MainSite: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [showCalculator, setShowCalculator] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase.from('settings').select('show_calculator').single();
        if (error) throw error;
        if (data && typeof data.show_calculator === 'boolean') {
          setShowCalculator(data.show_calculator);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
        // Fallback to default if fetch fails
        setShowCalculator(true);
      }
    };
    fetchSettings();
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const getSlug = () => {
    switch (currentView) {
      case AppView.ABOUT: return 'about';
      case AppView.SERVICES: return 'services';
      case AppView.OTHER_SERVICES: return 'other-services';
      case AppView.PROJECTS: return 'projects';
      case AppView.TECH: return 'tech';
      case AppView.CONTACT: return 'contact';
      default: return 'home';
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.ABOUT:
        return <AboutPage onBack={() => setCurrentView(AppView.HOME)} />;
      case AppView.SERVICES:
        return (
          <ServicesPage 
            onBack={() => setCurrentView(AppView.HOME)} 
            onNavigateToContact={() => setCurrentView(AppView.CONTACT)} 
          />
        );
      case AppView.OTHER_SERVICES:
        return (
          <OtherServicesPage 
            onBack={() => setCurrentView(AppView.HOME)} 
            onNavigateToContact={() => setCurrentView(AppView.CONTACT)} 
          />
        );
      case AppView.PROJECTS:
        return <ProjectsPage onBack={() => setCurrentView(AppView.HOME)} />;
      case AppView.TECH:
        return <TechPage onBack={() => setCurrentView(AppView.HOME)} />;
      case AppView.CONTACT:
        return <ContactPage onBack={() => setCurrentView(AppView.HOME)} />;
      default:
        return (
          <main className="w-full overflow-x-hidden">
            <Hero onNavigate={(view) => setCurrentView(view)} />
            {showCalculator && <Calculator />}
            <BookingCalendar />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Seo slug={getSlug()} />
      <GoogleAds />
      <Navbar currentView={currentView} onNavigate={setCurrentView} showCalculator={showCalculator} />
      
      <div className="flex-grow">
        {renderContent()}
      </div>

      <Footer onNavigate={setCurrentView} />
    </div>
  );
};

import { isSupabaseConfigured } from './lib/supabase';

const ConfigurationWarning: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
    <div className="max-w-md w-full bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl text-center">
      <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
        <span className="text-4xl text-amber-500">⚠️</span>
      </div>
      <h1 className="text-2xl font-bold mb-4">Konfigurácia chýba</h1>
      <p className="text-slate-400 mb-8 leading-relaxed">
        Aplikácia vyžaduje prepojenie so službou Supabase. Prosím, nastavte nasledujúce premenné prostredia v nastaveniach platformy:
      </p>
      <div className="space-y-3 text-left mb-8">
        <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 font-mono text-xs text-blue-400">
          VITE_SUPABASE_URL
        </div>
        <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 font-mono text-xs text-blue-400">
          VITE_SUPABASE_ANON_KEY
        </div>
      </div>
      <p className="text-slate-500 text-sm">
        Po nastavení premenných sa aplikácia automaticky reštartuje.
      </p>
    </div>
  </div>
);

const App: React.FC = () => {
  if (!isSupabaseConfigured) {
    return <ConfigurationWarning />;
  }

  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<Dashboard />}>
        <Route index element={<Stats />} />
        <Route path="bookings" element={<BookingsManager />} />
        <Route path="leads" element={<LeadsManager />} />
        <Route path="homepage" element={<HomepageEditor />} />
        <Route path="pages" element={<PagesManager />} />
        <Route path="services" element={<ServicesEditor />} />
        <Route path="projects" element={<ProjectsManager />} />
        <Route path="calculator" element={<CalculatorEditor />} />
        <Route path="seo-cities" element={<SeoCityPagesManager />} />
        <Route path="seo" element={<SeoManager />} />
        <Route path="settings" element={<SettingsManager />} />
      </Route>
      <Route path="/sluzby/:service/:city" element={<SeoCityPage />} />
      <Route path="*" element={<MainSite />} />
    </Routes>
  );
};

export default App;
