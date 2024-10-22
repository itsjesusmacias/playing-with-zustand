import { useState, useEffect } from "react";
import { useTakeExamStore } from "@/provider/take-exam/take-exam-store";

const useCountdown = () => {
  const startTimestamp = useTakeExamStore(
    (state) => state.timer.startTimestamp
  );
  const elapsedTimeOnPause = useTakeExamStore(
    (state) => state.timer.elapsedTimeOnPause
  );
  const isRunning = useTakeExamStore((state) => state.timer.isRunning);
  const initialTime = useTakeExamStore((state) => state.timer.initialTime); // Tiempo inicial de la cuenta regresiva en segundos
  const pauseTimer = useTakeExamStore((state) => state.timer.pauseTimer);
  const startTimer = useTakeExamStore((state) => state.timer.startTimer);

  const [displayTime, setDisplayTime] = useState(initialTime);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isRunning && startTimestamp !== null) {
      intervalId = setInterval(() => {
        const now = Date.now();
        const timeElapsed = now - startTimestamp;

        const totalElapsed = Math.floor(
          (elapsedTimeOnPause + timeElapsed) / 1000
        );

        // Calcular el tiempo restante restando el tiempo transcurrido del tiempo inicial
        const timeLeft = initialTime - totalElapsed;

        // Si el tiempo llega a 0 o menos, pausa el temporizador y ajusta el displayTime a 0
        if (timeLeft <= 0) {
          setDisplayTime(0);
          pauseTimer(); // Pausa automáticamente cuando llega a 0
          clearInterval(intervalId); // Detiene el intervalo para evitar ejecuciones innecesarias
        } else {
          setDisplayTime(timeLeft);
        }
      }, 100);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, startTimestamp, elapsedTimeOnPause, initialTime, pauseTimer]);

  return { displayTime, isRunning, startTimer, pauseTimer };
};

export { useCountdown };
