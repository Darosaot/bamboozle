import { describe, it, expect } from 'vitest';
import { questions } from '../../data/questions';

describe('questions data', () => {
  it('should have questions', () => {
    expect(questions).toBeDefined();
    expect(questions.length).toBeGreaterThan(0);
  });

  it('should have valid question structure', () => {
    questions.forEach((question, index) => {
      expect(question.q, `Question ${index} should have a question text`).toBeDefined();
      expect(question.options, `Question ${index} should have options`).toBeDefined();
      expect(question.options.length, `Question ${index} should have 4 options`).toBe(4);
      expect(question.correct, `Question ${index} should have a correct answer index`).toBeDefined();
      expect(question.correct, `Question ${index} correct answer should be 0-3`).toBeGreaterThanOrEqual(0);
      expect(question.correct, `Question ${index} correct answer should be 0-3`).toBeLessThan(4);
      expect(question.points, `Question ${index} should have points`).toBeGreaterThan(0);
      expect(['easy', 'normal', 'hard'], `Question ${index} should have valid difficulty`).toContain(question.difficulty);
    });
  });

  it('should have questions for all difficulty levels', () => {
    const easyQuestions = questions.filter(q => q.difficulty === 'easy');
    const normalQuestions = questions.filter(q => q.difficulty === 'normal');
    const hardQuestions = questions.filter(q => q.difficulty === 'hard');

    expect(easyQuestions.length, 'Should have easy questions').toBeGreaterThan(0);
    expect(normalQuestions.length, 'Should have normal questions').toBeGreaterThan(0);
    expect(hardQuestions.length, 'Should have hard questions').toBeGreaterThan(0);
  });

  it('should have appropriate points for difficulty levels', () => {
    questions.forEach((question, index) => {
      if (question.difficulty === 'easy') {
        expect(question.points, `Easy question ${index} should have 100-150 points`).toBeGreaterThanOrEqual(100);
        expect(question.points, `Easy question ${index} should have 100-150 points`).toBeLessThanOrEqual(150);
      } else if (question.difficulty === 'normal') {
        expect(question.points, `Normal question ${index} should have 150-200 points`).toBeGreaterThanOrEqual(150);
        expect(question.points, `Normal question ${index} should have 150-200 points`).toBeLessThanOrEqual(200);
      } else if (question.difficulty === 'hard') {
        expect(question.points, `Hard question ${index} should have 200+ points`).toBeGreaterThanOrEqual(200);
      }
    });
  });

  it('should not have duplicate questions', () => {
    const questionTexts = questions.map(q => q.q);
    const uniqueQuestions = new Set(questionTexts);
    expect(uniqueQuestions.size, 'All questions should be unique').toBe(questionTexts.length);
  });

  it('should have at least 100 questions', () => {
    expect(questions.length).toBeGreaterThanOrEqual(100);
  });
});
