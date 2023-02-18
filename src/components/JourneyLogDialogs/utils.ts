import { Activity } from "store/features/journeys/types";
import { Option } from "types";

export const getActivityOption = (activity: Activity): Option => ({
  value: activity.id,
  label: activity.name,
});

export const getActivityOptions = (activities: Activity[]): Option[] =>
  activities.filter((activity) => !activity.completed).map(getActivityOption);
