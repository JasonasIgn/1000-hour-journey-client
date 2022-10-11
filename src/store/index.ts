import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import journeysReducer from "./features/journeys/slice";
import journeyViewReducer from "./features/journeyView/slice";
import timerReducer from "./features/timer/slice";
import authReducer from "./features/auth/slice";

export const store = configureStore({
  reducer: {
    journeys: journeysReducer,
    journeyView: journeyViewReducer,
    timer: timerReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
