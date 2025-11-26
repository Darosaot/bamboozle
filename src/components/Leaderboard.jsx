
import React, { useState, useEffect } from 'react';
import { getScores } from '../db';

const Leaderboard = ({ onBack }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const scoresData = await getScores();
        setScores(scoresData);
      } catch (error) {
        console.error('Error fetching scores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-900 to-black flex items-center justify-center p-4 text-white">
      <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-black text-yellow-400 mb-6">Top 10 Puntuaciones</h1>
        
        {scores.length > 0 ? (
          <ol className="space-y-4">
            {scores.map((score, index) => (
              <li key={score.id} className={`flex items-center justify-between p-3 rounded-lg ${index === 0 ? 'bg-yellow-500 text-black' : 'bg-gray-700'}`}>
                <span className={`font-bold text-xl ${index === 0 ? 'text-black' : 'text-yellow-400'}`}>{index + 1}.</span>
                <span className="text-xl font-semibold">{score.player_name}</span>
                <span className="text-2xl font-bold">{score.score}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-xl text-gray-400">No hay puntuaciones todavía. ¡Sé el primero!</p>
        )}

        <button
          onClick={onBack}
          className="w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-black text-xl py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all shadow-lg"
        >
          VOLVER
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
