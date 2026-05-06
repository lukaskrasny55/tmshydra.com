import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

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
import ContactPage from './components/pages/ContactPage';

import { AppView } from './types';
import { Seo } from './components/Seo';
import { GoogleAds } from './components/GoogleAds';
import { SeoCityPage } from './components/SeoCityPage';

const MainSite: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const getSlug = () => {
    switch (currentView) {
      case AppView.ABOUT:
        return 'about';
      case AppView.SERVICES:
        return 'services';
      case AppView.OTHER_SERVICES:
        return 'other-services';
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
            <Calculator />
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
        showCalculator={true}
      />

      <div className="flex-grow">{renderContent()}</div>

      <Footer onNavigate={setCurrentView} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/sluzby/:service/:city" element={<SeoCityPage />} />
      <Route path="*" element={<MainSite />} />
    </Routes>
  );
};

export default App;
