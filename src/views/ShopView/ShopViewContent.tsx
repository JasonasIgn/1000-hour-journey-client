import { FC, useState } from "react";
import { Button, Container, Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Paper } from "components/Paper";
import { ShopItem } from "store/features/shop/types";

export const ShopViewContent: FC = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ShopItem | null>(null);

  return (
    <Container maxW="8xl" pt={5}>
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
          list here
        </Flex>
      </Paper>
    </Container>
  );
};
