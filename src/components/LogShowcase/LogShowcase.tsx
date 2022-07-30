import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Log } from "../../store/features/journeys/types";

interface LogShowcaseProps {
  log?: Log;
}

export const LogShowcase: FC<LogShowcaseProps> = ({ log }) => {
  return (
    <Flex height="70%" width="70%" bg="red" padding={5} position="relative">
      <Text>{log?.description}</Text>
      <Box position="absolute" right={5} textAlign="center">
        Hours spent
        <Heading>{log?.hoursSpent}</Heading>
      </Box>
    </Flex>
  );
};
