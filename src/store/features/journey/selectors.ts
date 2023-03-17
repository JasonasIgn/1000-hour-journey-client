import { RootState } from "store/reducers";

export const getEditLogDialogOpen = (state: RootState) =>
  state.journey.editLogDialogOpen;

export const getHeaderTitle = (state: RootState) => state.journey.headerTitle;

export const getDailyGoalOpen = (state: RootState) =>
  state.journey.dailyGoalOpen;

export const getCurrentHoveredActivityId = (state: RootState) =>
  state.journey.hoveringOverActivityId;
