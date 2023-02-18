import { Achievement, LogExtended } from "store/features/journeys/types";
import { getImageSrc } from "utils/helpers";

export const getInitialImageSrc = (
  item?: LogExtended | Achievement,
  defaultJourneyImageSrc?: string
) => {
  if ((item as LogExtended)?.tags?.length > 0) {
    if ((item as LogExtended).tags[0].mediaUrl) {
      return `${getImageSrc((item as LogExtended).tags[0].mediaUrl)}?${(
        item as LogExtended
      ).tags[0].updatedAt.toString()}`;
    }
  }

  if (item?.mediaUrl) {
    return `${getImageSrc(item.mediaUrl)}?${item.updatedAt.toString()}`;
  }

  return getImageSrc(defaultJourneyImageSrc);
};
