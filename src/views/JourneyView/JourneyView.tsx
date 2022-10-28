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
import { GeneralJourneyInfo } from "components/GeneralJourneyInfo";
import { JourneyItemsList } from "components/JourneyItemsList";

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
      <Flex
        flexDirection="column"
        alignItems="center"
        height="full"
        pt={5}
        px={6}
      >
        <Flex flex="1 1 0" width="full" minHeight={0}>
          <Flex width="25%">
            <GeneralJourneyInfo journey={journey} />
          </Flex>
          <Flex width="50%">
            <Showcase
              item={activeAchievement || activeLog}
              shiftDirection={shiftDirection}
            />
          </Flex>
          <Flex width="25%">
            <JourneyItemsList logs={journey.logs} />
          </Flex>
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
