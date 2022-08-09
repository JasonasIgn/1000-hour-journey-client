import { Container, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddJourneyAchievementDialog } from "../../components/AddJourneyAchivementDialog/AddJourneyAchievementDialog";
import { AddJourneyLogDialog } from "../../components/AddJourneyLogDialog/AddJourneyLogDialog";
import { JourneyTimeLine } from "../../components/JourneyTimeLine/JourneyTimeLine";
import { Showcase } from "../../components/Showcase/Showcase";
import { fetchJourneyEffect } from "../../store/features/journeys/effects";
import { getJourney } from "../../store/features/journeys/selectors";
import { resetJourney } from "../../store/features/journeys/slice";
import { Achievement, LogExtended } from "../../store/features/journeys/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export const JourneyView: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const journey = useAppSelector(getJourney);
  const [addLogModalOpen, setAddLogModalOpen] = useState(false);
  const [addAchievementModalOpen, setAddAchievementModalOpen] = useState(false);
  const [activeLog, setActiveLog] = useState<LogExtended>();
  const [activeAchievement, setActiveAchievement] = useState<Achievement>();

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
        <Showcase item={activeAchievement || activeLog} />
        <JourneyTimeLine
          journey={journey}
          setActiveLog={setActiveLog}
          setActiveAchievement={setActiveAchievement}
          shouldSpaceTriggerPlay={!addLogModalOpen}
          openAddLogModal={(e) => {
            if (e.detail !== 0) {
              setAddLogModalOpen(true);
            }
          }}
          openAddAchievementModal={(e) => {
            if (e.detail !== 0) {
              setAddAchievementModalOpen(true);
            }
          }}
        />
      </Flex>
      <AddJourneyLogDialog
        open={addLogModalOpen}
        setOpen={setAddLogModalOpen}
        journeyId={journey.id}
      />
      <AddJourneyAchievementDialog
        open={addAchievementModalOpen}
        setOpen={setAddAchievementModalOpen}
        journeyId={journey.id}
        activeLog={activeLog}
      />
    </Container>
  );
};
