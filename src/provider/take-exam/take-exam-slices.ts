import { StateCreator } from "zustand";
import { TimerStoreSlice } from "./take-exam-model";

const createTimerSlice: StateCreator<TimerStoreSlice> = (set) => ({
  timer: {
    startTimestamp: null,
    elapsedTimeOnPause: 0,
    isRunning: false,
    initialTime: 0,

    // TODO Iniciar el initialTime para hacer funcionar el countdown
    // XXXXX: () => {}

    startTimer: () =>
      set((state) => {
        if (state.timer.isRunning) {
          return state;
        }

        const timer = state.timer;
        return {
          timer: {
            ...timer,
            isRunning: true,
            startTimestamp: Date.now(),
          },
        };
      }),

    pauseTimer: () =>
      set((state) => {
        const {
          timer: { isRunning, startTimestamp },
        } = state;
        if (!isRunning || startTimestamp === null) {
          return state;
        }

        const timer = state.timer;
        const now = Date.now();
        const timeElapsed = now - startTimestamp;
        const elapsedTimeOnPause = timer.elapsedTimeOnPause + timeElapsed;

        return {
          timer: {
            ...timer,
            isRunning: false,
            elapsedTimeOnPause,
            startTimestamp: null,
          },
        };
      }),

    resetTimer: () =>
      set((state) => {
        const timer = state.timer;
        return {
          timer: {
            ...timer,
            startTimestamp: null,
            elapsedTimeOnPause: 0,
            isRunning: false,
            initialTime: 0,
          },
        };
      }),
  },
});

export { createTimerSlice };
