
// setup-db.cjs
const { neon } = require('@netlify/neon');

async function createTable() {
  // The NETLIFY_DATABASE_URL environment variable is available in the Netlify build environment.
  const sql = neon();
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Table "scores" created or already exists.');
  } catch (error) {
    console.error('Error creating table:', error);
    // Exit with a non-zero status code to fail the build if the table creation fails
    process.exit(1);
  }
}

createTable();
