import React from 'react';

const PowerUps = ({
  powerUps,
  onUseFiftyFifty,
  onUseTimeFreeze,
  onUseSkip,
  disabled,
  playerName,
  isTwoPlayer
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 mb-6">
      <p className="text-sm font-bold text-gray-600 mb-2 text-center">
        Power-Ups {isTwoPlayer ? `de ${playerName}` : ''}
      </p>
      <div className="flex gap-2">
        <button
          onClick={onUseFiftyFifty}
          disabled={powerUps.fiftyFifty === 0 || disabled}
          aria-label="Eliminar dos respuestas incorrectas"
          className={`flex-1 py-3 rounded-lg font-bold transition-all ${
            powerUps.fiftyFifty > 0 && !disabled
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          50/50 ({powerUps.fiftyFifty})
        </button>
        <button
          onClick={onUseTimeFreeze}
          disabled={powerUps.timeFreeze === 0 || disabled}
          aria-label="Congelar temporizador por 10 segundos"
          className={`flex-1 py-3 rounded-lg font-bold transition-all ${
            powerUps.timeFreeze > 0 && !disabled
              ? 'bg-cyan-500 text-white hover:bg-cyan-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          ⏸️ Pausa ({powerUps.timeFreeze})
        </button>
        <button
          onClick={onUseSkip}
          disabled={powerUps.skip === 0 || disabled}
          aria-label="Saltar pregunta"
          className={`flex-1 py-3 rounded-lg font-bold transition-all ${
            powerUps.skip > 0 && !disabled
              ? 'bg-purple-500 text-white hover:bg-purple-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          ⏭️ Saltar ({powerUps.skip})
        </button>
      </div>
    </div>
  );
};

export default PowerUps;
