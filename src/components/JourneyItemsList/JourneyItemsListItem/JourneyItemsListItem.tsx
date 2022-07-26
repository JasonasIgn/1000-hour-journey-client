import { Flex, FlexProps, forwardRef, Heading, Text } from "@chakra-ui/react";
import { Log } from "store/features/journeys/types";

interface JourneyItemsListItemProps extends FlexProps {
  log: Log;
  index: number;
  active: boolean;
}

export const JourneyItemsListItem = forwardRef(
  ({ log, index, active, ...rest }: JourneyItemsListItemProps, ref) => (
    <Flex
      w="full"
      border="1px solid"
      borderColor="brand.200"
      borderRadius="4px"
      minHeight="40px"
      height="40px"
      mb={2}
      p={1}
      align="center"
      cursor="pointer"
      bg={active ? "brand.700" : "transparent"}
      _hover={{
        transform: "scale(1.005)",
      }}
      transition="transform 0.1s"
      ref={ref}
      {...rest}
    >
      <Heading size="sm">#{index}</Heading>
      <Text
        ml={4}
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        {log.description}
      </Text>
    </Flex>
  )
);
