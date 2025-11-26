import { describe, it, expect } from 'vitest';
import { applyWangoEffect, applySabotageEffect } from '../../utils/cardEffects';

describe('cardEffects', () => {
  describe('applyWangoEffect', () => {
    it('should double the score', () => {
      const result = applyWangoEffect(
        { effect: 'double' },
        1000,
        5,
        3,
        3
      );
      expect(result.score).toBe(2000);
      expect(result.livesChange).toBe(0);
    });

    it('should triple the score', () => {
      const result = applyWangoEffect(
        { effect: 'triple' },
        1000,
        5,
        3,
        3
      );
      expect(result.score).toBe(3000);
    });

    it('should halve the score', () => {
      const result = applyWangoEffect(
        { effect: 'half' },
        1000,
        5,
        3,
        3
      );
      expect(result.score).toBe(500);
    });

    it('should apply streak bonus', () => {
      const result = applyWangoEffect(
        { effect: 'streak' },
        1000,
        5,
        3,
        3
      );
      expect(result.score).toBe(1750); // 1000 + (5 * 150)
    });

    it('should add a life if not at max', () => {
      const result = applyWangoEffect(
        { effect: 'life' },
        1000,
        5,
        3,
        2
      );
      expect(result.livesChange).toBe(1);
    });

    it('should not add a life if at max', () => {
      const result = applyWangoEffect(
        { effect: 'life' },
        1000,
        5,
        3,
        3
      );
      expect(result.livesChange).toBe(0);
    });

    it('should add numeric effect to score', () => {
      const result = applyWangoEffect(
        { effect: 200 },
        1000,
        5,
        3,
        3
      );
      expect(result.score).toBe(1200);
    });

    it('should subtract numeric effect from score', () => {
      const result = applyWangoEffect(
        { effect: -100 },
        1000,
        5,
        3,
        3
      );
      expect(result.score).toBe(900);
    });

    it('should not allow negative scores', () => {
      const result = applyWangoEffect(
        { effect: -2000 },
        1000,
        5,
        3,
        3
      );
      expect(result.score).toBe(0);
    });
  });

  describe('applySabotageEffect', () => {
    it('should steal points from opponent', () => {
      const result = applySabotageEffect(
        { effect: 'steal', points: 200 },
        1000,
        1500
      );
      expect(result.currentPlayerScore).toBe(1200);
      expect(result.otherPlayerScore).toBe(1300);
      expect(result.timeReduction).toBe(0);
    });

    it('should swap scores', () => {
      const result = applySabotageEffect(
        { effect: 'swap' },
        1000,
        1500
      );
      expect(result.currentPlayerScore).toBe(1500);
      expect(result.otherPlayerScore).toBe(1000);
    });

    it('should reduce time', () => {
      const result = applySabotageEffect(
        { effect: 'time' },
        1000,
        1500
      );
      expect(result.timeReduction).toBe(5);
      expect(result.currentPlayerScore).toBe(1000);
      expect(result.otherPlayerScore).toBe(1500);
    });

    it('should apply bomb effect', () => {
      const result = applySabotageEffect(
        { effect: 'bomb', points: 300 },
        1000,
        1500
      );
      expect(result.currentPlayerScore).toBe(1000);
      expect(result.otherPlayerScore).toBe(1200);
    });

    it('should not allow negative scores after steal', () => {
      const result = applySabotageEffect(
        { effect: 'steal', points: 2000 },
        1000,
        500
      );
      expect(result.otherPlayerScore).toBe(0);
    });

    it('should not allow negative scores after bomb', () => {
      const result = applySabotageEffect(
        { effect: 'bomb', points: 2000 },
        1000,
        500
      );
      expect(result.otherPlayerScore).toBe(0);
    });
  });
});
