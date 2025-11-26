import React, { useState } from 'react';
import { Trophy, Save } from 'lucide-react';
import { getRank } from '../utils/scoreCalculator';
import { GAME_MODES } from '../constants/gameConfig';

const ResultsScreen = ({
  gameMode,
  player1,
  player2,
  round,
  difficulty,
  onPlayAgain
}) => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const saveScore = async (playerName, score, streak, roundsWon) => {
    setSaving(true);
    setSaveError(null);

    try {
      const response = await fetch('/api/save-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerName,
          score,
          difficulty: difficulty || 'normal',
          gameMode: gameMode === GAME_MODES.SOLO ? 'solo' : 'two-player',
          streak,
          roundsWon
        })
      });

      const data = await response.json();

      if (data.success) {
        setSaved(true);
      } else {
        setSaveError(data.error || 'Failed to save score');
      }
    } catch (error) {
      console.error('Error saving score:', error);
      setSaveError('Could not save score. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  if (gameMode === GAME_MODES.SOLO) {
    const rank = getRank(player1.score);

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <Trophy className="w-32 h-32 mx-auto text-yellow-500 mb-4 animate-bounce" />
          <h2 className="text-4xl font-black mb-4 font-comic">
            ¡JUEGO TERMINADO!
          </h2>
          <p className="text-2xl font-bold text-gray-700 mb-2">{player1.name}</p>
          <div className="text-6xl mb-4">{rank.emoji}</div>
          <p className={`text-3xl font-black mb-4 ${rank.color}`}>{rank.title}</p>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-4">
            <p className="text-gray-600 mb-2">Puntuación Final:</p>
            <p className="text-6xl font-black text-purple-600">{player1.score}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-100 rounded-xl p-4">
              <p className="text-sm text-gray-600">Rondas completadas</p>
              <p className="text-3xl font-black text-blue-600">{round - 1}</p>
            </div>
            <div className="bg-green-100 rounded-xl p-4">
              <p className="text-sm text-gray-600">Mejor racha</p>
              <p className="text-3xl font-black text-green-600">{player1.streak}</p>
            </div>
          </div>

          <div className="space-y-3">
            {!saved && (
              <button
                onClick={() => saveScore(player1.name, player1.score, player1.streak, player1.roundsWon)}
                disabled={saving}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-black text-xl py-4 rounded-xl hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Save className="w-6 h-6" />
                {saving ? 'GUARDANDO...' : '¡GUARDAR EN TABLA!'}
              </button>
            )}

            {saved && (
              <div className="bg-green-100 border-2 border-green-500 rounded-xl p-4 text-green-700 font-bold text-center">
                ✅ ¡Puntuación guardada en la tabla de clasificación!
              </div>
            )}

            {saveError && (
              <div className="bg-red-100 border-2 border-red-500 rounded-xl p-4 text-red-700 font-bold text-center text-sm">
                {saveError}
              </div>
            )}

            <button
              onClick={onPlayAgain}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-black text-xl py-4 rounded-xl hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all shadow-lg"
            >
              ¡JUGAR DE NUEVO!
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Two player mode
  const winner = player1.score > player2.score ? player1 : player2;
  const isDraw = player1.score === player2.score;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <Trophy className="w-32 h-32 mx-auto text-yellow-500 mb-4 animate-bounce" />
        <h2 className="text-5xl font-black mb-6 font-comic">
          {isDraw ? '¡EMPATE!' : '¡VICTORIA!'}
        </h2>

        {!isDraw && (
          <>
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-4xl font-black text-purple-600 mb-6">{winner.name} GANA!</p>
          </>
        )}

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className={`rounded-2xl p-6 ${player1.score > player2.score ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 ring-4 ring-yellow-500' : 'bg-gray-100'}`}>
            <p className="text-2xl font-black text-gray-800 mb-2">{player1.name}</p>
            <p className="text-5xl font-black text-purple-600 mb-2">{player1.score}</p>
            <div className="space-y-1 text-sm text-gray-600">
              <p>🎯 Rondas: {player1.roundsWon}</p>
              <p>🔥 Racha: {player1.streak}</p>
            </div>
          </div>

          <div className={`rounded-2xl p-6 ${player2.score > player1.score ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 ring-4 ring-yellow-500' : 'bg-gray-100'}`}>
            <p className="text-2xl font-black text-gray-800 mb-2">{player2.name}</p>
            <p className="text-5xl font-black text-pink-600 mb-2">{player2.score}</p>
            <div className="space-y-1 text-sm text-gray-600">
              <p>🎯 Rondas: {player2.roundsWon}</p>
              <p>🔥 Racha: {player2.streak}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {!saved && (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => saveScore(player1.name, player1.score, player1.streak, player1.roundsWon)}
                disabled={saving}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-lg py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {player1.name}
              </button>
              <button
                onClick={() => saveScore(player2.name, player2.score, player2.streak, player2.roundsWon)}
                disabled={saving}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black text-lg py-3 rounded-xl hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {player2.name}
              </button>
            </div>
          )}

          {saved && (
            <div className="bg-green-100 border-2 border-green-500 rounded-xl p-4 text-green-700 font-bold text-center">
              ✅ ¡Puntuación guardada en la tabla de clasificación!
            </div>
          )}

          {saveError && (
            <div className="bg-red-100 border-2 border-red-500 rounded-xl p-4 text-red-700 font-bold text-center text-sm">
              {saveError}
            </div>
          )}

          <button
            onClick={onPlayAgain}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-black text-xl py-4 rounded-xl hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all shadow-lg"
          >
            ¡JUGAR DE NUEVO!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
