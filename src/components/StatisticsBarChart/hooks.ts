import axios from "axios";
import { apiUrls } from "config";
import { useCallback, useEffect, useState } from "react";
import { Log } from "store/features/journeys/types";
import { ChartLogData, LogsQuery } from "views/DashboardView/types";
import { transformDataForChartMonthDays } from "./utils";

export const useLogsChartData = () => {
  const [query, setQuery] = useState<LogsQuery>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const [chartData, setChartData] = useState<ChartLogData[]>();
  const fetchLogs = useCallback(async () => {
    try {
      const response = await axios.get<Log[]>(apiUrls.getLogs, {
        params: query,
      });
      if (query.month) {
        setChartData(
          transformDataForChartMonthDays(response.data, query.month)
        );
      }
    } catch (e) {
      console.log("error:", e);
    }
  }, [query]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return chartData;
};
