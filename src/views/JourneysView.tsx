import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { fetchJourneysList } from "../store/features/journeys/effects";
import { getJourneysListLoadingState } from "../store/features/journeys/selectors";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const JourneysView: React.FC = () => {
  const dispatch = useAppDispatch();
  const listLoadingState = useAppSelector(getJourneysListLoadingState);

  useEffect(() => {
    if (listLoadingState === "pristine") {
      dispatch(fetchJourneysList());
    }
  }, [dispatch, listLoadingState]);

  return <Box>journeys view</Box>;
};
