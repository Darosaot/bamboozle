import { neon } from '@netlify/neon';

export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { playerName } = await req.json();

    if (!playerName) {
      return new Response(JSON.stringify({ error: 'Missing playerName' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sql = neon(process.env.DATABASE_URL);

    // Check if player already has a referral code
    const existing = await sql`
      SELECT referral_code FROM referrals WHERE referrer_name = ${playerName}
    `;

    if (existing.length > 0) {
      return new Response(JSON.stringify({
        success: true,
        referralCode: existing[0].referral_code,
        isExisting: true
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate unique referral code
    let referralCode;
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 10) {
      referralCode = await sql`SELECT generate_referral_code() as code`;
      referralCode = referralCode[0].code;

      const check = await sql`
        SELECT id FROM referrals WHERE referral_code = ${referralCode}
      `;

      if (check.length === 0) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      throw new Error('Failed to generate unique referral code');
    }

    // Insert new referral
    await sql`
      INSERT INTO referrals (referral_code, referrer_name)
      VALUES (${referralCode}, ${playerName})
    `;

    return new Response(JSON.stringify({
      success: true,
      referralCode: referralCode,
      isExisting: false
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error creating referral:', error);
    return new Response(JSON.stringify({
      error: 'Failed to create referral'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/create-referral"
};
