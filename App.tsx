import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Calculator } from './components/Calculator';
import { BookingCalendar } from './components/BookingCalendar';
import { CityLinks } from './components/CityLinks';
import { Footer } from './components/Footer';

import { ROUTE_PATHS, getSlugForPath } from './routePaths';
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

const HomePage: React.FC = () => (
  <main className="w-full overflow-x-hidden">
    <Hero />
    <Calculator />
    <BookingCalendar />
    <CityLinks />
  </main>
);

const Layout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Seo slug={getSlugForPath(location.pathname)} />
      <GoogleAds />
      <GoogleAnalytics />

      <Navbar showCalculator={true} />

      <Suspense fallback={<div className="p-10">Načítava sa...</div>}>
        <div className="flex-grow">
          <Outlet />
        </div>
      </Suspense>

      <Footer />
    </div>
  );
};

const MainSite: React.FC = () => {
  const navigate = useNavigate();
  const goHome = () => navigate(ROUTE_PATHS.home);
  const goContact = () => navigate(ROUTE_PATHS.contact);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="o-nas" element={<AboutPage onBack={goHome} />} />
        <Route
          path="sluzby"
          element={<ServicesPage onBack={goHome} onNavigateToContact={goContact} />}
        />
        <Route
          path="ostatne-sluzby"
          element={<OtherServicesPage onBack={goHome} onNavigateToContact={goContact} />}
        />
        <Route path="realizacie" element={<ProjectsPage onBack={goHome} />} />
        <Route path="technologie" element={<TechPage onBack={goHome} />} />
        <Route path="kontakt" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
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
