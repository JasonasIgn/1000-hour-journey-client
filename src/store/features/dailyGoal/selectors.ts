import { RootState } from "store/reducers";

export const getDailyGoal = (state: RootState) => state.dailyGoal.dailyGoal;
