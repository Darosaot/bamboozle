import React, { useState, useCallback, useEffect } from 'react';
import ModeSelection from './ModeSelection';
import PlayerSetup from './PlayerSetup';
import GameScreen from './GameScreen';
import ResultsScreen from './ResultsScreen';
import Leaderboard from './Leaderboard';
import AchievementsPage from './AchievementsPage';
import PlayerStatsPage from './PlayerStatsPage';
import DailyStreakBanner from './DailyStreakBanner';
import AchievementPopup from './AchievementPopup';
import { usePlayer } from '../hooks/usePlayer';
import { useQuestions } from '../hooks/useQuestions';
import { useTimer } from '../hooks/useTimer';
import { useSounds } from '../hooks/useSounds';
import { wangoCards } from '../data/wangoCards';
import { sabotageCards } from '../data/sabotageCards';
import { DIFFICULTY_SETTINGS, GAME_MODES, CARD_PROBABILITIES, PRACTICE_SETTINGS } from '../constants/gameConfig';
import { calculateScore } from '../utils/scoreCalculator';
import { applyWangoEffect, applySabotageEffect } from '../utils/cardEffects';
import { trackGameStart, trackGameEnd } from '../utils/analytics';
import { checkAndUpdateDailyStreak, getDailyStreakData } from '../utils/dailyStreak';
import { checkAchievements } from '../utils/achievements';
import { updateStatsAfterGame } from '../utils/playerStats';

