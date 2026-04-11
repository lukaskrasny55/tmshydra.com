import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Calculator } from './components/Calculator';
import { BookingCalendar } from './components/BookingCalendar';
import { Footer } from './components/Footer';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { TechPage } from './components/pages/TechPage';
import { ContactPage } from './components/pages/ContactPage';
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
  const [showCalculator] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const getSlug = () => {
    switch (currentView) {
      case AppView.ABOUT:
        return 'about';
      case AppView.SERVICES:
        return 'services';
      case AppView.PROJECTS:
        return 'projects';
      case AppView.TECH:
        return 'tech';
      case AppView.CONTACT:
        return 'contact';
      default:
        return 'home';
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
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        showCalculator={showCalculator}
      />

      <div className="flex-grow">{renderContent()}</div>

      <Footer onNavigate={setCurrentView} />
    </div>
  );
};

const App: React.FC = () => {
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
