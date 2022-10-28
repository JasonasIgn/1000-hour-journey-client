import { FC } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { Log } from "store/features/journeys/types";

interface JourneyItemsListItemProps {
  log: Log;
  index: number;
}

export const JourneyItemsListItem: FC<JourneyItemsListItemProps> = ({
  log,
  index,
}) => {
  return (
    <Flex
      w="full"
      border="1px solid"
      borderColor="brand.200"
      borderRadius="4px"
      height="40px"
      mb={2}
      p={1}
      align="center"
      cursor="pointer"
      _hover={{
        transform: "scale(1.005)",
      }}
      transition="transform 0.1s"
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
  );
};
