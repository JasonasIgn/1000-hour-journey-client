import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "types";
import {
  createJourneyEffect,
  createJourneyLogEffect,
  createJourneyTagEffect,
  fetchJourneyEffect,
  fetchJourneysListEffect,
  logJourneyAchievementEffect,
  updateJourneyEffect,
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
          const listItemIndex = state.list.findIndex(
            (journey) => journey.id === action.payload?.journeyId
          );
          if (listItemIndex >= 0) {
            state.list[listItemIndex].totalHours +=
              Math.round(action.payload.hoursSpent * 10) / 10;
          }

          state.journey.logs.push(action.payload);
          state.journey.totalHours =
            Math.round(
              (action.payload.hoursSpent + state.journey.totalHours) * 10
            ) / 10;
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
      })
      .addCase(updateJourneyEffect.fulfilled, (state, action) => {
        if (state.list.length > 0 && action.payload) {
          const updatedLogIndex = state.list.findIndex(
            (journey) => journey.id === action.payload?.id
          );
          state.list[updatedLogIndex] = action.payload;
        }
      })
      .addCase(createJourneyTagEffect.fulfilled, (state, { payload }) => {
        if (state.journey && payload) {
          state.journey.tags.push(payload);
        }
      });
  },
});

export const { resetJourney } = journeysSlice.actions;

export default journeysSlice.reducer;
