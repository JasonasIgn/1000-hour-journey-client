import { createSlice } from "@reduxjs/toolkit";
import { buyShopItemEffect } from "../shop/effects";
import { fetchPointsEffect } from "./effects";
import { Reward } from "./types";

export interface UserState {
  points?: number;
  reward?: Reward;
}

const initialState: UserState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPointsEffect.fulfilled, (state, action) => {
        const {
          hoursLoggedForReward,
          hoursToLogForReward,
          points,
          pointsForReward,
        } = action.payload;
        state.points = points;
        state.reward = {
          hoursLoggedForReward,
          hoursToLogForReward,
          pointsForReward,
        };
      })
      .addCase(buyShopItemEffect.fulfilled, (state, { meta: { arg } }) => {
        const { cost } = arg;
        if (state.points) {
          state.points -= cost;
        }
      });
  },
});

export default userSlice.reducer;
