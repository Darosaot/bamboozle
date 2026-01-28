import React, { useState } from 'react';
import { Star, Zap, Trophy, XCircle, CheckCircle } from 'lucide-react';

const QuestionCard = ({
  question,
  onAnswer,
  answeredCorrectly,
  removedOptions = []
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    onAnswer(index);
  };

  // Reset selected answer when question changes
  React.useEffect(() => {
    if (answeredCorrectly === null) {
      setSelectedAnswer(null);
    }
  }, [answeredCorrectly]);

  const getDifficultyBadge = () => {
    switch (question.difficulty) {
      case 'easy':
        return { text: 'Fácil', color: 'bg-green-500', points: question.points };
      case 'normal':
        return { text: 'Normal', color: 'bg-yellow-500', points: question.points };
      case 'hard':
        return { text: 'Difícil', color: 'bg-red-500', points: question.points };
      default:
        return { text: 'Normal', color: 'bg-yellow-500', points: question.points };
    }
  };

  const badge = getDifficultyBadge();

  const getOptionStyle = (index) => {
    if (removedOptions.includes(index)) {
      return 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50 line-through';
    }

    if (answeredCorrectly === null) {
      return 'bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white hover:scale-105';
    }

    // After answering
    if (index === question.correct) {
      return 'bg-green-500 text-white ring-4 ring-green-300 scale-105';
    }

    if (selectedAnswer === index && !answeredCorrectly) {
      return 'bg-red-500 text-white ring-4 ring-red-300';
    }

    return 'bg-gray-300 text-gray-500';
  };

  return (
    <div className={`bg-white rounded-3xl shadow-2xl p-8 transition-all ${
      answeredCorrectly !== null
        ? answeredCorrectly
          ? 'ring-4 ring-green-400'
          : 'ring-4 ring-red-400'
        : ''
    }`}>
      {/* Question header with difficulty and points */}
      <div className="flex items-center justify-between mb-4">
        <div className={`${badge.color} text-white px-3 py-1 rounded-full text-sm font-bold`}>
          {badge.text}
        </div>
        <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
          <Trophy className="w-4 h-4" />
          {badge.points} pts
        </div>
      </div>

      <div className="flex items-center justify-center mb-6">
        <Star className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl md:text-2xl font-black text-center mx-4 text-gray-800">
          {question.q}
        </h2>
        <Star className="w-6 h-6 text-yellow-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={answeredCorrectly !== null || removedOptions.includes(index)}
            className={`p-5 rounded-2xl font-bold text-lg transition-all transform shadow-lg flex items-center justify-center gap-2 ${getOptionStyle(index)}`}
          >
            {answeredCorrectly !== null && index === question.correct && (
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
            )}
            {answeredCorrectly !== null && selectedAnswer === index && index !== question.correct && (
              <XCircle className="w-6 h-6 flex-shrink-0" />
            )}
            <span>{option}</span>
          </button>
        ))}
      </div>

      {answeredCorrectly !== null && (
        <div className={`mt-6 p-4 rounded-xl text-center font-bold text-xl flex items-center justify-center gap-3 ${
          answeredCorrectly
            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700'
            : 'bg-gradient-to-r from-red-100 to-orange-100 text-red-700'
        }`}>
          {answeredCorrectly ? (
            <>
              <Zap className="w-8 h-8 text-green-500 animate-pulse" />
              <span>¡CORRECTO! +{badge.points} puntos</span>
              <span className="text-3xl">🎉</span>
            </>
          ) : (
            <>
              <XCircle className="w-8 h-8 text-red-500" />
              <span>¡INCORRECTO! -50 puntos</span>
              <span className="text-3xl">😬</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
