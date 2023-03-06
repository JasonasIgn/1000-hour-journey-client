import { createSlice } from "@reduxjs/toolkit";

export interface JourneyState {
  editLogDialogOpen: boolean;
  headerTitle: string;
  dailyGoalOpen: boolean;
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
  },
});

export const { setEditLogDialogOpen, setHeaderTitle, setDailyGoalOpen } =
  journeySlice.actions;

export default journeySlice.reducer;
