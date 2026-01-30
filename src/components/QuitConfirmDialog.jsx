import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function QuitConfirmDialog({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-bounce-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-orange-100 p-3 rounded-full">
            <AlertTriangle className="text-orange-600" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">¿Salir del juego?</h2>
        </div>

        <p className="text-gray-600 mb-6">
          Si sales ahora perderás todo el progreso de esta partida. ¿Estás seguro de que quieres salir?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md"
          >
            Sí, salir
          </button>
        </div>
      </div>
    </div>
  );
}
