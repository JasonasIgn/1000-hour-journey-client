import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrls } from "config";
import { UserAchievementProgress } from "./types";

export const fetchMyAchievementsEffect = createAsyncThunk(
  "ahievements/fetchMyAchievements",
  async () => {
    try {
      const response = await axios.get<UserAchievementProgress[]>(
        apiUrls.fetchMyAchievements,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (e) {
      console.log("error:", e);
      throw e;
    }
  }
);
