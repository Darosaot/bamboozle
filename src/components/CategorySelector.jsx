import React from 'react';
import { getAvailableCategories, CATEGORY_LABELS } from '../hooks/useQuestions';

const CategorySelector = ({ selectedCategories, onCategoriesChange }) => {
  const categories = getAvailableCategories();

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  const selectAll = () => {
    onCategoriesChange(categories);
  };

  const selectNone = () => {
    onCategoriesChange([]);
  };

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-bold text-gray-700">Categorías (opcional):</p>
        <div className="flex gap-2 text-xs">
          <button
            type="button"
            onClick={selectAll}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Todas
          </button>
          <span className="text-gray-400">|</span>
          <button
            type="button"
            onClick={selectNone}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Ninguna
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(category => {
          const label = CATEGORY_LABELS[category] || {
            name: category,
            emoji: '📝',
            color: 'bg-gray-100 text-gray-700'
          };
          const isSelected = selectedCategories.includes(category);

          return (
            <button
              key={category}
              type="button"
              onClick={() => toggleCategory(category)}
              className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                isSelected
                  ? `${label.color} ring-2 ring-offset-1 ring-current`
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{label.emoji}</span>
              {label.name}
            </button>
          );
        })}
      </div>

      {selectedCategories.length === 0 && (
        <p className="text-xs text-gray-500 mt-2 italic">
          Sin filtro - se mostrarán todas las preguntas
        </p>
      )}

      {selectedCategories.length > 0 && (
        <p className="text-xs text-gray-500 mt-2">
          {selectedCategories.length} categoría{selectedCategories.length !== 1 ? 's' : ''} seleccionada{selectedCategories.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
};

export default CategorySelector;
