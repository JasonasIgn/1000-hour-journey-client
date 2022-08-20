import { useEffect, useState, FC } from "react";
import { fetchJourneysListEffect } from "store/features/journeys/effects";
import { Container, Heading } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import {
  getJourneysList,
  getJourneysListLoadingState,
} from "store/features/journeys/selectors";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { JourneysList, FabButton, AddJourneyDialog } from "components";

export const JourneysView: FC = () => {
  const dispatch = useAppDispatch();
  const listLoadingState = useAppSelector(getJourneysListLoadingState);
  const list = useAppSelector(getJourneysList);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (listLoadingState === "pristine") {
      dispatch(fetchJourneysListEffect());
    }
  }, [dispatch, listLoadingState]);

  return (
    <Container maxW="6xl" pt={5}>
      <Heading>Journeys</Heading>
      <JourneysList journeys={list} rootBoxProps={{ mt: 10, pb: 120 }} />
      <FabButton onClick={() => setModalOpen(true)}>
        <AddIcon />
      </FabButton>
      <AddJourneyDialog open={modalOpen} setOpen={setModalOpen} />
    </Container>
  );
};
