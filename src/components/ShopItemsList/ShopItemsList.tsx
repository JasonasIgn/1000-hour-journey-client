import { FC, Dispatch, SetStateAction, useCallback } from "react";
import { Center, Heading, SimpleGrid, useToast } from "@chakra-ui/react";
import { Loader } from "components";
import { ShopItem } from "store/features/shop/types";
import { ShopListItem } from "components/ShopListItem";
import { useAppDispatch } from "store/hooks";
import { buyShopItemEffect } from "store/features/shop/effects";

interface ShopItemsListProps {
  items: ShopItem[];
  openEditItemDialog: Dispatch<SetStateAction<ShopItem | null>>;
  isLoading: boolean;
}

export const ShopItemsList: FC<ShopItemsListProps> = ({
  items = [],
  openEditItemDialog,
  isLoading,
}) => {
  const toast = useToast();
  const dispatch = useAppDispatch();

  const onBuyClick = useCallback(
    async (shopItem: ShopItem) => {
      try {
        await dispatch(buyShopItemEffect(shopItem)).unwrap();
        toast({
          description: "Item purchased!",
        });
      } catch (e) {
        toast({
          description: "Failed to buy the item",
        });
      }
    },
    [dispatch, toast]
  );

  if (isLoading) {
    return <Loader />;
  }

  if (items.length === 0) {
    return (
      <Center flexGrow={1} mb="12vh">
        <Heading>No items yet...</Heading>
      </Center>
    );
  }

  return (
    <SimpleGrid minChildWidth="420px" spacing="20px" mt={5}>
      {items.map((item) => (
        <ShopListItem
          key={item.id}
          item={item}
          onEditClick={() => openEditItemDialog(item)}
          onBuyClick={onBuyClick}
        />
      ))}
    </SimpleGrid>
  );
};
