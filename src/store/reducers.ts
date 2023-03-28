import { AnyAction, combineReducers, Reducer } from "@reduxjs/toolkit";
import journeysReducer from "./features/journeys/slice";
import journeyReducer from "./features/journey/slice";
import dailyGoalReducer from "./features/dailyGoal/slice";
import timerReducer from "./features/timer/slice";
import authReducer from "./features/auth/slice";
import appReducer from "./features/app/slice";
import userReducer from "./features/user/slice";
import shopReducer from "./features/shop/slice";
import myAchievementsReducer from "./features/myAchievements/slice";
import { logoutEffect } from "./features/auth/effects";

export const rootReducers = {
  journeys: journeysReducer,
  journey: journeyReducer,
  dailyGoal: dailyGoalReducer,
  timer: timerReducer,
  auth: authReducer,
  app: appReducer,
  user: userReducer,
  shop: shopReducer,
  myAchievements: myAchievementsReducer,
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

export const rootReducerType = combineReducers(rootReducers);

export type RootState = ReturnType<typeof rootReducerType>;
