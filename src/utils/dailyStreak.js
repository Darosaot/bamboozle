// Daily Streak System - Tracks consecutive days of playing

const STORAGE_KEY = 'bamboozle_daily_streak';

/**
 * Get the current daily streak data from localStorage
 */
export const getDailyStreakData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return {
        currentStreak: 0,
        lastPlayDate: null,
        longestStreak: 0,
        totalDaysPlayed: 0
      };
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading daily streak:', error);
    return {
      currentStreak: 0,
      lastPlayDate: null,
      longestStreak: 0,
      totalDaysPlayed: 0
    };
  }
};

/**
 * Save daily streak data to localStorage
 */
const saveDailyStreakData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving daily streak:', error);
  }
};

/**
 * Get today's date as YYYY-MM-DD string
 */
const getTodayString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/**
 * Get yesterday's date as YYYY-MM-DD string (local time)
 */
const getYesterdayString = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/**
 * Check and update daily streak when player starts a game
 * Returns the bonus points earned and streak info
 */
export const checkAndUpdateDailyStreak = () => {
  const data = getDailyStreakData();
  const today = getTodayString();
  const yesterday = getYesterdayString();

  let bonusPoints = 0;
  let streakMessage = '';
  let isNewDay = false;

  if (data.lastPlayDate === today) {
    // Already played today, no bonus
    return {
      bonusPoints: 0,
      currentStreak: data.currentStreak,
      longestStreak: data.longestStreak,
      totalDaysPlayed: data.totalDaysPlayed,
      streakMessage: '',
      isNewDay: false
    };
  }

  isNewDay = true;

  if (data.lastPlayDate === yesterday) {
    // Consecutive day! Increase streak
    data.currentStreak += 1;
    data.totalDaysPlayed += 1;

    // Bonus points based on streak length
    if (data.currentStreak >= 30) {
      bonusPoints = 500;
      streakMessage = `30+ dias seguidos! +${bonusPoints} pts bonus!`;
    } else if (data.currentStreak >= 14) {
      bonusPoints = 300;
      streakMessage = `2 semanas seguidas! +${bonusPoints} pts bonus!`;
    } else if (data.currentStreak >= 7) {
      bonusPoints = 200;
      streakMessage = `1 semana seguida! +${bonusPoints} pts bonus!`;
    } else if (data.currentStreak >= 3) {
      bonusPoints = 100;
      streakMessage = `${data.currentStreak} dias seguidos! +${bonusPoints} pts bonus!`;
    } else {
      bonusPoints = 50;
      streakMessage = `${data.currentStreak} dias seguidos! +${bonusPoints} pts bonus!`;
    }

    // Update longest streak
    if (data.currentStreak > data.longestStreak) {
      data.longestStreak = data.currentStreak;
    }
  } else if (data.lastPlayDate === null) {
    // First time playing
    data.currentStreak = 1;
    data.totalDaysPlayed = 1;
    bonusPoints = 25;
    streakMessage = 'Primera partida del dia! +25 pts bonus!';
  } else {
    // Streak broken, start fresh
    data.currentStreak = 1;
    data.totalDaysPlayed += 1;
    bonusPoints = 25;
    streakMessage = 'Nueva racha iniciada! +25 pts bonus!';
  }

  data.lastPlayDate = today;
  saveDailyStreakData(data);

  return {
    bonusPoints,
    currentStreak: data.currentStreak,
    longestStreak: data.longestStreak,
    totalDaysPlayed: data.totalDaysPlayed,
    streakMessage,
    isNewDay
  };
};

/**
 * Get streak bonus multiplier for score calculation
 */
export const getStreakMultiplier = (streakDays) => {
  if (streakDays >= 30) return 1.5;
  if (streakDays >= 14) return 1.3;
  if (streakDays >= 7) return 1.2;
  if (streakDays >= 3) return 1.1;
  return 1.0;
};

/**
 * Check if user will lose their streak tomorrow if they don't play
 */
export const willLoseStreakTomorrow = () => {
  const data = getDailyStreakData();
  const today = getTodayString();
  return data.lastPlayDate !== today && data.currentStreak > 0;
};

/**
 * Get time until streak resets (midnight)
 */
export const getTimeUntilStreakReset = () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const diff = tomorrow - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes };
};
