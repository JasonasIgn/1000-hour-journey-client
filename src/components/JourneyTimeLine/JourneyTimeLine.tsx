import {
  Box,
  Flex,
  Slider,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import { ReactComponent as AchievementIcon } from "resources/achievement.svg";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Achievement,
  Journey,
  LogExtended,
} from "store/features/journeys/types";
import format from "date-fns/format";
import {
  getAchievementHoursMap,
  getAchievementsDictionary,
  getLogHoursMap,
  getLogsDictionary,
  getLogBeginningsDictionary,
} from "views/JourneyView/utils";
import { getFinalScale, getInitialXPosition } from "./utils";
import {
  JourneyTimeLineControls,
  TimelineRuler,
  AddLogDialog,
  AddJourneyAchievementDialog,
} from "components";
import { ShiftDirection } from "types";
import { dateFormats } from "utils/constants";
import { useSpaceKeyForPlaying } from "./hooks";
import { useAppSelector } from "store/hooks";
import { getEditLogDialogOpen } from "store/features/journey/selectors";
import {
  MAX_HOURS,
  TIMELINE_BORDER_WIDTH_PX,
  TIMELINE_INNER_WIDTH_PX,
  TIMELINE_X_PADDING_PX,
  WIDTH_BETWEEN_MARKS_PX,
} from "./constants";

interface JourneyTimeLineProps {
  journey: Journey;
  setActiveLog: (log: LogExtended) => void;
  setActiveAchievement: (log: Achievement) => void;
  setShiftDirection: (direction: ShiftDirection) => void;
}

