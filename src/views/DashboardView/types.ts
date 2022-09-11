export interface LogsStatistics {
  allTime: {
    logsCount: number;
    totalHours: number;
    hoursSpentPerLog: number;
  };
  thisYear: {
    logsCount: number;
    totalHours: number;
    hoursSpentPerLog: number;
  };
  thisMonth: {
    logsCount: number;
    totalHours: number;
    hoursSpentPerLog: number;
  };
}
