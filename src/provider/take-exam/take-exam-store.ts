import { create } from "zustand";
import { TimerStoreSlice } from "./take-exam-model";
import { createTimerSlice } from "./take-exam-slices";

type TakeExam = TimerStoreSlice;

const useTakeExamStore = create<TakeExam>(createTimerSlice);

export { useTakeExamStore };
