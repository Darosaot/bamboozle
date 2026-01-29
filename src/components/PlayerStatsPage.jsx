import React from 'react';
import { BarChart3, Trophy, Target, Zap, Clock, Gamepad2, Award, TrendingUp } from 'lucide-react';
import { getPlayerStats, calculateDerivedStats, resetPlayerStats } from '../utils/playerStats';

const StatCard = ({ icon: Icon, label, value, color, subtext }) => (
  <div className="bg-white rounded-xl p-4 shadow-md">
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`w-5 h-5 ${color}`} />
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <p className={`text-2xl font-black ${color}`}>{value}</p>
    {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
  </div>
);

const PlayerStatsPage = ({ onBack }) => {
  const [stats, setStats] = React.useState(() => {
    const rawStats = getPlayerStats();
    return calculateDerivedStats(rawStats);
  });
  const [showResetConfirm, setShowResetConfirm] = React.useState(false);

  const handleReset = () => {
    resetPlayerStats();
    setStats(calculateDerivedStats(getPlayerStats()));
    setShowResetConfirm(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-10 h-10 text-indigo-500" />
            <div>
              <h1 className="text-3xl font-black text-gray-800">Estadísticas</h1>
              <p className="text-sm text-gray-500">Tu progreso en Bamboozle</p>
            </div>
          </div>

          {/* No games message */}
          {stats.gamesPlayed === 0 ? (
            <div className="text-center py-8">
              <Gamepad2 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">Aún no has jugado ninguna partida</p>
              <p className="text-sm text-gray-400">¡Juega tu primera partida para ver tus estadísticas!</p>
            </div>
          ) : (
            <>
              {/* Main Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <StatCard
                  icon={Gamepad2}
                  label="Partidas jugadas"
                  value={stats.gamesPlayed}
                  color="text-indigo-600"
                />
                <StatCard
                  icon={Trophy}
                  label="Mejor puntuación"
                  value={stats.bestScore.toLocaleString()}
                  color="text-yellow-600"
                />
                <StatCard
                  icon={Target}
                  label="Precisión"
                  value={`${stats.accuracy}%`}
                  color="text-green-600"
                  subtext={`${stats.totalCorrectAnswers}/${stats.totalQuestionsAnswered} correctas`}
                />
                <StatCard
                  icon={Zap}
                  label="Mejor racha"
                  value={stats.bestStreak}
                  color="text-orange-600"
                />
                <StatCard
                  icon={TrendingUp}
                  label="Tasa de victoria"
                  value={`${stats.winRate}%`}
                  color="text-purple-600"
                  subtext={`${stats.wins}V - ${stats.losses}D`}
                />
                <StatCard
                  icon={Award}
                  label="Puntuación media"
                  value={stats.avgScorePerGame.toLocaleString()}
                  color="text-blue-600"
                />
              </div>

              {/* Time Played */}
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-500" />
                    <span className="font-bold text-gray-700">Tiempo jugado</span>
                  </div>
                  <span className="text-xl font-black text-indigo-600">
                    {stats.totalHoursPlayed < 1
                      ? `${Math.round(stats.timePlayedSeconds / 60)} min`
                      : `${stats.totalHoursPlayed} horas`}
                  </span>
                </div>
              </div>

              {/* By Difficulty */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-700 mb-3">Por dificultad</h3>
                <div className="grid grid-cols-3 gap-2">
                  {['easy', 'normal', 'hard'].map(diff => {
                    const diffData = stats.byDifficulty?.[diff] || { played: 0, bestScore: 0 };
                    const labels = {
                      easy: { name: 'Fácil', color: 'bg-green-100 text-green-700' },
                      normal: { name: 'Normal', color: 'bg-yellow-100 text-yellow-700' },
                      hard: { name: 'Difícil', color: 'bg-red-100 text-red-700' }
                    };
                    return (
                      <div key={diff} className={`${labels[diff].color} rounded-lg p-3 text-center`}>
                        <p className="text-xs font-bold mb-1">{labels[diff].name}</p>
                        <p className="text-lg font-black">{diffData.played || 0}</p>
                        <p className="text-xs opacity-75">partidas</p>
                        {diffData.bestScore > 0 && (
                          <p className="text-xs mt-1">Mejor: {diffData.bestScore}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* By Mode */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-700 mb-3">Por modo de juego</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-100 rounded-lg p-3 text-center">
                    <p className="text-xs font-bold text-blue-700 mb-1">Solo</p>
                    <p className="text-lg font-black text-blue-700">{stats.byMode?.solo?.played || 0}</p>
                  </div>
                  <div className="bg-pink-100 rounded-lg p-3 text-center">
                    <p className="text-xs font-bold text-pink-700 mb-1">2 Jugadores</p>
                    <p className="text-lg font-black text-pink-700">{stats.byMode?.['two-player']?.played || 0}</p>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="flex justify-between text-sm text-gray-500 mb-6">
                <span>Primera partida: {formatDate(stats.firstPlayedAt)}</span>
                <span>Última partida: {formatDate(stats.lastPlayedAt)}</span>
              </div>

              {/* Reset Button */}
              {!showResetConfirm ? (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="w-full text-red-500 text-sm py-2 hover:bg-red-50 rounded-lg transition-all"
                >
                  Reiniciar estadísticas
                </button>
              ) : (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <p className="text-red-700 font-bold text-sm mb-3">¿Estás seguro? Esto borrará todas tus estadísticas.</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleReset}
                      className="flex-1 bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600"
                    >
                      Sí, borrar
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="flex-1 bg-gray-200 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-300"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full bg-white text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-100 transition-all shadow-lg"
        >
          ← Volver al menú
        </button>
      </div>
    </div>
  );
};

export default PlayerStatsPage;
