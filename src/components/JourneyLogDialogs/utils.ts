import { DailyGoal } from "store/features/dailyGoal/types";
import { Activity, Id } from "store/features/journeys/types";
import { Option } from "types";
import { OptionWithColor } from "./types";

export const getActivityOption = (activity: Activity): Option => ({
  value: activity.id,
  label: activity.name,
});

export const getActivityOptionWithColor = (
  activity: Activity
): OptionWithColor => ({
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

export const getActivityOptionsForDailyGoal = (
  activities: Activity[],
  highlightIds: number[]
): OptionWithColor[] =>
  activities
    .filter((activity) => !activity.completed)
    .map((activity) => ({
      ...getActivityOption(activity),
      color: highlightIds.includes(activity.id)
        ? "var(--chakra-colors-yellow-500)"
        : undefined,
    }));

export const getDailyGoalActivityIds = (dailyGoal?: DailyGoal) => {
  const activityIds: number[] = [];
  if (!dailyGoal) {
    return [];
  }
  dailyGoal.journeyTasks.forEach((journeyTask) => {
    journeyTask.activityTasks.forEach((activityTask) => {
      if (activityTask.hoursSpent < activityTask.hoursToLog) {
        activityIds.push(activityTask.activityId);
      }
    });
  });
  return activityIds;
};
