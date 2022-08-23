import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddJourneyAchievementFormData } from "components/AddJourneyAchivementDialog/types";
import { JourneyFormData } from "components/JourneyDialogs/types";
import { JourneyLogFormData } from "components/JourneyLogDialogs/types";
import { apiUrls } from "config";
import { Achievement, Log } from "./types";

export const fetchJourneysListEffect = createAsyncThunk(
  "journeys/fetchList",
  async () => {
    try {
      const response = await axios.get(apiUrls.fetchJourneysList);
      return response.data;
    } catch (e) {
      console.log("error:", e);
    }
  }
);

export const createJourneyEffect = createAsyncThunk(
  "journeys/create",
  async (data: JourneyFormData) => {
    const { media, ...rest } = data;
    try {
      const response = await axios.post(
        apiUrls.createJourney,
        { ...rest, media: media?.[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (e) {
      console.log("error:", e);
    }
  }
);

export const fetchJourneyEffect = createAsyncThunk(
  "journeys/fetchJourney",
  async (data: { journeyId: number | string }) => {
    const { journeyId } = data;
    try {
      const response = await axios.get(
        apiUrls.fetchJourney.replace("{journeyId}", journeyId.toString())
      );
      return response.data;
    } catch (e) {
      console.log("error:", e);
    }
  }
);

export const createJourneyLogEffect = createAsyncThunk(
  "journeys/createLog",
  async ({
    data,
    journeyId,
  }: {
    data: JourneyLogFormData;
    journeyId: number;
  }) => {
    const { media, ...rest } = data;
    try {
      const response = await axios.post<Log>(
        apiUrls.createLog.replace("{journeyId}", journeyId.toString()),
        { ...rest, media: media?.[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (e) {
      console.log("error:", e);
    }
  }
);

export const logJourneyAchievementEffect = createAsyncThunk(
  "journeys/logAchievement",
  async ({
    data,
    journeyId,
  }: {
    data: AddJourneyAchievementFormData;
    journeyId: number;
  }) => {
    const { media, ...rest } = data;
    try {
      const response = await axios.post<Achievement>(
        apiUrls.logAchievement.replace("{journeyId}", journeyId.toString()),
        { ...rest, media: media[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (e) {
      console.log("error:", e);
    }
  }
);

export const updateJourneyLogEffect = createAsyncThunk(
  "journeys/updateLog",
  async ({
    data,
    journeyId,
    logId,
  }: {
    data: JourneyLogFormData;
    journeyId: number;
    logId: number;
  }) => {
    const { media, ...rest } = data;
    try {
      const response = await axios.patch<Log>(
        apiUrls.updateLog
          .replace("{journeyId}", journeyId.toString())
          .replace("{logId}", logId.toString()),
        { ...rest, media: media?.[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (e) {
      console.log("error:", e);
    }
  }
);
