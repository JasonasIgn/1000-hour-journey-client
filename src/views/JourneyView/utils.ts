import { Log } from "../../store/features/journeys/types";
import { LogsDictionary, LogsHourMap } from "./types";

export const getLogHoursMap = (logs: Log[]): LogsHourMap => {
  const hoursMap: LogsHourMap = {};
  let currentHour = 0;
  logs.forEach((log) => {
    for (let i = 0; i < log.hoursSpent * 10; i++) {
      hoursMap[Math.round(currentHour * 10) / 10] = log.id;
      currentHour += 0.1;
    }
  });
  return hoursMap;
};

export const getLogsDictionary = (logs: Log[]): LogsDictionary => {
  const logsDictionary: LogsDictionary = {};
  logs.forEach((log) => {
    logsDictionary[log.id] = log;
  });
  return logsDictionary;
};
