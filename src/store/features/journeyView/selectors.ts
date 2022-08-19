import { RootState } from "store/store";

export const getEditLogDialogOpen = (state: RootState) =>
  state.journeyView.editLogDialogOpen;
