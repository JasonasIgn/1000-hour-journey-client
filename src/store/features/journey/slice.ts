import { createSlice } from "@reduxjs/toolkit";

export interface JourneyState {
  editLogDialogOpen: boolean;
  headerTitle: string;
}

const initialState: JourneyState = {
  editLogDialogOpen: false,
  headerTitle: "",
};

export const journeySlice = createSlice({
  name: "journey",
  initialState,
  reducers: {
    setEditLogDialogOpen: (state, action) => {
      state.editLogDialogOpen = action.payload;
    },
    setHeaderTitle: (state, action) => {
      state.headerTitle = action.payload;
    },
  },
});

export const { setEditLogDialogOpen, setHeaderTitle } = journeySlice.actions;

export default journeySlice.reducer;
