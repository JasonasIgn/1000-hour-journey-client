import { FC } from "react";
import { EditIcon } from "@chakra-ui/icons";
import {
  Flex,
  FlexProps,
  Heading,
  Tag,
  TagLabel,
  Text,
  Badge,
  IconButton,
} from "@chakra-ui/react";
import format from "date-fns/format";
import { Activity, LogExtended } from "store/features/journeys/types";
import { dateFormats } from "utils/constants";

interface LogShowcaseCardContentProps extends FlexProps {
  log: LogExtended;
  onEditLogClick: () => void;
  activitiesDictionary: Record<number, Activity>;
  isJourneyFinished: boolean;
}

export const LogShowcaseCardContent: FC<LogShowcaseCardContentProps> = ({
  log,
  onEditLogClick,
  activitiesDictionary,
  isJourneyFinished,
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
          <Badge
            position="absolute"
            top={0}
            left={0}
            variant="solid"
            colorScheme="brand"
            fontSize="16px"
            px={3}
            color="gray.300"
            borderRadius={4}
          >
            {log.hoursSpent} h
          </Badge>
          <Heading>Log #{log.number}</Heading>
          <Heading size="sm" mt={2}>
            {format(new Date(log.loggedOn), dateFormats.standart)}
          </Heading>
          <IconButton
            isDisabled={isJourneyFinished}
            top={0}
            right={0}
            position="absolute"
            width="22px"
            height="22px"
            minWidth="22px"
            onClick={onEditLogClick}
            aria-label="edit log"
            variant="sideMenu"
            icon={<EditIcon width="22px" height="22px" />}
          />
        </Flex>
      </Flex>
      <Flex minHeight={0} width="full" height="full">
        <Flex direction="column" width="full">
          <Text whiteSpace="pre-line">{log.description}</Text>
          {log.activities.length > 0 && (
            <Flex direction="column" mt="auto">
              <Flex>
                {log.activities.map((activity) => (
                  <Tag key={activity.id} variant="subtle" mr={2}>
                    <TagLabel>
                      {activitiesDictionary[activity.id].name}
                    </TagLabel>
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
