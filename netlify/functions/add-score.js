
// netlify/functions/add-score.js
import { neon } from '@netlify/neon';

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sql = neon();
  const { playerName, score, difficulty, gameMode, streak, roundsWon } = JSON.parse(event.body);

  try {
    await sql`
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
    return { statusCode: 201 };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to add score' }),
    };
  }
};
