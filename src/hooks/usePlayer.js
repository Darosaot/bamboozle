import { useState } from 'react';
import { INITIAL_PLAYER_STATE } from '../constants/gameConfig';

export const usePlayer = () => {
  const [player, setPlayer] = useState(INITIAL_PLAYER_STATE);

  const updatePlayerName = (name) => {
    setPlayer(prev => ({ ...prev, name }));
  };

  const updateScore = (points) => {
    setPlayer(prev => ({ ...prev, score: Math.max(0, prev.score + points) }));
  };

  const setScore = (score) => {
    setPlayer(prev => ({ ...prev, score: Math.max(0, score) }));
  };

  const updateStreak = (increment) => {
    setPlayer(prev => ({
      ...prev,
      streak: increment ? prev.streak + 1 : 0
    }));
  };

  const updateLives = (change) => {
    setPlayer(prev => ({ ...prev, lives: Math.max(0, prev.lives + change) }));
  };

  const setLives = (lives) => {
    setPlayer(prev => ({ ...prev, lives }));
  };

  const updateTimeLeft = (time) => {
    setPlayer(prev => ({ ...prev, timeLeft: Math.max(0, time) }));
  };

  const decrementTime = () => {
    setPlayer(prev => ({ ...prev, timeLeft: Math.max(0, prev.timeLeft - 1) }));
  };

  const usePowerUp = (powerUpType) => {
    setPlayer(prev => ({
      ...prev,
      powerUps: {
        ...prev.powerUps,
        [powerUpType]: Math.max(0, prev.powerUps[powerUpType] - 1)
      }
    }));
  };

  const incrementRoundsWon = () => {
    setPlayer(prev => ({ ...prev, roundsWon: prev.roundsWon + 1 }));
  };

  const resetPlayer = (lives, timeLeft) => {
    setPlayer({
      ...INITIAL_PLAYER_STATE,
      name: player.name,
      lives,
      timeLeft,
      powerUps: { skip: 1, fiftyFifty: 1, timeFreeze: 1 }
    });
  };

  const setPlayerState = (newState) => {
    setPlayer(prev => ({ ...prev, ...newState }));
  };

  return {
    player,
    updatePlayerName,
    updateScore,
    setScore,
    updateStreak,
    updateLives,
    setLives,
    updateTimeLeft,
    decrementTime,
    usePowerUp,
    incrementRoundsWon,
    resetPlayer,
    setPlayerState
  };
};
