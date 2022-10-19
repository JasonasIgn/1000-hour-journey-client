import { Tag } from "store/features/journeys/types";
import { Option } from "types";

export const getTagOption = (tag: Tag): Option => ({
  value: tag.id,
  label: tag.name,
});

export const getTagOptions = (tags: Tag[]): Option[] => tags.map(getTagOption);
