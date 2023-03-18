import { RootState } from "store/reducers";

export const getUserPoints = (state: RootState) => state.user.points;

export const getUserReward = (state: RootState) => state.user.reward;
