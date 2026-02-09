import { useEffect, useRef } from 'react';

export const useTimer = (timeLeft, isActive, onTimeUp, onTick, currentPlayer) => {
  const onTimeUpRef = useRef(onTimeUp);
  const onTickRef = useRef(onTick);

  // Keep refs updated without causing effect re-runs
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        onTickRef.current();
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      onTimeUpRef.current();
    }
  }, [timeLeft, isActive, currentPlayer]);
};
