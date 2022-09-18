import axios from "axios";
import { apiUrls } from "config";
import { useCallback, useEffect, useState } from "react";
import { Log } from "store/features/journeys/types";
import { ChartLogData, DateQuery } from "views/DashboardView/types";
import { StatisticsDisplayUnit } from "./types";
import {
  transformDataForChartMonthDays,
  transformDataForChartMonthWeeks,
} from "./utils";

interface UseLogsChartDataProps {
  displayUnit: StatisticsDisplayUnit;
}

export const useLogsChartData = (props: UseLogsChartDataProps) => {
  const { displayUnit } = props;
  const [query, setQuery] = useState<DateQuery>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const [chartData, setChartData] = useState<ChartLogData[]>();
  const [rawData, setRawData] = useState<Log[]>();

  const fetchLogs = useCallback(async () => {
    try {
      const response = await axios.get<Log[]>(apiUrls.getLogs, {
        params: query,
      });
      setRawData(response.data);
    } catch (e) {
      console.log("error:", e);
    }
  }, [query]);

  useEffect(() => {
    if (rawData) {
      if (displayUnit === "day") {
        setChartData(transformDataForChartMonthDays(rawData, query));
      }
      if (displayUnit === "week") {
        setChartData(transformDataForChartMonthWeeks(rawData, query));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayUnit, rawData]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return chartData;
};
