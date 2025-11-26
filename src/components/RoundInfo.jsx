import React from 'react';

const RoundInfo = ({ round, totalRounds, currentPlayerName, isTwoPlayer }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 mb-6 text-center">
      <p className="text-xl font-black text-gray-800">
        Ronda {round} / {totalRounds}
        {isTwoPlayer && (
          <span className="text-purple-600 ml-4">Turno: {currentPlayerName}</span>
        )}
      </p>
    </div>
  );
};

export default RoundInfo;
