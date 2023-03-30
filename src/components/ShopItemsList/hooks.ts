import { ShopItem } from "store/features/shop/types";

export const useShopItemsSorting = (items: ShopItem[]) => {
  const sortedItems = [...items].sort((a, b) => {
    return a.timesPurchased < b.timesPurchased ? 1 : -1;
  });

  return sortedItems;
};
