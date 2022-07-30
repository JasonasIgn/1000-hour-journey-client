import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "../../../types";
import {
  createJourneyEffect,
  createJourneyLogEffect,
  fetchJourneyEffect,
  fetchJourneysListEffect,
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

export const counterSlice = createSlice({
  name: "journeys",
  initialState,
  reducers: {},
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
      });
  },
});

export default counterSlice.reducer;
