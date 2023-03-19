import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "types";
import {
  createShopItemEffect,
  deleteShopItemEffect,
  fetchShopItemsListEffect,
  updateShopItemEffect,
} from "./effects";
import { ShopItem } from "./types";

export interface ShopState {
  list: ShopItem[];
  listLoadingState: LoadingState;
}

const initialState: ShopState = {
  list: [],
  listLoadingState: "pristine",
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopItemsListEffect.pending, (state) => {
        state.listLoadingState = "loading";
      })
      .addCase(fetchShopItemsListEffect.fulfilled, (state, action) => {
        state.listLoadingState = "loaded";
        state.list = action.payload || [];
      })
      .addCase(fetchShopItemsListEffect.rejected, (state) => {
        state.listLoadingState = "error";
      })
      .addCase(createShopItemEffect.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(deleteShopItemEffect.fulfilled, (state, { meta: { arg } }) => {
        const { shopItemId } = arg;
        state.list = state.list.filter((item) => item.id !== shopItemId);
      })
      .addCase(updateShopItemEffect.fulfilled, (state, action) => {
        if (state.list.length > 0 && action.payload) {
          const updatedItemIndex = state.list.findIndex(
            (item) => item.id === action.payload?.id
          );
          state.list[updatedItemIndex] = action.payload;
        }
      });
  },
});

export default shopSlice.reducer;
