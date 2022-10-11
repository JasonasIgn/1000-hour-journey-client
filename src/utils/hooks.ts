import { useEffect } from "react";
import { fetchIsLoggedInEffect } from "store/features/auth/effects";
import { getAuthLoadingState } from "store/features/auth/selectors";
import { useAppDispatch, useAppSelector } from "store/hooks";

export const useInitialization = () => {
  const dispatch = useAppDispatch();
  const authLoadingState = useAppSelector(getAuthLoadingState);
  const isInitializing = authLoadingState !== "loaded";
  useEffect(() => {
    if (authLoadingState === "pristine") {
      dispatch(fetchIsLoggedInEffect());
    }
  }, [authLoadingState, dispatch]);

  return isInitializing;
};
