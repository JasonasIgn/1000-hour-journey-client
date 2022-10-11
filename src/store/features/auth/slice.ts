import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "types";
import { fetchIsLoggedInEffect, loginEffect, logoutEffect } from "./effects";

export interface AuthState {
  loggedIn: boolean;
  loadingState: LoadingState;
}

const initialState: AuthState = {
  loggedIn: false,
  loadingState: "pristine",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state) => {
      state.loggedIn = true;
    },
    logOut: (state) => {
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIsLoggedInEffect.pending, (state) => {
        state.loadingState = "loading";
      })
      .addCase(fetchIsLoggedInEffect.fulfilled, (state, { payload }) => {
        state.loadingState = "loaded";
        state.loggedIn = payload.isLoggedIn;
      })
      .addCase(fetchIsLoggedInEffect.rejected, (state) => {
        state.loadingState = "error";
      })
      .addCase(loginEffect.fulfilled, (state) => {
        state.loggedIn = true;
      })
      .addCase(logoutEffect.fulfilled, (state) => {
        state.loggedIn = false;
      });
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
