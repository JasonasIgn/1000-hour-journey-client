import { Option } from "types";
import { Activity } from "./types";

export const getActivityIdsArray = (activities: Option[]) =>
  activities.map((activity) => activity.value);

export const getActivitiesDictionary = (activities: Activity[]) => {
  const dictionary: Record<number, Activity> = {};
  activities.forEach((activity) => {
    dictionary[activity.id] = activity;
  });
  return dictionary;
};
