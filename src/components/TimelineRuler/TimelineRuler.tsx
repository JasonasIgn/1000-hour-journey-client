import { Box, SliderMark, Text } from "@chakra-ui/react";
import { TIMELINE_X_PADDING_PX } from "components/JourneyTimeLine/constants";
import { FC, memo } from "react";

interface TimelineRulerProps {
  currentViewX: number;
  scale: number;
  containerOuterWidth: number;
  maxHours: number;
  widthBetweenMarksPx: number;
}

const additionalMarks = 4;

export const TimelineRuler: FC<TimelineRulerProps> = memo(
  ({
    currentViewX,
    scale,
    containerOuterWidth,
    maxHours,
    widthBetweenMarksPx,
  }) => {
    const maxMarksInViewport =
      Math.round(containerOuterWidth / widthBetweenMarksPx / scale) +
      additionalMarks;
    const offsetTillMiddlePosition = containerOuterWidth / scale / 2;
    const middleViewX =
      Math.abs(currentViewX) + offsetTillMiddlePosition - TIMELINE_X_PADDING_PX;
    const middleMarkValueToDisplay = Math.round(
      middleViewX / widthBetweenMarksPx
    );

    return (
      <>
        {Array.from(Array(maxMarksInViewport).keys()).map((_, idx) => {
          const offset = Math.round(maxMarksInViewport / 2) * -1 + idx;
          const sliderValue = middleMarkValueToDisplay - offset;
          if (sliderValue < 0 || sliderValue > maxHours) {
            return undefined;
          }
          const shouldDisplayNumber = sliderValue % 10 === 0;
          return (
            <SliderMark
              key={`${sliderValue}-mark`}
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
