import { Log } from "store/features/journeys/types";
import format from "date-fns/format";
import { ChartLogData, DateQuery } from "views/DashboardView/types";

export const transformDataForChartMonthDays = (
  logs: Log[],
  query: DateQuery
): ChartLogData[] => {
  const monthDaysCount = new Date(query.year, query.month, 0).getDate();
  const result: { [index: string]: ChartLogData } = {};
  for (let i = 1; i <= monthDaysCount; i++) {
    const dateIndex = format(
      new Date(`${query.year}-${query.month}-${i}`),
      "yyyy-MM-dd"
    );
    result[dateIndex] = { name: dateIndex, hoursSpent: 0 };
  }
  logs.forEach((log) => {
    const formattedDateIndex = format(new Date(log.loggedOn), "yyyy-MM-dd");
    if (result[formattedDateIndex]) {
      result[formattedDateIndex].hoursSpent =
        Math.round(
          (result[formattedDateIndex].hoursSpent + log.hoursSpent) * 100
        ) / 100;
    }
  });
  return Object.values(result);
};

export const transformDataForChartMonthWeeks = (
  logs: Log[],
  query: DateQuery
): ChartLogData[] => {
  const monthDaysCount = new Date(query.year, query.month, 0).getDate();
  const monthWeeksCount = Math.ceil(monthDaysCount / 7);
  const result: { [index: string]: ChartLogData } = {};
  for (let i = 1; i <= monthWeeksCount; i++) {
    const dateIndex = `Week ${i}`;
    result[dateIndex] = { name: dateIndex, hoursSpent: 0 };
  }
  logs.forEach((log) => {
    const logWeekNumber = Math.ceil(new Date(log.loggedOn).getDate() / 7);
    result[`Week ${logWeekNumber}`].hoursSpent += log.hoursSpent;
  });
  return Object.values(result).map((week) => ({
    ...week,
    hoursSpent: Math.round(week.hoursSpent * 100) / 100,
  }));
};

export const transformDataForChartYearMonths = (
  logs: Log[],
  query: DateQuery
): ChartLogData[] => {
  const monthsCount = 12;
  const result: { [index: string]: ChartLogData } = {};
  for (let i = 1; i <= monthsCount; i++) {
    const dateIndex = `Month ${i}`;
    result[dateIndex] = { name: dateIndex, hoursSpent: 0 };
  }
  logs.forEach((log) => {
    const monthNumber = new Date(log.loggedOn).getMonth() + 1;
    result[`Month ${monthNumber}`].hoursSpent += log.hoursSpent;
  });
  return Object.values(result).map((month) => ({
    ...month,
    hoursSpent: Math.round(month.hoursSpent * 100) / 100,
  }));
};
