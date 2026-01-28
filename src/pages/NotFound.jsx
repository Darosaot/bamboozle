import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, Search, Baby } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Página No Encontrada | Bamboozle Baby Deluxe</title>
        <meta name="description" content="La página que buscas no existe. Vuelve al juego educativo de Bamboozle Baby Deluxe." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center">
          <div className="relative">
            <Baby className="w-32 h-32 mx-auto text-purple-300 mb-4 opacity-50" />
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
              <Search className="w-16 h-16 text-pink-500 animate-bounce" />
            </div>
          </div>

          <h1 className="text-8xl font-black text-purple-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ¡Oops! Página No Encontrada
          </h2>

          <p className="text-gray-600 mb-8 text-lg">
            Parece que esta página se escapó como un bebé gateando.
            La página que buscas no existe o fue movida a otro lugar.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 text-left">
            <p className="text-blue-800 font-semibold mb-2">¿Qué puedes hacer?</p>
            <ul className="list-disc list-inside text-blue-700 space-y-1">
              <li>Verifica que la URL esté escrita correctamente</li>
              <li>Vuelve a la página principal y navega desde ahí</li>
              <li>Usa el menú de navegación para encontrar lo que buscas</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg transform hover:scale-105"
            >
              <Home size={20} />
              Volver al Inicio
            </Link>

            <Link
              to="/recursos"
              className="flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition-all shadow-lg transform hover:scale-105"
            >
              <Baby size={20} />
              Ver Recursos
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              ¿Necesitas ayuda? Visita nuestra{' '}
              <Link to="/preguntas-frecuentes" className="text-purple-600 hover:underline font-semibold">
                página de FAQ
              </Link>
              {' '}o la{' '}
              <Link to="/ayuda" className="text-purple-600 hover:underline font-semibold">
                guía de cómo jugar
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
