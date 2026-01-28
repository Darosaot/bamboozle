-- Referral System Tables
-- Migration 002: Add referral tracking functionality

-- Referrals table to store unique referral codes
CREATE TABLE IF NOT EXISTS referrals (
  id SERIAL PRIMARY KEY,
  referral_code VARCHAR(20) UNIQUE NOT NULL,
  referrer_name VARCHAR(100) NOT NULL,
  total_uses INTEGER DEFAULT 0,
  total_points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_used_at TIMESTAMP WITH TIME ZONE
);

-- Referral uses table to track each use of a referral code
CREATE TABLE IF NOT EXISTS referral_uses (
  id SERIAL PRIMARY KEY,
  referral_code VARCHAR(20) NOT NULL,
  referred_player_name VARCHAR(100) NOT NULL,
  score_achieved INTEGER DEFAULT 0,
  points_awarded_to_referrer INTEGER DEFAULT 50,
  used_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (referral_code) REFERENCES referrals(referral_code) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals(referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_name);
CREATE INDEX IF NOT EXISTS idx_referral_uses_code ON referral_uses(referral_code);
CREATE INDEX IF NOT EXISTS idx_referral_uses_player ON referral_uses(referred_player_name);

-- Function to generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code() RETURNS VARCHAR(20) AS $$
DECLARE
  chars VARCHAR(62) := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result VARCHAR(20) := '';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON TABLE referrals IS 'Stores unique referral codes and tracking statistics';
COMMENT ON TABLE referral_uses IS 'Records each use of a referral code';
COMMENT ON FUNCTION generate_referral_code() IS 'Generates a random 8-character alphanumeric referral code';
