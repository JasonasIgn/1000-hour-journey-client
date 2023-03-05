import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrls } from "config";
import { DailyGoal } from "./types";

export const fetchDailyGoalEffect = createAsyncThunk(
  "dailyGoal/fetch",
  async () => {
    try {
      const response = await axios.get<DailyGoal>(apiUrls.fetchDailyGoal, {
        withCredentials: true,
      });
      return response.data;
    } catch (e) {
      console.log("error:", e);
    }
  }
);
