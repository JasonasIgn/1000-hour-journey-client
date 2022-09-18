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
import { DateQuery } from "views/DashboardView/types";
import { useLogsChartData } from "./hooks";
import { StatisticsDisplayUnit } from "./types";
import { StatisticsDatePicker } from "./YearPicker/StatisticsDatePicker";

const displayUnits: { name: string; unit: StatisticsDisplayUnit }[] = [
  { name: "Days", unit: "day" },
  { name: "Weeks", unit: "week" },
  { name: "Months", unit: "month" },
];

interface StatisticsBarChartProps {
  url?: string;
}

export const StatisticsBarChart: FC<StatisticsBarChartProps> = ({ url }) => {
  const [query, setQuery] = useState<DateQuery>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const [displayUnit, setDisplayUnit] = useState<StatisticsDisplayUnit>("day");
  const logsChartData = useLogsChartData({ displayUnit, query });
  return (
    <Flex direction="column" alignItems="center">
      <StatisticsDatePicker query={query} setQuery={setQuery} />
      <Flex>
        <BarChart width={1010} height={300} data={logsChartData}>
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
          <TabList width={100} ml="10px">
            {displayUnits.map((unit) => (
              <Tab key={unit.unit}>{unit.name}</Tab>
            ))}
          </TabList>
        </Tabs>
      </Flex>
    </Flex>
  );
};
