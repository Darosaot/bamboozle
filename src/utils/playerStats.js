// Player statistics utility functions
const STATS_KEY = 'bamboozle_player_stats';

/**
 * Get player statistics from localStorage
 */
export function getPlayerStats() {
  try {
    const stored = localStorage.getItem(STATS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading player stats:', error);
  }

  // Default stats structure
  return {
    gamesPlayed: 0,
    totalScore: 0,
    bestScore: 0,
    bestStreak: 0,
    totalCorrectAnswers: 0,
    totalQuestionsAnswered: 0,
    wins: 0,
    losses: 0,
    practiceSessionsCompleted: 0,
    timePlayedSeconds: 0,
    firstPlayedAt: null,
    lastPlayedAt: null,
    byDifficulty: {
      easy: { played: 0, bestScore: 0 },
      normal: { played: 0, bestScore: 0 },
      hard: { played: 0, bestScore: 0 }
    },
    byMode: {
      solo: { played: 0, wins: 0 },
      'two-player': { played: 0, wins: 0 },
      practice: { played: 0 }
    }
  };
}

/**
 * Save player statistics to localStorage
 */
export function savePlayerStats(stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving player stats:', error);
  }
}

/**
 * Update statistics after a game ends
 */
export function updateStatsAfterGame({
  score,
  streak,
  correctAnswers,
  totalQuestions,
  isWinner,
  gameMode,
  difficulty,
  durationSeconds,
  isPractice = false
}) {
  const stats = getPlayerStats();
  const now = new Date().toISOString();

  // Update general stats
  stats.gamesPlayed += 1;
  stats.totalScore += score;
  stats.bestScore = Math.max(stats.bestScore, score);
  stats.bestStreak = Math.max(stats.bestStreak, streak);
  stats.totalCorrectAnswers += correctAnswers;
  stats.totalQuestionsAnswered += totalQuestions;
  stats.timePlayedSeconds += durationSeconds || 0;

  // Track first and last played
  if (!stats.firstPlayedAt) {
    stats.firstPlayedAt = now;
  }
  stats.lastPlayedAt = now;

  // Update win/loss
  if (!isPractice) {
    if (isWinner) {
      stats.wins += 1;
    } else {
      stats.losses += 1;
    }
  } else {
    stats.practiceSessionsCompleted += 1;
  }

  // Update by difficulty (only for non-practice games)
  if (!isPractice && difficulty && stats.byDifficulty[difficulty]) {
    stats.byDifficulty[difficulty].played += 1;
    stats.byDifficulty[difficulty].bestScore = Math.max(
      stats.byDifficulty[difficulty].bestScore,
      score
    );
  }

  // Update by game mode
  const modeKey = isPractice ? 'practice' : (gameMode === 'solo' ? 'solo' : 'two-player');
  if (stats.byMode[modeKey]) {
    stats.byMode[modeKey].played += 1;
    if (!isPractice && isWinner) {
      stats.byMode[modeKey].wins += 1;
    }
  }

  savePlayerStats(stats);
  return stats;
}

/**
 * Calculate derived statistics
 */
export function calculateDerivedStats(stats) {
  const accuracy = stats.totalQuestionsAnswered > 0
    ? Math.round((stats.totalCorrectAnswers / stats.totalQuestionsAnswered) * 100)
    : 0;

  const winRate = (stats.wins + stats.losses) > 0
    ? Math.round((stats.wins / (stats.wins + stats.losses)) * 100)
    : 0;

  const avgScorePerGame = stats.gamesPlayed > 0
    ? Math.round(stats.totalScore / stats.gamesPlayed)
    : 0;

  const totalHoursPlayed = Math.round((stats.timePlayedSeconds / 3600) * 10) / 10;

  return {
    ...stats,
    accuracy,
    winRate,
    avgScorePerGame,
    totalHoursPlayed
  };
}

/**
 * Reset all player statistics
 */
export function resetPlayerStats() {
  localStorage.removeItem(STATS_KEY);
  return getPlayerStats();
}
