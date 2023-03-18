import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUserPoints } from "store/features/user/selectors";
import { useAppSelector } from "store/hooks";

export const usePointsNotifications = () => {
  const toast = useToast();
  const points = useAppSelector(getUserPoints);
  const [currentPoints, setCurrentPoints] = useState(points);

  useEffect(() => {
    if (points !== undefined) {
      if (currentPoints === undefined) {
        setCurrentPoints(points);
        return;
      }
      if (currentPoints) {
        const earnedPoints = points - currentPoints;
        if (earnedPoints > 0) {
          toast({
            description: `Earned ${earnedPoints} points`,
          });
        }
        setCurrentPoints(points);
      }
    }
  }, [currentPoints, points, toast]);
};
