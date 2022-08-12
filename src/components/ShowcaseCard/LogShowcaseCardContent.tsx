import { Box, Flex, FlexProps, Heading, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import format from "date-fns/format";
import { LogExtended } from "../../store/features/journeys/types";

interface LogShowcaseCardContentProps extends FlexProps {
  log: LogExtended;
}

export const LogShowcaseCardContent: FC<LogShowcaseCardContentProps> = ({
  log,
  ...rest
}) => {
  return (
    <>
      <Flex flexDirection="column" {...rest}>
        <Flex justifyContent="space-between">
          <Box textAlign="center">
            <Heading>Log #{log.number}</Heading>
          </Box>
          <Box textAlign="center">
            <Heading>
              {format(new Date(log.loggedOn), "yyyy-MM-dd")}
            </Heading>
          </Box>
          <Box textAlign="center">
            <Text> Hours spent</Text>
            <Heading>{log.hoursSpent}</Heading>
          </Box>
        </Flex>
        <Flex>
          <Text>{log.description}</Text>
        </Flex>
      </Flex>

      {log?.mediaUrl && (
        <Flex height="80%" flex="1 1 auto" justifyContent="center">
          <Image src={log.mediaUrl} alt={`${log.id} media`} />
        </Flex>
      )}
    </>
  );
};
