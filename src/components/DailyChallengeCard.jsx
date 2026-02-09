import React, { useState, useEffect } from 'react';
import { Calendar, Target, Trophy, TrendingUp } from 'lucide-react';

const DailyChallengeCard = ({ onStartChallenge }) => {
  const [challenge, setChallenge] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDailyChallenge();
  }, []);

  const fetchDailyChallenge = async () => {
    setError(null);
    try {
      const response = await fetch('/api/get-daily-challenge');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();

      if (data.success) {
        setChallenge(data.challenge);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching daily challenge:', error);
      setError('No se pudo cargar el desafío del día.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200">
        <p className="text-center text-gray-600">Cargando desafío del día...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200">
        <p className="text-center text-red-600 font-bold mb-2">{error}</p>
        <button
          onClick={fetchDailyChallenge}
          className="block mx-auto px-4 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-all"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!challenge) return null;

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'easy': return 'bg-green-500';
      case 'normal': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyEmoji = (diff) => {
    switch(diff) {
      case 'easy': return '😊';
      case 'normal': return '😐';
      case 'hard': return '😰';
      default: return '🎮';
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-300 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={24} className="text-orange-600" />
          <h3 className="text-xl font-black text-orange-800">Desafío del Día</h3>
        </div>
        <div className={`${getDifficultyColor(challenge.difficulty)} text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1`}>
          {getDifficultyEmoji(challenge.difficulty)}
          {challenge.difficulty === 'easy' ? 'Fácil' :
           challenge.difficulty === 'normal' ? 'Normal' : 'Difícil'}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 mb-4">
        <div className="flex items-start gap-3 mb-3">
          <Target size={32} className="text-orange-600 flex-shrink-0" />
          <div>
            <p className="font-bold text-gray-800 text-lg">Objetivo</p>
            <p className="text-2xl font-black text-orange-600">
              {challenge.target_score} puntos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700 bg-orange-50 rounded-lg p-3">
          <Trophy size={18} className="text-orange-600" />
          <span>
            Recompensa: <strong className="text-orange-600">+{challenge.bonus_points} puntos bonus</strong>
          </span>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-white rounded-lg p-3 text-center">
            <TrendingUp size={18} className="mx-auto text-orange-600 mb-1" />
            <p className="text-lg font-black text-orange-600">
              {stats.total_attempts || 0}
            </p>
            <p className="text-xs text-gray-600">Intentos</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <Trophy size={18} className="mx-auto text-orange-600 mb-1" />
            <p className="text-lg font-black text-orange-600">
              {stats.total_completions || 0}
            </p>
            <p className="text-xs text-gray-600">Completados</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <Target size={18} className="mx-auto text-orange-600 mb-1" />
            <p className="text-lg font-black text-orange-600">
              {stats.highest_score || 0}
            </p>
            <p className="text-xs text-gray-600">Récord</p>
          </div>
        </div>
      )}

      <button
        onClick={() => onStartChallenge(challenge)}
        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-black text-lg py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
      >
        <Calendar size={24} />
        ¡Aceptar Desafío!
      </button>

      <p className="text-xs text-gray-600 text-center mt-3">
        ⏰ Nuevo desafío cada día a las 00:00
      </p>
    </div>
  );
};

export default DailyChallengeCard;
