import { createSlice } from "@reduxjs/toolkit";
import { fetchMyAchievementsEffect } from "./effects";
import { UserAchievementProgress } from "./types";

export interface MyAchievementsState {
  items?: UserAchievementProgress[];
}

const initialState: MyAchievementsState = {};

export const userSlice = createSlice({
  name: "myAchievements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMyAchievementsEffect.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default userSlice.reducer;
