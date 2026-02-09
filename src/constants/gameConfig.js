export const DIFFICULTY_SETTINGS = {
  easy: { time: 30, totalRounds: 8, lives: 5 },
  normal: { time: 20, totalRounds: 10, lives: 3 },
  hard: { time: 15, totalRounds: 12, lives: 2 }
};

export const GAME_MODES = {
  SOLO: 'solo',
  TWO_PLAYER: '2player'
};

export const INITIAL_PLAYER_STATE = {
  name: '',
  score: 0,
  lives: 3,
  streak: 0,
  timeLeft: 20,
  powerUps: { skip: 1, fiftyFifty: 1, timeFreeze: 1 },
  roundsWon: 0
};

export const CARD_PROBABILITIES = {
  WANGO_BASE: 0.45,
  SABOTAGE_IN_WANGO: 0.65
};

export const TIMEOUT_DELAYS = {
  ANSWER_FEEDBACK: 2000,
  CARD_SHOW: 1500,
  CARD_EFFECT: 2500,
  SKIP_TRANSITION: 500,
  TIME_FREEZE_DURATION: 10000
};

export const RANK_THRESHOLDS = [
  { min: 2500, title: "¡LEYENDA BAMBOOZLE!", emoji: "👑", color: "text-yellow-500" },
  { min: 2000, title: "¡SUPER EXPERTO!", emoji: "🏆", color: "text-yellow-500" },
  { min: 1500, title: "¡Maestro de Bebés!", emoji: "⭐", color: "text-green-500" },
  { min: 1000, title: "Padre/Madre Competente", emoji: "👍", color: "text-blue-500" },
  { min: 500, title: "Principiante con Potencial", emoji: "🍼", color: "text-purple-500" },
  { min: 0, title: "¡Necesitas más práctica!", emoji: "😅", color: "text-red-500" }
];

export const STREAK_BONUSES = [
  { min: 30, points: 500 },
  { min: 14, points: 300 },
  { min: 7, points: 200 },
  { min: 3, points: 100 },
  { min: 0, points: 50 }
];

export const MYSTERY_EFFECTS = [200, -100, 'double', 'half', 500];
