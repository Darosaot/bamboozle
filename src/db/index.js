
// src/db/index.js
export const getScores = async () => {
  const response = await fetch('/.netlify/functions/get-scores');
  if (!response.ok) {
    throw new Error('Failed to fetch scores');
  }
  return await response.json();
};

export const addScore = async (scoreData) => {
  const response = await fetch('/.netlify/functions/add-score', {
    method: 'POST',
    body: JSON.stringify(scoreData),
  });

  if (!response.ok) {
    throw new Error('Failed to add score');
  }
};
