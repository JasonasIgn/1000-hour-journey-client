import { FC } from "react";
import {
  Flex,
  FlexProps,
  Heading,
  Tag,
  TagLabel,
  Text,
  Badge,
} from "@chakra-ui/react";
import format from "date-fns/format";
import { LogExtended } from "store/features/journeys/types";
import { dateFormats } from "utils/constants";

interface LogShowcaseCardContentProps extends FlexProps {
  log: LogExtended;
}

export const LogShowcaseCardContent: FC<LogShowcaseCardContentProps> = ({
  log,
  ...rest
}) => {
  return (
    <Flex w="full" height="full" direction="column">
      <Flex
        direction="column"
        pb={3}
        mb={3}
        borderBottom="1px solid"
        borderColor="brand.600"
        {...rest}
      >
        <Flex alignItems="center" direction="column" position="relative">
          <Heading>Log #{log.number}</Heading>
          <Heading size="sm" mt={2}>
            {format(new Date(log.loggedOn), dateFormats.standart)}
          </Heading>
          <Badge
            position="absolute"
            top={0}
            right={0}
            variant="solid"
            colorScheme="brand"
            fontSize="16px"
            px={3}
            color="gray.300"
            borderRadius={4}
          >
            {log.hoursSpent} h
          </Badge>
        </Flex>
      </Flex>
      <Flex minHeight={0} width="full" height="full">
        <Flex direction="column" width="full">
          <Text whiteSpace="pre-line">{log.description}</Text>
          {log.tags.length > 0 && (
            <Flex direction="column" mt="auto">
              <Flex>
                {log.tags.map((tag) => (
                  <Tag key={tag.id} variant="subtle" mr={2}>
                    <TagLabel>{tag.name}</TagLabel>
                  </Tag>
                ))}
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
