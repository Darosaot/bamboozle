// src/db/index.js
// Legacy database client functions
// All API calls now use direct fetch to /api/* endpoints from components.
// This file is kept for backward compatibility but is not actively used.

export const getScores = async () => {
  const response = await fetch('/api/get-leaderboard');
  if (!response.ok) {
    throw new Error('Failed to fetch scores');
  }
  const data = await response.json();
  return data.data || [];
};

export const addScore = async (scoreData) => {
  const response = await fetch('/api/save-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(scoreData),
  });

  if (!response.ok) {
    throw new Error('Failed to add score');
  }
};
