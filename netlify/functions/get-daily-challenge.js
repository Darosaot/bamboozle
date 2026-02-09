import { neon } from '@netlify/neon';

export default async (req, context) => {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Generate or get today's challenge
    const challengeId = await sql`SELECT generate_daily_challenge(${today}::DATE) as id`;

    const challenge = await sql`
      SELECT
        id,
        challenge_date,
        difficulty,
        game_mode,
        target_score,
        bonus_points
      FROM daily_challenges
      WHERE id = ${challengeId[0].id}
    `;

    if (challenge.length === 0) {
      throw new Error('Failed to generate daily challenge');
    }

    // Get completion stats
    const stats = await sql`
      SELECT
        COUNT(*) as total_attempts,
        COUNT(CASE WHEN completed = true THEN 1 END) as total_completions,
        MAX(score) as highest_score
      FROM challenge_completions
      WHERE challenge_id = ${challenge[0].id}
    `;

    // Get top completions
    const leaderboard = await sql`
      SELECT
        player_name,
        score,
        completion_time,
        completed_at
      FROM challenge_completions
      WHERE challenge_id = ${challenge[0].id} AND completed = true
      ORDER BY score DESC, completion_time ASC
      LIMIT 10
    `;

    return new Response(JSON.stringify({
      success: true,
      challenge: challenge[0],
      stats: stats[0],
      leaderboard: leaderboard
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });

  } catch (error) {
    console.error('Error fetching daily challenge:', error);
    return new Response(JSON.stringify({
      error: 'Failed to fetch daily challenge'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/get-daily-challenge"
};
