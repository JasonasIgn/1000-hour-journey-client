import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import journeysReducer from "./features/journeys/slice";
import journeyViewReducer from "./features/journeyView/slice";
import timerReducer from "./features/timer/slice";

export const store = configureStore({
  reducer: {
    journeys: journeysReducer,
    journeyView: journeyViewReducer,
    timer: timerReducer,
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
