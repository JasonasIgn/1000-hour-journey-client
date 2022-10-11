import { AnyAction, combineReducers, Reducer } from "@reduxjs/toolkit";
import { RootState } from "store";
import journeysReducer from "./features/journeys/slice";
import journeyViewReducer from "./features/journeyView/slice";
import timerReducer from "./features/timer/slice";
import authReducer from "./features/auth/slice";
import { logoutEffect } from "./features/auth/effects";

export const rootReducers = {
  journeys: journeysReducer,
  journeyView: journeyViewReducer,
  timer: timerReducer,
  auth: authReducer,
};

export const createRootReducer = (): Reducer => {
  const appReducer = combineReducers(rootReducers);

  return (state: RootState, action: AnyAction) => {
    if (action.type === `${logoutEffect.typePrefix}/fulfilled`) {
      return appReducer(undefined, action);
    }
    return appReducer(state, action);
  };
};
