import { create } from "zustand";
import { TakeExamModalsSlice, TimerStoreSlice } from "./take-exam-model";
import {
  createTakeExamModalsSlice,
  createTimerSlice,
} from "./take-exam-slices";

const useTakeExamStore = create<TakeExamModalsSlice & TimerStoreSlice>(
  (...api) => ({
    ...createTakeExamModalsSlice(...api),
    ...createTimerSlice(...api),
  })
);

export { useTakeExamStore };
