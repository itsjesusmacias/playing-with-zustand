import { useState, useEffect } from "react";
import { useTakeExamStore } from "@/provider/take-exam/take-exam-store";

const useStopwatch = () => {
  const startTimestamp = useTakeExamStore(
    (state) => state.timer.startTimestamp
  );
  const elapsedTimeOnPause = useTakeExamStore(
    (state) => state.timer.elapsedTimeOnPause
  );
  const isRunning = useTakeExamStore((state) => state.timer.isRunning);
  const initialTime = useTakeExamStore((state) => state.timer.initialTime);
  const pauseTimer = useTakeExamStore((state) => state.timer.pauseTimer);
  const startTimer = useTakeExamStore((state) => state.timer.startTimer);

  const [displayTime, setDisplayTime] = useState(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isRunning && startTimestamp !== null) {
      intervalId = setInterval(() => {
        const now = Date.now();
        // Calcula el tiempo transcurrido desde el inicio
        const timeElapsed = now - startTimestamp;

        // Suma el tiempo pausado y el tiempo transcurrido, dividiendo por 1000 para obtener segundos completos
        const totalElapsed = Math.floor(
          (elapsedTimeOnPause + timeElapsed) / 1000
        );

        // Actualiza el estado `displayTime` sumando el tiempo transcurrido al tiempo inicial
        setDisplayTime(initialTime + totalElapsed);
      }, 100);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, startTimestamp, elapsedTimeOnPause, initialTime]);

  return { displayTime, isRunning, startTimer, pauseTimer };
};

export { useStopwatch };
