import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Navegación de ruta" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-purple-600 transition-colors"
            aria-label="Ir al inicio"
          >
            <Home size={16} />
            <span>Inicio</span>
          </Link>
        </li>

        {items && items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight size={16} className="text-gray-400" aria-hidden="true" />
            {item.link ? (
              <Link
                to={item.link}
                className="hover:text-purple-600 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-800 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
