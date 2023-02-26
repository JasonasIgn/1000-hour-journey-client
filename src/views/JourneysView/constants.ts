import { Option } from "types";

export type SortOption = "progress" | "createdAt";

export type OrderOption = "asc" | "desc";

export const sortOptions: Option[] = [
  {
    label: "Progress",
    value: "progress",
  },
  {
    label: "Creation Date",
    value: "createdAt",
  },
];
