import { LogExtended } from "../../store/features/journeys/types";

export interface LogsHourMap {
  [index: number]: number;
}

export interface LogsDictionary {
  [index: number]: LogExtended;
}
