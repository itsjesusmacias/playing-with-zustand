import { StateCreator } from "zustand";
import { TimerStore } from "./timer-model";

const createTimerSlice: StateCreator<TimerStore> = (set) => ({
  startTimestamp: null,
  elapsedTimeOnPause: 0,
  isRunning: false,
  initialTime: 0,

  startTimer: () =>
    set((state) => {
      if (state.isRunning) {
        return state;
      }

      return {
        isRunning: true,
        startTimestamp: Date.now(),
      };
    }),

  pauseTimer: () =>
    set((state) => {
      if (!state.isRunning || state.startTimestamp === null) {
        return state;
      }

      const now = Date.now();
      const timeElapsed = now - state.startTimestamp;

      return {
        isRunning: false,
        elapsedTimeOnPause: state.elapsedTimeOnPause + timeElapsed,
        startTimestamp: null,
      };
    }),

  resetTimer: () =>
    set(() => ({
      startTimestamp: null,
      elapsedTimeOnPause: 0,
      isRunning: false,
      initialTime: 0,
    })),
});

export { createTimerSlice };
