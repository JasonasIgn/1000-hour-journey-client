import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrls } from "config";
import { ShopItem } from "./types";

export const fetchShopItemsListEffect = createAsyncThunk(
  "shop/fetchItems",
  async () => {
    try {
      const response = await axios.get<ShopItem[]>(apiUrls.fetchShopItems, {
        withCredentials: true,
      });
      return response.data;
    } catch (e) {
      console.log("error:", e);
    }
  }
);

export const createShopItemEffect = createAsyncThunk(
  "shop/createItem",
  async (data: any) => {
    const { media, ...rest } = data;
    try {
      const response = await axios.post(
        apiUrls.createShopItem,
        { ...rest, media: media?.[0] },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

export const deleteShopItemEffect = createAsyncThunk(
  "shop/deleteItem",
  async ({ shopItemId }: { shopItemId: number }) => {
    try {
      const response = await axios.delete<ShopItem>(
        apiUrls.deleteShopItem.replace("{shopItemId}", shopItemId.toString()),
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

export const updateShopItemEffect = createAsyncThunk(
  "shop/updateItem",
  async ({ data, shopItemId }: { data: any; shopItemId: number }) => {
    const { media, ...rest } = data;
    try {
      const response = await axios.patch<ShopItem>(
        apiUrls.updateShopItem.replace("{shopItemId}", shopItemId.toString()),
        {
          ...rest,
          media: media?.[0],
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

export const buyShopItemEffect = createAsyncThunk(
  "shop/buyItem",
  async (shopItem: ShopItem) => {
    try {
      const response = await axios.get<ShopItem>(
        apiUrls.buyShopItem.replace("{shopItemId}", shopItem.id.toString()),
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);
