import { RootState } from "../../store";

export const getJourneysList = (state: RootState) => state.journeys.list;

export const getJourneysListLoadingState = (state: RootState) =>
  state.journeys.listLoadingState;

export const getJourney = (state: RootState) => state.journeys.journey;
