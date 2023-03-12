import { Activity } from "store/features/journeys/types";
import { ActivityHoursMap } from "./utils";

export interface SortParams {
  sortParam: "completed" | "hoursSpent";
  direction: "asc" | "desc";
}

export const useActivitiesSorting = (
  activities: Activity[],
  activitiesSpentTimeMap: ActivityHoursMap,
  sortParams?: SortParams
) => {
  if (!sortParams) {
    return activities;
  }

  const { direction, sortParam } = sortParams;
  const directionValue = direction === "asc" ? 1 : -1;
  const activitiesClone = [...activities];
  if (sortParam === "completed") {
    return activitiesClone.sort((a1, a2) =>
      a1.completed >= a2.completed ? directionValue : directionValue * -1
    );
  }

  if (sortParam === "hoursSpent") {
    return activitiesClone.sort((a1, a2) =>
      (activitiesSpentTimeMap[a1.id.toString()] || 0) >=
      (activitiesSpentTimeMap[a2.id.toString()] || 0)
        ? directionValue
        : directionValue * -1
    );
  }

  return activitiesClone;
};
