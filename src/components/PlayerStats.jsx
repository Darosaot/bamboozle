import React from 'react';
import { Heart, Clock, Snowflake } from 'lucide-react';

const PlayerStats = ({
  player,
  isCurrentPlayer,
  maxLives,
  maxTime,
  isSolo = false,
  timeFrozen = false
}) => {
  const bgClass = isSolo
    ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
    : isCurrentPlayer
      ? timeFrozen
        ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white ring-4 ring-cyan-300'
        : 'bg-gradient-to-br from-purple-500 to-blue-500 text-white ring-4 ring-white'
      : 'bg-white text-gray-800';

  // Get streak emoji based on streak count
  const getStreakDisplay = () => {
    if (player.streak >= 5) return { emoji: '🔥🔥🔥', text: 'EN LLAMAS!' };
    if (player.streak >= 3) return { emoji: '🔥🔥', text: '' };
    if (player.streak > 0) return { emoji: '🔥', text: '' };
    return null;
  };

  const streakDisplay = getStreakDisplay();

  return (
    <div className={`rounded-2xl shadow-xl ${isSolo ? 'p-6' : 'p-4'} transition-all ${bgClass} ${timeFrozen ? 'animate-pulse' : ''}`}>
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className={`${isSolo ? 'text-2xl' : 'text-lg'} font-black`}>{player.name}</p>
          <p className={`${isSolo ? 'text-5xl' : 'text-3xl'} font-black ${isSolo ? 'mt-2' : ''}`}>
            {player.score}
          </p>
          {streakDisplay && (
            <p className={`${isSolo ? 'text-lg mt-1' : 'text-sm'} ${player.streak >= 5 ? 'animate-bounce' : ''}`}>
              {streakDisplay.emoji} {isSolo ? `Racha: ${player.streak}` : player.streak}
              {streakDisplay.text && <span className="ml-1 text-yellow-300">{streakDisplay.text}</span>}
            </p>
          )}
        </div>
        <div className="text-right">
          <div className="flex gap-1 justify-end mb-1">
            {[...Array(maxLives)].map((_, i) => (
              <Heart
                key={i}
                className={`${isSolo ? 'w-6 h-6' : 'w-4 h-4'} ${
                  i < player.lives ? 'fill-red-500 text-red-500' : 'text-gray-400'
                }`}
              />
            ))}
          </div>
          {/* Show time for current player in solo mode, or always show in 2-player */}
          {(isSolo || isCurrentPlayer) && (
            <div className="flex items-center gap-2 justify-end">
              {timeFrozen ? (
                <Snowflake className={`${isSolo ? 'w-6 h-6' : 'w-5 h-5'} text-cyan-300 animate-spin`} />
              ) : (
                <Clock className={`${isSolo ? 'w-6 h-6' : 'w-5 h-5'}`} />
              )}
              <span className={`font-bold ${isSolo ? 'text-2xl' : 'text-xl'} ${timeFrozen ? 'text-cyan-300' : ''}`}>
                {player.timeLeft}s
              </span>
            </div>
          )}
        </div>
      </div>
      {isCurrentPlayer && (
        <div className={`w-full ${isSolo ? 'bg-white bg-opacity-30' : 'bg-gray-200 bg-opacity-30'} rounded-full ${isSolo ? 'h-3' : 'h-2'} ${isSolo ? 'mt-4' : ''}`}>
          <div
            className={`h-full ${timeFrozen ? 'bg-cyan-300' : 'bg-white'} rounded-full transition-all`}
            style={{ width: `${(player.timeLeft / maxTime) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default PlayerStats;
