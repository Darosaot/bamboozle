import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, ArrowLeft, Filter } from 'lucide-react';
import AdBanner from './AdBanner';

const Leaderboard = ({ onBack }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState('all');
  const [gameMode, setGameMode] = useState('all');

  useEffect(() => {
    fetchLeaderboard();
  }, [difficulty, gameMode]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (difficulty !== 'all') params.append('difficulty', difficulty);
      if (gameMode !== 'all') params.append('gameMode', gameMode);
      params.append('limit', '50');

      const response = await fetch(`/api/get-leaderboard?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();

      if (data.success) {
        setScores(data.data);
      } else {
        setError(data.error || 'Failed to load leaderboard');
      }
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Could not connect to leaderboard. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-8 h-8 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-8 h-8 text-gray-400" />;
    if (rank === 3) return <Medal className="w-8 h-8 text-amber-600" />;
    return <span className="text-2xl font-black text-gray-400">#{rank}</span>;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'normal': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-400 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-bold"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver
            </button>
            <div className="flex items-center gap-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <h1 className="text-3xl font-black">TABLA DE CLASIFICACIÓN</h1>
            </div>
            <div className="w-20"></div> {/* Spacer for alignment */}
          </div>

          {/* Filters */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <label>
                <span className="sr-only">Filtrar por dificultad</span>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="px-4 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 outline-none font-bold"
                >
                  <option value="all">Todas las dificultades</option>
                  <option value="easy">Fácil</option>
                  <option value="normal">Normal</option>
                  <option value="hard">Difícil</option>
                </select>
              </label>
            </div>

            <div>
              <label>
                <span className="sr-only">Filtrar por modo de juego</span>
                <select
                  value={gameMode}
                  onChange={(e) => setGameMode(e.target.value)}
                  className="px-4 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 outline-none font-bold"
                >
                  <option value="all">Todos los modos</option>
                  <option value="solo">Solo</option>
                  <option value="two-player">Dos jugadores</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="bg-white rounded-3xl shadow-2xl p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 font-bold">Cargando clasificación...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 font-bold mb-4">{error}</p>
              <button
                onClick={fetchLeaderboard}
                className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700"
              >
                Reintentar
              </button>
            </div>
          ) : scores.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-bold">No hay puntuaciones todavía.</p>
              <p className="text-gray-500 text-sm mt-2">¡Sé el primero en aparecer en la tabla!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {scores.map((score, index) => (
                <div
                  key={score.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.02] ${
                    index < 3
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 flex justify-center">
                    {getRankIcon(index + 1)}
                  </div>

                  {/* Player Info */}
                  <div className="flex-grow">
                    <div className="font-black text-lg text-gray-800">
                      {score.player_name}
                    </div>
                    <div className="flex gap-2 text-xs text-gray-600 mt-1">
                      <span className={`px-2 py-1 rounded-full font-bold ${getDifficultyColor(score.difficulty)}`}>
                        {score.difficulty}
                      </span>
                      <span className="px-2 py-1 rounded-full font-bold bg-blue-100 text-blue-700">
                        {score.game_mode === 'solo' ? 'Solo' : '2 jugadores'}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 text-center">
                    <div className="hidden sm:block">
                      <div className="text-xs text-gray-600">Racha</div>
                      <div className="font-black text-purple-600">{score.streak}</div>
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-xs text-gray-600">Rondas</div>
                      <div className="font-black text-blue-600">{score.rounds_won}</div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <div className="text-3xl font-black text-purple-600">
                      {score.score}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(score.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Google AdSense Banner */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mt-4">
          <AdBanner />
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
