import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GameApp from './components/GameApp';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import About from './pages/About';
import EducationalResources from './pages/EducationalResources';
import FAQ from './pages/FAQ';
import HowToPlay from './pages/HowToPlay';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

function AppContent() {
  const location = useLocation();

  // Show footer on all pages except game screens
  const showFooter = location.pathname !== '/';

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<GameApp />} />
          <Route path="/privacidad" element={<PrivacyPolicy />} />
          <Route path="/terminos" element={<TermsOfService />} />
          <Route path="/acerca" element={<About />} />
          <Route path="/recursos" element={<EducationalResources />} />
          <Route path="/preguntas-frecuentes" element={<FAQ />} />
          <Route path="/ayuda" element={<HowToPlay />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
      <CookieConsent />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
