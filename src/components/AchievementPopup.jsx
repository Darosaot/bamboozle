import React, { useEffect, useState } from 'react';
import { Award } from 'lucide-react';

const AchievementPopup = ({ achievements, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (achievements.length === 0) return;

    // Auto-advance through achievements
    const timer = setTimeout(() => {
      if (currentIndex < achievements.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setVisible(false);
        setTimeout(onClose, 300);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, achievements.length, onClose]);

  if (achievements.length === 0 || !visible) return null;

  const achievement = achievements[currentIndex];

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl shadow-2xl p-4 max-w-sm">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-full p-3">
            <span className="text-4xl">{achievement.emoji}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-5 h-5 text-yellow-900" />
              <span className="text-yellow-900 text-xs font-bold uppercase">Logro Desbloqueado!</span>
            </div>
            <h3 className="text-white font-black text-lg">{achievement.name}</h3>
            <p className="text-yellow-100 text-sm">{achievement.description}</p>
          </div>
        </div>

        {achievements.length > 1 && (
          <div className="flex justify-center gap-1 mt-3">
            {achievements.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx === currentIndex ? 'bg-white' : 'bg-yellow-200'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementPopup;
