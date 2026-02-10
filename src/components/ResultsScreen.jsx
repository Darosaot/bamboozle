import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { getRank } from '../utils/scoreCalculator';
import { GAME_MODES } from '../constants/gameConfig';
import AdBanner from './AdBanner';
import SocialShare from './SocialShare';
import ReferralCard from './ReferralCard';
import SupportUs from './SupportUs';
import NewsletterSignup from './NewsletterSignup';

const ResultsScreen = ({
  gameMode,
  player1,
  player2,
  player1BestStreak = 0,
  player2BestStreak = 0,
  round,
  difficulty,
  onPlayAgain
}) => {
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const saveScores = async () => {
    setSaveError(false);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const res1 = await fetch('/api/save-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          playerName: player1.name,
          score: player1.score,
          difficulty: difficulty || 'normal',
          gameMode: gameMode === GAME_MODES.SOLO ? 'solo' : 'two-player',
          streak: player1BestStreak,
          roundsWon: player1.roundsWon
        })
      });

      if (!res1.ok) throw new Error('Failed to save player 1 score');

      if (gameMode === GAME_MODES.TWO_PLAYER) {
        const res2 = await fetch('/api/save-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            playerName: player2.name,
            score: player2.score,
            difficulty: difficulty || 'normal',
            gameMode: 'two-player',
            streak: player2BestStreak,
            roundsWon: player2.roundsWon
          })
        });

        if (!res2.ok) throw new Error('Failed to save player 2 score');
      }

      setSaved(true);
    } catch (error) {
      console.error('Error saving scores:', error);
      setSaveError(true);
    } finally {
      clearTimeout(timeout);
    }
  };

  // Auto-save scores when component mounts
  useEffect(() => {
    saveScores();
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
              <p className="text-sm text-gray-600">Rondas ganadas</p>
              <p className="text-3xl font-black text-blue-600">{player1.roundsWon}</p>
            </div>
            <div className="bg-green-100 rounded-xl p-4">
              <p className="text-sm text-gray-600">Mejor racha</p>
              <p className="text-3xl font-black text-green-600">
                {player1BestStreak > 0 ? `🔥 ${player1BestStreak}` : '0'}
              </p>
            </div>
          </div>

          {saved && (
            <div className="bg-green-100 border-2 border-green-500 rounded-xl p-3 text-green-700 font-bold text-center mb-4 text-sm">
              ✅ Puntuación guardada
            </div>
          )}

          {saveError && (
            <div className="bg-red-100 border-2 border-red-500 rounded-xl p-3 text-red-700 font-bold text-center mb-4 text-sm">
              No se pudo guardar la puntuación.
              <button onClick={saveScores} className="ml-2 underline hover:no-underline">Reintentar</button>
            </div>
          )}

          {/* Social Share Buttons */}
          <SocialShare score={player1.score} gameMode={gameMode} difficulty={difficulty} />

          {/* Referral Card */}
          <ReferralCard playerName={player1.name} />

          {/* Google AdSense Banner - Pre-action placement */}
          <AdBanner />

          {/* Newsletter Signup */}
          <NewsletterSignup />

          {/* Support Us */}
          <SupportUs />

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
          <div className={`rounded-2xl p-6 ${player1.score > player2.score ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 ring-4 ring-yellow-500' : player1.score === player2.score ? 'bg-gradient-to-br from-blue-100 to-purple-100 ring-2 ring-purple-300' : 'bg-gray-100'}`}>
            <p className="text-2xl font-black text-gray-800 mb-2">{player1.name}</p>
            <p className="text-5xl font-black text-purple-600 mb-2">{player1.score}</p>
            <div className="space-y-1 text-sm text-gray-600">
              <p>🎯 Rondas: {player1.roundsWon}</p>
              <p>🔥 Mejor racha: {player1BestStreak}</p>
            </div>
          </div>

          <div className={`rounded-2xl p-6 ${player2.score > player1.score ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 ring-4 ring-yellow-500' : player1.score === player2.score ? 'bg-gradient-to-br from-blue-100 to-purple-100 ring-2 ring-purple-300' : 'bg-gray-100'}`}>
            <p className="text-2xl font-black text-gray-800 mb-2">{player2.name}</p>
            <p className="text-5xl font-black text-pink-600 mb-2">{player2.score}</p>
            <div className="space-y-1 text-sm text-gray-600">
              <p>🎯 Rondas: {player2.roundsWon}</p>
              <p>🔥 Mejor racha: {player2BestStreak}</p>
            </div>
          </div>
        </div>

        {saved && (
          <div className="bg-green-100 border-2 border-green-500 rounded-xl p-3 text-green-700 font-bold text-center mb-4 text-sm">
            ✅ Puntuaciones guardadas
          </div>
        )}

        {saveError && (
          <div className="bg-red-100 border-2 border-red-500 rounded-xl p-3 text-red-700 font-bold text-center mb-4 text-sm">
            No se pudo guardar las puntuaciones.
            <button onClick={saveScores} className="ml-2 underline hover:no-underline">Reintentar</button>
          </div>
        )}

        {/* Social Share Buttons */}
        <SocialShare
          score={player1.score > player2.score ? player1.score : player2.score}
          gameMode={gameMode}
          difficulty={difficulty}
        />

        {/* Referral Card - Show winner's referral */}
        <ReferralCard playerName={player1.score > player2.score ? player1.name : player2.name} />

        {/* Google AdSense Banner - Pre-action placement */}
        <AdBanner />

        {/* Newsletter Signup */}
        <NewsletterSignup />

        {/* Support Us */}
        <SupportUs />

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
