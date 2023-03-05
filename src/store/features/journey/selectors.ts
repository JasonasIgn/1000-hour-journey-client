import { RootState } from "store/reducers";

export const getEditLogDialogOpen = (state: RootState) =>
  state.journey.editLogDialogOpen;

export const getHeaderTitle = (state: RootState) => state.journey.headerTitle;
