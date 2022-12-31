import { FC } from "react";
import {
  Flex,
  FlexProps,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { LogTimerFrameStatistics } from "views/DashboardLogsView/types";

interface LogStatCardProps extends FlexProps {
  statistics: LogTimerFrameStatistics;
  heading: string;
}

export const LogStatCard: FC<LogStatCardProps> = ({
  statistics,
  heading,
  ...props
}) => {
  return (
    <Flex direction="column" flex="1 1 auto" mr={6} {...props}>
      <Heading size="md" mb={2}>
        {heading}
      </Heading>
      <Stat>
        <StatLabel>Logged Logs</StatLabel>
        <StatNumber>{statistics.logsCount}</StatNumber>
        <StatLabel>Hours Spent</StatLabel>
        <StatNumber>{statistics.totalHours || 0}</StatNumber>
        <StatLabel>Average Hours Per Log</StatLabel>
        <StatNumber>
          {Math.round((statistics.hoursSpentPerLog || 0) * 1000) / 1000}
        </StatNumber>
      </Stat>
    </Flex>
  );
};
