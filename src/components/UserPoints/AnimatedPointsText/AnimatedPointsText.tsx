import { Text, useInterval } from "@chakra-ui/react";
import { FC, useState } from "react";

interface AnimatedPointsTextProps {
  points?: number;
}
const TICKS_TO_COMPLETE_ANIMATION = 35;

export const AnimatedPointsText: FC<AnimatedPointsTextProps> = ({ points }) => {
  const [increasePerTick, setIncreasePerTick] = useState(0);
  const [displayedPoints, setDisplayedPoints] = useState(0);
  const intervalShouldRun = points && displayedPoints !== points;

  useInterval(
    () => {
      if (points) {
        if (Math.abs(points - displayedPoints) <= Math.abs(increasePerTick)) {
          setDisplayedPoints(points);
          setIncreasePerTick(0);
          return;
        }
        if (displayedPoints !== points) {
          setDisplayedPoints(displayedPoints + increasePerTick);

          if (increasePerTick === 0) {
            const pointsPerTick = Math.round(
              (points - displayedPoints) / TICKS_TO_COMPLETE_ANIMATION
            );
            setIncreasePerTick(pointsPerTick);
          }
        }
      }
    },
    intervalShouldRun ? 25 : null
  );

  return (
    <Text fontWeight={500} color="gray.300">
      {points === undefined ? "-" : displayedPoints}
    </Text>
  );
};
