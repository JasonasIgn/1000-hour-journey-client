import { Box, Flex, FlexProps, Heading, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import format from "date-fns/format";
import { Log } from "../../store/features/journeys/types";
import { apiUrls } from "../../config";

interface LogShowcaseCardProps extends FlexProps {
  log?: Log;
  logNumber: number;
}

export const LogShowcaseCard: FC<LogShowcaseCardProps> = ({
  log,
  logNumber,
  ...rest
}) => {
  if (!log?.id) {
    return (
      <Flex
        flexDirection="column"
        position="absolute"
        height="100%"
        width="65%"
        bg="red"
        padding={5}
        {...rest}
      />
    );
  }

  return (
    <Flex
      flexDirection="column"
      position="absolute"
      height="100%"
      width="65%"
      bg="red"
      padding={5}
      {...rest}
    >
      <Flex flexDirection="column">
        <Flex justifyContent="space-between">
          <Box textAlign="center">
            <Heading>Log #{logNumber}</Heading>
          </Box>
          <Box textAlign="center">
            <Heading>{format(new Date(log.loggedOn), "yyyy-MM-dd")}</Heading>
          </Box>
          <Box textAlign="center">
            Hours spent
            <Heading>{log.hoursSpent}</Heading>
          </Box>
        </Flex>
        <Flex>
          <Text>{log.description}</Text>
        </Flex>
      </Flex>

      {log.mediaName && (
        <Flex height="80%" flex="1 1 auto" justifyContent="center">
          <Image
            src={`${apiUrls.media}/${log.mediaName}`}
            alt={`${log.id} media`}
          />
        </Flex>
      )}
    </Flex>
  );
};
