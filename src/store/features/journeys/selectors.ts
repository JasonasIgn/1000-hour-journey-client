import { RootState } from "../../store";

export const getJourneysList = (state: RootState) => state.journeys.list;
