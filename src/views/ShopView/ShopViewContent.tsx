import { FC, useEffect, useState } from "react";
import { Button, Container, Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Paper } from "components/Paper";
import { ShopItem } from "store/features/shop/types";
import { ShopItemsList } from "components/ShopItemsList";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  getShopItemsList,
  getShopItemsListLoadingState,
} from "store/features/shop/selectors";
import { fetchShopItemsListEffect } from "store/features/shop/effects";

export const ShopViewContent: FC = () => {
  const dispatch = useAppDispatch();
  const listLoadingState = useAppSelector(getShopItemsListLoadingState);
  const shopItemsList = useAppSelector(getShopItemsList);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ShopItem | null>(null);

  useEffect(() => {
    if (listLoadingState === "pristine") {
      dispatch(fetchShopItemsListEffect());
    }
  }, [dispatch, listLoadingState]);

  return (
    <Container maxW="6xl" py={5} flexGrow={1}>
      <Paper flexDirection="column" height="100%" sx={{ borderRadius: 0 }}>
        <Flex borderBottom="1px solid" borderColor="brand.600" py={5} px={5}>
          <Button
            onClick={() => setAddModalOpen(true)}
            ml="auto"
            leftIcon={<AddIcon />}
          >
            Add item
          </Button>
        </Flex>
        <Flex direction="column" px={5} overflow="auto" flexGrow={1}>
          <ShopItemsList
            isLoading={["pristine", "loading"].includes(listLoadingState)}
            items={shopItemsList}
            openEditItemDialog={setEditingItem}
          />
        </Flex>
      </Paper>
    </Container>
  );
};
