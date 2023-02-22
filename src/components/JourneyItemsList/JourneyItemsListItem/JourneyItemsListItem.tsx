import { FlexProps, forwardRef, Heading, Text } from "@chakra-ui/react";
import { Paper } from "components/Paper";
import { Achievement, Log } from "store/features/journeys/types";

interface JourneyItemsListItemProps extends FlexProps {
  item: Log | Achievement;
  index: number;
  active: boolean;
}

export const JourneyItemsListItem = forwardRef(
  ({ item, index, active, ...rest }: JourneyItemsListItemProps, ref) => (
    <Paper
      level={active ? 2 : 1}
      w="full"
      border="1px solid"
      borderColor="brand.200"
      borderRadius="4px"
      minHeight="40px"
      height="40px"
      mb={2}
      px={2}
      py={1}
      align="center"
      cursor="pointer"
      _hover={{
        boxShadow: "inset 0px 0px 10px 0px var(--chakra-colors-brand-500)",
      }}
      transition="box-shdaow 0.1s"
      sx={{ borderRadius: "4px" }}
      ref={ref}
      {...rest}
    >
      <Heading size="sm">#{index}</Heading>
      <Text
        ml={4}
        pr={4}
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        {item.description}
      </Text>
    </Paper>
  )
);
