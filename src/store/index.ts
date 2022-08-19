import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import journeysReducer from "./features/journeys/slice";
import journeyViewReducer from "./features/journeyView/slice";

export const store = configureStore({
  reducer: {
    journeys: journeysReducer,
    journeyView: journeyViewReducer,
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
