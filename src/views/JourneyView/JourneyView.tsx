import { AddIcon } from "@chakra-ui/icons";
import { Container, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddJourneyLogDialog } from "../../components/AddJourneyLogDialog/AddJourneyLogDialog";
import { FabButton } from "../../components/FabButton/FabButton";
import { JourneyTimeLine } from "../../components/JourneyTimeLine/JourneyTimeLine";
import { LogShowcase } from "../../components/LogShowcase/LogShowcase";
import { fetchJourneyEffect } from "../../store/features/journeys/effects";
import { getJourney } from "../../store/features/journeys/selectors";
import { resetJourney } from "../../store/features/journeys/slice";
import { LogExtended } from "../../store/features/journeys/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export const JourneyView: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const journey = useAppSelector(getJourney);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeLog, setActiveLog] = useState<LogExtended>();

  useEffect(() => {
    if (params.journeyId && journey?.id.toString() !== params.journeyId) {
      dispatch(fetchJourneyEffect({ id: params.journeyId }));
    }

    return () => {
      dispatch(resetJourney());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!journey) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container maxW="6xl">
      <Flex
        flexDirection="column"
        alignItems="center"
        height="calc(100vh - 60px)"
        pt={5}
      >
        <LogShowcase log={activeLog} />
        <JourneyTimeLine
          journey={journey}
          setActiveLog={setActiveLog}
          shouldSpaceTriggerPlay={!modalOpen}
        />
      </Flex>
      <AddJourneyLogDialog
        open={modalOpen}
        setOpen={setModalOpen}
        journeyId={journey.id}
      />
      <FabButton
        onClick={(e) => {
          if (e.detail !== 0) {
            setModalOpen(true);
          }
        }}
      >
        <AddIcon />
      </FabButton>
    </Container>
  );
};
