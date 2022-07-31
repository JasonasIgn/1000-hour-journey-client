import { Box, Flex, Slider, SliderThumb, SliderTrack } from "@chakra-ui/react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Journey, LogExtended } from "../../store/features/journeys/types";
import {
  getLogHoursMap,
  getLogsDictionary,
} from "../../views/JourneyView/utils";
import { getInitialXPosition } from "./utils";
import { JourneyTimeLineControls } from "../JourneyTimeLineControls/JourneyTimeLineControls";

interface JourneyTimeLineProps {
  journey: Journey;
  setActiveLog: (log: LogExtended) => void;
}

export const JourneyTimeLine: FC<JourneyTimeLineProps> = ({
  journey,
  setActiveLog,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentHour, setCurrentHour] = useState(journey.totalHours - 0.1);
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

  const onUpdate = useCallback(({ x, scale }: any) => {
    const { current } = timelineContainerRef;
    if (current) {
      const value = make3dTransformValue({ x, y: -90, scale });
      current.style.setProperty("transform", value);
    }
  }, []);

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
    pinchZoomRef.current?.scaleTo({
      x: getInitialXPosition(currentHour, true),
      y: -90,
      scale: 20,
      animated: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setActiveLog(logsDictionary[activeLogId]);
  }, [activeLogId, logsDictionary, setActiveLog, currentHour]);

  useEffect(() => {
    setCurrentHour(journey.totalHours - 0.1);
  }, [journey.totalHours]);

  return (
    <Flex width="100%" flexDirection="column">
      <JourneyTimeLineControls
        height="40px"
        py={2}
        boxSizing="content-box"
        setCurrentHour={setCurrentHour}
        currentHour={currentHour}
        activeLog={logsDictionary[activeLogId]}
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
