import { useEffect, useState } from "react";
import { fetchJourneysList } from "../store/features/journeys/effects";
import { Container } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import {
  getJourneysList,
  getJourneysListLoadingState,
} from "../store/features/journeys/selectors";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { JourneysList } from "../components/JourneysList/JourneysList";
import { FabButton } from "../components/FabButton/FabButton";
import { AddJourneyDialog } from "../components/AddJourneyDialog/AddJourneyDialog";

export const JourneysView: React.FC = () => {
  const dispatch = useAppDispatch();
  const listLoadingState = useAppSelector(getJourneysListLoadingState);
  const list = useAppSelector(getJourneysList);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (listLoadingState === "pristine") {
      dispatch(fetchJourneysList());
    }
  }, [dispatch, listLoadingState]);

  return (
    <Container maxW="6xl" pt={10}>
      <Heading>Journeys</Heading>
      <JourneysList journeys={list} rootBoxProps={{ marginTop: 10 }} />
      <FabButton onClick={() => setModalOpen(true)}>
        <AddIcon />
      </FabButton>
      <AddJourneyDialog open={modalOpen} setOpen={setModalOpen} />
    </Container>
  );
};
