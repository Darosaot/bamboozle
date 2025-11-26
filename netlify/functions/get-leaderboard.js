import { neon } from '@netlify/neon';

export default async (req, context) => {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const url = new URL(req.url);
    const difficulty = url.searchParams.get('difficulty');
    const gameMode = url.searchParams.get('gameMode');
    const limit = parseInt(url.searchParams.get('limit') || '100', 10);

    // Validate limit
    if (limit < 1 || limit > 1000) {
      return new Response(JSON.stringify({
        error: 'Limit must be between 1 and 1000'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Connect to database
    const sql = neon(process.env.NETLIFY_DATABASE_URL);

    let scores;

    // Build query based on filters
    if (difficulty && gameMode) {
      scores = await sql`
        SELECT id, player_name, score, difficulty, game_mode, streak, rounds_won, created_at
        FROM scores
        WHERE difficulty = ${difficulty} AND game_mode = ${gameMode}
        ORDER BY score DESC, created_at ASC
        LIMIT ${limit}
      `;
    } else if (difficulty) {
      scores = await sql`
        SELECT id, player_name, score, difficulty, game_mode, streak, rounds_won, created_at
        FROM scores
        WHERE difficulty = ${difficulty}
        ORDER BY score DESC, created_at ASC
        LIMIT ${limit}
      `;
    } else if (gameMode) {
      scores = await sql`
        SELECT id, player_name, score, difficulty, game_mode, streak, rounds_won, created_at
        FROM scores
        WHERE game_mode = ${gameMode}
        ORDER BY score DESC, created_at ASC
        LIMIT ${limit}
      `;
    } else {
      scores = await sql`
        SELECT id, player_name, score, difficulty, game_mode, streak, rounds_won, created_at
        FROM scores
        ORDER BY score DESC, created_at ASC
        LIMIT ${limit}
      `;
    }

    return new Response(JSON.stringify({
      success: true,
      data: scores,
      count: scores.length
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60' // Cache for 1 minute
      }
    });

  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return new Response(JSON.stringify({
      error: 'Failed to fetch leaderboard',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/get-leaderboard"
};
