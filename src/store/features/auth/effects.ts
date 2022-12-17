import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginFormData } from "components/LoginForm/types";
import { apiUrls } from "config";
import { FetchIsLoggedInResponse } from "./types";

export const fetchIsLoggedInEffect = createAsyncThunk(
  "auth/isLoggedIn",
  async () => {
    try {
      const response = await axios.get<FetchIsLoggedInResponse>(
        apiUrls.isLoggedIn,
        { withCredentials: true }
      );
      return response.data;
    } catch (e) {
      console.log("error:", e);
      throw e;
    }
  }
);

export const loginEffect = createAsyncThunk(
  "auth/login",
  async ({ data }: { data: LoginFormData }) => {
    try {
      await axios.post<FetchIsLoggedInResponse>(apiUrls.login, data, {
        withCredentials: true,
      });
      return true;
    } catch (e) {
      console.log("error:", e);
      throw e;
    }
  }
);

export const logoutEffect = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.post<FetchIsLoggedInResponse>(
      apiUrls.logout,
      {},
      {
        withCredentials: true,
      }
    );
    return true;
  } catch (e) {
    console.log("error:", e);
    throw e;
  }
});
