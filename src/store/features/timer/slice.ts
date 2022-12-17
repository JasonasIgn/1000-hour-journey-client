import { createSlice } from "@reduxjs/toolkit";

export interface TimerState {
  shouldPause: boolean;
  shouldReset: boolean;
  isOpen: boolean;
  time: {
    minutes: number;
    hours: number;
  };
}

const initialState: TimerState = {
  time: {
    minutes: 0,
    hours: 0,
  },
  isOpen: false,
  shouldPause: false,
  shouldReset: false,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    pauseTimer: (state) => {
      state.shouldPause = true;
    },
    closeTimer: (state) => {
      state.isOpen = false;
    },
    openTimer: (state) => {
      state.isOpen = true;
    },
    pauseTimerCompleted: (state, action) => {
      state.shouldPause = false;
      state.time = action.payload;
    },
    resetTimer: (state) => {
      state.shouldReset = true;
    },
    resetTimerCompleted: (state) => {
      state.shouldReset = false;
      state.time.minutes = 0;
      state.time.hours = 0;
    },
  },
});

export const {
  pauseTimer,
  resetTimer,
  pauseTimerCompleted,
  resetTimerCompleted,
  closeTimer,
  openTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
