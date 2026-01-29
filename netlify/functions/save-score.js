import { neon } from '@netlify/neon';

export default async (req, context) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await req.json();
    const { playerName, score, difficulty, gameMode, streak, roundsWon } = body;

    // Validate required fields
    if (!playerName || score === undefined || !difficulty || !gameMode) {
      return new Response(JSON.stringify({
        error: 'Missing required fields: playerName, score, difficulty, gameMode'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate difficulty and gameMode values
    const validDifficulties = ['easy', 'normal', 'hard'];
    const validGameModes = ['solo', 'two-player'];

    if (!validDifficulties.includes(difficulty)) {
      return new Response(JSON.stringify({
        error: 'Invalid difficulty. Must be: easy, normal, or hard'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!validGameModes.includes(gameMode)) {
      return new Response(JSON.stringify({
        error: 'Invalid gameMode. Must be: solo or two-player'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate score range (anti-cheat)
    const maxScoresByDifficulty = {
      easy: 15000,    // 8 rounds max, generous limit
      normal: 20000,  // 10 rounds max
      hard: 30000     // 12 rounds max
    };

    if (score < 0 || score > maxScoresByDifficulty[difficulty]) {
      return new Response(JSON.stringify({
        error: 'Invalid score value'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate player name (2-15 chars, no special injection chars)
    const sanitizedName = playerName.trim().substring(0, 15);
    if (sanitizedName.length < 2 || /[<>\"';&]/.test(sanitizedName)) {
      return new Response(JSON.stringify({
        error: 'Invalid player name'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Connect to database
    const sql = neon(process.env.DATABASE_URL);

    // Insert score into database (use sanitized name)
    const result = await sql`
      INSERT INTO scores (player_name, score, difficulty, game_mode, streak, rounds_won)
      VALUES (${sanitizedName}, ${score}, ${difficulty}, ${gameMode}, ${streak || 0}, ${roundsWon || 0})
      RETURNING id, player_name, score, difficulty, game_mode, streak, rounds_won, created_at
    `;

    return new Response(JSON.stringify({
      success: true,
      data: result[0]
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error saving score:', error);
    return new Response(JSON.stringify({
      error: 'Failed to save score',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/save-score"
};
