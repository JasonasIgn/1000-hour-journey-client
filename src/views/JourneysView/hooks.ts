import { useState, SetStateAction, Dispatch } from "react";
import { JourneyListItem } from "store/features/journeys/types";
import { OrderOption, ShowOption, SortOption } from "./types";

interface JourneysListParams {
  sortBy: SortOption;
  orderBy: OrderOption;
  show: ShowOption;
}

export const useListSorting = (
  journeys: JourneyListItem[] = []
): [
  JourneyListItem[],
  JourneysListParams,
  Dispatch<SetStateAction<JourneysListParams>>
] => {
  const [params, setParams] = useState<JourneysListParams>({
    sortBy: "progress",
    orderBy: "desc",
    show: "unfinished",
  });
  let sortedList: JourneyListItem[] = [...journeys];

  if (journeys && params.sortBy === "progress") {
    sortedList = [...sortedList].sort((j1, j2) => {
      if (params.orderBy === "asc") {
        return j1.totalHours > j2.totalHours ? 1 : -1;
      }
      return j1.totalHours < j2.totalHours ? 1 : -1;
    });
  }

  if (journeys && params.sortBy === "createdAt") {
    sortedList = [...sortedList].sort((j1, j2) => {
      if (params.orderBy === "asc") {
        return j1.createdAt > j2.createdAt ? 1 : -1;
      }
      return j1.createdAt < j2.createdAt ? 1 : -1;
    });
  }

  if (journeys && params.show === "finished") {
    sortedList = [...sortedList].filter((j) => j.finished);
  }

  if (journeys && params.show === "unfinished") {
    sortedList = [...sortedList].filter((j) => !j.finished);
  }

  return [sortedList, params, setParams];
};
