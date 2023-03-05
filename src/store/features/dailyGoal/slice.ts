import { createSlice } from "@reduxjs/toolkit";
import { fetchDailyGoalEffect } from "./effects";
import { DailyGoal } from "./types";

export interface DailyGoalState {
  dailyGoal?: DailyGoal;
}

const initialState: DailyGoalState = {};

export const dailyGoalSlice = createSlice({
  name: "dailyGoal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDailyGoalEffect.fulfilled, (state, action) => {
      state.dailyGoal = action.payload;
    });
  },
});

export default dailyGoalSlice.reducer;
