import {
  Box,
  Flex,
  Slider,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Journey, LogExtended } from "../../store/features/journeys/types";
import format from "date-fns/format";
import {
  getLogHoursMap,
  getLogsDictionary,
} from "../../views/JourneyView/utils";
import { getInitialXPosition } from "./utils";
import { JourneyTimeLineControls } from "../JourneyTimeLineControls/JourneyTimeLineControls";

interface JourneyTimeLineProps {
  journey: Journey;
  setActiveLog: (log: LogExtended) => void;
  shouldSpaceTriggerPlay: boolean;
}

export const JourneyTimeLine: FC<JourneyTimeLineProps> = ({
  journey,
  setActiveLog,
  shouldSpaceTriggerPlay,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentHour, setCurrentHour] = useState(journey.totalHours - 0.1);
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

  const activeLogId = hoursToLogMap[currentHour];
  const activeLog = logsDictionary[activeLogId];

  // TODO: Move to hook
  const spaceKeyHandler = ({ key }: KeyboardEvent) => {
    if (key === " " && spacePlayRef.current.shouldSpaceTriggerPlay) {
      setIsPlaying(!spacePlayRef.current.isPlaying);
    }
  };

  const onUpdate = useCallback(({ x, scale }: any) => {
    const { current } = timelineContainerRef;
    if (current) {
      const value = make3dTransformValue({ x, y: -90, scale });
      current.style.setProperty("transform", value);
    }
  }, []);

  const centerZoomOnThumb = () => {
    pinchZoomRef.current?.scaleTo({
      x: getInitialXPosition(currentHour),
      y: -90,
      scale: 20,
      animated: true,
    });
  };

  useEffect(() => {
    if (isPlaying) {
      pinchZoomRef.current?.scaleTo({
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
  }, [activeLog, logsDictionary, setActiveLog, currentHour]);

  useEffect(() => {
    setCurrentHour(journey.totalHours - 0.1);
  }, [journey.totalHours]);
  console.log(activeLog);
  return (
    <Flex width="100%" flexDirection="column">
      <JourneyTimeLineControls
        height="40px"
        py={2}
        boxSizing="content-box"
        setCurrentHour={setCurrentHour}
        currentHour={currentHour}
        activeLog={activeLog}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        totalHours={journey.totalHours}
      />
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
          bg="gray"
          width="10000px"
          padding="0 12px"
        >
          <Slider
            onClick={centerZoomOnThumb}
            top="70%"
            step={0.1}
            defaultValue={currentHour}
            min={0}
            max={1000}
            value={currentHour}
            colorScheme="teal"
            onChange={(hour) => {
              setCurrentHour(hour);
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
                mt="-5"
                ml="-6"
                fontSize="10px"
              >
                <>{format(new Date(activeLog.loggedOn), "yyyy-MM-dd")}</>
              </SliderMark>
            )}
            <SliderTrack display="flex">
              {journey.logs.map((log) => {
                const widthPercentage = log.hoursSpent / 10;
                return (
                  <Box
                    key={log.id}
                    bg={log.id === activeLogId ? "blue" : "red"}
                    width={`${widthPercentage}%`}
                    boxShadow="-1px 0px 0 black"
                    _hover={{ bg: "blue" }}
                  />
                );
              })}
            </SliderTrack>

            <SliderThumb
              width="6px"
              height="6px"
              _active={{ transform: `translateY(-50%)` }}
              _focusVisible={{ boxShadow: "none" }}
            />
          </Slider>
        </Box>
      </QuickPinchZoom>
    </Flex>
  );
};
