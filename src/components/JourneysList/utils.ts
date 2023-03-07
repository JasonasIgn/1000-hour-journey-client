import { DailyGoal } from "store/features/dailyGoal/types";

export const getDailyGoalJourneyTasksIds = (dailyGoal?: DailyGoal) => {
  const ids: number[] = [];
  if (!dailyGoal) {
    return [];
  }
  dailyGoal.journeyTasks.forEach((journeyTask) => {
    if (journeyTask.hoursSpent < journeyTask.hoursToLog) {
      ids.push(journeyTask.journey.id);
    }
  });
  return ids;
};
