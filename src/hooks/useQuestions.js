import { useState, useCallback } from 'react';
import { questions } from '../data/questions';

// Get all unique categories from questions
export const getAvailableCategories = () => {
  const categories = new Set();
  questions.forEach(q => {
    if (q.category) {
      categories.add(q.category);
    }
  });
  return Array.from(categories).sort();
};

// Category labels for UI
export const CATEGORY_LABELS = {
  embarazo: { name: 'Embarazo', emoji: '🤰', color: 'bg-pink-100 text-pink-700' },
  nutricion: { name: 'Nutrición', emoji: '🥗', color: 'bg-green-100 text-green-700' },
  desarrollo: { name: 'Desarrollo', emoji: '👶', color: 'bg-blue-100 text-blue-700' },
  salud: { name: 'Salud', emoji: '🏥', color: 'bg-red-100 text-red-700' },
  sueno: { name: 'Sueño', emoji: '😴', color: 'bg-purple-100 text-purple-700' }
};

export const useQuestions = (initialCategories = []) => {
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);

  const loadNewQuestion = useCallback(() => {
    // Filter by categories if any are selected
    let filteredQuestions = questions;
    if (selectedCategories.length > 0) {
      filteredQuestions = questions.filter(q =>
        !q.category || selectedCategories.includes(q.category)
      );
    }

    const availableQuestions = filteredQuestions.filter(q => !usedQuestions.includes(q.q));

    let questionPool = availableQuestions.length > 0 ? availableQuestions : filteredQuestions;

    if (availableQuestions.length === 0) {
      setUsedQuestions([]);
    }

    const randomQ = questionPool[Math.floor(Math.random() * questionPool.length)];

    setCurrentQuestion(randomQ);
    setUsedQuestions(prev => [...prev, randomQ.q]);

    return randomQ;
  }, [usedQuestions, selectedCategories]);

  const resetQuestions = useCallback(() => {
    setUsedQuestions([]);
    setCurrentQuestion(null);
  }, []);

  const setCategories = useCallback((categories) => {
    setSelectedCategories(categories);
  }, []);

  return {
    currentQuestion,
    loadNewQuestion,
    resetQuestions,
    selectedCategories,
    setCategories
  };
};
