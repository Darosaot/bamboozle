import { neon } from '@netlify/neon';

// Legacy endpoint - use /api/get-leaderboard instead
export default async (req, context) => {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    const scores = await sql`
      SELECT id, player_name, score, difficulty, game_mode, streak, rounds_won, created_at
      FROM scores
      ORDER BY score DESC
      LIMIT 10
    `;

    return new Response(JSON.stringify(scores), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60'
      }
    });

  } catch (error) {
    console.error('Error fetching scores:', error);
    return new Response(JSON.stringify({
      error: 'Failed to fetch scores',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/get-scores"
};
