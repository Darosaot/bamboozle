import React from 'react';
import { Award, ArrowLeft, Lock, Trophy } from 'lucide-react';
import { getAllAchievementsWithStatus, getAchievementProgress } from '../utils/achievements';
import { getDailyStreakData } from '../utils/dailyStreak';

const AchievementsPage = ({ onBack }) => {
  const achievements = getAllAchievementsWithStatus();
  const progress = getAchievementProgress();
  const dailyStreak = getDailyStreakData();

  // Group achievements by category
  const categories = {
    beginner: { name: 'Principiante', achievements: [] },
    score: { name: 'Puntuacion', achievements: [] },
    streak: { name: 'Rachas', achievements: [] },
    daily: { name: 'Dias Seguidos', achievements: [] },
    difficulty: { name: 'Dificultad', achievements: [] },
    special: { name: 'Especiales', achievements: [] },
    games: { name: 'Partidas', achievements: [] },
    multiplayer: { name: 'Multijugador', achievements: [] }
  };

  achievements.forEach(achievement => {
    if (categories[achievement.category]) {
      categories[achievement.category].achievements.push(achievement);
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver
            </button>
            <div className="flex items-center gap-2">
              <Award className="w-8 h-8 text-yellow-500" />
              <h1 className="text-3xl font-black">LOGROS</h1>
            </div>
            <div className="w-20"></div>
          </div>

          {/* Progress bar */}
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-700">Progreso Total</span>
              <span className="font-black text-orange-600">
                {progress.unlocked}/{progress.total} ({progress.percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>

          {/* Daily streak info */}
          <div className="mt-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-bold">Racha Diaria Actual</p>
                <p className="text-3xl font-black text-orange-600">
                  {dailyStreak.currentStreak} dias
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-orange-700 font-bold">Mejor Racha</p>
                <p className="text-3xl font-black text-orange-600">
                  {dailyStreak.longestStreak} dias
                </p>
              </div>
              <Trophy className="w-12 h-12 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Achievement categories */}
        {Object.entries(categories).map(([key, category]) => {
          if (category.achievements.length === 0) return null;

          return (
            <div key={key} className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
              <h2 className="text-xl font-black text-gray-800 mb-4">
                {category.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {category.achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400'
                        : 'bg-gray-100 opacity-60'
                    }`}
                  >
                    <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                      {achievement.unlocked ? (
                        achievement.emoji
                      ) : (
                        <Lock className="w-10 h-10 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-black ${
                        achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                      }`}>
                        {achievement.name}
                      </h3>
                      <p className={`text-sm ${
                        achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        OK
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsPage;
