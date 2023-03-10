import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { JourneyAchievementFormData } from "components/JourneyAchievementsDialogs/types";
import { JourneyActivityFormData } from "components/JourneyActivityDialogs/types";
import { JourneyFormData } from "components/JourneyDialogs/types";
import format from "date-fns/format";
import { JourneyLogFormData } from "components/JourneyLogDialogs/types";
import { apiUrls } from "config";
import {
  Achievement,
  Journey,
  Log,
  Activity,
  UpdateJourneyEffectData,
} from "./types";
import { getActivityIdsArray } from "./utils";
import { dateFormats } from "utils/constants";

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
      throw e;
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
    const { media, activities, ...rest } = data;
    try {
      const response = await axios.post<Log>(
        apiUrls.createLog.replace("{journeyId}", journeyId.toString()),
        {
          ...rest,
          media: media?.[0],
          loggedOn: format(new Date(rest.loggedOn), dateFormats.standart),
          activities: getActivityIdsArray(activities),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

export const logJourneyAchievementEffect = createAsyncThunk(
  "journeys/logAchievement",
  async ({
    data,
    journeyId,
  }: {
    data: JourneyAchievementFormData;
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
      throw e;
    }
  }
);

export const editJourneyAchievementEffect = createAsyncThunk(
  "journeys/editAchievement",
  async ({
    data,
    journeyId,
    achievementId,
  }: {
    data: JourneyAchievementFormData;
    journeyId: number;
    achievementId: number;
  }) => {
    const { media, ...rest } = data;
    try {
      const response = await axios.patch<Achievement>(
        apiUrls.editAchievement
          .replace("{journeyId}", journeyId.toString())
          .replace("{achievementId}", achievementId.toString()),
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
      throw e;
    }
  }
);

export const deleteJourneyAchievementEffect = createAsyncThunk(
  "journeys/deleteAchievement",
  async ({
    journeyId,
    achievementId,
  }: {
    journeyId: number;
    achievementId: number;
  }) => {
    try {
      const response = await axios.delete<Achievement>(
        apiUrls.deleteAchievement
          .replace("{journeyId}", journeyId.toString())
          .replace("{achievementId}", achievementId.toString()),
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (e) {
      throw e;
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
    const { media, activities, ...rest } = data;
    try {
      const response = await axios.patch<Log>(
        apiUrls.updateLog
          .replace("{journeyId}", journeyId.toString())
          .replace("{logId}", logId.toString()),
        {
          ...rest,
          media: media?.[0],
          activities: getActivityIdsArray(activities),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

export const updateJourneyEffect = createAsyncThunk(
  "journeys/updateJourney",
  async ({
    data,
    journeyId,
  }: {
    data: UpdateJourneyEffectData;
    journeyId: number;
  }) => {
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
      throw e;
    }
  }
);

export const createJourneyActivityEffect = createAsyncThunk(
  "journeys/createJourneyActivity",
  async ({
    data,
    journeyId,
  }: {
    data: JourneyActivityFormData;
    journeyId: number;
  }) => {
    const { media, ...rest } = data;
    try {
      const response = await axios.post<Activity>(
        apiUrls.createActivity.replace("{journeyId}", journeyId.toString()),
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
      const response = await axios.patch<Activity>(
        apiUrls.updateActivity
          .replace("{journeyId}", journeyId.toString())
          .replace("{activityId}", activityId.toString()),
        {
          ...rest,
          ...(rest.includeInDailyGoal
            ? { includeInDailyGoal: Number(rest.includeInDailyGoal) }
            : {}),
          ...(rest.completed ? { completed: Number(rest.completed) } : {}),
          media: media?.[0],
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (e) {
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
      const response = await axios.delete<Activity>(
        apiUrls.updateActivity
          .replace("{journeyId}", journeyId.toString())
          .replace("{activityId}", activityId.toString()),
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

export const deleteJourneyLogEffect = createAsyncThunk(
  "journeys/deleteJourneyLog",
  async ({ journeyId, logId }: { journeyId: number; logId: number }) => {
    try {
      const response = await axios.delete<Activity>(
        apiUrls.deleteLog
          .replace("{journeyId}", journeyId.toString())
          .replace("{logId}", logId.toString()),
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);
