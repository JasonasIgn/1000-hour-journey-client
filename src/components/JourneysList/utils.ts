import { DailyGoal } from "store/features/dailyGoal/types";

export const getDailyGoalJourneyTasksIds = (dailyGoal?: DailyGoal) => {
  if (!dailyGoal) {
    return [];
  }
  return dailyGoal.journeyTasks.map((journeyTask) => journeyTask.journey.id);
};
