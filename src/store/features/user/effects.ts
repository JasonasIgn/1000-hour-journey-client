import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrls } from "config";
import { FetchPointsResponse } from "./types";

export const fetchPointsEffect = createAsyncThunk("user/fetchPoints", async () => {
  try {
    const response = await axios.get<FetchPointsResponse>(apiUrls.fetchPoints, {
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    console.log("error:", e);
    throw e;
  }
});
