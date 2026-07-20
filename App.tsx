import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Calculator } from './components/Calculator';
import { BookingCalendar } from './components/BookingCalendar';
import { CityLinks } from './components/CityLinks';
import { Footer } from './components/Footer';

import { AppView } from './types';
import { Seo } from './components/Seo';
import { GoogleAds } from './components/GoogleAds';
import { SeoCityPage } from './components/SeoCityPage';
import GoogleAnalytics from './components/GoogleAnalytics';

const AboutPage = lazy(() =>
  import('./components/pages/AboutPage').then(module => ({
    default: module.AboutPage
  }))
);

const ServicesPage = lazy(() =>
  import('./components/pages/ServicesPage').then(module => ({
    default: module.ServicesPage
  }))
);

const OtherServicesPage = lazy(() =>
  import('./components/pages/OtherServicesPage').then(module => ({
    default: module.OtherServicesPage
  }))
);

const ProjectsPage = lazy(() =>
  import('./components/pages/ProjectsPage').then(module => ({
    default: module.ProjectsPage
  }))
);

const TechPage = lazy(() =>
  import('./components/pages/TechPage').then(module => ({
    default: module.TechPage
  }))
);

const ContactPage = lazy(() =>
  import('./components/pages/ContactPage').then(module => ({
    default: module.ContactPage
  }))
);


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
            <CityLinks />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Seo slug={getSlug()} />
      <GoogleAds />
      <GoogleAnalytics />

      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        showCalculator={true}
      />

      <Suspense fallback={<div className="p-10">Načítava sa...</div>}>
  <div className="flex-grow">{renderContent()}</div>
</Suspense>

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
