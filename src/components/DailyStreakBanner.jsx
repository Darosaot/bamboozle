import React from 'react';
import { Flame, Calendar, Gift } from 'lucide-react';

const DailyStreakBanner = ({ streakData, onClose }) => {
  if (!streakData || !streakData.isNewDay) return null;

  const { currentStreak, bonusPoints, streakMessage, longestStreak } = streakData;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center animate-bounce-in">
        {/* Flame animation */}
        <div className="flex justify-center mb-4">
          {currentStreak >= 7 ? (
            <div className="flex gap-1">
              <Flame className="w-16 h-16 text-orange-500 animate-pulse" />
              <Flame className="w-16 h-16 text-red-500 animate-pulse" />
              <Flame className="w-16 h-16 text-orange-500 animate-pulse" />
            </div>
          ) : currentStreak >= 3 ? (
            <div className="flex gap-1">
              <Flame className="w-14 h-14 text-orange-500 animate-pulse" />
              <Flame className="w-14 h-14 text-red-500 animate-pulse" />
            </div>
          ) : (
            <Flame className="w-16 h-16 text-orange-500 animate-pulse" />
          )}
        </div>

        <h2 className="text-3xl font-black text-gray-800 mb-2">
          {currentStreak === 1 ? 'Bienvenido!' : 'Racha Diaria!'}
        </h2>

        {/* Streak counter */}
        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-6 h-6 text-orange-600" />
            <span className="text-5xl font-black text-orange-600">{currentStreak}</span>
          </div>
          <p className="text-orange-700 font-bold">
            {currentStreak === 1 ? 'dia' : 'dias seguidos'}
          </p>
        </div>

        {/* Bonus points */}
        {bonusPoints > 0 && (
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-center gap-2">
              <Gift className="w-6 h-6 text-green-600" />
              <span className="text-2xl font-black text-green-600">+{bonusPoints} pts</span>
            </div>
            <p className="text-green-700 text-sm font-bold mt-1">{streakMessage}</p>
          </div>
        )}

        {/* Longest streak */}
        {longestStreak > currentStreak && (
          <p className="text-gray-500 text-sm mb-4">
            Tu mejor racha: {longestStreak} dias
          </p>
        )}

        {/* Motivational message */}
        <p className="text-gray-600 mb-6">
          {currentStreak >= 7
            ? 'Increible! Eres una maquina!'
            : currentStreak >= 3
            ? 'Sigue asi! Cada dia cuenta!'
            : 'Vuelve manana para mantener tu racha!'}
        </p>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-black text-xl py-4 rounded-xl hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all shadow-lg"
        >
          A JUGAR!
        </button>
      </div>
    </div>
  );
};

export default DailyStreakBanner;
