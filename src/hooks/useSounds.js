import { useCallback, useRef, useEffect } from 'react';

// Sound URLs using Web Audio API with generated tones
const SOUNDS = {
  correct: { frequency: 523.25, duration: 0.15, type: 'sine' },      // C5 - happy tone
  incorrect: { frequency: 200, duration: 0.3, type: 'sawtooth' },    // Low buzz
  tick: { frequency: 800, duration: 0.05, type: 'square' },          // Quick tick
  timeWarning: { frequency: 440, duration: 0.1, type: 'square' },    // A4 warning beep
  gameOver: { frequency: 150, duration: 0.5, type: 'sawtooth' },     // Low game over
  victory: { frequency: 659.25, duration: 0.2, type: 'sine' },       // E5 victory
  powerUp: { frequency: 880, duration: 0.1, type: 'sine' },          // A5 power up
  wangoPositive: { frequency: 698.46, duration: 0.15, type: 'sine' },// F5 positive
  wangoNegative: { frequency: 277.18, duration: 0.2, type: 'sawtooth' }, // C#4 negative
  sabotage: { frequency: 369.99, duration: 0.15, type: 'square' },   // F#4 sabotage
  click: { frequency: 1000, duration: 0.03, type: 'sine' },          // Quick click
  streak: { frequency: 783.99, duration: 0.1, type: 'sine' },        // G5 streak
};

export const useSounds = (enabled = true) => {
  const audioContextRef = useRef(null);

  // Initialize AudioContext on first user interaction
  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume if suspended (required by browsers)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  // Play a tone using Web Audio API
  const playTone = useCallback((soundConfig) => {
    if (!enabled) return;

    try {
      const audioContext = initAudioContext();
      if (!audioContext) return;

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = soundConfig.type;
      oscillator.frequency.setValueAtTime(soundConfig.frequency, audioContext.currentTime);

      // Envelope for smoother sound
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + soundConfig.duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + soundConfig.duration);
    } catch (error) {
      console.warn('Sound playback error:', error);
    }
  }, [enabled, initAudioContext]);

  // Play a melody (sequence of tones)
  const playMelody = useCallback((notes) => {
    if (!enabled) return;

    let delay = 0;
    notes.forEach((note) => {
      setTimeout(() => {
        playTone(note);
      }, delay * 1000);
      delay += note.duration + 0.05;
    });
  }, [enabled, playTone]);

  // Sound effect functions
  const playCorrect = useCallback(() => {
    playMelody([
      SOUNDS.correct,
      { frequency: 659.25, duration: 0.15, type: 'sine' }, // E5
    ]);
  }, [playMelody]);

  const playIncorrect = useCallback(() => {
    playTone(SOUNDS.incorrect);
  }, [playTone]);

  const playTick = useCallback(() => {
    playTone(SOUNDS.tick);
  }, [playTone]);

  const playTimeWarning = useCallback(() => {
    playTone(SOUNDS.timeWarning);
  }, [playTone]);

  const playGameOver = useCallback(() => {
    playMelody([
      { frequency: 392, duration: 0.2, type: 'sawtooth' },   // G4
      { frequency: 349.23, duration: 0.2, type: 'sawtooth' }, // F4
      { frequency: 293.66, duration: 0.4, type: 'sawtooth' }, // D4
    ]);
  }, [playMelody]);

  const playVictory = useCallback(() => {
    playMelody([
      { frequency: 523.25, duration: 0.1, type: 'sine' }, // C5
      { frequency: 659.25, duration: 0.1, type: 'sine' }, // E5
      { frequency: 783.99, duration: 0.1, type: 'sine' }, // G5
      { frequency: 1046.5, duration: 0.3, type: 'sine' }, // C6
    ]);
  }, [playMelody]);

  const playPowerUp = useCallback(() => {
    playMelody([
      { frequency: 523.25, duration: 0.08, type: 'sine' },
      { frequency: 659.25, duration: 0.08, type: 'sine' },
      { frequency: 783.99, duration: 0.12, type: 'sine' },
    ]);
  }, [playMelody]);

  const playWangoPositive = useCallback(() => {
    playMelody([
      { frequency: 523.25, duration: 0.1, type: 'sine' },
      { frequency: 783.99, duration: 0.15, type: 'sine' },
    ]);
  }, [playMelody]);

  const playWangoNegative = useCallback(() => {
    playMelody([
      { frequency: 349.23, duration: 0.15, type: 'sawtooth' },
      { frequency: 261.63, duration: 0.2, type: 'sawtooth' },
    ]);
  }, [playMelody]);

  const playSabotage = useCallback(() => {
    playMelody([
      { frequency: 440, duration: 0.1, type: 'square' },
      { frequency: 330, duration: 0.1, type: 'square' },
      { frequency: 440, duration: 0.1, type: 'square' },
    ]);
  }, [playMelody]);

  const playClick = useCallback(() => {
    playTone(SOUNDS.click);
  }, [playTone]);

  const playStreak = useCallback((streakCount) => {
    // Higher pitch for longer streaks
    const baseFreq = 523.25 + (streakCount * 50);
    playMelody([
      { frequency: baseFreq, duration: 0.08, type: 'sine' },
      { frequency: baseFreq * 1.25, duration: 0.12, type: 'sine' },
    ]);
  }, [playMelody]);

  // Cleanup audio context on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    playCorrect,
    playIncorrect,
    playTick,
    playTimeWarning,
    playGameOver,
    playVictory,
    playPowerUp,
    playWangoPositive,
    playWangoNegative,
    playSabotage,
    playClick,
    playStreak,
    initAudioContext, // Call this on first user interaction
  };
};

export default useSounds;
