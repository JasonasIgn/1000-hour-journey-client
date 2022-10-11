import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrls } from "config";
import { FetchIsLoggedInResponse } from "./types";

export const fetchIsLoggedIn = createAsyncThunk("auth/isLoggedIn", async () => {
  try {
    const response = await axios.get<FetchIsLoggedInResponse>(
      apiUrls.isLoggedIn
    );
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log("error:", e);
    throw e;
  }
});
