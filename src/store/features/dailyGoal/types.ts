import { Activity, Journey } from "../journeys/types";

export interface DailyGoal {
  id: number;
  userId: number;
  completed: boolean;
  updatedAt: Date;
  createdAt: Date;
  journeyTasks: JourneyTask[];
  rewardPoints: number;
  isRewardGained: boolean;

}

export interface JourneyTask {
  id: number;
  dailyGoalId: number;
  hoursSpent: number;
  hoursToLog: number;
  updatedAt: Date;
  createdAt: Date;
  journey: Journey;
  activityTasks: ActivityTask[];
}

export interface ActivityTask {
  id: number;
  journeyTaskId: number;
  activityId: number;
  hoursSpent: number;
  hoursToLog: number;
  updatedAt: Date;
  createdAt: Date;
  activity: Activity;
}
