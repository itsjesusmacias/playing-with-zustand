import { create } from "zustand";
import { TimerStore } from "./timer-model";
import { createTimerSlice } from "./timer-slices";

const useTimerStore = create<TimerStore>(createTimerSlice);

export { useTimerStore };
