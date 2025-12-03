import React from 'react';
import { Baby, User, Users, Volume2, VolumeX, Trophy } from 'lucide-react';
import { GAME_MODES } from '../constants/gameConfig';
import AdBanner from './AdBanner';

const ModeSelection = ({ onSelectMode, onViewLeaderboard, soundEnabled, onToggleSound }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <Baby className="w-32 h-32 mx-auto text-pink-500 animate-bounce mb-4" />
        <h1 className="text-6xl font-black text-purple-600 mb-2 font-comic">
          BAMBOOZLE
        </h1>
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Baby Edition DELUXE!</h2>
        <p className="text-gray-600 mb-8 text-lg italic">
          "¡El juego donde las reglas no importan y los puntos son inventados!"
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <button
            onClick={() => onSelectMode(GAME_MODES.SOLO)}
            className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-8 rounded-2xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all shadow-xl"
          >
            <User className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-black mb-2">MODO SOLO</h3>
            <p className="text-sm">Juega tú solo y acumula puntos</p>
          </button>

          <button
            onClick={() => onSelectMode(GAME_MODES.TWO_PLAYER)}
            className="bg-gradient-to-br from-pink-500 to-orange-500 text-white p-8 rounded-2xl hover:from-pink-600 hover:to-orange-600 transform hover:scale-105 transition-all shadow-xl"
          >
            <Users className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-black mb-2">2 JUGADORES</h3>
            <p className="text-sm">Compite con un amigo</p>
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={onViewLeaderboard}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-black py-4 rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all shadow-lg flex items-center justify-center gap-2 transform hover:scale-105"
          >
            <Trophy size={24} />
            VER TABLA DE CLASIFICACIÓN
          </button>

          <button
            onClick={onToggleSound}
            className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            {soundEnabled ? 'Sonido ON' : 'Sonido OFF'}
          </button>
        </div>

        {/* Google AdSense Banner */}
        <AdBanner />
      </div>
    </div>
  );
};

export default ModeSelection;
