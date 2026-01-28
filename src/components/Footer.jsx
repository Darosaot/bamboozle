import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-6">
          <div>
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Heart size={20} className="text-pink-400" />
              Bamboozle Baby Deluxe
            </h3>
            <p className="text-purple-200 text-sm">
              Aprende sobre embarazo, bebés y paternidad de forma divertida e interactiva.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Juego</h4>
            <ul className="space-y-2 text-sm text-purple-200">
              <li>
                <Link to="/ayuda" className="hover:text-white transition-colors">
                  Cómo Jugar
                </Link>
              </li>
              <li>
                <Link to="/acerca" className="hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/preguntas-frecuentes" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Recursos</h4>
            <ul className="space-y-2 text-sm text-purple-200">
              <li>
                <Link to="/recursos" className="hover:text-white transition-colors">
                  Guías Educativas
                </Link>
              </li>
              <li>
                <a
                  href="https://www.who.int/health-topics/child-health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  OMS - Salud Infantil
                </a>
              </li>
              <li>
                <a
                  href="https://www.aap.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Academia Americana de Pediatría
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-purple-200">
              <li>
                <Link to="/privacidad" className="hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="hover:text-white transition-colors">
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Cómo Google usa los datos
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-purple-200">
            <p>
              © {new Date().getFullYear()} Bamboozle Baby Deluxe. Todos los derechos reservados.
            </p>
            <p className="text-xs text-center">
              Este sitio usa cookies para mejorar la experiencia del usuario y mostrar anuncios relevantes.
              Al continuar navegando, aceptas nuestra política de cookies.
            </p>
          </div>

          <div className="mt-4 p-4 bg-yellow-900/30 rounded-lg border border-yellow-700">
            <p className="text-xs text-yellow-200 text-center">
              <strong>Aviso Médico:</strong> La información proporcionada es solo para fines educativos y no sustituye
              el consejo médico profesional. Siempre consulta con tu pediatra o médico para decisiones sobre la
              salud de tu bebé.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
