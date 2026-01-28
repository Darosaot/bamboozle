// Analytics utility for Google Analytics 4 event tracking

/**
 * Track a custom event in Google Analytics
 * @param {string} eventName - Name of the event
 * @param {object} eventParams - Additional parameters for the event
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Track a page view
 * @param {string} pagePath - Path of the page being viewed
 */
export const trackPageView = (pagePath) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-R9ZV6HF35B', {
      page_path: pagePath,
    });
  }
};

/**
 * Track when an ad is displayed
 * @param {string} adLocation - Location identifier for the ad
 */
export const trackAdImpression = (adLocation) => {
  trackEvent('ad_impression', {
    ad_location: adLocation,
    timestamp: new Date().toISOString()
  });
};

/**
 * Track when a game starts
 * @param {string} gameMode - Game mode (solo or two-player)
 * @param {string} difficulty - Difficulty level (easy, normal, hard)
 */
export const trackGameStart = (gameMode, difficulty) => {
  trackEvent('game_start', {
    game_mode: gameMode,
    difficulty: difficulty
  });
};

/**
 * Track when a game ends
 * @param {string} gameMode - Game mode (solo or two-player)
 * @param {string} difficulty - Difficulty level
 * @param {number} score - Final score
 * @param {number} duration - Game duration in seconds
 */
export const trackGameEnd = (gameMode, difficulty, score, duration) => {
  trackEvent('game_end', {
    game_mode: gameMode,
    difficulty: difficulty,
    score: score,
    duration_seconds: duration
  });
};

/**
 * Track social sharing events
 * @param {string} platform - Social platform (whatsapp, facebook, twitter)
 * @param {number} score - Score being shared
 */
export const trackSocialShare = (platform, score) => {
  trackEvent('social_share', {
    platform: platform,
    score: score
  });
};

/**
 * Track referral code clicks
 * @param {string} referralCode - The referral code being used
 */
export const trackReferralClick = (referralCode) => {
  trackEvent('referral_click', {
    referral_code: referralCode
  });
};

/**
 * Track daily challenge events
 * @param {string} action - Action type (start, complete, fail)
 * @param {number} challengeId - ID of the daily challenge
 * @param {number} score - Score achieved (optional)
 */
export const trackDailyChallenge = (action, challengeId, score = null) => {
  const params = {
    challenge_id: challengeId,
    action: action
  };

  if (score !== null) {
    params.score = score;
  }

  trackEvent('daily_challenge', params);
};
