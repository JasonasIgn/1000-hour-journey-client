import { Log } from "store/features/journeys/types";

interface DataType {
  [tagName: string]: {
    name: string;
    value: number;
  };
}

export const getPieChartData = (logs: Log[]) => {
  const data: DataType = {};
  logs.forEach((log) => {
    if (log.tags.length === 0) {
      return;
    }
    const timePerTag = log.hoursSpent / log.tags.length;
    log.tags.forEach((tag) => {
      if (data[tag.name] !== undefined) {
        data[tag.name].value =
          Math.round((data[tag.name].value + timePerTag) * 100) / 100;
        return;
      }
      data[tag.name] = {
        name: tag.name,
        value: Math.round(timePerTag * 100) / 100,
      };
    });
  });

  return Object.values(data).sort((data1, data2) =>
    data1.value >= data2.value ? -1 : 1
  );
};
