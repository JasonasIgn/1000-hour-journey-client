import { Box, Flex, FlexProps, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";
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
  return (
    <Flex
      flexDirection="column"
      position="absolute"
      height="100%"
      width="70%"
      bg="red"
      padding={5}
      {...rest}
    >
      <Flex justifyContent="space-between">
        <Box textAlign="center">
          <Heading>Log #{logNumber}</Heading>
        </Box>
        <Box textAlign="center">
          Hours spent
          <Heading>{log?.hoursSpent}</Heading>
        </Box>
      </Flex>
      <Text>{log?.description}</Text>
    </Flex>
  );
};
