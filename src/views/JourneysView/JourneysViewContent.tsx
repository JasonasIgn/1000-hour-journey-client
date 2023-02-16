import { useEffect, useState, FC } from "react";
import { fetchJourneysListEffect } from "store/features/journeys/effects";
import { Container } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import {
  getJourneysList,
  getJourneysListLoadingState,
} from "store/features/journeys/selectors";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  JourneysList,
  FabButton,
  AddJourneyDialog,
  EditJourneyDialog,
} from "components";
import { JourneyListItem } from "store/features/journeys/types";

export const JourneysViewContent: FC = () => {
  const dispatch = useAppDispatch();
  const listLoadingState = useAppSelector(getJourneysListLoadingState);
  const list = useAppSelector(getJourneysList);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJourney, setEditingJourney] = useState<JourneyListItem | null>(
    null
  );

  useEffect(() => {
    if (listLoadingState === "pristine") {
      dispatch(fetchJourneysListEffect());
    }
  }, [dispatch, listLoadingState]);

  return (
    <Container maxW="8xl" pt={5}>
      <JourneysList
        journeys={list}
        rootBoxProps={{ mt: 10, pb: 120 }}
        openEditJourneyDialog={setEditingJourney}
      />
      <FabButton onClick={() => setModalOpen(true)}>
        <AddIcon />
      </FabButton>
      <AddJourneyDialog open={modalOpen} setOpen={setModalOpen} />
      <EditJourneyDialog
        journey={editingJourney}
        handleClose={() => setEditingJourney(null)}
      />
    </Container>
  );
};
