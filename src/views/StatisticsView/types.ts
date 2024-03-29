export interface AchievementsDateQuery {
  year: number;
}

export interface LogTimerFrameStatistics {
  logsCount: number;
  totalHours: number | null;
  hoursSpentPerLog: number | null;
}

export interface LogsStatistics {
  allTime: LogTimerFrameStatistics;
  thisYear: LogTimerFrameStatistics;
  thisMonth: LogTimerFrameStatistics;
  thisWeek: LogTimerFrameStatistics;
  today: LogTimerFrameStatistics;
}

export interface DateQuery {
  month: number;
  year: number;
}

export interface ChartLogData {
  name: string;
  hoursSpent: number;
}
