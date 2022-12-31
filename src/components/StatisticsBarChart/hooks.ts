import axios from "axios";
import { apiUrls } from "config";
import { useCallback, useEffect, useState } from "react";
import { Log } from "store/features/journeys/types";
import { ChartLogData, DateQuery } from "views/DashboardLogsView/types";
import { StatisticsDisplayUnit } from "./types";
import {
  transformDataForChartMonthDays,
  transformDataForChartMonthWeeks,
  transformDataForChartYearMonths,
} from "./utils";

interface UseLogsChartDataProps {
  displayUnit: StatisticsDisplayUnit;
  query: DateQuery;
}

export const useLogsChartData = (props: UseLogsChartDataProps) => {
  const { displayUnit, query } = props;

  const [chartData, setChartData] = useState<ChartLogData[]>();
  const [rawData, setRawData] = useState<Log[]>();

  const fetchLogs = useCallback(async () => {
    try {
      const response = await axios.get<Log[]>(apiUrls.getLogs, {
        params: {
          ...query,
          month: displayUnit !== "month" ? query.month : undefined,
        },
        withCredentials: true,
      });
      setRawData(response.data);
    } catch (e) {
      console.log("error:", e);
    }
  }, [displayUnit, query]);

  useEffect(() => {
    if (rawData) {
      if (displayUnit === "day") {
        setChartData(transformDataForChartMonthDays(rawData, query));
      }
      if (displayUnit === "week") {
        setChartData(transformDataForChartMonthWeeks(rawData, query));
      }
      if (displayUnit === "month") {
        setChartData(transformDataForChartYearMonths(rawData, query));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayUnit, rawData]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return chartData;
};
