import { createSlice } from "@reduxjs/toolkit";

export interface JourneyState {
  editLogDialogOpen: boolean;
  headerTitle: string;
  dailyGoalOpen: boolean;
  hoveringOverActivityId?: number;
}

const initialState: JourneyState = {
  editLogDialogOpen: false,
  headerTitle: "",
  dailyGoalOpen: false,
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
    setDailyGoalOpen: (state, action) => {
      state.dailyGoalOpen = action.payload;
    },
    setHoveringOverActivityId: (state, action) => {
      state.hoveringOverActivityId = action.payload;
    },
  },
});

export const {
  setEditLogDialogOpen,
  setHeaderTitle,
  setDailyGoalOpen,
  setHoveringOverActivityId,
} = journeySlice.actions;

export default journeySlice.reducer;
