import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "types";
import {
  createJourneyEffect,
  createJourneyLogEffect,
  fetchJourneyEffect,
  fetchJourneysListEffect,
  logJourneyAchievementEffect,
  updateJourneyLogEffect,
} from "./effects";
import { Journey, JourneyListItem } from "./types";

export interface JourneysState {
  list: JourneyListItem[];
  listLoadingState: LoadingState;
  journey?: Journey;
}

const initialState: JourneysState = {
  list: [],
  listLoadingState: "pristine",
};

export const journeysSlice = createSlice({
  name: "journeys",
  initialState,
  reducers: {
    resetJourney: (state) => {
      state.journey = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJourneysListEffect.pending, (state) => {
        state.listLoadingState = "loading";
      })
      .addCase(fetchJourneysListEffect.fulfilled, (state, action) => {
        state.listLoadingState = "loaded";
        state.list = action.payload;
      })
      .addCase(fetchJourneysListEffect.rejected, (state) => {
        state.listLoadingState = "error";
      })
      .addCase(createJourneyEffect.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(fetchJourneyEffect.fulfilled, (state, action) => {
        state.journey = action.payload;
      })
      .addCase(createJourneyLogEffect.fulfilled, (state, action) => {
        if (state.journey && action.payload) {
          state.journey.logs.push(action.payload);
          state.journey.totalHours += action.payload.hoursSpent;
        }
      })
      .addCase(logJourneyAchievementEffect.fulfilled, (state, action) => {
        if (state.journey && action.payload) {
          state.journey.achievements.push(action.payload);
        }
      })
      .addCase(updateJourneyLogEffect.fulfilled, (state, action) => {
        if (state.journey && action.payload) {
          const updatedLogIndex = state.journey.logs.findIndex(
            (log) => log.id === action.payload?.id
          );
          state.journey.logs[updatedLogIndex] = action.payload;
        }
      });
  },
});

export const { resetJourney } = journeysSlice.actions;

export default journeysSlice.reducer;
