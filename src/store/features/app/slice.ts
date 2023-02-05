import { createSlice } from "@reduxjs/toolkit";

export interface TimerState {
  viewedImageSrc: string;
}

const initialState: TimerState = {
  viewedImageSrc: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setViewedImageSrc: (state, action) => {
      state.viewedImageSrc = action.payload;
    },
  },
});

export const { setViewedImageSrc } = appSlice.actions;

export default appSlice.reducer;
