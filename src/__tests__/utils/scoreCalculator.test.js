import { describe, it, expect } from 'vitest';
import { calculateScore, getRank } from '../../utils/scoreCalculator';

describe('scoreCalculator', () => {
  describe('calculateScore', () => {
    it('should calculate score with base points only', () => {
      const result = calculateScore(100, 0, 0);
      expect(result).toBe(100);
    });

    it('should add time bonus', () => {
      const result = calculateScore(100, 10, 0);
      expect(result).toBe(150); // 100 + (10 * 5)
    });

    it('should add streak bonus', () => {
      const result = calculateScore(100, 0, 3);
      expect(result).toBe(250); // 100 + (3 * 50)
    });

    it('should add both time and streak bonus', () => {
      const result = calculateScore(100, 10, 3);
      expect(result).toBe(300); // 100 + (10 * 5) + (3 * 50)
    });

    it('should handle large values', () => {
      const result = calculateScore(500, 20, 10);
      expect(result).toBe(1100); // 500 + (20 * 5) + (10 * 50)
    });
  });

  describe('getRank', () => {
    it('should return LEYENDA BAMBOOZLE for score >= 2500', () => {
      const rank = getRank(3000);
      expect(rank.title).toBe("¡LEYENDA BAMBOOZLE!");
      expect(rank.emoji).toBe("👑");
      expect(rank.color).toBe("text-yellow-500");
    });

    it('should return SUPER EXPERTO for score >= 2000', () => {
      const rank = getRank(2200);
      expect(rank.title).toBe("¡SUPER EXPERTO!");
      expect(rank.emoji).toBe("🏆");
    });

    it('should return Maestro de Bebés for score >= 1500', () => {
      const rank = getRank(1700);
      expect(rank.title).toBe("¡Maestro de Bebés!");
      expect(rank.emoji).toBe("⭐");
      expect(rank.color).toBe("text-green-500");
    });

    it('should return Padre/Madre Competente for score >= 1000', () => {
      const rank = getRank(1200);
      expect(rank.title).toBe("Padre/Madre Competente");
      expect(rank.emoji).toBe("👍");
      expect(rank.color).toBe("text-blue-500");
    });

    it('should return Principiante con Potencial for score >= 500', () => {
      const rank = getRank(700);
      expect(rank.title).toBe("Principiante con Potencial");
      expect(rank.emoji).toBe("🍼");
      expect(rank.color).toBe("text-purple-500");
    });

    it('should return lowest rank for score < 500', () => {
      const rank = getRank(300);
      expect(rank.title).toBe("¡Necesitas más práctica!");
      expect(rank.emoji).toBe("😅");
      expect(rank.color).toBe("text-red-500");
    });

    it('should handle boundary values correctly', () => {
      expect(getRank(2500).title).toBe("¡LEYENDA BAMBOOZLE!");
      expect(getRank(2499).title).toBe("¡SUPER EXPERTO!");
      expect(getRank(2000).title).toBe("¡SUPER EXPERTO!");
      expect(getRank(1999).title).toBe("¡Maestro de Bebés!");
    });
  });
});
