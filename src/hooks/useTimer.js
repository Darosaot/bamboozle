import { useEffect } from 'react';

export const useTimer = (timeLeft, isActive, onTimeUp, onTick, currentPlayer) => {
  useEffect(() => {
    if (!isActive) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        onTick();
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft, isActive, onTimeUp, onTick, currentPlayer]);
};
