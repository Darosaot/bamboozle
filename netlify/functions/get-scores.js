
// netlify/functions/get-scores.js
import { neon } from '@netlify/neon';

exports.handler = async function(event, context) {
  const sql = neon();
  try {
    const scores = await sql`SELECT * FROM scores ORDER BY score DESC LIMIT 10`;
    return {
      statusCode: 200,
      body: JSON.stringify(scores),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch scores' }),
    };
  }
};
