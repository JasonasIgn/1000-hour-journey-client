import { useEffect } from "react";
import { fetchIsLoggedInEffect } from "store/features/auth/effects";
import {
  getAuthLoadingState,
  getIsLoggedIn,
} from "store/features/auth/selectors";
import { fetchDailyGoalEffect } from "store/features/dailyGoal/effects";
import { getDailyGoal } from "store/features/dailyGoal/selectors";
import { fetchPointsEffect } from "store/features/user/effects";
import { getUserPoints } from "store/features/user/selectors";
import { useAppDispatch, useAppSelector } from "store/hooks";

export const useInitialization = () => {
  const dispatch = useAppDispatch();
  const authLoadingState = useAppSelector(getAuthLoadingState);
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const dailyGoal = useAppSelector(getDailyGoal);
  const points = useAppSelector(getUserPoints);
  const isInitializing = authLoadingState !== "loaded";

  useEffect(() => {
    if (isLoggedIn && !dailyGoal) {
      dispatch(fetchDailyGoalEffect());
    }
  }, [dailyGoal, dispatch, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && points === undefined) {
      dispatch(fetchPointsEffect());
    }
  }, [points, dispatch, isLoggedIn]);

  useEffect(() => {
    if (authLoadingState === "pristine") {
      dispatch(fetchIsLoggedInEffect());
    }
  }, [authLoadingState, dispatch]);

  return isInitializing;
};
