import {
  Box,
  Flex,
  Slider,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import QuickPinchZoom, {
  make3dTransformValue,
  UpdateAction,
} from "react-quick-pinch-zoom";
import { ReactComponent as AchievementIcon } from "resources/achievement.svg";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Achievement,
  Journey,
  LogExtended,
} from "store/features/journeys/types";
import format from "date-fns/format";
import {
  getLogHoursMap,
  getLogsDictionary,
  getLogBeginningsDictionary,
} from "views/JourneyView/utils";
import { getFinalScale, getZoomXPosition } from "./utils";
import { AddJourneyAchievementDialog, TimelineRuler } from "components";
import { ShiftDirection } from "types";
import { dateFormats } from "utils/constants";
import {
  JOURNEY_MAX_HOURS,
  PAGE_PADDING_X,
  TIMELINE_BORDER_WIDTH_PX,
  TIMELINE_INNER_WIDTH_PER_HOUR_PX,
  TIMELINE_X_PADDING_PX,
} from "./constants";
import { Paper } from "components/Paper";
import { useAppSelector } from "store/hooks";
import { getCurrentHoveredActivityId } from "store/features/journey/selectors";
import { SIDEMENU_WIDTH_PX } from "components/SideMenu";

interface JourneyTimeLineProps {
  journey: Journey;
  setActiveLogId: (id: number | undefined) => void;
  activeLog?: LogExtended;
  setActiveAchievementId: (achievementId?: number) => void;
  setShiftDirection: (direction: ShiftDirection) => void;
  addAchievementModalOpen: boolean;
  setAddAchievementModalOpen: (open: boolean) => void;
  activeAchievement?: Achievement;
}

export const JourneyTimeLine: FC<JourneyTimeLineProps> = ({
  journey,
  setActiveLogId,
  activeLog,
  setActiveAchievementId,
  setShiftDirection,
  addAchievementModalOpen,
  setAddAchievementModalOpen,
  activeAchievement,
}) => {
  const hoveredActivityId = useAppSelector(getCurrentHoveredActivityId);
  const maxHours =
    journey.totalHours > JOURNEY_MAX_HOURS
      ? Math.round(journey.totalHours)
      : JOURNEY_MAX_HOURS;
  const timelineInnerWidthPx = maxHours * TIMELINE_INNER_WIDTH_PER_HOUR_PX;
  const widthBetweenMarksPx =
    (timelineInnerWidthPx - TIMELINE_X_PADDING_PX * 2) / maxHours;

  const isDragging = useRef(false);
  const containerOuterWidth =
    window.innerWidth -
    TIMELINE_BORDER_WIDTH_PX * 2 -
    PAGE_PADDING_X * 2 -
    SIDEMENU_WIDTH_PX;
  const zoomUnit = containerOuterWidth / timelineInnerWidthPx;
  const [currentScale, setCurrentScale] = useState(2);
  const [currentViewX, setCurrentViewX] = useState(0);
  const [currentHour, setCurrentHour] = useState(
    Math.round((journey.totalHours - 0.1) * 10) / 10
  );

  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const pinchZoomRef = useRef<QuickPinchZoom>(null);

  const logBegginingsMap = useMemo(
    () => getLogBeginningsDictionary(journey?.logs || []),
    [journey.logs]
  );
  const hoursToLogMap = useMemo(
    () => getLogHoursMap(journey?.logs || []),
    [journey.logs]
  );
  const logsDictionary = useMemo(
    () => getLogsDictionary(journey?.logs || []),
    [journey.logs]
  );

  const setNewCurrentHour = useCallback(
    (hour: number) => {
      setCurrentHour(Math.round(hour * 10) / 10);
      setShiftDirection(hour > currentHour ? "left" : "right");
    },
    [currentHour, setShiftDirection]
  );

  const onUpdate = useCallback(({ x, scale }: UpdateAction) => {
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
  const centerZoomOnThumb = useCallback(
    (hour: number) => {
      // TODO: fix zooming on lower than < 1000 px screen with
      console.log(timelineInnerWidthPx, containerOuterWidth);
      const scale = currentScale / zoomUnit;
      const xPosition = getZoomXPosition(
        hour,
        containerOuterWidth,
        widthBetweenMarksPx,
        timelineInnerWidthPx
      );
      pinchZoomRef.current?.alignCenter({
        x: xPosition,
        y: 0,
        scale,
        animated: true,
      });
    },
    [
      containerOuterWidth,
      currentScale,
      timelineInnerWidthPx,
      widthBetweenMarksPx,
      zoomUnit,
    ]
  );

  useEffect(() => {
    centerZoomOnThumb(currentHour);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const currentHourLog = logsDictionary[hoursToLogMap[currentHour]];
    if (currentHourLog?.id !== activeLog?.id) {
      setActiveLogId(currentHourLog?.id);
    }
    if (activeAchievement && currentHour !== activeAchievement.loggedAtHour) {
      setActiveAchievementId(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHour]);

  useEffect(() => {
    if (isDragging.current) {
      return;
    }
    const currentHourLog = logsDictionary[hoursToLogMap[currentHour]];
    if (activeLog && activeLog.id !== currentHourLog?.id) {
      const newHour = Math.round(logBegginingsMap[activeLog.id] * 10) / 10;
      setCurrentHour(newHour);
      centerZoomOnThumb(newHour);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLog]);

  useEffect(() => {
    if (activeAchievement) {
      setNewCurrentHour(activeAchievement.loggedAtHour);
      centerZoomOnThumb(activeAchievement.loggedAtHour);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAchievement, centerZoomOnThumb]);

  useEffect(() => {
    setNewCurrentHour(journey.totalHours - 0.1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journey.totalHours]);

  return (
    <Flex width="100%" flexDirection="column">
      <Paper sx={{ borderRadius: 0 }}>
        <Text ml={4} mt={4} position="absolute">
          Date: &nbsp;
          {activeLog
            ? format(new Date(activeLog.loggedOn), dateFormats.standart)
            : "-"}
        </Text>
        <Text ml={4} mt={10} position="absolute">
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
            height="20vh"
            maxHeight="180px"
            width={`${timelineInnerWidthPx}px`}
            px={`${TIMELINE_X_PADDING_PX}px`}
          >
            <Slider
              onChangeStart={() => {
                isDragging.current = true;
              }}
              onChangeEnd={(e) => {
                isDragging.current = false;
                centerZoomOnThumb(e);
              }}
              top={`${Math.round(70 / currentScale)}px`}
              step={0.1}
              defaultValue={currentHour}
              min={0}
              max={maxHours}
              value={currentHour}
              focusThumbOnChange={false}
              onChange={setNewCurrentHour}
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
                      setActiveAchievementId(achievement.id);
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
                  const activityIds = (log?.activities || []).map(
                    (activity) => activity.id
                  );
                  return (
                    <Box
                      key={log.id}
                      bg={
                        log.id === activeLog?.id ||
                        (hoveredActivityId &&
                          activityIds.includes(hoveredActivityId))
                          ? "brand.300"
                          : "brand.600"
                      }
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
                maxHours={maxHours}
                widthBetweenMarksPx={widthBetweenMarksPx}
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
      </Paper>
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
