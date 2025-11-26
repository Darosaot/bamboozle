import React from 'react';
import { User, Users } from 'lucide-react';
import { GAME_MODES } from '../constants/gameConfig';

const PlayerSetup = ({
  gameMode,
  player1Name,
  player2Name,
  onPlayer1NameChange,
  onPlayer2NameChange,
  difficulty,
  onDifficultyChange,
  onStartGame,
  onBack
}) => {
  const canStart = player1Name.trim() && (gameMode === GAME_MODES.SOLO || player2Name.trim());

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          {gameMode === GAME_MODES.SOLO ? (
            <User className="w-20 h-20 mx-auto text-blue-500" />
          ) : (
            <Users className="w-20 h-20 mx-auto text-pink-500" />
          )}
        </div>
        <h1 className="text-4xl font-black text-purple-600 mb-6 font-comic">
          {gameMode === GAME_MODES.SOLO ? 'MODO SOLO' : '2 JUGADORES'}
        </h1>

        <input
          type="text"
          placeholder="Jugador 1"
          value={player1Name}
          onChange={(e) => onPlayer1NameChange(e.target.value)}
          className="w-full px-4 py-3 border-4 border-purple-400 rounded-xl mb-4 text-lg font-bold text-center text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-600 bg-white"
        />

        {gameMode === GAME_MODES.TWO_PLAYER && (
          <input
            type="text"
            placeholder="Jugador 2"
            value={player2Name}
            onChange={(e) => onPlayer2NameChange(e.target.value)}
            className="w-full px-4 py-3 border-4 border-pink-400 rounded-xl mb-4 text-lg font-bold text-center text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-600 bg-white"
          />
        )}

        <div className="mb-6">
          <p className="text-sm font-bold text-gray-700 mb-3">Dificultad:</p>
          <div className="flex gap-2">
            {['easy', 'normal', 'hard'].map(diff => (
              <button
                key={diff}
                onClick={() => onDifficultyChange(diff)}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  difficulty === diff
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {diff === 'easy' ? '😊' : diff === 'normal' ? '😐' : '😰'}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onStartGame}
          disabled={!canStart}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black text-xl py-4 rounded-xl hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all shadow-lg mb-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          ¡EMPEZAR!
        </button>

        <button
          onClick={onBack}
          className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-300 transition-all"
        >
          ← Volver
        </button>
      </div>
    </div>
  );
};

export default PlayerSetup;
