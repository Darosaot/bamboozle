import React from 'react';
import { User, Users, Clock, Heart, Zap } from 'lucide-react';
import { GAME_MODES, DIFFICULTY_SETTINGS } from '../constants/gameConfig';

const MAX_NAME_LENGTH = 15;

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
  const canStart = player1Name.trim().length >= 2 && (gameMode === GAME_MODES.SOLO || player2Name.trim().length >= 2);

  const handleNameChange = (value, setter) => {
    // Limit name length and remove leading/trailing spaces on each keystroke
    const trimmedValue = value.slice(0, MAX_NAME_LENGTH);
    setter(trimmedValue);
  };

  const getDifficultyInfo = (diff) => {
    const settings = DIFFICULTY_SETTINGS[diff];
    const labels = {
      easy: { name: 'Fácil', color: 'text-green-600', bgColor: 'bg-green-500' },
      normal: { name: 'Normal', color: 'text-yellow-600', bgColor: 'bg-yellow-500' },
      hard: { name: 'Difícil', color: 'text-red-600', bgColor: 'bg-red-500' }
    };
    return { ...settings, ...labels[diff] };
  };

  const currentDiffInfo = getDifficultyInfo(difficulty);

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

        <div className="mb-4">
          <input
            type="text"
            placeholder="Tu nombre (min 2 caracteres)"
            value={player1Name}
            onChange={(e) => handleNameChange(e.target.value, onPlayer1NameChange)}
            maxLength={MAX_NAME_LENGTH}
            className="w-full px-4 py-3 border-4 border-purple-400 rounded-xl text-lg font-bold text-center text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-600 bg-white"
          />
          <p className="text-xs text-gray-500 mt-1">{player1Name.length}/{MAX_NAME_LENGTH} caracteres</p>
        </div>

        {gameMode === GAME_MODES.TWO_PLAYER && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Jugador 2 (min 2 caracteres)"
              value={player2Name}
              onChange={(e) => handleNameChange(e.target.value, onPlayer2NameChange)}
              maxLength={MAX_NAME_LENGTH}
              className="w-full px-4 py-3 border-4 border-pink-400 rounded-xl text-lg font-bold text-center text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-600 bg-white"
            />
            <p className="text-xs text-gray-500 mt-1">{player2Name.length}/{MAX_NAME_LENGTH} caracteres</p>
          </div>
        )}

        <div className="mb-6">
          <p className="text-sm font-bold text-gray-700 mb-3">Dificultad:</p>
          <div className="flex gap-2 mb-3">
            {['easy', 'normal', 'hard'].map(diff => {
              const info = getDifficultyInfo(diff);
              return (
                <button
                  key={diff}
                  onClick={() => onDifficultyChange(diff)}
                  className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                    difficulty === diff
                      ? `${info.bgColor} text-white ring-2 ring-offset-2 ring-${diff === 'easy' ? 'green' : diff === 'normal' ? 'yellow' : 'red'}-400`
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  <span className="text-xl">{diff === 'easy' ? '😊' : diff === 'normal' ? '😐' : '😰'}</span>
                  <p className="text-xs mt-1">{info.name}</p>
                </button>
              );
            })}
          </div>

          {/* Difficulty info panel */}
          <div className="bg-gray-100 rounded-xl p-4 text-left">
            <p className={`font-black text-lg ${currentDiffInfo.color} mb-2`}>
              {currentDiffInfo.name}
            </p>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="font-bold">{currentDiffInfo.time}s</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="font-bold">{currentDiffInfo.lives} vidas</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="font-bold">{currentDiffInfo.totalRounds} rondas</span>
              </div>
            </div>
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
