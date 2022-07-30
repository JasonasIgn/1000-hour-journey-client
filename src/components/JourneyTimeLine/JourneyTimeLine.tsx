import { Box, Slider, SliderThumb, SliderTrack } from "@chakra-ui/react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Journey } from "../../store/features/journeys/types";

interface JourneyTimeLineProps {
  journey: Journey;
}

export const JourneyTimeLine: FC<JourneyTimeLineProps> = ({ journey }) => {
  const [value, setValue] = useState(journey.totalHours);
  const timelineContainerRef = useRef<any>();
  const pinchZoomRef = useRef<any>();
  const onUpdate = useCallback(({ x, scale }: any) => {
    const { current } = timelineContainerRef;

    if (current) {
      const value = make3dTransformValue({ x, y: -90, scale });
      current.style.setProperty("transform", value);
    }
  }, []);

  useEffect(() => {
    pinchZoomRef.current?.scaleTo({ x: 30, y: 0, scale: 20 });
  }, []);

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
          defaultValue={value}
          min={0}
          max={1000}
          colorScheme="teal"
          onChange={(v) => setValue(v)}
        >
          <SliderTrack display="flex">
            {journey.logs.map((log) => {
              const widthPercentage = log.hoursSpent / 10;
              return (
                <Box
                  bg="red"
                  width={`${widthPercentage}%`}
                  boxShadow="-1px 0px 0 black"
                  _hover={{ bg: "blue" }}
                />
              );
            })}
          </SliderTrack>

          <SliderThumb width="6px" height="6px" />
        </Slider>
      </Box>
    </QuickPinchZoom>
  );
};
