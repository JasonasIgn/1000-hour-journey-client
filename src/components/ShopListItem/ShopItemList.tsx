import { FC } from "react";
import {
  Flex,
  FlexProps,
  Heading,
  Text,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { ReactComponent as EditIcon } from "resources/edit.svg";
import format from "date-fns/format";
import Logo from "resources/logo.png";
import { getImageSrc } from "utils/helpers";
import { Paper } from "components/Paper";
import { dateFormats } from "utils/constants";
import { ShopItem } from "store/features/shop/types";

interface ShopListItemProps {
  item: ShopItem;
  rootBoxProps?: FlexProps;
  onEditClick: () => void;
}

export const ShopListItem: FC<ShopListItemProps> = ({
  item,
  rootBoxProps,
  onEditClick,
}) => (
  <Paper
    level={1}
    position="relative"
    height={160}
    padding={4}
    cursor="pointer"
    _hover={{
      boxShadow: `inset 0px 0px 20px 0px var(--chakra-colors-brand-600)`,
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
      border="1px solid"
      borderRadius="20px"
      borderColor="brand.500"
      overflow="hidden"
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
    <Flex direction="column" ml={5} w="full" justifyContent="space-between">
      <Flex direction="column">
        <Heading size="md">{item.title}</Heading>
        <Text fontSize="md">{item.description}</Text>
        <Text fontSize="sm" color="gray.500" mt={1}>
          {format(new Date(item.createdAt), dateFormats.standart)}
        </Text>
      </Flex>
      <Flex direction="column">
        <Text textAlign="center" fontSize="14px">
          {item.cost}
        </Text>
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
