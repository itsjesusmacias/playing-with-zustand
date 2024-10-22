import { StateCreator } from "zustand";
import { TimerStoreSlice, TakeExamModalsSlice } from "./take-exam-model";

const createTakeExamModalsSlice: StateCreator<
  TimerStoreSlice & TakeExamModalsSlice,
  [],
  [],
  TakeExamModalsSlice
> = (set) => ({
  modals: {
    isEndTestModalOpen: false,
    openEndTestModal: () =>
      set((state) => {
        const modals = state.modals;
        return {
          ...state,
          modals: { ...modals, isEndTestModalOpen: true },
        };
      }),
    closeEndTestModal: () =>
      set((state) => {
        const modals = state.modals;
        return {
          ...state,
          modals: { ...modals, isEndTestModalOpen: false },
        };
      }),
  },
});

const createTimerSlice: StateCreator<
  TimerStoreSlice & TakeExamModalsSlice,
  [],
  [],
  TimerStoreSlice
> = (set) => ({
  timer: {
    startTimestamp: null,
    elapsedTimeOnPause: 0,
    isRunning: false,
    initialTime: 0,

    startTimer: () =>
      set((state) => {
        if (state.timer.isRunning) {
          return state;
        }
        const timer = state.timer;
        return {
          ...state,
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
          ...state,
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
          ...state,
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

export { createTakeExamModalsSlice, createTimerSlice };
