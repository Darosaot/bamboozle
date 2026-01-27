import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-r from-purple-900 to-pink-900 text-white shadow-2xl animate-slide-up">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="flex-shrink-0 text-yellow-300 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-lg mb-2">🍪 Este sitio usa cookies</h3>
              <p className="text-sm text-purple-100 mb-2">
                Utilizamos cookies propias y de terceros (Google AdSense) para mejorar tu experiencia,
                analizar el tráfico y mostrar publicidad personalizada. Al hacer clic en "Aceptar",
                aceptas el uso de cookies.
              </p>
              <div className="flex gap-3 text-xs">
                <Link to="/privacidad" className="text-yellow-300 hover:underline">
                  Política de Privacidad
                </Link>
                <Link to="/terminos" className="text-yellow-300 hover:underline">
                  Términos de Servicio
                </Link>
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-300 hover:underline"
                >
                  Configurar Anuncios
                </a>
              </div>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={declineCookies}
              className="flex-1 md:flex-none px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold text-sm transition-colors"
            >
              Rechazar
            </button>
            <button
              onClick={acceptCookies}
              className="flex-1 md:flex-none px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-lg font-semibold text-sm transition-all shadow-lg"
            >
              Aceptar Cookies
            </button>
          </div>

          <button
            onClick={declineCookies}
            className="absolute top-4 right-4 md:relative md:top-0 md:right-0 text-purple-300 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
