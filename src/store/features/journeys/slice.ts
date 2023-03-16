import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "types";
import {
  createJourneyEffect,
  createJourneyLogEffect,
  createJourneyActivityEffect,
  deleteJourneyActivityEffect,
  fetchJourneyEffect,
  fetchJourneysListEffect,
  logJourneyAchievementEffect,
  updateJourneyActivityEffect,
  updateJourneyEffect,
  updateJourneyLogEffect,
  editJourneyAchievementEffect,
  deleteJourneyAchievementEffect,
  deleteJourneyLogEffect,
} from "./effects";
import { Journey, JourneyListItem } from "./types";

export interface JourneysState {
  list: JourneyListItem[];
  listLoadingState: LoadingState;
  journey?: Journey;
}

const initialState: JourneysState = {
  list: [],
  listLoadingState: "pristine",
};

export const journeysSlice = createSlice({
  name: "journeys",
  initialState,
  reducers: {
    resetJourney: (state) => {
      state.journey = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJourneysListEffect.pending, (state) => {
        state.listLoadingState = "loading";
      })
      .addCase(fetchJourneysListEffect.fulfilled, (state, action) => {
        state.listLoadingState = "loaded";
        state.list = action.payload;
      })
      .addCase(fetchJourneysListEffect.rejected, (state) => {
        state.listLoadingState = "error";
      })
      .addCase(createJourneyEffect.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(fetchJourneyEffect.fulfilled, (state, action) => {
        state.journey = action.payload;
      })
      .addCase(createJourneyLogEffect.fulfilled, (state, action) => {
        if (state.journey && action.payload) {
          const listItemIndex = state.list.findIndex(
            (journey) => journey.id === action.payload?.journeyId
          );
          if (listItemIndex >= 0) {
            const listJourney = state.list[listItemIndex];
            listJourney.totalHours =
              Math.round(
                (action.payload.hoursSpent + listJourney.totalHours) * 10
              ) / 10;
          }

          state.journey.logs.push(action.payload);
          state.journey.totalHours =
            Math.round(
              (action.payload.hoursSpent + state.journey.totalHours) * 10
            ) / 10;
        }
      })
      .addCase(logJourneyAchievementEffect.fulfilled, (state, action) => {
        if (state.journey && action.payload) {
          state.journey.achievements.push(action.payload);
        }
      })
      .addCase(editJourneyAchievementEffect.fulfilled, (state, { payload }) => {
        if (state.journey && payload) {
          const updatedActivityIndex = state.journey.achievements.findIndex(
            (achievement) => achievement.id === payload?.id
          );
          state.journey.achievements[updatedActivityIndex] = payload;
        }
      })
      .addCase(
        deleteJourneyAchievementEffect.fulfilled,
        (state, { meta: { arg } }) => {
          const { achievementId } = arg;
          if (state.journey) {
            state.journey.achievements = state.journey.achievements.filter(
              (achievement) => achievement.id !== achievementId
            );
          }
        }
      )
      .addCase(updateJourneyLogEffect.fulfilled, (state, action) => {
        const updatedHoursSpent = action.meta.arg.data?.hoursSpent;
        if (state.journey && action.payload) {
          const updatedLogIndex = state.journey.logs.findIndex(
            (log) => log.id === action.payload?.id
          );
          const originalHoursSpent =
            state.journey.logs[updatedLogIndex].hoursSpent;
          if (originalHoursSpent && updatedHoursSpent) {
            state.journey.totalHours =
              Math.round(
                (state.journey.totalHours +
                  (updatedHoursSpent - originalHoursSpent)) *
                  10
              ) / 10;
          }
          state.journey.logs[updatedLogIndex] = action.payload;
        }
      })
      .addCase(updateJourneyEffect.fulfilled, (state, action) => {
        if (state.list.length > 0 && action.payload) {
          const updatedLogIndex = state.list.findIndex(
            (journey) => journey.id === action.payload?.id
          );
          state.list[updatedLogIndex] = action.payload;
        }
        if (state.journey?.id === action.meta.arg.journeyId) {
          state.journey = { ...state.journey, ...action.payload };
        }
      })
      .addCase(createJourneyActivityEffect.fulfilled, (state, { payload }) => {
        if (state.journey && payload) {
          state.journey.activities.push(payload);
        }
      })
      .addCase(updateJourneyActivityEffect.fulfilled, (state, { payload }) => {
        if (state.journey && payload) {
          const updatedActivityIndex = state.journey.activities.findIndex(
            (activity) => activity.id === payload?.id
          );
          state.journey.activities[updatedActivityIndex] = payload;
        }
      })
      .addCase(
        deleteJourneyActivityEffect.fulfilled,
        (state, { meta: { arg } }) => {
          const { activityId } = arg;
          if (state.journey) {
            state.journey.activities = state.journey.activities.filter(
              (activity) => activity.id !== activityId
            );
            state.journey.logs = state.journey.logs.map((log) => {
              return {
                ...log,
                activities: log.activities.filter(
                  (activity) => activity.id !== activityId
                ),
              };
            });
          }
        }
      )
      .addCase(deleteJourneyLogEffect.fulfilled, (state, { meta: { arg } }) => {
        const { logId } = arg;
        if (state.journey) {
          const deletedLog = state.journey.logs.find((log) => log.id === logId);
          state.journey.logs = state.journey.logs.filter(
            (log) => log.id !== logId
          );
          if (deletedLog) {
            state.journey.totalHours =
              Math.round(
                (state.journey.totalHours - deletedLog.hoursSpent) * 10
              ) / 10;
          }
        }
      });
  },
});

export const { resetJourney } = journeysSlice.actions;

export default journeysSlice.reducer;
