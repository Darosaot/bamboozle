import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import GameApp from './components/GameApp';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import NavigationMenu from './components/NavigationMenu';
import ErrorBoundary from './components/ErrorBoundary';
import { trackPageView } from './utils/analytics';

// Lazy load pages for better performance
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const About = lazy(() => import('./pages/About'));
const EducationalResources = lazy(() => import('./pages/EducationalResources'));
const FAQ = lazy(() => import('./pages/FAQ'));
const HowToPlay = lazy(() => import('./pages/HowToPlay'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mb-4"></div>
        <p className="text-purple-700 font-semibold">Cargando...</p>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  // Track page views in Google Analytics
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  // Show footer on all pages except game screens
  const showFooter = location.pathname !== '/';

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Saltar al contenido principal
        </a>

        <NavigationMenu />

        <main id="main-content" className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<GameApp />} />
              <Route path="/privacidad" element={<PrivacyPolicy />} />
              <Route path="/terminos" element={<TermsOfService />} />
              <Route path="/acerca" element={<About />} />
              <Route path="/recursos" element={<EducationalResources />} />
              <Route path="/preguntas-frecuentes" element={<FAQ />} />
              <Route path="/ayuda" element={<HowToPlay />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        {showFooter && <Footer />}
        <CookieConsent />
      </div>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}
