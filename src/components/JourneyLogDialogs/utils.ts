import { Activity, Id } from "store/features/journeys/types";
import { Option } from "types";

export const getActivityOption = (activity: Activity): Option => ({
  value: activity.id,
  label: activity.name,
});

export const getActivityOptionsFromIds = (
  activities: Id[],
  activitiesDictionary: Record<number, Activity>
): Option[] => {
  return activities
    .filter((idObject) => !activitiesDictionary[idObject.id].completed)
    .map((idObject) => getActivityOption(activitiesDictionary[idObject.id]));
};

export const getActivityOptions = (activities: Activity[]): Option[] =>
  activities.filter((activity) => !activity.completed).map(getActivityOption);
