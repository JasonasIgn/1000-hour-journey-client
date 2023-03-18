import { RootState } from "store/reducers";

export const getUserPoints = (state: RootState) => state.user.points;
