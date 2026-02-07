import React from 'react';
import { Heart, Coffee, ExternalLink } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const SupportUs = ({ compact = false }) => {
  const handleSupportClick = () => {
    trackEvent('support_click', {
      location: compact ? 'inline' : 'card'
    });
  };

  if (compact) {
    return (
      <a
        href="https://buymeacoffee.com/bamboozlebaby"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleSupportClick}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all transform hover:scale-105 shadow-md text-sm"
      >
        <Coffee size={16} />
        Apoyar el proyecto
      </a>
    );
  }

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-4 border-2 border-yellow-200">
      <div className="flex items-center gap-2 mb-3">
        <Heart size={24} className="text-red-500" />
        <h3 className="font-black text-gray-800 text-lg">Apoya Bamboozle Baby</h3>
      </div>

      <p className="text-gray-700 text-sm mb-4">
        Este juego es gratuito gracias a personas como tu. Si te ha sido util
        y quieres que sigamos creando contenido educativo para padres, considera
        apoyarnos con un cafecito.
      </p>

      <a
        href="https://buymeacoffee.com/bamboozlebaby"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleSupportClick}
        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-black py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all transform hover:scale-105 shadow-lg"
      >
        <Coffee size={20} />
        Invitanos un cafe
        <ExternalLink size={16} />
      </a>

      <p className="text-xs text-gray-500 text-center mt-2">
        Cada aporte nos ayuda a mejorar el juego y agregar mas contenido
      </p>
    </div>
  );
};

export default SupportUs;
