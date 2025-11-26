import React, { useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { getRank } from '../utils/scoreCalculator';
import { GAME_MODES } from '../constants/gameConfig';
import { addScore } from '../db';

const ResultsScreen = ({
  gameMode,
  player1,
  player2,
  round,
  onPlayAgain,
  onShowLeaderboard,
  difficulty
}) => {

  useEffect(() => {
    if (gameMode === GAME_MODES.SOLO) {
      const saveScore = async () => {
        try {
          await addScore({
            playerName: player1.name,
            score: player1.score,
            difficulty: difficulty,
            gameMode: gameMode,
            streak: player1.streak,
            roundsWon: round - 1,
          });
        } catch (error) {
          console.error('Error saving score:', error);
        }
      };
      saveScore();
    }
  }, []);

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

          <button
            onClick={onShowLeaderboard}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-black text-xl py-4 rounded-xl hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all shadow-lg mb-4"
          >
            VER CLASIFICACIÓN
          </button>

          <button
            onClick={onPlayAgain}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-black text-xl py-4 rounded-xl hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all shadow-lg"
          >
            ¡JUGAR DE NUEVO!
          </button>
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

        <button
          onClick={onPlayAgain}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-black text-xl py-4 rounded-xl hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all shadow-lg"
        >
          ¡JUGAR DE NUEVO!
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
