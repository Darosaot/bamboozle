# Database Setup for Bamboozle Leaderboard

This directory contains the database schema for the Bamboozle leaderboard system.

## Setup Instructions

### 1. Run the Database Migration

To set up the `scores` table in your Netlify Neon database, run the SQL in `schema.sql`:

```bash
# Connect to your database using the Netlify CLI or Neon console
# Then execute:
psql $NETLIFY_DATABASE_URL < database/schema.sql
```

Or through the Neon Console:
1. Go to your Netlify dashboard
2. Navigate to your database (tiny-night-93219235)
3. Open the SQL Editor
4. Copy and paste the contents of `schema.sql`
5. Run the query

### 2. Verify Environment Variables

Make sure these environment variables are available in your Netlify deployment:
- `NETLIFY_DATABASE_URL` - Automatically provided by Netlify

### 3. Test the Setup

After deploying, you can test the leaderboard:
1. Play a game
2. Click "GUARDAR EN TABLA" on the results screen
3. Go back to main menu
4. Click "VER TABLA DE CLASIFICACIÓN"

## Database Schema

The `scores` table contains:
- `id` - Primary key
- `player_name` - Player's name (VARCHAR 100)
- `score` - Final score (INTEGER)
- `difficulty` - Game difficulty: easy, normal, hard
- `game_mode` - Game mode: solo, two-player
- `streak` - Best streak achieved
- `rounds_won` - Number of rounds won
- `created_at` - Timestamp of score submission

## API Endpoints

### POST `/api/save-score`
Save a new score to the leaderboard

**Request body:**
```json
{
  "playerName": "Player 1",
  "score": 1500,
  "difficulty": "normal",
  "gameMode": "solo",
  "streak": 5,
  "roundsWon": 8
}
```

### GET `/api/get-leaderboard`
Fetch leaderboard scores

**Query parameters:**
- `difficulty` (optional) - Filter by difficulty: easy, normal, hard
- `gameMode` (optional) - Filter by mode: solo, two-player
- `limit` (optional) - Number of scores to return (default: 100, max: 1000)

**Example:**
```
GET /api/get-leaderboard?difficulty=normal&gameMode=solo&limit=50
```
