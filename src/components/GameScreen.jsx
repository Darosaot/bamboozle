import React from 'react';
import { GAME_MODES } from '../constants/gameConfig';
import PlayerStats from './PlayerStats';
import RoundInfo from './RoundInfo';
import PowerUps from './PowerUps';
import QuestionCard from './QuestionCard';
import WangoCard from './WangoCard';
import SabotageCard from './SabotageCard';

const GameScreen = ({
  gameMode,
  player1,
  player2,
  currentPlayer,
  currentQuestion,
  answeredCorrectly,
  removedOptions,
  wangoCard,
  sabotageCard,
  round,
  totalRounds,
  maxLives,
  maxTime,
  timeFrozen,
  onAnswer,
  onUseFiftyFifty,
  onUseTimeFreeze,
  onUseSkip,
  onQuit
}) => {
  const currentPlayerData = currentPlayer === 1 ? player1 : player2;
  const isSolo = gameMode === GAME_MODES.SOLO;
  const isPractice = gameMode === GAME_MODES.PRACTICE;

  return (
    <div className={`min-h-screen p-4 ${isPractice ? 'bg-gradient-to-br from-green-400 via-teal-400 to-cyan-400' : 'bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Practice Mode Header */}
        {isPractice && (
          <div className="bg-white/90 rounded-2xl p-3 mb-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <span className="font-bold text-green-700">Modo Práctica - Pregunta {round}</span>
            </div>
            <button
              onClick={onQuit}
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg transition-all"
            >
              Terminar
            </button>
          </div>
        )}

        {/* Time Frozen Indicator */}
        {timeFrozen && !isPractice && (
          <div className="bg-cyan-500 text-white text-center py-3 rounded-2xl mb-4 animate-pulse shadow-lg">
            <span className="text-2xl font-black">❄️ TIEMPO CONGELADO ❄️</span>
          </div>
        )}

        {/* Player Stats - simplified for practice mode */}
        {!isPractice && (
          (isSolo) ? (
            <div className="mb-6">
              <PlayerStats
                player={player1}
                isCurrentPlayer={true}
                maxLives={maxLives}
                maxTime={maxTime}
                isSolo={true}
                timeFrozen={timeFrozen}
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <PlayerStats
                player={player1}
                isCurrentPlayer={currentPlayer === 1}
                maxLives={maxLives}
                maxTime={maxTime}
                timeFrozen={currentPlayer === 1 && timeFrozen}
              />
              <PlayerStats
                player={player2}
                isCurrentPlayer={currentPlayer === 2}
                maxLives={maxLives}
                maxTime={maxTime}
                timeFrozen={currentPlayer === 2 && timeFrozen}
              />
            </div>
          )
        )}

        {/* Practice mode simple stats */}
        {isPractice && (
          <div className="bg-white/90 rounded-2xl p-4 mb-4 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-700">{player1.name}</span>
              <div className="flex items-center gap-4">
                <span className="text-green-600 font-bold">✓ {player1.roundsWon} correctas</span>
                <span className="text-orange-600 font-bold">Racha: {player1.streak}</span>
              </div>
            </div>
          </div>
        )}

        {/* Round Info - not shown in practice mode */}
        {!isPractice && (
          <RoundInfo
            round={round}
            totalRounds={totalRounds}
            currentPlayerName={currentPlayerData.name}
            isTwoPlayer={!isSolo}
          />
        )}

        {/* Power-ups - not shown in practice mode */}
        {!isPractice && (
          <PowerUps
            powerUps={currentPlayerData.powerUps}
            onUseFiftyFifty={onUseFiftyFifty}
            onUseTimeFreeze={onUseTimeFreeze}
            onUseSkip={onUseSkip}
            disabled={answeredCorrectly !== null}
            playerName={currentPlayerData.name}
            isTwoPlayer={!isSolo}
          />
        )}

        {/* Question Card */}
        {currentQuestion && !wangoCard && !sabotageCard && (
          <QuestionCard
            question={currentQuestion}
            onAnswer={onAnswer}
            answeredCorrectly={answeredCorrectly}
            removedOptions={removedOptions}
          />
        )}

        {/* Wango Card */}
        {wangoCard && <WangoCard card={wangoCard} />}

        {/* Sabotage Card */}
        {sabotageCard && <SabotageCard card={sabotageCard} />}
      </div>
    </div>
  );
};

export default GameScreen;
