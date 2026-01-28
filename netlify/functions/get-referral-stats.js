import { neon } from '@netlify/neon';

export default async (req, context) => {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const url = new URL(req.url);
    const playerName = url.searchParams.get('playerName');
    const referralCode = url.searchParams.get('referralCode');

    if (!playerName && !referralCode) {
      return new Response(JSON.stringify({
        error: 'Missing playerName or referralCode parameter'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sql = neon(process.env.DATABASE_URL);

    let stats;
    if (referralCode) {
      stats = await sql`
        SELECT
          r.referral_code,
          r.referrer_name,
          r.total_uses,
          r.total_points_earned,
          r.created_at,
          r.last_used_at
        FROM referrals r
        WHERE r.referral_code = ${referralCode}
      `;
    } else {
      stats = await sql`
        SELECT
          r.referral_code,
          r.referrer_name,
          r.total_uses,
          r.total_points_earned,
          r.created_at,
          r.last_used_at
        FROM referrals r
        WHERE r.referrer_name = ${playerName}
      `;
    }

    if (stats.length === 0) {
      return new Response(JSON.stringify({
        success: true,
        data: null,
        message: 'No referral found'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get recent uses
    const recentUses = await sql`
      SELECT
        referred_player_name,
        score_achieved,
        points_awarded_to_referrer,
        used_at
      FROM referral_uses
      WHERE referral_code = ${stats[0].referral_code}
      ORDER BY used_at DESC
      LIMIT 10
    `;

    return new Response(JSON.stringify({
      success: true,
      data: {
        ...stats[0],
        recentUses: recentUses
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30'
      }
    });

  } catch (error) {
    console.error('Error fetching referral stats:', error);
    return new Response(JSON.stringify({
      error: 'Failed to fetch referral stats',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/get-referral-stats"
};
