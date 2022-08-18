import { createSlice } from "@reduxjs/toolkit";

export interface JourneyViewState {
  editLogDialogOpen: boolean;
}

const initialState: JourneyViewState = {
  editLogDialogOpen: false,
};

export const journeyViewSlice = createSlice({
  name: "journeys",
  initialState,
  reducers: {
    setEditLogDialogOpen: (state, action) => {
      state.editLogDialogOpen = action.payload;
    },
  },
});

export const { setEditLogDialogOpen } = journeyViewSlice.actions;

export default journeyViewSlice.reducer;
