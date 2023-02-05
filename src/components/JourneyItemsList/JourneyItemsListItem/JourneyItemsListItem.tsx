import { EditIcon } from "@chakra-ui/icons";
import { Flex, FlexProps, forwardRef, Heading, Text } from "@chakra-ui/react";
import { AppDispatch } from "store";
import { setEditLogDialogOpen } from "store/features/journey/slice";
import { Log } from "store/features/journeys/types";

interface JourneyItemsListItemProps extends FlexProps {
  log: Log;
  index: number;
  active: boolean;
  dispatch: AppDispatch;
}

export const JourneyItemsListItem = forwardRef(
  (
    { log, index, active, dispatch, ...rest }: JourneyItemsListItemProps,
    ref
  ) => (
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
        pr={4}
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        {log.description}
      </Text>
      {active && (
        <EditIcon
          width="22px"
          fill="gray.300"
          ml="auto"
          onClick={() => {
            dispatch(setEditLogDialogOpen(true));
          }}
        />
      )}
    </Flex>
  )
);
