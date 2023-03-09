import { Flex } from "@chakra-ui/react";
import { useState, FC, useMemo, MouseEvent, useEffect } from "react";
import {
  EditLogDialog,
  JourneyTimeLine,
  Showcase,
  JourneyItemsList,
  GeneralJourneyInfo,
  AddLogDialog,
  JourneyTimeLineControls,
  Loader,
} from "components";
import { getJourney } from "store/features/journeys/selectors";
import { useAppSelector } from "store/hooks";
import { ShiftDirection } from "types";
import {
  getLogBeginningsDictionary,
  getLogsDictionary,
  getAchievementsDictionary,
} from "./utils";
import { JOURNEY_VIEW_X_PADDING } from "./constants";
import { EditJourneyAchievementDialog } from "components/JourneyAchievementsDialogs";
import { useSearchParams } from "react-router-dom";

export const JourneyViewContent: FC = () => {
  const [query, setQuery] = useSearchParams();
  const journey = useAppSelector(getJourney);
  const prefilledActivityId = query.get("prefillActivityId");

  const [activeLogId, setActiveLogId] = useState<number>();
  const [activeAchievementId, setActiveAchievementId] = useState<number>();
  const [shiftDirection, setShiftDirection] = useState<ShiftDirection>("left");
  const [addLogModalOpen, setAddLogModalOpen] = useState(false);
  const [addAchievementModalOpen, setAddAchievementModalOpen] = useState(false);
  const [editAchievementModalOpen, setEditAchievementModalOpen] =
    useState(false);

  const logsDictionary = useMemo(
    () => getLogsDictionary(journey?.logs || []),
    [journey?.logs]
  );

  const achievementsDictionary = useMemo(
    () => getAchievementsDictionary(journey?.achievements || []),
    [journey?.achievements]
  );

  const logBegginingsMap = useMemo(
    () => getLogBeginningsDictionary(journey?.logs || []),
    [journey?.logs]
  );

  const activeLog = activeLogId ? logsDictionary[activeLogId] : undefined;
  const activeAchievement = activeAchievementId
    ? achievementsDictionary[activeAchievementId]
    : undefined;

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

  const clearQueryParams = () => {
    setQuery();
  };

  useEffect(() => {
    if (prefilledActivityId) {
      setAddLogModalOpen(true);
    }
  }, [journey, prefilledActivityId]);

  if (!journey) {
    return <Loader />;
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
              onEditAchievementClick={() => {
                setEditAchievementModalOpen(true);
              }}
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
              activities={journey.activities}
              openAddLogDialog={openAddLogDialog}
              openAddAchievementDialog={openAddAchievementDialog}
              achievements={journey.achievements}
              setActiveAchievementId={setActiveAchievementId}
              activeAchievement={activeAchievement}
            />
          </Flex>
        </Flex>
        <JourneyTimeLine
          journey={journey}
          activeLog={activeLog}
          setActiveLogId={setActiveLogId}
          setActiveAchievementId={setActiveAchievementId}
          setShiftDirection={setShiftDirection}
          setAddAchievementModalOpen={setAddAchievementModalOpen}
          addAchievementModalOpen={addAchievementModalOpen}
          activeAchievement={activeAchievement}
        />
      </Flex>
      {activeLog && (
        <EditLogDialog
          journeyId={journey.id}
          log={activeLog}
          activities={journey.activities}
        />
      )}
      <AddLogDialog
        open={addLogModalOpen}
        setOpen={setAddLogModalOpen}
        journeyId={journey.id}
        activities={journey.activities}
        prefilledActivityId={
          prefilledActivityId ? Number(prefilledActivityId) : undefined
        }
        clearQueryParams={clearQueryParams}
      />
      {activeAchievement && (
        <EditJourneyAchievementDialog
          open={editAchievementModalOpen}
          setOpen={setEditAchievementModalOpen}
          journeyId={journey.id}
          achievement={activeAchievement}
        />
      )}
    </Flex>
  );
};
