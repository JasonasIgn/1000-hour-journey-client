import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddJourneyAchievementFormData } from "components/AddJourneyAchivementDialog/types";
import { JourneyActivityFormData } from "components/JourneyActivityDialogs/types";
import { JourneyFormData } from "components/JourneyDialogs/types";
import { JourneyLogFormData } from "components/JourneyLogDialogs/types";
import { apiUrls } from "config";
import { Achievement, Journey, Log, Tag } from "./types";
import { getTagIdsArray } from "./utils";

export const fetchJourneysListEffect = createAsyncThunk(
  "journeys/fetchList",
  async () => {
    try {
      const response = await axios.get(apiUrls.fetchJourneysList, {
        withCredentials: true,
      });
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
          withCredentials: true,
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
        apiUrls.fetchJourney.replace("{journeyId}", journeyId.toString()),
        { withCredentials: true }
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
    const { media, tags, ...rest } = data;
    try {
      const response = await axios.post<Log>(
        apiUrls.createLog.replace("{journeyId}", journeyId.toString()),
        { ...rest, media: media?.[0], tags: getTagIdsArray(tags) },
        {
          withCredentials: true,
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
          withCredentials: true,
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
    const { media, tags, ...rest } = data;
    try {
      const response = await axios.patch<Log>(
        apiUrls.updateLog
          .replace("{journeyId}", journeyId.toString())
          .replace("{logId}", logId.toString()),
        { ...rest, media: media?.[0], tags: getTagIdsArray(tags) },
        {
          withCredentials: true,
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

export const updateJourneyEffect = createAsyncThunk(
  "journeys/updateJourney",
  async ({ data, journeyId }: { data: JourneyFormData; journeyId: number }) => {
    const { media, ...rest } = data;
    try {
      const response = await axios.patch<Journey>(
        apiUrls.updateJourney.replace("{journeyId}", journeyId.toString()),
        { ...rest, media: media?.[0] },
        {
          withCredentials: true,
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

export const createJourneyTagEffect = createAsyncThunk(
  "journeys/createJourneyTag",
  async ({
    data,
    journeyId,
  }: {
    data: JourneyActivityFormData;
    journeyId: number;
  }) => {
    const { media, ...rest } = data;
    try {
      const response = await axios.post<Tag>(
        apiUrls.createTag.replace("{journeyId}", journeyId.toString()),
        { ...rest, media: media?.[0] },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (e) {
      console.log("error:", e);
      throw e;
    }
  }
);

export const updateJourneyActivityEffect = createAsyncThunk(
  "journeys/updateJourneyActivity",
  async ({
    data,
    journeyId,
    activityId,
  }: {
    data: JourneyActivityFormData;
    journeyId: number;
    activityId: number;
  }) => {
    const { media, ...rest } = data;
    try {
      const response = await axios.patch<Tag>(
        apiUrls.updateActivity
          .replace("{journeyId}", journeyId.toString())
          .replace("{activityId}", activityId.toString()),
        { ...rest, media: media?.[0] },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (e) {
      console.log("error:", e);
      throw e;
    }
  }
);

export const deleteJourneyActivityEffect = createAsyncThunk(
  "journeys/deleteJourneyActivity",
  async ({
    journeyId,
    activityId,
  }: {
    journeyId: number;
    activityId: number;
  }) => {
    try {
      const response = await axios.delete<Tag>(
        apiUrls.updateActivity
          .replace("{journeyId}", journeyId.toString())
          .replace("{activityId}", activityId.toString()),
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
