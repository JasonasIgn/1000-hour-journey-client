import { SliderMark } from "@chakra-ui/react";
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
            return (
              <SliderMark
                key={val}
                value={val}
                textAlign="center"
                color="white"
                fontSize="10px"
              >
                {val % 10 === 0 && <>{val}</>}
              </SliderMark>
            );
          }
          return <> </>;
        })}
      </>
    );
  }
);
