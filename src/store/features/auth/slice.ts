import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "types";
import { fetchIsLoggedIn } from "./effects";

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
      .addCase(fetchIsLoggedIn.pending, (state) => {
        state.loadingState = "loading";
      })
      .addCase(fetchIsLoggedIn.fulfilled, (state, { payload }) => {
        state.loadingState = "loaded";
        state.loggedIn = payload.isLoggedIn;
      })
      .addCase(fetchIsLoggedIn.rejected, (state) => {
        state.loadingState = "error";
      });
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
