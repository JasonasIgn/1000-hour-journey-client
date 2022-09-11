interface LogTimerFrameStatistics {
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
