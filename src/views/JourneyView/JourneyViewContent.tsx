import { Flex, Text } from "@chakra-ui/react";
import { useState, FC, useMemo, MouseEvent } from "react";
import {
  EditLogDialog,
  JourneyTimeLine,
  Showcase,
  JourneyItemsList,
  GeneralJourneyInfo,
  AddLogDialog,
  JourneyTimeLineControls,
} from "components";
import { getJourney } from "store/features/journeys/selectors";
import { Achievement } from "store/features/journeys/types";
import { useAppSelector } from "store/hooks";
import { ShiftDirection } from "types";
import { getLogBeginningsDictionary, getLogsDictionary } from "./utils";
import { JOURNEY_VIEW_X_PADDING } from "./constants";

export const JourneyViewContent: FC = () => {
  const journey = useAppSelector(getJourney);

  const [activeLogId, setActiveLogId] = useState<number>();
  const [activeAchievement, setActiveAchievement] = useState<Achievement>();
  const [shiftDirection, setShiftDirection] = useState<ShiftDirection>("left");
  const [addLogModalOpen, setAddLogModalOpen] = useState(false);
  const [addAchievementModalOpen, setAddAchievementModalOpen] = useState(false);

  const logsDictionary = useMemo(
    () => getLogsDictionary(journey?.logs || []),
    [journey?.logs]
  );

  const logBegginingsMap = useMemo(
    () => getLogBeginningsDictionary(journey?.logs || []),
    [journey?.logs]
  );

  const activeLog = activeLogId ? logsDictionary[activeLogId] : undefined;

  const openAddLogDialog = (e: MouseEvent) => {
    if (e.detail !== 0) {
      setAddLogModalOpen(true);
    }
  };

  const openAddAchievementDialog = (e: MouseEvent) => {
    if (e.detail !== 0) {
      setAddAchievementModalOpen(true);
    }
  };

  if (!journey) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex flexDirection="column" flex="1 1 0">
      <Flex
        flexDirection="column"
        alignItems="center"
        height="full"
        py={5}
        px={`${JOURNEY_VIEW_X_PADDING}px`}
      >
        <Flex flex="1 1 0" width="full" minHeight={0} pb={4}>
          <Flex width="25%">
            <GeneralJourneyInfo journey={journey} />
          </Flex>
          <Flex width="50%" direction="column" px={4}>
            <Showcase
              item={activeAchievement || activeLog}
              shiftDirection={shiftDirection}
              defaultJourneyImageSrc={journey.mediaUrl}
            />
            <JourneyTimeLineControls
              activeLogId={activeLog?.id}
              activeAchievement={activeAchievement}
              logBegginingsMap={logBegginingsMap}
              journey={journey}
              setActiveLogId={setActiveLogId}
              setShiftDirection={setShiftDirection}
            />
          </Flex>
          <Flex width="25%">
            <JourneyItemsList
              logs={journey.logs}
              activeLog={activeLog}
              setActiveLogId={setActiveLogId}
              activities={journey.tags}
              openAddLogDialog={openAddLogDialog}
              openAddAchievementDialog={openAddAchievementDialog}
            />
          </Flex>
        </Flex>
        <JourneyTimeLine
          journey={journey}
          activeLog={activeLog}
          setActiveLogId={setActiveLogId}
          setActiveAchievement={setActiveAchievement}
          setShiftDirection={setShiftDirection}
          setAddAchievementModalOpen={setAddAchievementModalOpen}
          addAchievementModalOpen={addAchievementModalOpen}
        />
      </Flex>
      {activeLog && (
        <EditLogDialog
          journeyId={journey.id}
          log={activeLog}
          activities={journey.tags}
        />
      )}
      <AddLogDialog
        open={addLogModalOpen}
        setOpen={setAddLogModalOpen}
        journeyId={journey.id}
        activities={journey.tags}
      />
    </Flex>
  );
};
