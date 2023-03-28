import { RootState } from "store/reducers";

export const getMyAchievements = (state: RootState) =>
  state.myAchievements.items;
