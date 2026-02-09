import { neon } from '@netlify/neon';

export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { challengeId, playerName, score, completionTime } = await req.json();

    if (!challengeId || !playerName || score === undefined) {
      return new Response(JSON.stringify({
        error: 'Missing required fields: challengeId, playerName, score'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sql = neon(process.env.DATABASE_URL);

    // Get challenge details
    const challenge = await sql`
      SELECT id, target_score, bonus_points FROM daily_challenges WHERE id = ${challengeId}
    `;

    if (challenge.length === 0) {
      return new Response(JSON.stringify({ error: 'Challenge not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const completed = score >= challenge[0].target_score;

    // Check if player already attempted this challenge
    const existing = await sql`
      SELECT id, score, completed FROM challenge_completions
      WHERE challenge_id = ${challengeId} AND player_name = ${playerName}
    `;

    if (existing.length > 0) {
      // Update if new score is better
      if (score > existing[0].score) {
        await sql`
          UPDATE challenge_completions
          SET
            score = ${score},
            completed = ${completed},
            completion_time = ${completionTime || null},
            completed_at = CURRENT_TIMESTAMP
          WHERE challenge_id = ${challengeId} AND player_name = ${playerName}
        `;
      }

      return new Response(JSON.stringify({
        success: true,
        completed: completed,
        isNewRecord: score > existing[0].score,
        bonusPoints: completed ? challenge[0].bonus_points : 0,
        message: score > existing[0].score ?
          '¡Nuevo récord personal!' :
          'Ya completaste este desafío anteriormente'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insert new completion
    await sql`
      INSERT INTO challenge_completions
        (challenge_id, player_name, score, completed, completion_time)
      VALUES
        (${challengeId}, ${playerName}, ${score}, ${completed}, ${completionTime || null})
    `;

    return new Response(JSON.stringify({
      success: true,
      completed: completed,
      isNewRecord: true,
      bonusPoints: completed ? challenge[0].bonus_points : 0,
      message: completed ?
        `¡Desafío completado! Ganaste ${challenge[0].bonus_points} puntos bonus` :
        `Puntuación: ${score}/${challenge[0].target_score}. ¡Sigue intentando!`
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error completing challenge:', error);
    return new Response(JSON.stringify({
      error: 'Failed to complete challenge'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: "/api/complete-challenge"
};
