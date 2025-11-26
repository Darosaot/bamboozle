import React, { useState, useCallback } from 'react';
import ModeSelection from './components/ModeSelection';
import PlayerSetup from './components/PlayerSetup';
import GameScreen from './components/GameScreen';
import ResultsScreen from './components/ResultsScreen';
import Leaderboard from './components/Leaderboard';
import { usePlayer } from './hooks/usePlayer';
import { useQuestions } from './hooks/useQuestions';
import { useTimer } from './hooks/useTimer';
import { wangoCards } from './data/wangoCards';
import { sabotageCards } from './data/sabotageCards';
import { DIFFICULTY_SETTINGS, GAME_MODES, CARD_PROBABILITIES } from './constants/gameConfig';
import { calculateScore } from './utils/scoreCalculator';
import { applyWangoEffect, applySabotageEffect } from './utils/cardEffects';

function App() {
  // Game state
  const [gameMode, setGameMode] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('normal');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [round, setRound] = useState(1);

  // Question state
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);
  const [removedOptions, setRemovedOptions] = useState([]);
  const [wangoCard, setWangoCard] = useState(null);
  const [sabotageCard, setSabotageCard] = useState(null);
  const [timerActive, setTimerActive] = useState(false);

  // Custom hooks
  const player1Hook = usePlayer();
  const player2Hook = usePlayer();
  const { currentQuestion, loadNewQuestion, resetQuestions } = useQuestions();

  // Timer hook
  useTimer(
    currentPlayer === 1 ? player1Hook.player.timeLeft : player2Hook.player.timeLeft,
    timerActive,
    handleTimeOut,
    () => {
      if (currentPlayer === 1) {
        player1Hook.decrementTime();
      } else {
        player2Hook.decrementTime();
      }
    },
    currentPlayer
  );

  // Handlers
  const handleSelectMode = (mode) => {
    setGameMode(mode);
  };

  const handleStartGame = () => {
    const settings = DIFFICULTY_SETTINGS[difficulty];
    setGameStarted(true);
    setRound(1);
    setCurrentPlayer(1);

    player1Hook.resetPlayer(settings.lives, settings.time);

    if (gameMode === GAME_MODES.TWO_PLAYER) {
      player2Hook.resetPlayer(settings.lives, settings.time);
    }

    resetQuestions();
    loadNewQuestion();
    setTimerActive(true);
  };

  const handleAnswer = (selectedIndex) => {
    if (answeredCorrectly !== null) return;

    setTimerActive(false);
    const correct = selectedIndex === currentQuestion.correct;
    setAnsweredCorrectly(correct);

    const playerHook = currentPlayer === 1 ? player1Hook : player2Hook;
    const player = playerHook.player;

    if (correct) {
      playerHook.updateStreak(true);
      playerHook.incrementRoundsWon();
      const bonus = calculateScore(currentQuestion.points, player.timeLeft, player.streak + 1);
      playerHook.updateScore(bonus);
    } else {
      playerHook.updateScore(-50);
      playerHook.updateStreak(false);
      playerHook.updateLives(-1);

      if (player.lives - 1 <= 0) {
        setTimeout(() => endGame(), 2000);
        return;
      }
    }

    // Card probability
    if (Math.random() > CARD_PROBABILITIES.WANGO_BASE) {
      setTimeout(() => {
        if (gameMode === GAME_MODES.TWO_PLAYER && Math.random() > CARD_PROBABILITIES.SABOTAGE_IN_WANGO) {
          const randomSabotage = sabotageCards[Math.floor(Math.random() * sabotageCards.length)];
          setSabotageCard(randomSabotage);
          setTimeout(() => {
            handleSabotageEffect(randomSabotage);
          }, 2500);
        } else {
          const randomWango = wangoCards[Math.floor(Math.random() * wangoCards.length)];
          setWangoCard(randomWango);
          setTimeout(() => {
            handleWangoEffect(randomWango);
          }, 2500);
        }
      }, 1500);
    } else {
      setTimeout(() => {
        nextTurn();
      }, 2000);
    }
  };

  function handleTimeOut() {
    setTimerActive(false);
    setAnsweredCorrectly(false);

    const playerHook = currentPlayer === 1 ? player1Hook : player2Hook;
    const player = playerHook.player;

    playerHook.updateScore(-50);
    playerHook.updateStreak(false);
    playerHook.updateLives(-1);

    if (player.lives - 1 <= 0) {
      setTimeout(() => endGame(), 2000);
    } else {
      setTimeout(() => nextTurn(), 2000);
    }
  }

  const handleWangoEffect = (wango) => {
    const playerHook = currentPlayer === 1 ? player1Hook : player2Hook;
    const player = playerHook.player;
    const settings = DIFFICULTY_SETTINGS[difficulty];

    const result = applyWangoEffect(wango, player.score, player.streak, settings.lives, player.lives);

    playerHook.setScore(result.score);
    if (result.livesChange > 0) {
      playerHook.updateLives(result.livesChange);
    }

    setTimeout(() => {
      nextTurn();
    }, 2000);
  };

  const handleSabotageEffect = (sabotage) => {
    const currentPlayerHook = currentPlayer === 1 ? player1Hook : player2Hook;
    const otherPlayerHook = currentPlayer === 1 ? player2Hook : player1Hook;

    const result = applySabotageEffect(
      sabotage,
      currentPlayerHook.player.score,
      otherPlayerHook.player.score
    );

    currentPlayerHook.setScore(result.currentPlayerScore);
    otherPlayerHook.setScore(result.otherPlayerScore);

    if (result.timeReduction > 0) {
      otherPlayerHook.updateTimeLeft(Math.max(0, otherPlayerHook.player.timeLeft - result.timeReduction));
    }

    setTimeout(() => {
      nextTurn();
    }, 2000);
  };

  const nextTurn = () => {
    const settings = DIFFICULTY_SETTINGS[difficulty];

    if (round >= settings.totalRounds) {
      endGame();
      return;
    }

    setAnsweredCorrectly(null);
    setWangoCard(null);
    setSabotageCard(null);
    setRemovedOptions([]);

    if (gameMode === GAME_MODES.TWO_PLAYER) {
      if (currentPlayer === 1) {
        setCurrentPlayer(2);
        player2Hook.updateTimeLeft(settings.time);
      } else {
        setCurrentPlayer(1);
        setRound(round + 1);
        player1Hook.updateTimeLeft(settings.time);
      }
    } else {
      setRound(round + 1);
      player1Hook.updateTimeLeft(settings.time);
    }

    loadNewQuestion();
    setTimerActive(true);
  };

  const endGame = () => {
    setShowResults(true);
    setTimerActive(false);
  };

  const resetGame = () => {
    setGameMode(null);
    setGameStarted(false);
    setShowResults(false);
    setShowLeaderboard(false);
    setCurrentPlayer(1);
    setRound(1);
    setAnsweredCorrectly(null);
    setWangoCard(null);
    setSabotageCard(null);
    setRemovedOptions([]);
    setTimerActive(false);
    resetQuestions();
  };

  const useFiftyFifty = () => {
    const playerHook = currentPlayer === 1 ? player1Hook : player2Hook;
    const player = playerHook.player;

    if (player.powerUps.fiftyFifty > 0 && removedOptions.length === 0 && currentQuestion) {
      const wrongOptions = currentQuestion.options
        .map((opt, idx) => idx)
        .filter(idx => idx !== currentQuestion.correct);

      const toRemove = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2);
      setRemovedOptions(toRemove);
      playerHook.usePowerUp('fiftyFifty');
    }
  };

  const useSkip = () => {
    const playerHook = currentPlayer === 1 ? player1Hook : player2Hook;

    if (playerHook.player.powerUps.skip > 0) {
      playerHook.usePowerUp('skip');
      nextTurn();
    }
  };

  const useTimeFreeze = () => {
    const playerHook = currentPlayer === 1 ? player1Hook : player2Hook;

    if (playerHook.player.powerUps.timeFreeze > 0) {
      setTimerActive(false);
      playerHook.usePowerUp('timeFreeze');
      setTimeout(() => setTimerActive(true), 10000);
    }
  };

  // Render appropriate screen
  if (showLeaderboard) {
    return <Leaderboard onBack={resetGame} />;
  }

  if (!gameMode) {
    return (
      <ModeSelection
        onSelectMode={handleSelectMode}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onShowLeaderboard={() => setShowLeaderboard(true)}
      />
    );
  }

  if (!gameStarted) {
    return (
      <PlayerSetup
        gameMode={gameMode}
        player1Name={player1Hook.player.name}
        player2Name={player2Hook.player.name}
        onPlayer1NameChange={player1Hook.updatePlayerName}
        onPlayer2NameChange={player2Hook.updatePlayerName}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        onStartGame={handleStartGame}
        onBack={() => setGameMode(null)}
      />
    );
  }

  if (showResults) {
    return (
      <ResultsScreen
        gameMode={gameMode}
        player1={player1Hook.player}
        player2={player2Hook.player}
        round={round}
        onPlayAgain={resetGame}
        onShowLeaderboard={() => setShowLeaderboard(true)}
        difficulty={difficulty}
      />
    );
  }

  const settings = DIFFICULTY_SETTINGS[difficulty];

  return (
    <GameScreen
      gameMode={gameMode}
      player1={player1Hook.player}
      player2={player2Hook.player}
      currentPlayer={currentPlayer}
      currentQuestion={currentQuestion}
      answeredCorrectly={answeredCorrectly}
      removedOptions={removedOptions}
      wangoCard={wangoCard}
      sabotageCard={sabotageCard}
      round={round}
      totalRounds={settings.totalRounds}
      maxLives={settings.lives}
      maxTime={settings.time}
      onAnswer={handleAnswer}
      onUseFiftyFifty={useFiftyFifty}
      onUseTimeFreeze={useTimeFreeze}
      onUseSkip={useSkip}
    />
  );
}

export default App;
