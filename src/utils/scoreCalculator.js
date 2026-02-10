import { RANK_THRESHOLDS } from '../constants/gameConfig';

export const calculateScore = (basePoints, timeLeft, streak) => {
  const timeBonus = Math.floor(timeLeft * 5);
  const streakBonus = streak * 50;
  return basePoints + timeBonus + streakBonus;
};

export const getRank = (score) => {
  for (const rank of RANK_THRESHOLDS) {
    if (score >= rank.min) {
      return { title: rank.title, emoji: rank.emoji, color: rank.color };
    }
  }
  return RANK_THRESHOLDS[RANK_THRESHOLDS.length - 1];
};
