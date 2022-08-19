import { Achievement, LogExtended } from "store/features/journeys/types";

export const getTickSpeed = (log?: LogExtended, achievement?: Achievement) => {
  const timeForCardMs = 1500;
  if (!log) {
    return null;
  }
  if (achievement) {
    return timeForCardMs;
  }
  return timeForCardMs / (log.hoursSpent * 10);
};
