import { FC, useState } from "react";
import {
  Flex,
  FlexProps,
  Heading,
  Text,
  Image,
  IconButton,
  Icon,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { ReactComponent as EditIcon } from "resources/edit.svg";
import Logo from "resources/logo.png";
import { getImageSrc } from "utils/helpers";
import { Paper } from "components/Paper";
import { ReactComponent as CoinIcon } from "resources/coin.svg";
import { ShopItem } from "store/features/shop/types";

interface ShopListItemProps {
  item: ShopItem;
  rootBoxProps?: FlexProps;
  onEditClick: () => void;
  onBuyClick: (shopItem: ShopItem) => Promise<void>;
}

export const ShopListItem: FC<ShopListItemProps> = ({
  item,
  rootBoxProps,
  onEditClick,
  onBuyClick,
}) => {
  const [isBuying, setIsBuying] = useState(false);

  const handleBuy = async () => {
    setIsBuying(true);
    await onBuyClick(item);
    setIsBuying(false);
  };

  return (
    <Paper
      level={1}
      position="relative"
      height={128}
      cursor="pointer"
      _hover={{
        cursor: "initial",
        button: {
          display: "inline-block",
        },
      }}
      transition="box-shadow 0.1s"
      {...rootBoxProps}
    >
      <Flex
        width={126}
        minWidth={126}
        maxHeight={126}
        height="full"
        alignItems="center"
        justifyContent="center"
        bg="black"
        overflow="hidden"
        borderTopLeftRadius="20px"
        borderBottomLeftRadius="20px"
        borderRight="1px solid"
        borderColor="brand.600"
      >
        <Image
          key={item.updatedAt.toString()}
          filter="brightness(0.8)"
          src={
            item?.mediaUrl
              ? `${getImageSrc(item.mediaUrl)}?${item.updatedAt.toString()}` // Prevent caching
              : Logo
          }
          maxHeight="full"
        />
      </Flex>
      <Flex direction="column" w="full" justifyContent="space-between" p={3}>
        <Tooltip label={item.description} placement="right">
          <Heading size="md" width="fit-content">
            {item.title}
          </Heading>
        </Tooltip>
        <Text fontSize="sm" color="gray.500" mt="auto">
          Times purchased: {item.timesPurchased}
        </Text>
        <Flex alignItems="flex-end">
          <Flex
            border="1px solid"
            alignItems="center"
            px={2}
            borderColor="brand.300"
            borderRadius={4}
            height="32px"
          >
            <Text textAlign="center" fontSize="14px" fontWeight={500}>
              {item.cost}
            </Text>
            <Icon as={CoinIcon} ml={2} width="24px" height="24px" />
          </Flex>
          <Button
            ml="auto"
            px={8}
            size="md"
            onClick={handleBuy}
            disabled={isBuying}
          >
            Buy
          </Button>
        </Flex>
      </Flex>
      <IconButton
        aria-label="edit item"
        icon={<EditIcon width="22px" height="22px" />}
        position="absolute"
        right="16px"
        top="16px"
        width="22px"
        height="22px"
        minWidth="22px"
        display="none"
        variant="sideMenu"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onEditClick();
        }}
      />
    </Paper>
  );
};
