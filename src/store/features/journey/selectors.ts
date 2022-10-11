import { RootState } from "store";

export const getEditLogDialogOpen = (state: RootState) =>
  state.journey.editLogDialogOpen;
