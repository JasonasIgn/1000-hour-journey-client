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
import { StatisticsDatePicker } from "./YearPicker/StatisticsDatePicker";

const displayUnits: { name: string; unit: StatisticsDisplayUnit }[] = [
  { name: "Days", unit: "day" },
  { name: "Weeks", unit: "week" },
  { name: "Months", unit: "month" },
];

export const StatisticsBarChart: FC = () => {
  const [displayUnit, setDisplayUnit] = useState<StatisticsDisplayUnit>("day");
  const { data, loading, query, setQuery, monthsEnabled, setMonthsEnabled } =
    useLogsChartData({ displayUnit });

  return (
    <Flex direction="column" alignItems="center">
      <StatisticsDatePicker
        query={query}
        setQuery={setQuery}
        loading={loading}
        monthsEnabled={monthsEnabled}
        setMonthsEnabled={setMonthsEnabled}
        shouldDisableMonthsCheckbox={displayUnit === "month"}
      />
      <Flex>
        <BarChart width={1010} height={300} data={data}>
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
          onChange={(idx) => {
            setDisplayUnit(displayUnits[idx].unit);
            if (displayUnits[idx].unit === "month") {
              setMonthsEnabled(false);
            }
          }}
        >
          <TabList width={100} ml="10px">
            {displayUnits.map((unit) => (
              <Tab key={unit.unit} isDisabled={loading}>
                {unit.name}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </Flex>
    </Flex>
  );
};
