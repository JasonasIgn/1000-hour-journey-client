import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddJourneyFormData } from "../../../components/AddJourneyDialog/types";
import { apiUrls } from "../../../config";

export const fetchJourneysListEffect = createAsyncThunk(
  "journeys/fetchList",
  async () => {
    try {
      const response = await axios.get(apiUrls.fetchJourneysList);
      return response.data;
    } catch (e) {
      console.log("error:", e);
    }
  }
);

export const createJourneyEffect = createAsyncThunk(
  "journeys/create",
  async (data: AddJourneyFormData) => {
    try {
      const response = await axios.post(apiUrls.fetchJourneysList, data);
      return response.data;
    } catch (e) {
      console.log("error:", e);
    }
  }
);

export const fetchJourneyEffect = createAsyncThunk(
  "journeys/fetchJourney",
  async (data: { id: number | string }) => {
    const { id } = data;
    try {
      const response = await axios.get(
        apiUrls.fetchJourney.replace("{id}", id.toString())
      );
      return response.data;
    } catch (e) {
      console.log("error:", e);
    }
  }
);
