import { Flex, Tab, TabList, Tabs } from "@chakra-ui/react";
import { FC, useState } from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { useLogsChartData } from "./hooks";
import { StatisticsDisplayUnit } from "./types";

const displayUnits: { name: string; unit: StatisticsDisplayUnit }[] = [
  { name: "Days", unit: "day" },
  { name: "Weeks", unit: "week" },
  { name: "Months", unit: "month" },
];

interface StatisticsBarChartProps {
  url?: string;
}

export const StatisticsBarChart: FC<StatisticsBarChartProps> = ({ url }) => {
  const [displayUnit, setDisplayUnit] = useState<StatisticsDisplayUnit>("day");
  const logsChartData = useLogsChartData({ displayUnit });
  return (
    <Flex>
      <BarChart width={1000} height={300} data={logsChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="hoursSpent"
          name="Hours Spent"
          fill="var(--chakra-colors-brand-200)"
        />
      </BarChart>
      <Tabs
        orientation="vertical"
        variant="soft-rounded"
        defaultIndex={0}
        onChange={(idx) => setDisplayUnit(displayUnits[idx].unit)}
      >
        <TabList>
          {displayUnits.map((unit) => (
            <Tab key={unit.unit}>{unit.name}</Tab>
          ))}
        </TabList>
      </Tabs>
    </Flex>
  );
};
