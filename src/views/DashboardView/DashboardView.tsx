import { FC } from "react";
import {
  Container,
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { useStatistics } from "./hooks";

export const DashboardView: FC = () => {
  const statistics = useStatistics();
  const loading = !statistics;

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container maxW="6xl" pt={5}>
      <Heading>Logs</Heading>
      <Flex pt={6} direction="column">
        <Flex>
          <Flex direction="column" flex="1 1 auto">
            <Heading size="md" mb={2}>
              All Time
            </Heading>
            <Stat>
              <StatLabel>Logged Logs</StatLabel>
              <StatNumber>{statistics.allTime.logsCount}</StatNumber>
              <StatLabel>Hours Spent</StatLabel>
              <StatNumber>{statistics.allTime.totalHours}</StatNumber>
              <StatLabel>Average Hours Per Log</StatLabel>
              <StatNumber>
                {Math.round(statistics.allTime.hoursSpentPerLog * 1000) / 1000}
              </StatNumber>
            </Stat>
          </Flex>
          <Flex direction="column" flex="1 1 auto" mx={8}>
            <Heading size="md" mb={2}>
              This Year
            </Heading>
            <Stat>
              <StatLabel>Logged Logs</StatLabel>
              <StatNumber>{statistics.thisYear.logsCount}</StatNumber>
              <StatLabel>Hours Spent</StatLabel>
              <StatNumber>{statistics.thisYear.totalHours}</StatNumber>
              <StatLabel>Average Hours Per Log</StatLabel>
              <StatNumber>
                {Math.round(statistics.thisYear.hoursSpentPerLog * 1000) / 1000}
              </StatNumber>
            </Stat>
          </Flex>
          <Flex direction="column" flex="1 1 auto">
            <Heading size="md" mb={2}>
              This Month
            </Heading>
            <Stat>
              <StatLabel>Logged Logs</StatLabel>
              <StatNumber>{statistics.thisMonth.logsCount}</StatNumber>
              <StatLabel>Hours Spent</StatLabel>
              <StatNumber>{statistics.thisMonth.totalHours}</StatNumber>
              <StatLabel>Average Hours Per Log</StatLabel>
              <StatNumber>
                {Math.round(statistics.thisMonth.hoursSpentPerLog * 1000) /
                  1000}
              </StatNumber>
            </Stat>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};
