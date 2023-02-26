import { useState, SetStateAction, Dispatch } from "react";
import { JourneyListItem } from "store/features/journeys/types";
import { OrderOption, SortOption } from "./constants";

interface JourneysListParams {
  sortBy: SortOption;
  orderBy: OrderOption;
}

export const useListSorting = (
  journeys?: JourneyListItem[]
): [
  JourneyListItem[],
  JourneysListParams,
  Dispatch<SetStateAction<JourneysListParams>>
] => {
  const [params, setParams] = useState<JourneysListParams>({
    sortBy: "progress",
    orderBy: "desc",
  });
  let sortedList: JourneyListItem[] = [];

  if (journeys && params.sortBy === "progress") {
    sortedList = [...journeys].sort((j1, j2) => {
      if (params.orderBy === "asc") {
        return j1.totalHours > j2.totalHours ? 1 : -1;
      }
      return j1.totalHours < j2.totalHours ? 1 : -1;
    });
  }

  if (journeys && params.sortBy === "createdAt") {
    sortedList = [...journeys].sort((j1, j2) => {
      if (params.orderBy === "asc") {
        return j1.createdAt > j2.createdAt ? 1 : -1;
      }
      return j1.createdAt < j2.createdAt ? 1 : -1;
    });
  }

  return [sortedList, params, setParams];
};
