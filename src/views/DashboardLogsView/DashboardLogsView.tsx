import { FC } from "react";
import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useStatistics } from "./hooks";
import { LogStatCard } from "components/LogStatCard";
import { StatisticsBarChart } from "components/StatisticsBarChart";

export const DashboardLogsView: FC = () => {
  const statistics = useStatistics();
  const loading = !statistics;

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container maxW="8xl" pt={5}>
      <Heading textAlign="center" mb={5}>
        Logs
      </Heading>
      <Flex pt={6} direction="column">
        <Flex>
          <LogStatCard statistics={statistics.allTime} heading="All Time" />
          <LogStatCard statistics={statistics.thisYear} heading="This Year" />
          <LogStatCard statistics={statistics.thisMonth} heading="This Month" />
          <LogStatCard statistics={statistics.thisWeek} heading="Past 7 days" />
          <LogStatCard statistics={statistics.today} heading="Today" mr={0} />
        </Flex>
        <Flex pt={14} justifyContent="center">
          <StatisticsBarChart />
        </Flex>
      </Flex>
    </Container>
  );
};
