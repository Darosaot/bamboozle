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
  onUseSkip
}) => {
  const currentPlayerData = currentPlayer === 1 ? player1 : player2;
  const isSolo = gameMode === GAME_MODES.SOLO;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Time Frozen Indicator */}
        {timeFrozen && (
          <div className="bg-cyan-500 text-white text-center py-3 rounded-2xl mb-4 animate-pulse shadow-lg">
            <span className="text-2xl font-black">❄️ TIEMPO CONGELADO ❄️</span>
          </div>
        )}

        {/* Player Stats */}
        {isSolo ? (
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
        )}

        {/* Round Info */}
        <RoundInfo
          round={round}
          totalRounds={totalRounds}
          currentPlayerName={currentPlayerData.name}
          isTwoPlayer={!isSolo}
        />

        {/* Power-ups */}
        <PowerUps
          powerUps={currentPlayerData.powerUps}
          onUseFiftyFifty={onUseFiftyFifty}
          onUseTimeFreeze={onUseTimeFreeze}
          onUseSkip={onUseSkip}
          disabled={answeredCorrectly !== null}
          playerName={currentPlayerData.name}
          isTwoPlayer={!isSolo}
        />

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
