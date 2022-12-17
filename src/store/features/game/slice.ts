import { createSlice } from "@reduxjs/toolkit";

export interface JourneyState {
  editLogDialogOpen: boolean;
}

const initialState: JourneyState = {
  editLogDialogOpen: false,
};

export const journeySlice = createSlice({
  name: "journey",
  initialState,
  reducers: {
    setEditLogDialogOpen: (state, action) => {
      state.editLogDialogOpen = action.payload;
    },
  },
});

export const { setEditLogDialogOpen } = journeySlice.actions;

export default journeySlice.reducer;
