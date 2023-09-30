import { Log } from "store/features/journeys/types";
import format from "date-fns/format";
import { ChartLogData, DateQuery } from "views/StatisticsView/types";
import { StatisticsDisplayUnit } from "./types";

export const getTransformedData = (
  data: Log[],
  query: DateQuery,
  monthsEnabled: boolean,
  displayUnit: StatisticsDisplayUnit
): ChartLogData[] => {
  if (displayUnit === "month") {
    return transformDataForChartYearMonths(data);
  }
  if (monthsEnabled) {
    if (displayUnit === "day") {
      return transformDataForChartMonthDays(data, query);
    }
    if (displayUnit === "week") {
      return transformDataForChartMonthWeeks(data, query);
    }
  }

  if (!monthsEnabled) {
    if (displayUnit === "day") {
      return transformDataForChartYearDays(data);
    }
    if (displayUnit === "week") {
      return transformDataForChartYearWeeks(data);
    }
  }

  return [];
};

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

function getDaysIntoYear(date: Date) {
  return (
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000
  );
}

export const transformDataForChartYearDays = (logs: Log[]): ChartLogData[] => {
  const DAYS_IN_YEAR = 365;
  const result: { [index: number]: ChartLogData } = {};
  for (let i = 1; i <= DAYS_IN_YEAR; i++) {
    result[i] = { name: i.toString(), hoursSpent: 0 };
  }

  logs.forEach((log) => {
    const dayIntoYear = getDaysIntoYear(new Date(log.loggedOn));
    if (result[dayIntoYear]) {
      result[dayIntoYear].hoursSpent =
        Math.round((result[dayIntoYear].hoursSpent + log.hoursSpent) * 100) /
        100;
    }
  });
  return Object.values(result);
};

export const transformDataForChartYearWeeks = (logs: Log[]): ChartLogData[] => {
  const WEEKS_IN_YEAR = 53;
  const result: { [index: number]: ChartLogData } = {};
  for (let i = 1; i <= WEEKS_IN_YEAR; i++) {
    result[i] = { name: i.toString(), hoursSpent: 0 };
  }

  logs.forEach((log) => {
    const dayIntoYear = getDaysIntoYear(new Date(log.loggedOn));
    const weekOfTheYear = Math.ceil(dayIntoYear / 7);
    if (result[weekOfTheYear]) {
      result[weekOfTheYear].hoursSpent =
        Math.round((result[weekOfTheYear].hoursSpent + log.hoursSpent) * 100) /
        100;
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
  logs: Log[]
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
