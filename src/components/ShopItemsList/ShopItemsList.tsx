import { FC, Dispatch, SetStateAction } from "react";
import { Box, Center, Heading } from "@chakra-ui/react";
import { Loader } from "components";
import { ShopItem } from "store/features/shop/types";
import { ShopListItem } from "components/ShopListItem";

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
    <Box mt={5}>
      {items.map((item) => (
        <ShopListItem
          item={item}
          key={item.id}
          onEditClick={() => openEditItemDialog(item)}
          onPurchaseClick={() => {}}
        />
      ))}
    </Box>
  );
};
