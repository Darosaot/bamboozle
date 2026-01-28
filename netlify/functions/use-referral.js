import { neon } from '@netlify/neon';

export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { referralCode, playerName, score } = await req.json();

    if (!referralCode || !playerName) {
      return new Response(JSON.stringify({
        error: 'Missing referralCode or playerName'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sql = neon(process.env.DATABASE_URL);

    // Verify referral code exists
    const referral = await sql`
      SELECT id, referrer_name FROM referrals WHERE referral_code = ${referralCode}
    `;

    if (referral.length === 0) {
      return new Response(JSON.stringify({
        error: 'Invalid referral code'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Prevent self-referral
    if (referral[0].referrer_name.toLowerCase() === playerName.toLowerCase()) {
      return new Response(JSON.stringify({
        error: 'Cannot use your own referral code'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if player already used this code
    const alreadyUsed = await sql`
      SELECT id FROM referral_uses
      WHERE referral_code = ${referralCode}
      AND referred_player_name = ${playerName}
    `;

    if (alreadyUsed.length > 0) {
      return new Response(JSON.stringify({
        error: 'You already used this referral code'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const pointsAwarded = 50; // Points awarded to referrer

    // Record referral use
    await sql`
      INSERT INTO referral_uses
        (referral_code, referred_player_name, score_achieved, points_awarded_to_referrer)
      VALUES
        (${referralCode}, ${playerName}, ${score || 0}, ${pointsAwarded})
    `;

    // Update referral statistics
    await sql`
      UPDATE referrals
      SET
        total_uses = total_uses + 1,
        total_points_earned = total_points_earned + ${pointsAwarded},
        last_used_at = CURRENT_TIMESTAMP
      WHERE referral_code = ${referralCode}
    `;

    return new Response(JSON.stringify({
      success: true,
      message: 'Referral applied successfully',
      referrerName: referral[0].referrer_name,
      pointsAwarded: pointsAwarded
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error using referral:', error);
    return new Response(JSON.stringify({
      error: 'Failed to use referral',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/use-referral"
};
