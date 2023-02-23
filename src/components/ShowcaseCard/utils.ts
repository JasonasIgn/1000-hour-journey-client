import { Achievement, LogExtended } from "store/features/journeys/types";
import { getImageSrc } from "utils/helpers";

export const getInitialImageSrc = (
  item?: LogExtended | Achievement,
  defaultJourneyImageSrc?: string
) => {
  if (item?.mediaUrl) {
    return `${getImageSrc(item.mediaUrl)}?${item.updatedAt.toString()}`;
  }

  if ((item as LogExtended)?.activities?.length > 0) {
    if ((item as LogExtended).activities[0].mediaUrl) {
      return `${getImageSrc((item as LogExtended).activities[0].mediaUrl)}?${(
        item as LogExtended
      ).activities[0].updatedAt.toString()}`;
    }
  }

  return getImageSrc(defaultJourneyImageSrc);
};
