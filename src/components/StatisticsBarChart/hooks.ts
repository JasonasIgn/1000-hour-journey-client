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

export const useLogsChartData = (
  props: UseLogsChartDataProps
): [ChartLogData[] | undefined, boolean] => {
  const [loading, setLoading] = useState(false);
  const { displayUnit, query } = props;

  const [chartData, setChartData] = useState<ChartLogData[]>();

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<Log[]>(apiUrls.getLogs, {
        params: {
          ...query,
          month: displayUnit !== "month" ? query.month : undefined,
        },
        withCredentials: true,
      });
      if (displayUnit === "day") {
        setChartData(transformDataForChartMonthDays(response.data, query));
      }
      if (displayUnit === "week") {
        setChartData(transformDataForChartMonthWeeks(response.data, query));
      }
      if (displayUnit === "month") {
        setChartData(transformDataForChartYearMonths(response.data, query));
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("error:", e);
    }
  }, [displayUnit, query]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return [chartData, loading];
};
