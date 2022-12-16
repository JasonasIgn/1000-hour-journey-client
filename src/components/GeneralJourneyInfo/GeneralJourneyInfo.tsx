import { FC, useMemo } from "react";
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
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { getPieChartData } from "./utils";

const COLORS = [
  "#182747",
  "#45046A",
  "#003545",
  "#4C0033",
  "#0F0E0E",
  "#C70D3A",
  "#082032",
  "#150485",
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const percentFormatted = percent * 100;

  return percentFormatted > 7 ? (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${percentFormatted.toFixed(0)}%`}
    </text>
  ) : null;
};

interface GeneralJourneyInfoProps {
  journey: Journey;
}

export const GeneralJourneyInfo: FC<GeneralJourneyInfoProps> = ({
  journey,
}) => {
  const pieChartData = useMemo(
    () => getPieChartData(journey.logs),
    [journey.logs]
  );
  console.log(pieChartData);
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
                <CircularProgressLabel color="white" fontSize="xl">
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
      <Flex direction="column" mt={8}>
        <Flex alignItems="center" mb={4}>
          <Divider mr={2} borderColor="brand.100" />
          <Heading size="md" color="brand.100" whiteSpace="nowrap">
            Time distribution
          </Heading>
          <Divider ml={2} borderColor="brand.100" />
        </Flex>
        <Flex justifyContent="center" px={2}>
          <PieChart width={320} height={320}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={145}
              innerRadius={100}
              dataKey="value"
              stroke="var(--chakra-colors-chakra-border-color)"
            >
              {pieChartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Flex>
      </Flex>
    </Box>
  );
};
