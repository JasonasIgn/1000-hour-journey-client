import { Activity, Log } from "store/features/journeys/types";

interface DataType {
  [activityName: string]: {
    name: string;
    value: number;
  };
}

export const getPieChartData = (
  logs: Log[],
  activitiesDictionary: Record<number, Activity>
) => {
  const data: DataType = {};
  logs.forEach((log) => {
    if (log.activities.length === 0) {
      if (data["Unknown"] === undefined) {
        data["Unknown"] = {
          name: "Unknown",
          value: Math.round(log.hoursSpent * 100) / 100,
        };
      } else {
        data["Unknown"].value =
          Math.round((data["Unknown"].value + log.hoursSpent) * 100) / 100;
      }
      return;
    }
    const timePerActivity = log.hoursSpent / log.activities.length;
    log.activities.forEach((idObject) => {
      const activity = activitiesDictionary[idObject.id];
      if (data[activity.name] !== undefined) {
        data[activity.name].value =
          Math.round((data[activity.name].value + timePerActivity) * 100) / 100;
        return;
      }
      data[activity.name] = {
        name: activity.name,
        value: Math.round(timePerActivity * 100) / 100,
      };
    });
  });

  return Object.values(data).sort((data1, data2) =>
    data1.value >= data2.value ? -1 : 1
  );
};
