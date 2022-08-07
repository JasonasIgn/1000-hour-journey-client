import { Box, SliderMark, Text } from "@chakra-ui/react";
import React, { FC } from "react";

interface TimelineRulerProps {
  currentViewX: number;
}

export const TimelineRuler: FC<TimelineRulerProps> = React.memo(
  ({ currentViewX }) => {
    console.log("current x view: ", currentViewX);
    return (
      <>
        {Array.from(Array(1000).keys()).map((val) => {
          if (Math.abs(Math.abs(currentViewX / 9.5) + 20 - val) <= 30) {
            const shouldDisplayNumber = val % 10 === 0;
            return (
              <SliderMark
                key={val}
                value={val}
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
                    {val}
                  </Text>
                )}
              </SliderMark>
            );
          }
          return <> </>;
        })}
      </>
    );
  }
);
