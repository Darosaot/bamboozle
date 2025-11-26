export const calculateScore = (basePoints, timeLeft, streak) => {
  const timeBonus = Math.floor(timeLeft * 5);
  const streakBonus = streak * 50;
  return basePoints + timeBonus + streakBonus;
};

export const getRank = (score) => {
  if (score >= 2500) return { title: "¡LEYENDA BAMBOOZLE!", emoji: "👑", color: "text-yellow-500" };
  if (score >= 2000) return { title: "¡SUPER EXPERTO!", emoji: "🏆", color: "text-yellow-500" };
  if (score >= 1500) return { title: "¡Maestro de Bebés!", emoji: "⭐", color: "text-green-500" };
  if (score >= 1000) return { title: "Padre/Madre Competente", emoji: "👍", color: "text-blue-500" };
  if (score >= 500) return { title: "Principiante con Potencial", emoji: "🍼", color: "text-purple-500" };
  return { title: "¡Necesitas más práctica!", emoji: "😅", color: "text-red-500" };
};
