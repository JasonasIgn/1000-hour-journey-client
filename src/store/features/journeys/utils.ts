import { Option } from "types";

export const getTagIdsArray = (tags: Option[]) => tags.map((tag) => tag.value);