export const JourneyTimeLine: FC<JourneyTimeLineProps> = ({
  journey,
  setActiveLog,
  setActiveAchievement,
  setShiftDirection,
}) => {
  const containerOuterWidth = window.innerWidth - TIMELINE_BORDER_WIDTH_PX * 2;
  const zoomUnit = containerOuterWidth / TIMELINE_INNER_WIDTH_PX;
  const [currentScale, setCurrentScale] = useState(2);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentViewX, setCurrentViewX] = useState(0);
  const [currentHour, setCurrentHour] = useState(
    Math.round((journey.totalHours - 0.1) * 10) / 10
  );

  const isEditLogModalOpen = useAppSelector(getEditLogDialogOpen);

  const [addLogModalOpen, setAddLogModalOpen] = useState(false);
  const [addAchievementModalOpen, setAddAchievementModalOpen] = useState(false);

  const shouldSpaceTriggerPlay =
    !addLogModalOpen && !addAchievementModalOpen && !isEditLogModalOpen;

  const timelineContainerRef = useRef<any>();
  const pinchZoomRef = useRef<any>();

  useSpaceKeyForPlaying({ isPlaying, setIsPlaying, shouldSpaceTriggerPlay });

  const logBegginingsMap = useMemo(
    () => getLogBeginningsDictionary(journey?.logs || []),
    [journey?.logs]
  );
  const hoursToLogMap = useMemo(
    () => getLogHoursMap(journey?.logs || []),
    [journey?.logs]
  );
  const logsDictionary = useMemo(
    () => getLogsDictionary(journey?.logs || []),
    [journey?.logs]
  );

  const hoursToAchievementsMap = useMemo(
    () => getAchievementHoursMap(journey.achievements),
    [journey.achievements]
  );
  const achievementsDictionary = useMemo(
    () => getAchievementsDictionary(journey.achievements),
    [journey.achievements]
  );

  const activeLogId = hoursToLogMap[currentHour];
  const activeLog = logsDictionary[activeLogId];

  const activeAchievementId = hoursToAchievementsMap[currentHour];
  const activeAchievement = achievementsDictionary[activeAchievementId];

  const setNewCurrentHour = (hour: number) => {
    setCurrentHour(Math.round(hour * 10) / 10);
    setShiftDirection(hour > currentHour ? "left" : "right");
  };
  const onUpdate = useCallback(({ x, scale }: any) => {
    const finalScale = getFinalScale(scale);
    setCurrentScale(finalScale);
    const { current } = timelineContainerRef;
    if (current) {
      setCurrentViewX(x);
      const value = make3dTransformValue({
        x,
        y: 0,
        scale: finalScale,
      });
      current.style.setProperty("transform", value);
    }
  }, []);

  const centerZoomOnThumb = (currentHourOverride?: number) => {
    const hour = currentHourOverride || currentHour;
    const xPosition =
      ((containerOuterWidth + TIMELINE_X_PADDING_PX) /
        WIDTH_BETWEEN_MARKS_PX /
        100) *
      hour;
    pinchZoomRef.current?.alignCenter({
      x: xPosition,
      y: 0,
      scale: currentScale / zoomUnit,
      animated: true,
    });
  };

  useEffect(() => {
    if (isPlaying) {
      pinchZoomRef.current?.alignCenter({
        x: getInitialXPosition(currentHour),
        y: 0,
        scale: 20,
        animated: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHour]);

  useEffect(() => {
    centerZoomOnThumb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setActiveLog(activeLog);
  }, [activeLog, setActiveLog]);

  useEffect(() => {
    setActiveAchievement(activeAchievement);
  }, [activeAchievement, setActiveAchievement]);

  useEffect(() => {
    setNewCurrentHour(journey.totalHours - 0.1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journey.totalHours]);
  return (
    <Flex width="100%" flexDirection="column">
      <JourneyTimeLineControls
        height="40px"
        py={2}
        boxSizing="content-box"
        setCurrentHour={setNewCurrentHour}
        currentHour={currentHour}
        activeLog={activeLog}
        activeAchievement={activeAchievement}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        totalHours={journey.totalHours}
        logBegginingsMap={logBegginingsMap}
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
        centerZoomOnThumb={centerZoomOnThumb}
      />
      <Box
        border={`${TIMELINE_BORDER_WIDTH_PX}px solid`}
        borderColor="brand.700"
        borderRadius="20px"
      >
        <Text ml={6} mt={6} position="absolute">
          Date: &nbsp;
          {activeLog
            ? format(new Date(activeLog.loggedOn), dateFormats.standart)
            : "-"}
        </Text>
        <Text ml={6} mt={12} position="absolute">
          Hour: &nbsp;{currentHour < 0 ? 0 : currentHour}
        </Text>
        <QuickPinchZoom
          onUpdate={onUpdate}
          maxZoom={20}
          minZoom={10}
          inertia={false}
          ref={pinchZoomRef}
          lockDragAxis={true}
          wheelScaleFactor={80}
        >
          <Box
            ref={timelineContainerRef}
            height="200px"
            width={`${TIMELINE_INNER_WIDTH_PX}px`}
            px={`${TIMELINE_X_PADDING_PX}px`}
          >
            <Slider
              onChangeEnd={centerZoomOnThumb}
              top={`${Math.round(70 / currentScale)}px`}
              step={0.1}
              defaultValue={currentHour}
              min={0}
              max={MAX_HOURS}
              value={currentHour}
              onChange={(hour) => {
                setNewCurrentHour(hour);
                if (isPlaying) {
                  setIsPlaying(false);
                }
              }}
            >
              {journey.achievements.map((achievement) => (
                <SliderMark
                  key={achievement.id}
                  value={achievement.loggedAtHour}
                  display="flex"
                  justifyContent="center"
                  color="white"
                  bgColor="brand.100"
                  mt="-7px"
                  width="1px"
                  height={1}
                >
                  <Box
                    minWidth="9px"
                    top="-10px"
                    position="absolute"
                    cursor="pointer"
                    pointerEvents="all"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setNewCurrentHour(achievement.loggedAtHour);
                    }}
                    onPointerDownCapture={(e) => {
                      e.stopPropagation();
                    }}
                    _hover={{ transform: "scale(1.1)" }}
                  >
                    <AchievementIcon stroke="white" width="9px" height="9px" />
                  </Box>
                </SliderMark>
              ))}
              <SliderTrack display="flex">
                {journey.logs.map((log, idx) => {
                  const widthPercentage = log.hoursSpent / 10;
                  return (
                    <Box
                      key={log.id}
                      bg={log.id === activeLogId ? "brand.300" : "brand.600"}
                      width={`${widthPercentage}%`}
                      borderLeft={idx === 0 ? "none" : "1px solid"}
                      borderColor="gray.400"
                      _hover={{ bg: "brand.300" }}
                    />
                  );
                })}
              </SliderTrack>
              <TimelineRuler
                currentViewX={currentViewX}
                scale={currentScale}
                containerOuterWidth={containerOuterWidth}
              />
              <SliderThumb
                width="6px"
                height="6px"
                _active={{ transform: `translateY(-50%)` }}
                _focusVisible={{ boxShadow: "none" }}
              />
            </Slider>
          </Box>
        </QuickPinchZoom>
      </Box>
      <AddLogDialog
        open={addLogModalOpen}
        setOpen={setAddLogModalOpen}
        journeyId={journey.id}
        tags={journey.tags}
      />
      {activeLog && (
        <AddJourneyAchievementDialog
          open={addAchievementModalOpen}
          setOpen={setAddAchievementModalOpen}
          journeyId={journey.id}
          activeLog={activeLog}
          currentHour={currentHour}
        />
      )}
    </Flex>
  );
};
