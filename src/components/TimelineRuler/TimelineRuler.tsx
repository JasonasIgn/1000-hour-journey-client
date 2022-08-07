import { Box, SliderMark, Text } from "@chakra-ui/react";
import React, { FC } from "react";

interface TimelineRulerProps {
  currentViewX: number;
}

export const TimelineRuler: FC<TimelineRulerProps> = React.memo(
  ({ currentViewX }) => {
    const currentXHour = Math.round(
      Math.abs(Math.abs(currentViewX / 9.9)) + 21
    );

    return (
      <>
        {Array.from(Array(60).keys()).map((_, idx) => {
          const offset = -30 + idx;
          const sliderValue = currentXHour - offset;
          if (sliderValue < 0 || sliderValue > 1000) {
            return undefined;
          }
          const shouldDisplayNumber = sliderValue % 10 === 0;
          return (
            <SliderMark
              key={`${sliderValue}-as`}
              value={sliderValue}
              color="white"
              display="flex"
              justifyContent="center"
            >
              <Box
                width="1px"
                height={shouldDisplayNumber ? "6px" : "3px"}
                bgColor="white"
                mt="2px"
              />
              {shouldDisplayNumber && (
                <Text fontSize="8px" position="absolute" top="9px">
                  {sliderValue}
                </Text>
              )}
            </SliderMark>
          );
        })}
      </>
    );
  }
);
