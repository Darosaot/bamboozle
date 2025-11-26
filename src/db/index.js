
// src/db/index.js
import { neon } from '@netlify/neon';

const sql = neon();

export const getScores = async () => {
  return await sql`SELECT * FROM scores ORDER BY score DESC LIMIT 10`;
};

export const addScore = async (scoreData) => {
  const {
    playerName,
    score,
    difficulty,
    gameMode,
    streak,
    roundsWon,
  } = scoreData;
  return await sql`
    INSERT INTO scores(
      player_name,
      score,
      difficulty,
      game_mode,
      streak,
      rounds_won
    )
    VALUES(
      ${playerName},
      ${score},
      ${difficulty},
      ${gameMode},
      ${streak},
      ${roundsWon}
    )
  `;
};
