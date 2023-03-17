import {
  Achievement,
  Activity,
  LogExtended,
} from "store/features/journeys/types";
import Logo from "resources/logo.png";
import { getImageSrc } from "utils/helpers";

export const getInitialImageSrc = (
  activitiesDictionary: Record<number, Activity>,
  item?: LogExtended | Achievement,
  defaultJourneyImageSrc?: string
) => {
  if (item?.mediaUrl) {
    return `${getImageSrc(item.mediaUrl)}?${item.updatedAt.toString()}`;
  }

  if ((item as LogExtended)?.activities?.length > 0) {
    const logActivity =
      activitiesDictionary[(item as LogExtended).activities[0].id];
    if (logActivity.mediaUrl) {
      return `${getImageSrc(
        logActivity.mediaUrl
      )}?${logActivity.updatedAt.toString()}`;
    }
  }

  if (!defaultJourneyImageSrc)
  {
    return Logo
  }

  return getImageSrc(defaultJourneyImageSrc);
};
