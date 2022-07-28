import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddJourneyFormData } from "../../../components/AddJourneyDialog/types";
import { apiUrls } from "../../../config";

export const fetchJourneysList = createAsyncThunk(
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
      console.log(response);
    } catch (e) {
      console.log("error:", e);
    }
  }
);
