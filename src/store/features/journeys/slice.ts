import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "../../../types";
import { createJourneyEffect, fetchJourneysListEffect } from "./effects";
import { Journey } from "./types";

export interface JourneysState {
  list: Journey[];
  listLoadingState: LoadingState;
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
      });
  },
});

export default counterSlice.reducer;
