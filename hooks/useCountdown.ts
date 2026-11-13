import { useState, useEffect, useCallback, useRef } from "react";

export function useCountdown(initialSeconds: number = 60) {
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(
    (seconds?: number) => {
      clearTimer();
      const count = seconds !== undefined ? seconds : initialSeconds;
      setSecondsLeft(count);
      setIsRunning(true);
    },
    [clearTimer, initialSeconds]
  );

  const reset = useCallback(() => {
    clearTimer();
    setSecondsLeft(initialSeconds);
    setIsRunning(true);
  }, [clearTimer, initialSeconds]);

  const stop = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setSecondsLeft(0);
  }, [clearTimer]);

  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimer();
    };
  }, [isRunning, clearTimer]);

  const formattedTime = `${String(Math.floor(secondsLeft / 60)).padStart(
    2,
    "0"
  )}:${String(secondsLeft % 60).padStart(2, "0")}`;

  return {
    secondsLeft,
    formattedTime,
    isRunning,
    start,
    reset,
    stop,
  };
}

export default useCountdown;
