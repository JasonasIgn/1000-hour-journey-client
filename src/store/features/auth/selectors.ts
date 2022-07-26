import { RootState } from "store/reducers";

export const getIsLoggedIn = (state: RootState) => state.auth.loggedIn;

export const getAuthLoadingState = (state: RootState) =>
  state.auth.loadingState;
