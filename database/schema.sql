-- Bamboozle Leaderboard Database Schema
-- This creates the scores table for tracking player scores

CREATE TABLE IF NOT EXISTS scores (
  id SERIAL PRIMARY KEY,
  player_name VARCHAR(100) NOT NULL,
  score INTEGER NOT NULL,
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'normal', 'hard')),
  game_mode VARCHAR(20) NOT NULL CHECK (game_mode IN ('solo', 'two-player')),
  streak INTEGER DEFAULT 0,
  rounds_won INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_scores_score ON scores(score DESC);
CREATE INDEX IF NOT EXISTS idx_scores_difficulty ON scores(difficulty);
CREATE INDEX IF NOT EXISTS idx_scores_game_mode ON scores(game_mode);
CREATE INDEX IF NOT EXISTS idx_scores_created_at ON scores(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scores_player_name ON scores(player_name);

-- Composite index for filtered leaderboards
CREATE INDEX IF NOT EXISTS idx_scores_composite ON scores(difficulty, game_mode, score DESC);
