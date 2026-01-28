-- Daily Challenge System Tables
-- Migration 003: Add daily challenge functionality

-- Daily challenges table
CREATE TABLE IF NOT EXISTS daily_challenges (
  id SERIAL PRIMARY KEY,
  challenge_date DATE UNIQUE NOT NULL,
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'normal', 'hard')),
  game_mode VARCHAR(20) NOT NULL CHECK (game_mode IN ('solo', 'two-player')),
  target_score INTEGER NOT NULL,
  bonus_points INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Challenge completions table
CREATE TABLE IF NOT EXISTS challenge_completions (
  id SERIAL PRIMARY KEY,
  challenge_id INTEGER NOT NULL,
  player_name VARCHAR(100) NOT NULL,
  score INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completion_time INTEGER, -- seconds taken to complete
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (challenge_id) REFERENCES daily_challenges(id) ON DELETE CASCADE,
  UNIQUE(challenge_id, player_name) -- One attempt per player per challenge
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_challenges_date ON daily_challenges(challenge_date DESC);
CREATE INDEX IF NOT EXISTS idx_completions_challenge ON challenge_completions(challenge_id);
CREATE INDEX IF NOT EXISTS idx_completions_player ON challenge_completions(player_name);
CREATE INDEX IF NOT EXISTS idx_completions_completed ON challenge_completions(completed);

-- Function to generate daily challenge
CREATE OR REPLACE FUNCTION generate_daily_challenge(p_date DATE) RETURNS INTEGER AS $$
DECLARE
  v_challenge_id INTEGER;
  v_difficulty VARCHAR(20);
  v_game_mode VARCHAR(20);
  v_target_score INTEGER;
  v_bonus INTEGER;
BEGIN
  -- Check if challenge already exists for this date
  SELECT id INTO v_challenge_id FROM daily_challenges WHERE challenge_date = p_date;

  IF v_challenge_id IS NOT NULL THEN
    RETURN v_challenge_id;
  END IF;

  -- Generate pseudo-random challenge based on date
  -- This ensures same challenge for everyone on same date
  v_difficulty := CASE (EXTRACT(DOY FROM p_date)::INTEGER % 3)
    WHEN 0 THEN 'easy'
    WHEN 1 THEN 'normal'
    ELSE 'hard'
  END;

  v_game_mode := CASE (EXTRACT(DOW FROM p_date)::INTEGER % 2)
    WHEN 0 THEN 'solo'
    ELSE 'solo' -- For now, only solo challenges
  END;

  v_target_score := CASE v_difficulty
    WHEN 'easy' THEN 800
    WHEN 'normal' THEN 1200
    ELSE 1800
  END;

  v_bonus := CASE v_difficulty
    WHEN 'easy' THEN 50
    WHEN 'normal' THEN 100
    ELSE 200
  END;

  -- Insert new challenge
  INSERT INTO daily_challenges (challenge_date, difficulty, game_mode, target_score, bonus_points)
  VALUES (p_date, v_difficulty, v_game_mode, v_target_score, v_bonus)
  RETURNING id INTO v_challenge_id;

  RETURN v_challenge_id;
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON TABLE daily_challenges IS 'Stores daily challenge configurations';
COMMENT ON TABLE challenge_completions IS 'Records player attempts and completions of daily challenges';
COMMENT ON FUNCTION generate_daily_challenge(DATE) IS 'Generates or retrieves a daily challenge for the specified date';