export default function GameApp() {
  // Game state
  const [gameMode, setGameMode] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('normal');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [round, setRound] = useState(1);
  const [gameStartTime, setGameStartTime] = useState(null);

  // Daily streak and achievements
  const [dailyStreakData, setDailyStreakData] = useState(null);
  const [showDailyStreakBanner, setShowDailyStreakBanner] = useState(false);
  const [newAchievements, setNewAchievements] = useState([]);
  const [dailyBonusApplied, setDailyBonusApplied] = useState(false);

  // Question state
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);
  const [removedOptions, setRemovedOptions] = useState([]);
  const [wangoCard, setWangoCard] = useState(null);
  const [sabotageCard, setSabotageCard] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timeFrozen, setTimeFrozen] = useState(false);

  // Best streak tracking
  const [player1BestStreak, setPlayer1BestStreak] = useState(0);
  const [player2BestStreak, setPlayer2BestStreak] = useState(0);

  // Achievement tracking for Wango and Sabotage
  const [positiveWangoStreak, setPositiveWangoStreak] = useState(0);
  const [bestPositiveWangoStreak, setBestPositiveWangoStreak] = useState(0);
  const [sabotageUsedCount, setSabotageUsedCount] = useState(0);

  // Category selection
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Check daily streak on app load
  useEffect(() => {
    const streakData = checkAndUpdateDailyStreak();
    setDailyStreakData(streakData);
    if (streakData.isNewDay) {
      setShowDailyStreakBanner(true);
    }
  }, []);

  // Custom hooks
  const player1Hook = usePlayer();
  const player2Hook = usePlayer();
  const { currentQuestion, loadNewQuestion, resetQuestions, setCategories } = useQuestions();
  const sounds = useSounds(soundEnabled);

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
    const isPractice = gameMode === GAME_MODES.PRACTICE;
    const settings = isPractice ? PRACTICE_SETTINGS : DIFFICULTY_SETTINGS[difficulty];
    setGameStarted(true);
    setRound(1);
    setCurrentPlayer(1);
    setGameStartTime(Date.now());

    player1Hook.resetPlayer(settings.lives, settings.time);
    setPlayer1BestStreak(0);

    // Reset achievement tracking
    setPositiveWangoStreak(0);
    setBestPositiveWangoStreak(0);
    setSabotageUsedCount(0);

    // Apply daily streak bonus if not already applied (not in practice mode)
    if (!isPractice && dailyStreakData && dailyStreakData.bonusPoints > 0 && !dailyBonusApplied) {
      player1Hook.updateScore(dailyStreakData.bonusPoints);
      setDailyBonusApplied(true);
    }

    if (gameMode === GAME_MODES.TWO_PLAYER) {
      player2Hook.resetPlayer(settings.lives, settings.time);
      setPlayer2BestStreak(0);
      // Apply bonus to player 2 as well in two player mode
      if (dailyStreakData && dailyStreakData.bonusPoints > 0 && !dailyBonusApplied) {
        player2Hook.updateScore(dailyStreakData.bonusPoints);
      }
    }

    // Set categories filter for questions
    setCategories(selectedCategories);
    resetQuestions();
    loadNewQuestion();
    // No timer in practice mode
    setTimerActive(!isPractice);

    // Track game start in Google Analytics
    trackGameStart(
      isPractice ? 'practice' : (gameMode === GAME_MODES.SOLO ? 'solo' : 'two-player'),
      isPractice ? 'practice' : difficulty
    );
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
      const newStreak = player.streak + 1;
      const bonus = calculateScore(currentQuestion.points, player.timeLeft, newStreak);
      playerHook.updateScore(bonus);

      // Play sound based on streak
      if (newStreak >= 3) {
        sounds.playStreak(newStreak);
      } else {
        sounds.playCorrect();
      }

      // Update best streak
      if (currentPlayer === 1) {
        setPlayer1BestStreak(prev => Math.max(prev, newStreak));
      } else {
        setPlayer2BestStreak(prev => Math.max(prev, newStreak));
      }
    } else {
      sounds.playIncorrect();
      const isPractice = gameMode === GAME_MODES.PRACTICE;

      // In practice mode, no score penalty or lives lost
      if (!isPractice) {
        playerHook.updateScore(-50);
        playerHook.updateLives(-1);

        if (player.lives - 1 <= 0) {
          sounds.playGameOver();
          setTimeout(() => endGame(), 2000);
          return;
        }
      }
      playerHook.updateStreak(false);
    }

    // Card probability - trigger card if random is less than the probability (not in practice mode)
    const isPracticeMode = gameMode === GAME_MODES.PRACTICE;
    if (!isPracticeMode && Math.random() < CARD_PROBABILITIES.WANGO_BASE) {
      setTimeout(() => {
        if (gameMode === GAME_MODES.TWO_PLAYER && Math.random() < CARD_PROBABILITIES.SABOTAGE_IN_WANGO) {
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

    // Track positive Wango streak for achievements and play sound
    if (result.isPositive) {
      sounds.playWangoPositive();
      const newStreak = positiveWangoStreak + 1;
      setPositiveWangoStreak(newStreak);
      setBestPositiveWangoStreak(prev => Math.max(prev, newStreak));
    } else {
      sounds.playWangoNegative();
      setPositiveWangoStreak(0);
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

    // Track sabotage usage for achievements
    sounds.playSabotage();
    setSabotageUsedCount(prev => prev + 1);

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

    const settings = DIFFICULTY_SETTINGS[difficulty];
    const isTwoPlayer = gameMode === GAME_MODES.TWO_PLAYER;
    const player1Score = player1Hook.player.score;
    const player2Score = player2Hook.player.score;
    const isPlayer1Winner = !isTwoPlayer || player1Score >= player2Score;

    // Play victory sound if player has lives remaining
    if (player1Hook.player.lives > 0) {
      sounds.playVictory();
    }

    // Track game end in Google Analytics
    if (gameStartTime) {
      const duration = Math.floor((Date.now() - gameStartTime) / 1000);
      const finalScore = isTwoPlayer
        ? Math.max(player1Score, player2Score)
        : player1Score;

      trackGameEnd(
        isTwoPlayer ? 'two-player' : 'solo',
        difficulty,
        finalScore,
        duration
      );
    }

    // Check achievements for player 1 (or winner in solo mode)
    const dailyStreak = getDailyStreakData();
    const isPractice = gameMode === GAME_MODES.PRACTICE;
    const achievementsEarned = isPractice ? [] : checkAchievements({
      score: player1Score,
      bestStreak: player1BestStreak,
      livesRemaining: player1Hook.player.lives,
      maxLives: settings.lives,
      difficulty,
      dailyStreak: dailyStreak.currentStreak,
      timeLeft: player1Hook.player.timeLeft,
      isWinner: isPlayer1Winner,
      isTwoPlayer,
      positiveWangoStreak: bestPositiveWangoStreak,
      sabotageUsed: sabotageUsedCount
    });

    if (achievementsEarned.length > 0) {
      setNewAchievements(achievementsEarned);
    }

    // Update player statistics
    const durationSeconds = gameStartTime ? Math.floor((Date.now() - gameStartTime) / 1000) : 0;
    updateStatsAfterGame({
      score: player1Score,
      streak: player1BestStreak,
      correctAnswers: player1Hook.player.roundsWon,
      totalQuestions: round,
      isWinner: isPlayer1Winner,
      gameMode: isTwoPlayer ? 'two-player' : 'solo',
      difficulty,
      durationSeconds,
      isPractice
    });
  };

  const resetGame = () => {
    setGameMode(null);
    setGameStarted(false);
    setShowResults(false);
    setShowLeaderboard(false);
    setShowAchievements(false);
    setShowStats(false);
    setCurrentPlayer(1);
    setRound(1);
    setAnsweredCorrectly(null);
    setWangoCard(null);
    setSabotageCard(null);
    setRemovedOptions([]);
    setTimerActive(false);
    setNewAchievements([]);
    setPositiveWangoStreak(0);
    setBestPositiveWangoStreak(0);
    setSabotageUsedCount(0);
    resetQuestions();
  };

  const useFiftyFifty = () => {
    const playerHook = currentPlayer === 1 ? player1Hook : player2Hook;
    const player = playerHook.player;

    if (player.powerUps.fiftyFifty > 0 && removedOptions.length === 0 && currentQuestion) {
      sounds.playPowerUp();
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
      sounds.playPowerUp();
      playerHook.usePowerUp('skip');
      nextTurn();
    }
  };

  const useTimeFreeze = () => {
    const playerHook = currentPlayer === 1 ? player1Hook : player2Hook;

    if (playerHook.player.powerUps.timeFreeze > 0) {
      sounds.playPowerUp();
      setTimerActive(false);
      setTimeFrozen(true);
      playerHook.usePowerUp('timeFreeze');
      setTimeout(() => {
        setTimeFrozen(false);
        setTimerActive(true);
      }, 10000);
    }
  };

  // Render appropriate screen
  if (showLeaderboard) {
    return (
      <Leaderboard onBack={() => setShowLeaderboard(false)} />
    );
  }

  if (showAchievements) {
    return (
      <AchievementsPage onBack={() => setShowAchievements(false)} />
    );
  }

  if (showStats) {
    return (
      <PlayerStatsPage onBack={() => setShowStats(false)} />
    );
  }

  if (!gameMode) {
    return (
      <>
        <ModeSelection
          onSelectMode={handleSelectMode}
          onViewLeaderboard={() => setShowLeaderboard(true)}
          onViewAchievements={() => setShowAchievements(true)}
          onViewStats={() => setShowStats(true)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
        />
        {/* Daily Streak Banner */}
        <DailyStreakBanner
          streakData={dailyStreakData}
          onClose={() => setShowDailyStreakBanner(false)}
        />
      </>
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
        selectedCategories={selectedCategories}
        onCategoriesChange={setSelectedCategories}
        onStartGame={handleStartGame}
        onBack={() => setGameMode(null)}
      />
    );
  }

  if (showResults) {
    return (
      <>
        <ResultsScreen
          gameMode={gameMode}
          player1={player1Hook.player}
          player2={player2Hook.player}
          player1BestStreak={player1BestStreak}
          player2BestStreak={player2BestStreak}
          round={round}
          difficulty={difficulty}
          onPlayAgain={resetGame}
        />
        {/* Achievement Popup */}
        <AchievementPopup
          achievements={newAchievements}
          onClose={() => setNewAchievements([])}
        />
      </>
    );
  }

  const isPracticeMode = gameMode === GAME_MODES.PRACTICE;
  const settings = isPracticeMode ? PRACTICE_SETTINGS : DIFFICULTY_SETTINGS[difficulty];

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
      timeFrozen={timeFrozen}
      onAnswer={handleAnswer}
      onUseFiftyFifty={useFiftyFifty}
      onUseTimeFreeze={useTimeFreeze}
      onUseSkip={useSkip}
      onQuit={isPracticeMode ? () => setShowResults(true) : undefined}
    />
  );
}
