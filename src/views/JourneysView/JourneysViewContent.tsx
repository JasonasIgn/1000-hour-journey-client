import { useEffect, useState, FC } from "react";
import { fetchJourneysListEffect } from "store/features/journeys/effects";
import { Button, Container, Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import {
  getJourneysList,
  getJourneysListLoadingState,
} from "store/features/journeys/selectors";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { JourneysList, AddJourneyDialog, EditJourneyDialog } from "components";
import { JourneyListItem } from "store/features/journeys/types";
import { Paper } from "components/Paper";

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
    <Container maxW="6xl" py={5} display="flex" flexDirection="column">
      <Paper direction="column" overflow="hidden">
        <Flex
          px={10}
          pt={5}
          pb={5}
          borderBottom="1px solid"
          borderColor="border"
        >
          <Button
            ml="auto"
            leftIcon={<AddIcon />}
            onClick={() => setModalOpen(true)}
          >
            ADD JOURNEY
          </Button>
        </Flex>

        <JourneysList
          journeys={list}
          openEditJourneyDialog={setEditingJourney}
        />
        <AddJourneyDialog open={modalOpen} setOpen={setModalOpen} />
        <EditJourneyDialog
          journey={editingJourney}
          handleClose={() => setEditingJourney(null)}
        />
      </Paper>
    </Container>
  );
};
