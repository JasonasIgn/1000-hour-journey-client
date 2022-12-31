import axios from "axios";
import { apiUrls } from "config";
import { useCallback, useEffect, useState } from "react";
import { Achievement } from "store/features/journeys/types";
import { AchievementsDateQuery } from "./types";

export const useFetchAchievements = (query: AchievementsDateQuery) => {
  const [achievements, setAchievements] = useState<Achievement[]>();

  const fetchAchievements = useCallback(async () => {
    try {
      const response = await axios.get<Achievement[]>(apiUrls.fetchAchievements, {
        params: query,
        withCredentials: true,
      });
      setAchievements(response.data);
    } catch (e) {
      console.log("error:", e);
    }
  }, [query]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  return achievements;
};
