import { Box, Flex, FlexProps, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";
import format from "date-fns/format";
import { Log } from "../../store/features/journeys/types";

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
      <Text>{log.description}</Text>
    </Flex>
  );
};
