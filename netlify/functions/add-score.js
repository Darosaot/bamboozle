import { neon } from '@netlify/neon';

// Legacy endpoint - use /api/save-score instead
export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { playerName, score, difficulty, gameMode, streak, roundsWon } = await req.json();

    // Validate required fields
    if (!playerName || score === undefined || !difficulty || !gameMode) {
      return new Response(JSON.stringify({
        error: 'Missing required fields'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate and sanitize
    const validDifficulties = ['easy', 'normal', 'hard'];
    const validGameModes = ['solo', 'two-player'];

    if (!validDifficulties.includes(difficulty) || !validGameModes.includes(gameMode)) {
      return new Response(JSON.stringify({
        error: 'Invalid difficulty or gameMode'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sanitizedName = playerName.trim().substring(0, 15);
    if (sanitizedName.length < 2) {
      return new Response(JSON.stringify({
        error: 'Invalid player name'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sql = neon(process.env.DATABASE_URL);

    await sql`
      INSERT INTO scores (player_name, score, difficulty, game_mode, streak, rounds_won)
      VALUES (${sanitizedName}, ${score}, ${difficulty}, ${gameMode}, ${streak || 0}, ${roundsWon || 0})
    `;

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error adding score:', error);
    return new Response(JSON.stringify({
      error: 'Failed to add score',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/add-score"
};
