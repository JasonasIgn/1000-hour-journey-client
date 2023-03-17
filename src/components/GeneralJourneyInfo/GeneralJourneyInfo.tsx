import { FC, memo, useMemo } from "react";
import { Flex, Heading, Progress, Text } from "@chakra-ui/react";
import { Journey } from "store/features/journeys/types";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { getPieChartData } from "./utils";
import { Paper } from "components/Paper";
import { getCurrentJourneyActivities } from "store/features/journeys/selectors";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { JOURNEY_MAX_HOURS } from "components/JourneyTimeLine/constants";
import { setHoveringOverActivityId } from "store/features/journey/slice";
import { getActivitiesDictionary } from "store/features/journeys/utils";

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
  console.log("???");
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

export const GeneralJourneyInfo: FC<GeneralJourneyInfoProps> = memo(
  ({ journey }) => {
    const dispatch = useAppDispatch();
    const activities = useAppSelector(getCurrentJourneyActivities);

    const activitiesDictionary = useMemo(
      () => getActivitiesDictionary(activities),
      [activities]
    );

    const isLogsEmpty = journey.logs.length === 0;
    const pieChartData = useMemo(
      () => getPieChartData(journey.logs, activitiesDictionary),
      [activitiesDictionary, journey.logs]
    );

    return (
      <Flex w="full" direction="column">
        <Paper direction="column" p={3} sx={{ borderRadius: 0 }}>
          <Flex alignItems="center" mb={3}>
            <Heading size="md" color="gray.300">
              Description
            </Heading>
          </Flex>
          <Flex>
            <Text>{journey.description}</Text>
          </Flex>
        </Paper>

        <Paper direction="column" mt="2vh" p={3} sx={{ borderRadius: 0 }}>
          <Flex alignItems="center" mb={3}>
            <Heading size="md" color="gray.300">
              Progress
            </Heading>
          </Flex>
          <Flex direction="column" alignItems="center">
            <Flex justifyContent="space-between" w="full">
              <Text fontSize="sm" fontWeight={500}>
                {journey.totalHours} h
              </Text>
              <Text fontSize="sm" fontWeight={500}>
                {Math.round((JOURNEY_MAX_HOURS - journey.totalHours) * 10) / 10}{" "}
                h
              </Text>
            </Flex>
            <Progress value={journey.totalHours / 10} size="lg" width="100%" />
            <Text>{Math.round(journey.totalHours * 10) / 100}%</Text>
          </Flex>
        </Paper>
        <Paper
          direction="column"
          mt="2vh"
          flexGrow={1}
          p={3}
          sx={{ borderRadius: 0 }}
        >
          <Flex alignItems="center" mb={3}>
            <Heading size="md" color="gray.300" whiteSpace="nowrap">
              Time distribution
            </Heading>
          </Flex>
          <Flex justifyContent="center" flexGrow={1} alignItems="center">
            {isLogsEmpty && (
              <Heading size="md" mt="2vh">
                No time logged
              </Heading>
            )}
            {!isLogsEmpty && (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius="93%"
                    innerRadius="63%"
                    dataKey="value"
                    stroke="var(--chakra-colors-chakra-border-color)"
                  >
                    {pieChartData.map((item, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        onMouseOver={() => {
                          dispatch(setHoveringOverActivityId(item.id));
                        }}
                        onMouseLeave={() => {
                          dispatch(setHoveringOverActivityId(undefined));
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Flex>
        </Paper>
      </Flex>
    );
  }
);
