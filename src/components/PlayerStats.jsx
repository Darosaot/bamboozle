import React from 'react';
import { Heart, Clock } from 'lucide-react';

const PlayerStats = ({
  player,
  isCurrentPlayer,
  maxLives,
  maxTime,
  isSolo = false
}) => {
  const bgClass = isSolo
    ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
    : isCurrentPlayer
      ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white ring-4 ring-white'
      : 'bg-white text-gray-800';

  return (
    <div className={`rounded-2xl shadow-xl p-${isSolo ? '6' : '4'} transition-all ${bgClass}`}>
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className={`${isSolo ? 'text-2xl' : 'text-lg'} font-black`}>{player.name}</p>
          <p className={`${isSolo ? 'text-5xl' : 'text-3xl'} font-black ${isSolo ? 'mt-2' : ''}`}>
            {player.score}
          </p>
          {player.streak > 0 && (
            <p className={`${isSolo ? 'text-lg mt-1' : 'text-sm'}`}>
              🔥 {isSolo ? 'Racha: ' : ''}{player.streak}
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
          {isSolo && isCurrentPlayer && (
            <div className="flex items-center gap-2 justify-end">
              <Clock className="w-6 h-6" />
              <span className="font-bold text-2xl">{player.timeLeft}s</span>
            </div>
          )}
        </div>
      </div>
      {isCurrentPlayer && (
        <div className={`w-full ${isSolo ? 'bg-white bg-opacity-30' : 'bg-gray-200 bg-opacity-30'} rounded-full h-${isSolo ? '3' : '2'} ${isSolo ? 'mt-4' : ''}`}>
          <div
            className="h-full bg-white rounded-full transition-all"
            style={{ width: `${(player.timeLeft / maxTime) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default PlayerStats;
