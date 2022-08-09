import { Achievement, LogExtended } from "../../store/features/journeys/types";

export interface IdsHourMap {
  [index: number]: number;
}

export interface LogsDictionary {
  [index: number]: LogExtended;
}

export interface AchievementsDictionary {
  [id: number]: Achievement;
}
