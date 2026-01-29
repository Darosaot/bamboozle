import React from 'react';
import { Baby, User, Users, Volume2, VolumeX, Trophy, Award, Flame, Calendar, BookOpen, BarChart3 } from 'lucide-react';
import { GAME_MODES } from '../constants/gameConfig';
import AdBanner from './AdBanner';
import DailyChallengeCard from './DailyChallengeCard';
import { getDailyStreakData } from '../utils/dailyStreak';
import { getAchievementProgress } from '../utils/achievements';

const ModeSelection = ({ onSelectMode, onViewLeaderboard, onViewAchievements, onViewStats, soundEnabled, onToggleSound }) => {
  const dailyStreak = getDailyStreakData();
  const achievementProgress = getAchievementProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <Baby className="w-32 h-32 mx-auto text-pink-500 animate-bounce mb-4" />
        <h1 className="text-6xl font-black text-purple-600 mb-2 font-comic">
          BAMBOOZLE
        </h1>
        <h2 className="text-3xl font-bold text-blue-500 mb-4">Baby Edition DELUXE!</h2>
        <p className="text-gray-600 mb-6 text-lg italic">
          "El juego donde las reglas no importan y los puntos son inventados!"
        </p>

        {/* Daily Streak Mini Banner */}
        {dailyStreak.currentStreak > 0 && (
          <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-3 mb-6 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-500" />
              <span className="font-black text-orange-600 text-xl">{dailyStreak.currentStreak}</span>
              <span className="text-orange-700 font-bold text-sm">dias seguidos</span>
            </div>
            {dailyStreak.longestStreak > dailyStreak.currentStreak && (
              <div className="text-gray-500 text-sm">
                Mejor: {dailyStreak.longestStreak}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <button
            onClick={() => onSelectMode(GAME_MODES.SOLO)}
            className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-8 rounded-2xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all shadow-xl"
          >
            <User className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-black mb-2">MODO SOLO</h3>
            <p className="text-sm">Juega tu solo y acumula puntos</p>
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

        {/* Practice Mode Button */}
        <button
          onClick={() => onSelectMode(GAME_MODES.PRACTICE)}
          className="w-full bg-gradient-to-r from-green-400 to-teal-400 text-white p-4 rounded-xl hover:from-green-500 hover:to-teal-500 transform hover:scale-105 transition-all shadow-lg mb-6 flex items-center justify-center gap-3"
        >
          <BookOpen className="w-8 h-8" />
          <div className="text-left">
            <h3 className="text-xl font-black">MODO PRÁCTICA</h3>
            <p className="text-sm opacity-90">Sin tiempo ni vidas - aprende a tu ritmo</p>
          </div>
        </button>

        {/* Daily Challenge Card */}
        <div className="my-6">
          <DailyChallengeCard onStartChallenge={(challenge) => {
            // Store challenge info in localStorage
            localStorage.setItem('dailyChallenge', JSON.stringify(challenge));
            onSelectMode(GAME_MODES.SOLO);
          }} />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <button
            onClick={onViewLeaderboard}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-black py-4 rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all shadow-lg flex items-center justify-center gap-2 transform hover:scale-105"
          >
            <Trophy size={24} />
            CLASIFICACION
          </button>

          <button
            onClick={onViewAchievements}
            className="bg-gradient-to-r from-purple-400 to-pink-400 text-white font-black py-4 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg flex items-center justify-center gap-2 transform hover:scale-105 relative"
          >
            <Award size={24} />
            LOGROS
            {achievementProgress.unlocked > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {achievementProgress.unlocked}
              </span>
            )}
          </button>
        </div>

        <button
          onClick={onViewStats}
          className="w-full bg-gradient-to-r from-indigo-400 to-blue-400 text-white font-black py-3 rounded-lg hover:from-indigo-500 hover:to-blue-500 transition-all shadow-lg flex items-center justify-center gap-2 transform hover:scale-105 mb-3"
        >
          <BarChart3 size={20} />
          MIS ESTADÍSTICAS
        </button>

        <button
          onClick={onToggleSound}
          className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          {soundEnabled ? 'Sonido ON' : 'Sonido OFF'}
        </button>

        {/* Google AdSense Banner */}
        <AdBanner />
      </div>
    </div>
  );
};

export default ModeSelection;
