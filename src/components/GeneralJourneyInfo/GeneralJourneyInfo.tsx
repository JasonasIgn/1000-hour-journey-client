import { FC } from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Journey } from "store/features/journeys/types";

interface GeneralJourneyInfoProps {
  journey: Journey;
}

export const GeneralJourneyInfo: FC<GeneralJourneyInfoProps> = ({
  journey,
}) => {
  return (
    <Box w="full">
      <Flex direction="column">
        <Flex alignItems="center" mb={4}>
          <Divider mr={2} borderColor="brand.100" />
          <Heading size="md" color="brand.100">
            Description
          </Heading>
          <Divider ml={2} borderColor="brand.100" />
        </Flex>
        <Flex px={2}>
          <Text>{journey.description}</Text>
        </Flex>
      </Flex>

      <Flex direction="column" mt={8}>
        <Flex alignItems="center" mb={4}>
          <Divider mr={2} borderColor="brand.100" />
          <Heading size="md" color="brand.100">
            Progress
          </Heading>
          <Divider ml={2} borderColor="brand.100" />
        </Flex>
        <Flex justifyContent="center" px={2}>
          <SimpleGrid columns={3} w="full">
            <Flex direction="column" alignItems="center">
              <Heading size="md">Done</Heading>
              <Heading size="lg" mt={3} color="grey.100">
                {journey.totalHours} h
              </Heading>
            </Flex>
            <Flex direction="column" alignItems="center">
              <CircularProgress
                thickness={6}
                value={journey.totalHours / 10}
                color="brand.300"
                size="90px"
                trackColor="gray.400"
              >
                <CircularProgressLabel color="white">
                  {Math.round(journey.totalHours * 10) / 100}%
                </CircularProgressLabel>
              </CircularProgress>
            </Flex>
            <Flex direction="column" alignItems="center">
              <Heading size="md">Left</Heading>
              <Heading size="lg" mt={3} color="grey.100">
                {Math.round((1000 - journey.totalHours) * 10) / 10} h
              </Heading>
            </Flex>
          </SimpleGrid>
        </Flex>
      </Flex>
    </Box>
  );
};
