import {
  Box,
  Flex,
  Slider,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import { ReactComponent as AchievementIcon } from "../../resources/achievement.svg";
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Achievement,
  Journey,
  LogExtended,
} from "../../store/features/journeys/types";
import format from "date-fns/format";
import {
  getAchievementHoursMap,
  getAchievementsDictionary,
  getLogHoursMap,
  getLogsDictionary,
} from "../../views/JourneyView/utils";
import { getInitialXPosition } from "./utils";
import { JourneyTimeLineControls } from "../JourneyTimeLineControls/JourneyTimeLineControls";
import { TimelineRuler } from "../TimelineRuler/TimelineRuler";
import { ShiftDirection } from "../../types";
import { AddJourneyLogDialog } from "../AddJourneyLogDialog/AddJourneyLogDialog";
import { AddJourneyAchievementDialog } from "../AddJourneyAchivementDialog/AddJourneyAchievementDialog";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentViewX, setCurrentViewX] = useState(0);
  const [currentHour, setCurrentHour] = useState(journey.totalHours - 0.1);
  const [addLogModalOpen, setAddLogModalOpen] = useState(false);
  const [addAchievementModalOpen, setAddAchievementModalOpen] = useState(false);

  const shouldSpaceTriggerPlay = !addLogModalOpen && !addAchievementModalOpen;
  const spacePlayRef = useRef<{
    isPlaying: boolean;
    shouldSpaceTriggerPlay: boolean;
  }>({ isPlaying, shouldSpaceTriggerPlay });
  const timelineContainerRef = useRef<any>();
  const pinchZoomRef = useRef<any>();

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
    setCurrentHour(hour);
    setShiftDirection(hour > currentHour ? "left" : "right");
  };

  // TODO: Move to hook
  const spaceKeyHandler = ({ key }: KeyboardEvent) => {
    if (key === " " && spacePlayRef.current.shouldSpaceTriggerPlay) {
      setIsPlaying(!spacePlayRef.current.isPlaying);
    }
  };

  const onUpdate = useCallback(({ x, scale }: any) => {
    const { current } = timelineContainerRef;
    if (current) {
      setCurrentViewX(x);
      const value = make3dTransformValue({ x, y: -90, scale });
      current.style.setProperty("transform", value);
    }
  }, []);

  const centerZoomOnThumb = (currentHourOverride?: number) => {
    pinchZoomRef.current?.alignCenter({
      x: getInitialXPosition(currentHourOverride || currentHour),
      y: -90,
      scale: 20,
      animated: true,
    });
  };

  useEffect(() => {
    if (isPlaying) {
      pinchZoomRef.current?.alignCenter({
        x: getInitialXPosition(currentHour),
        y: -90,
        scale: 20,
        animated: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHour]);

  useEffect(() => {
    window.addEventListener("keyup", spaceKeyHandler);
    centerZoomOnThumb();
    return () => {
      window.removeEventListener("keyup", spaceKeyHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    spacePlayRef.current = { shouldSpaceTriggerPlay, isPlaying };
  }, [isPlaying, shouldSpaceTriggerPlay]);

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
      <Box border="1px solid" borderColor="brand.700" borderRadius="20px">
        <QuickPinchZoom
          onUpdate={onUpdate}
          maxZoom={20}
          inertia={false}
          ref={pinchZoomRef}
          lockDragAxis={true}
          wheelScaleFactor={80}
        >
          <Box
            ref={timelineContainerRef}
            height="200px"
            width="10000px"
            padding="0 12px"
          >
            <Slider
              onChangeEnd={centerZoomOnThumb}
              top="70%"
              step={0.1}
              defaultValue={currentHour}
              min={0}
              max={1000}
              value={currentHour}
              onChange={(hour) => {
                setNewCurrentHour(hour);
                if (isPlaying) {
                  setIsPlaying(false);
                }
              }}
            >
              {activeLog && (
                <SliderMark
                  value={currentHour}
                  textAlign="center"
                  color="white"
                  mt="-8"
                  ml="-6"
                  fontSize="10px"
                >
                  <>{format(new Date(activeLog.loggedOn), "yyyy-MM-dd")}</>
                </SliderMark>
              )}
              {journey.achievements.map((achievement) => {
                return (
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
                      <AchievementIcon
                        stroke="white"
                        width="9px"
                        height="9px"
                      />
                    </Box>
                  </SliderMark>
                );
              })}
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
              <TimelineRuler currentViewX={currentViewX} />
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
      <AddJourneyLogDialog
        open={addLogModalOpen}
        setOpen={setAddLogModalOpen}
        journeyId={journey.id}
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
