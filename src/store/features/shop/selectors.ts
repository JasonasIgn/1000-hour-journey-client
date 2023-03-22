import { RootState } from "store/reducers";

export const getShopItemsList = (state: RootState) => state.shop.list;

export const getShopItemsListLoadingState = (state: RootState) =>
  state.shop.listLoadingState;
