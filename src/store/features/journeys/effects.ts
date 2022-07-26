import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJourneysList = createAsyncThunk(
  "journeys/fetchList",
  async (amount: number) => {
    return [];
  }
);
