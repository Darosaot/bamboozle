import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Book, HelpCircle, Info, FileText, MessageCircle, Heart, ArrowLeft } from 'lucide-react';

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/', label: 'Volver al inicio', icon: ArrowLeft, action: 'home' },
    { path: '/acerca', label: 'Sobre Nosotros', icon: Info },
    { path: '/recursos', label: 'Recursos Educativos', icon: Book },
    { path: '/ayuda', label: 'Cómo Jugar', icon: HelpCircle },
    { path: '/preguntas-frecuentes', label: 'Preguntas Frecuentes', icon: MessageCircle },
    { path: '/privacidad', label: 'Privacidad', icon: FileText },
    { path: '/terminos', label: 'Términos', icon: FileText },
  ];

  const closeMenu = () => setIsOpen(false);

  // Keyboard shortcut: ESC to close menu
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-40 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-110"
        aria-label="Abrir menú de navegación"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Slide-in Menu */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Menú de navegación"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-600 to-pink-600">
            <div className="flex items-center gap-2">
              <Heart className="text-white" size={24} />
              <h2 className="text-white font-bold text-lg">Bamboozle Baby</h2>
            </div>
            <button
              onClick={closeMenu}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
              aria-label="Cerrar menú"
            >
              <X size={24} />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                const isHomeAction = item.action === 'home';

                return (
                  <React.Fragment key={item.path}>
                    <li>
                      <Link
                        to={item.path}
                        onClick={closeMenu}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                          isHomeAction
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 shadow-md'
                            : isActive
                            ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <Icon size={20} className={isHomeAction ? 'text-white' : isActive ? 'text-purple-600' : 'text-gray-500'} />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                    {/* Divider after first item */}
                    {index === 0 && <div className="border-t border-gray-200 my-3"></div>}
                  </React.Fragment>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-600 text-center">
              Bamboozle Baby Deluxe © 2026
            </p>
            <p className="text-xs text-gray-500 text-center mt-1">
              Aprende, juega y diviértete
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
