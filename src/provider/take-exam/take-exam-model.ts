interface TimerStoreSlice {
  timer: {
    startTimestamp: number | null;
    elapsedTimeOnPause: number;
    isRunning: boolean;
    initialTime: number;
    startTimer: () => void;
    pauseTimer: () => void;
    resetTimer: () => void;
  };
}

export type { TimerStoreSlice };
