import React from 'react';
import { Star } from 'lucide-react';

const QuestionCard = ({
  question,
  onAnswer,
  answeredCorrectly,
  removedOptions = []
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8">
      <div className="flex items-center justify-center mb-6">
        <Star className="w-8 h-8 text-yellow-500 animate-spin" />
        <h2 className="text-2xl font-black text-center mx-4 text-gray-800">
          {question.q}
        </h2>
        <Star className="w-8 h-8 text-yellow-500 animate-spin" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            disabled={answeredCorrectly !== null || removedOptions.includes(index)}
            className={`p-6 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg ${
              removedOptions.includes(index)
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                : answeredCorrectly === null
                ? 'bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white'
                : answeredCorrectly && index === question.correct
                ? 'bg-green-500 text-white'
                : !answeredCorrectly && index === question.correct
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-gray-600'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {answeredCorrectly !== null && (
        <div className={`mt-6 p-4 rounded-xl text-center font-bold text-xl ${
          answeredCorrectly ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {answeredCorrectly ? '¡CORRECTO! 🎉' : '¡INCORRECTO! 😬'}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
