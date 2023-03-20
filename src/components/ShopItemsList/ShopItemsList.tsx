import { FC, Dispatch, SetStateAction } from "react";
import { Center, Heading, SimpleGrid } from "@chakra-ui/react";
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
    <SimpleGrid minChildWidth="420px" spacing="20px" mt={5}>
      {items.map((item) => (
        <ShopListItem
          key={item.id}
          item={item}
          onEditClick={() => openEditItemDialog(item)}
          onPurchaseClick={() => {}}
        />
      ))}
    </SimpleGrid>
  );
};
