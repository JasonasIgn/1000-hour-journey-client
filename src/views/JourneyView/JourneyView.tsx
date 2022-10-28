import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState, FC } from "react";
import { useParams } from "react-router-dom";
import { EditLogDialog, JourneyTimeLine, Showcase } from "components";
import { fetchJourneyEffect } from "store/features/journeys/effects";
import { getJourney } from "store/features/journeys/selectors";
import { resetJourney } from "store/features/journeys/slice";
import { Achievement, LogExtended } from "store/features/journeys/types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ShiftDirection } from "types";
import { JourneyTitle } from "components/JourneyTitle";

export const JourneyView: FC = () => {
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
    <Flex flexDirection="column" flex="1 1 0">
      <JourneyTitle title={journey.title} />
      <Flex flexDirection="column" alignItems="center" height="full" pt={5}>
        <Flex flex={1} width="full">
          <Flex border="1px solid red" width="30%" />
          <Flex width="40%">
            <Showcase
              item={activeAchievement || activeLog}
              shiftDirection={shiftDirection}
            />
          </Flex>
          <Flex border="1px solid red" width="30%" />
        </Flex>
        <JourneyTimeLine
          journey={journey}
          setActiveLog={setActiveLog}
          setActiveAchievement={setActiveAchievement}
          setShiftDirection={setShiftDirection}
        />
      </Flex>
      {activeLog && (
        <EditLogDialog
          journeyId={journey.id}
          log={activeLog}
          tags={journey.tags}
        />
      )}
    </Flex>
  );
};
