import { Box, Slider, SliderThumb, SliderTrack } from "@chakra-ui/react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Journey, LogExtended } from "../../store/features/journeys/types";
import {
  getLogHoursMap,
  getLogsDictionary,
} from "../../views/JourneyView/utils";

interface JourneyTimeLineProps {
  journey: Journey;
  setActiveLog: (log: LogExtended) => void;
}

export const JourneyTimeLine: FC<JourneyTimeLineProps> = ({
  journey,
  setActiveLog,
}) => {
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
    pinchZoomRef.current?.scaleTo({ x: 30, y: -90, scale: 20 });
  }, []);

  useEffect(() => {
    setActiveLog(logsDictionary[activeLogId]);
  }, [activeLogId, logsDictionary, setActiveLog]);

  return (
    <QuickPinchZoom
      onUpdate={onUpdate}
      maxZoom={20}
      inertia={false}
      ref={pinchZoomRef}
      lockDragAxis={true}
      wheelScaleFactor={80}
    >
      <Box ref={timelineContainerRef} height="200px" bg="gray" width="10000px">
        <Slider
          top="70%"
          step={0.1}
          defaultValue={currentHour}
          min={0}
          max={1000}
          colorScheme="teal"
          onChange={(hour) => setCurrentHour(hour)}
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
  );
};
