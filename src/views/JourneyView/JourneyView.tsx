import { Container, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditLogDialog } from "../../components/JourneyLogDialogs/EditLogDialog/EditLogDialog";
import { JourneyTimeLine } from "../../components/JourneyTimeLine/JourneyTimeLine";
import { Showcase } from "../../components/Showcase/Showcase";
import { fetchJourneyEffect } from "../../store/features/journeys/effects";
import { getJourney } from "../../store/features/journeys/selectors";
import { resetJourney } from "../../store/features/journeys/slice";
import { Achievement, LogExtended } from "../../store/features/journeys/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ShiftDirection } from "../../types";

export const JourneyView: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const journey = useAppSelector(getJourney);

  const [activeLog, setActiveLog] = useState<LogExtended>();
  const [activeAchievement, setActiveAchievement] = useState<Achievement>();
  const [shiftDirection, setShiftDirection] = useState<ShiftDirection>("left");

  useEffect(() => {
    if (params.journeyId && journey?.id.toString() !== params.journeyId) {
      dispatch(fetchJourneyEffect({ journeyId: params.journeyId }));
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
        <Showcase
          item={activeAchievement || activeLog}
          shiftDirection={shiftDirection}
        />
        <JourneyTimeLine
          journey={journey}
          setActiveLog={setActiveLog}
          setActiveAchievement={setActiveAchievement}
          setShiftDirection={setShiftDirection}
        />
      </Flex>
      {activeLog && <EditLogDialog journeyId={journey.id} log={activeLog} />}
    </Container>
  );
};
