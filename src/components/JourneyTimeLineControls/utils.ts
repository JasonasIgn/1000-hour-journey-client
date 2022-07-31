import { LogExtended } from "../../store/features/journeys/types";

export const getTickSpeedByLogHours = (log: LogExtended) => {
  const timeForLogMs = 1000;
  return timeForLogMs / (log.hoursSpent * 10);
};
