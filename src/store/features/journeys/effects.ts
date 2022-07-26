import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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
