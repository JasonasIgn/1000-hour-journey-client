import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUserPoints } from "store/features/user/selectors";
import { useAppSelector } from "store/hooks";

export const usePointsNotifications = () => {
  const toast = useToast();
  const points = useAppSelector(getUserPoints);
  const [currentPoints, setCurrentPoints] = useState(points);

  useEffect(() => {
    if (points !== undefined && currentPoints === undefined) {
      setCurrentPoints(points);
      return;
    }

    if (points && currentPoints) {
      const earnedPoints = points - currentPoints;
      if (earnedPoints > 0) {
        toast({
          description: `Earned ${earnedPoints} points`,
        });
      }
    }
  }, [currentPoints, points, toast]);
};
