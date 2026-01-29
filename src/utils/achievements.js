// Achievement System - Tracks player achievements and badges

const STORAGE_KEY = 'bamboozle_achievements';

// Achievement definitions
export const ACHIEVEMENTS = {
  // Score-based achievements
  FIRST_GAME: {
    id: 'first_game',
    name: 'Primer Paso',
    description: 'Completa tu primera partida',
    emoji: '👶',
    category: 'beginner'
  },
  SCORE_500: {
    id: 'score_500',
    name: 'Aprendiz',
    description: 'Alcanza 500 puntos en una partida',
    emoji: '📚',
    category: 'score'
  },
  SCORE_1000: {
    id: 'score_1000',
    name: 'Conocedor',
    description: 'Alcanza 1000 puntos en una partida',
    emoji: '🎓',
    category: 'score'
  },
  SCORE_2000: {
    id: 'score_2000',
    name: 'Experto',
    description: 'Alcanza 2000 puntos en una partida',
    emoji: '🏆',
    category: 'score'
  },
  SCORE_5000: {
    id: 'score_5000',
    name: 'Leyenda',
    description: 'Alcanza 5000 puntos en una partida',
    emoji: '👑',
    category: 'score'
  },

  // Streak-based achievements
  STREAK_3: {
    id: 'streak_3',
    name: 'Racha Caliente',
    description: 'Consigue una racha de 3 respuestas correctas',
    emoji: '🔥',
    category: 'streak'
  },
  STREAK_5: {
    id: 'streak_5',
    name: 'En Llamas',
    description: 'Consigue una racha de 5 respuestas correctas',
    emoji: '🔥🔥',
    category: 'streak'
  },
  STREAK_10: {
    id: 'streak_10',
    name: 'Imparable',
    description: 'Consigue una racha de 10 respuestas correctas',
    emoji: '💥',
    category: 'streak'
  },

  // Daily streak achievements
  DAILY_3: {
    id: 'daily_3',
    name: 'Constante',
    description: 'Juega 3 dias seguidos',
    emoji: '📅',
    category: 'daily'
  },
  DAILY_7: {
    id: 'daily_7',
    name: 'Dedicado',
    description: 'Juega 7 dias seguidos',
    emoji: '🗓️',
    category: 'daily'
  },
  DAILY_30: {
    id: 'daily_30',
    name: 'Adicto',
    description: 'Juega 30 dias seguidos',
    emoji: '🏅',
    category: 'daily'
  },

  // Difficulty achievements
  EASY_PERFECT: {
    id: 'easy_perfect',
    name: 'Calentamiento',
    description: 'Completa modo facil sin perder vidas',
    emoji: '😊',
    category: 'difficulty'
  },
  NORMAL_PERFECT: {
    id: 'normal_perfect',
    name: 'Profesional',
    description: 'Completa modo normal sin perder vidas',
    emoji: '💪',
    category: 'difficulty'
  },
  HARD_PERFECT: {
    id: 'hard_perfect',
    name: 'Maestro',
    description: 'Completa modo dificil sin perder vidas',
    emoji: '🧠',
    category: 'difficulty'
  },
  HARD_COMPLETE: {
    id: 'hard_complete',
    name: 'Superviviente',
    description: 'Completa una partida en modo dificil',
    emoji: '⚡',
    category: 'difficulty'
  },

  // Special achievements
  COMEBACK: {
    id: 'comeback',
    name: 'Remontada',
    description: 'Gana una partida con solo 1 vida restante',
    emoji: '🦸',
    category: 'special'
  },
  SPEED_DEMON: {
    id: 'speed_demon',
    name: 'Velocista',
    description: 'Responde correctamente con mas de 25 segundos restantes',
    emoji: '⚡',
    category: 'special'
  },
  WANGO_LUCKY: {
    id: 'wango_lucky',
    name: 'Afortunado',
    description: 'Obtén 3 Wango Cards positivas seguidas',
    emoji: '🍀',
    category: 'special'
  },
  GAMES_10: {
    id: 'games_10',
    name: 'Veterano',
    description: 'Juega 10 partidas',
    emoji: '🎮',
    category: 'games'
  },
  GAMES_50: {
    id: 'games_50',
    name: 'Fan',
    description: 'Juega 50 partidas',
    emoji: '❤️',
    category: 'games'
  },
  GAMES_100: {
    id: 'games_100',
    name: 'Super Fan',
    description: 'Juega 100 partidas',
    emoji: '💎',
    category: 'games'
  },

  // Two player achievements
  TWO_PLAYER_WIN: {
    id: 'two_player_win',
    name: 'Competidor',
    description: 'Gana una partida de 2 jugadores',
    emoji: '🥊',
    category: 'multiplayer'
  },
  SABOTAGE_MASTER: {
    id: 'sabotage_master',
    name: 'Saboteador',
    description: 'Usa 5 cartas de sabotaje',
    emoji: '😈',
    category: 'multiplayer'
  }
};

/**
 * Get all unlocked achievements
 */
export const getUnlockedAchievements = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading achievements:', error);
    return [];
  }
};

/**
 * Get player stats for achievement tracking
 */
export const getPlayerStats = () => {
  try {
    const stored = localStorage.getItem('bamboozle_player_stats');
    if (!stored) {
      return {
        totalGames: 0,
        highestScore: 0,
        highestStreak: 0,
        totalSabotageUsed: 0,
        positiveWangoStreak: 0,
        twoPlayerWins: 0
      };
    }
    return JSON.parse(stored);
  } catch (error) {
    return {
      totalGames: 0,
      highestScore: 0,
      highestStreak: 0,
      totalSabotageUsed: 0,
      positiveWangoStreak: 0,
      twoPlayerWins: 0
    };
  }
};

