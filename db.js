
// db.js
import { neon } from '@netlify/neon';

const sql = neon();

async function createScoresTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS scores (
        id SERIAL PRIMARY KEY,
        player_name VARCHAR(255) NOT NULL,
        score INTEGER NOT NULL,
        difficulty VARCHAR(50),
        game_mode VARCHAR(50),
        streak INTEGER,
        rounds_won INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Table "scores" created successfully.');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

createScoresTable();
