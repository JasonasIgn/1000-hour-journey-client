import { RootState } from "store";

export const getTimerTime = (state: RootState) => state.timer.time;

export const getTimerShouldPause = (state: RootState) =>
  state.timer.shouldPause;

export const getTimerShouldReset = (state: RootState) =>
  state.timer.shouldReset;

export const getTimerOpenState = (state: RootState) => state.timer.isOpen;
