import { Option } from "types";

export const getActivityIdsArray = (activities: Option[]) =>
  activities.map((activity) => activity.value);
