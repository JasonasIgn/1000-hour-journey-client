import axios from "axios";
import { apiUrls } from "config";
import { useEffect, useState } from "react";
import { LogsStatistics } from "./types";

export const useStatistics = () => {
  const [statistics, setStatistics] = useState<LogsStatistics>();
  const fetchStatistics = async () => {
    try {
      const response = await axios.get<LogsStatistics>(apiUrls.logStatistics);
      setStatistics(response.data);
      return response.data;
    } catch (e) {
      console.log("error:", e);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return statistics;
};
