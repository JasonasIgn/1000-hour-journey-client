import { Log } from "store/features/journeys/types";
import format from "date-fns/format";
import { ChartLogData } from "views/DashboardView/types";

export const transformDataForChartMonthDays = (
  logs: Log[],
  month: number
): ChartLogData[] => {
  const year = 2022;
  const monthDaysCount = new Date(year, month, 0).getDate();
  const result: { [index: string]: ChartLogData } = {};
  for (let i = 1; i <= monthDaysCount; i++) {
    const dateIndex = format(new Date(`${year}-${month}-${i}`), "yyyy-MM-dd");
    result[dateIndex] = { name: dateIndex, hoursSpent: 0 };
  }
  logs.forEach((log) => {
    const formattedDateIndex = format(new Date(log.loggedOn), "yyyy-MM-dd");
    result[formattedDateIndex].hoursSpent += log.hoursSpent;
  });
  return Object.values(result);
};
