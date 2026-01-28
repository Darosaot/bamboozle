export const applyWangoEffect = (wango, currentScore, currentStreak, maxLives, currentLives) => {
  let finalScore = currentScore;
  let livesChange = 0;

  switch(wango.effect) {
    case "double":
      finalScore = currentScore * 2;
      break;
    case "triple":
      finalScore = currentScore * 3;
      break;
    case "half":
      finalScore = Math.floor(currentScore / 2);
      break;
    case "streak":
      finalScore = currentScore + (currentStreak * 150);
      break;
    case "life":
      livesChange = currentLives < maxLives ? 1 : 0;
      break;
    case "mystery":
      const mysteryEffects = [200, -100, 'double', 'half', 500];
      const mystery = mysteryEffects[Math.floor(Math.random() * mysteryEffects.length)];
      if (mystery === 'double') finalScore = currentScore * 2;
      else if (mystery === 'half') finalScore = Math.floor(currentScore / 2);
      else finalScore = currentScore + mystery;
      break;
    default:
      if (typeof wango.effect === 'number') {
        finalScore = currentScore + wango.effect;
      }
  }

  return {
    score: Math.max(0, finalScore),
    livesChange
  };
};

export const applySabotageEffect = (sabotage, currentPlayerScore, otherPlayerScore) => {
  let currentPlayerNewScore = currentPlayerScore;
  let otherPlayerNewScore = otherPlayerScore;
  let timeReduction = 0;

  switch(sabotage.effect) {
    case "steal":
      currentPlayerNewScore = currentPlayerScore + sabotage.points;
      otherPlayerNewScore = Math.max(0, otherPlayerScore - sabotage.points);
      break;
    case "swap":
      currentPlayerNewScore = otherPlayerScore;
      otherPlayerNewScore = currentPlayerScore;
      break;
    case "time":
      timeReduction = sabotage.points || 5;
      break;
    case "bomb":
      otherPlayerNewScore = Math.max(0, otherPlayerScore - sabotage.points);
      break;
  }

  return {
    currentPlayerScore: currentPlayerNewScore,
    otherPlayerScore: otherPlayerNewScore,
    timeReduction
  };
};
