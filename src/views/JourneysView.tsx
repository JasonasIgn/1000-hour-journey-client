import { useEffect } from "react";
import { fetchJourneysList } from "../store/features/journeys/effects";
import { Container } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import {
  getJourneysList,
  getJourneysListLoadingState,
} from "../store/features/journeys/selectors";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { JourneysList } from "../components/JourneysList/JourneysList";

export const JourneysView: React.FC = () => {
  const dispatch = useAppDispatch();
  const listLoadingState = useAppSelector(getJourneysListLoadingState);
  const list = useAppSelector(getJourneysList);

  useEffect(() => {
    if (listLoadingState === "pristine") {
      dispatch(fetchJourneysList());
    }
  }, [dispatch, listLoadingState]);

  return (
    <Container maxW="6xl" pt={10}>
      <Heading>Journeys</Heading>
      <JourneysList journeys={list} />
    </Container>
  );
};
