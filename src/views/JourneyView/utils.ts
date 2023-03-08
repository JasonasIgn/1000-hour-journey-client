import { Achievement, Log } from "store/features/journeys/types";
import { LogsDictionary, IdsHourMap, AchievementsDictionary } from "./types";

export const getLogHoursMap = (logs: Log[]): IdsHourMap => {
  const hoursMap: IdsHourMap = {};
  let currentHour = 0;
  logs.forEach((log) => {
    for (let i = 0; i < log.hoursSpent * 10; i++) {
      hoursMap[Math.round(currentHour * 10) / 10] = log.id;
      currentHour += 0.1;
    }
  });
  return hoursMap;
};

export const getLogBeginningsDictionary = (logs: Log[]): IdsHourMap => {
  const dictionary: IdsHourMap = {};
  let hour = 0;
  logs.forEach((log) => {
    dictionary[log.id] = hour;
    hour += log.hoursSpent;
  });
  return dictionary;
};

export const getLogsDictionary = (logs: Log[]): LogsDictionary => {
  const logsDictionary: LogsDictionary = {};
  logs.forEach((log, index) => {
    logsDictionary[log.id] = { ...log, number: index + 1 };
  });
  return logsDictionary;
};

export const getAchievementHoursMap = (
  achievements: Achievement[]
): IdsHourMap => {
  const idsHoursMap: IdsHourMap = {};
  achievements.forEach((achievement) => {
    idsHoursMap[achievement.loggedAtHour] = achievement.id;
  });
  return idsHoursMap;
};

export const getAchievementsDictionary = (
  achievements: Achievement[]
): AchievementsDictionary => {
  const achievementsDictionary: AchievementsDictionary = {};
  achievements.forEach((achievement, index) => {
    achievementsDictionary[achievement.id] = achievement;
  });
  return achievementsDictionary;
};

export interface ActivityHoursMap {
  [activityId: string]: number;
}

export const getActivityHoursMap = (logs: Log[]) => {
  const data: ActivityHoursMap = {};
  logs.forEach((log) => {
    if (log.activities.length === 0) {
      return;
    }
    const timePerActivity = log.hoursSpent / log.activities.length;
    log.activities.forEach((activity) => {
      const activityId = activity.id.toString();
      if (data[activityId] !== undefined) {
        data[activityId] =
          Math.round((data[activityId] + timePerActivity) * 100) / 100;
        return;
      }
      data[activityId] = Math.round(timePerActivity * 100) / 100;
    });
  });
  return data;
};