/**
 * Save player stats
 */
export const savePlayerStats = (stats) => {
  try {
    localStorage.setItem('bamboozle_player_stats', JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving player stats:', error);
  }
};

/**
 * Unlock an achievement
 */
export const unlockAchievement = (achievementId) => {
  const unlocked = getUnlockedAchievements();
  if (unlocked.includes(achievementId)) {
    return null; // Already unlocked
  }

  unlocked.push(achievementId);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
  } catch (error) {
    console.error('Error saving achievement:', error);
    return null;
  }

  return ACHIEVEMENTS[achievementId.toUpperCase()] || null;
};

/**
 * Check and unlock achievements based on game result
 * Returns array of newly unlocked achievements
 */
export const checkAchievements = ({
  score,
  bestStreak,
  livesRemaining,
  maxLives,
  difficulty,
  dailyStreak,
  timeLeft,
  isWinner,
  isTwoPlayer,
  positiveWangoStreak = 0,
  sabotageUsed = 0
}) => {
  const newAchievements = [];
  const stats = getPlayerStats();

  // Update stats
  stats.totalGames += 1;
  if (score > stats.highestScore) stats.highestScore = score;
  if (bestStreak > stats.highestStreak) stats.highestStreak = bestStreak;
  if (positiveWangoStreak > stats.positiveWangoStreak) {
    stats.positiveWangoStreak = positiveWangoStreak;
  }
  stats.totalSabotageUsed += sabotageUsed;
  if (isWinner && isTwoPlayer) stats.twoPlayerWins += 1;

  savePlayerStats(stats);

  // Check first game
  if (stats.totalGames === 1) {
    const a = unlockAchievement('first_game');
    if (a) newAchievements.push(a);
  }

  // Check game count achievements
  if (stats.totalGames >= 10) {
    const a = unlockAchievement('games_10');
    if (a) newAchievements.push(a);
  }
  if (stats.totalGames >= 50) {
    const a = unlockAchievement('games_50');
    if (a) newAchievements.push(a);
  }
  if (stats.totalGames >= 100) {
    const a = unlockAchievement('games_100');
    if (a) newAchievements.push(a);
  }

  // Check score achievements
  if (score >= 500) {
    const a = unlockAchievement('score_500');
    if (a) newAchievements.push(a);
  }
  if (score >= 1000) {
    const a = unlockAchievement('score_1000');
    if (a) newAchievements.push(a);
  }
  if (score >= 2000) {
    const a = unlockAchievement('score_2000');
    if (a) newAchievements.push(a);
  }
  if (score >= 5000) {
    const a = unlockAchievement('score_5000');
    if (a) newAchievements.push(a);
  }

  // Check streak achievements
  if (bestStreak >= 3) {
    const a = unlockAchievement('streak_3');
    if (a) newAchievements.push(a);
  }
  if (bestStreak >= 5) {
    const a = unlockAchievement('streak_5');
    if (a) newAchievements.push(a);
  }
  if (bestStreak >= 10) {
    const a = unlockAchievement('streak_10');
    if (a) newAchievements.push(a);
  }

  // Check daily streak achievements
  if (dailyStreak >= 3) {
    const a = unlockAchievement('daily_3');
    if (a) newAchievements.push(a);
  }
  if (dailyStreak >= 7) {
    const a = unlockAchievement('daily_7');
    if (a) newAchievements.push(a);
  }
  if (dailyStreak >= 30) {
    const a = unlockAchievement('daily_30');
    if (a) newAchievements.push(a);
  }

  // Check difficulty achievements
  const isPerfect = livesRemaining === maxLives;
  if (difficulty === 'hard') {
    const a = unlockAchievement('hard_complete');
    if (a) newAchievements.push(a);
    if (isPerfect) {
      const b = unlockAchievement('hard_perfect');
      if (b) newAchievements.push(b);
    }
  }
  if (difficulty === 'normal' && isPerfect) {
    const a = unlockAchievement('normal_perfect');
    if (a) newAchievements.push(a);
  }
  if (difficulty === 'easy' && isPerfect) {
    const a = unlockAchievement('easy_perfect');
    if (a) newAchievements.push(a);
  }

  // Check special achievements
  if (livesRemaining === 1 && score > 0) {
    const a = unlockAchievement('comeback');
    if (a) newAchievements.push(a);
  }
  if (timeLeft >= 25) {
    const a = unlockAchievement('speed_demon');
    if (a) newAchievements.push(a);
  }
  if (positiveWangoStreak >= 3) {
    const a = unlockAchievement('wango_lucky');
    if (a) newAchievements.push(a);
  }

  // Check two player achievements
  if (isTwoPlayer && isWinner) {
    const a = unlockAchievement('two_player_win');
    if (a) newAchievements.push(a);
  }
  if (stats.totalSabotageUsed >= 5) {
    const a = unlockAchievement('sabotage_master');
    if (a) newAchievements.push(a);
  }

  return newAchievements;
};

/**
 * Get achievement progress (for display)
 */
export const getAchievementProgress = () => {
  const unlocked = getUnlockedAchievements();
  const total = Object.keys(ACHIEVEMENTS).length;
  return {
    unlocked: unlocked.length,
    total,
    percentage: Math.round((unlocked.length / total) * 100)
  };
};

/**
 * Get all achievements with their unlock status
 */
export const getAllAchievementsWithStatus = () => {
  const unlocked = getUnlockedAchievements();
  return Object.values(ACHIEVEMENTS).map(achievement => ({
    ...achievement,
    unlocked: unlocked.includes(achievement.id)
  }));
};
