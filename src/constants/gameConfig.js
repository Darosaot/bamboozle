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
