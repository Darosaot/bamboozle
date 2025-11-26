import { useState, useCallback } from 'react';
import { questions } from '../data/questions';

export const useQuestions = () => {
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const loadNewQuestion = useCallback(() => {
    const availableQuestions = questions.filter(q => !usedQuestions.includes(q.q));

    let questionPool = availableQuestions.length > 0 ? availableQuestions : questions;

    if (availableQuestions.length === 0) {
      setUsedQuestions([]);
    }

    const randomQ = questionPool[Math.floor(Math.random() * questionPool.length)];

    setCurrentQuestion(randomQ);
    setUsedQuestions(prev => [...prev, randomQ.q]);

    return randomQ;
  }, [usedQuestions]);

  const resetQuestions = useCallback(() => {
    setUsedQuestions([]);
    setCurrentQuestion(null);
  }, []);

  return {
    currentQuestion,
    loadNewQuestion,
    resetQuestions
  };
};
