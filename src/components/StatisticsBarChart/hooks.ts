import axios from "axios";
import { apiUrls } from "config";
import {
  useCallback,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Log } from "store/features/journeys/types";
import { ChartLogData, DateQuery } from "views/StatisticsView/types";
import { StatisticsDisplayUnit } from "./types";
import { getTransformedData } from "./utils";

interface UseLogsChartDataProps {
  displayUnit: StatisticsDisplayUnit;
}

interface UseLogsChartDataType {
  data: ChartLogData[] | undefined;
  loading: boolean;
  query: DateQuery;
  monthsEnabled: boolean;
  setQuery: Dispatch<SetStateAction<DateQuery>>;
  setMonthsEnabled: Dispatch<SetStateAction<boolean>>;
}

export const useLogsChartData = (
  props: UseLogsChartDataProps
): UseLogsChartDataType => {
  const [query, setQuery] = useState<DateQuery>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const [monthsEnabled, setMonthsEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { displayUnit } = props;

  const [chartData, setChartData] = useState<ChartLogData[]>();

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<Log[]>(apiUrls.getLogs, {
        params: {
          ...query,
          month:
            displayUnit !== "month" && monthsEnabled ? query.month : undefined,
        },
        withCredentials: true,
      });
      setChartData(
        getTransformedData(response.data, query, monthsEnabled, displayUnit)
      );
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("error:", e);
    }
  }, [displayUnit, monthsEnabled, query]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    data: chartData,
    loading,
    query,
    setQuery,
    setMonthsEnabled,
    monthsEnabled,
  };
};
