import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState, FC, useMemo } from "react";
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
import { getLogsDictionary } from "./utils";
import { JOURNEY_VIEW_X_PADDING } from "./constants";

export const JourneyView: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const journey = useAppSelector(getJourney);

  const [activeLog, setActiveLog] = useState<LogExtended>();
  const [activeAchievement, setActiveAchievement] = useState<Achievement>();
  const [shiftDirection, setShiftDirection] = useState<ShiftDirection>("left");

  const logsDictionary = useMemo(
    () => getLogsDictionary(journey?.logs || []),
    [journey?.logs]
  );

  const setActiveLogById = (id: number) => {
    setActiveLog(logsDictionary[id]);
  };

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
        px={`${JOURNEY_VIEW_X_PADDING}px`}
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
            <JourneyItemsList
              logs={journey.logs}
              activeLog={activeLog}
              setActiveLogById={setActiveLogById}
            />
          </Flex>
        </Flex>
        <JourneyTimeLine
          journey={journey}
          activeLog={activeLog}
          setActiveLogById={setActiveLogById}
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
