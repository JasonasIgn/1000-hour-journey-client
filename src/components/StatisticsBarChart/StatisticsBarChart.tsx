import { FC } from "react";
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

interface StatisticsBarChartProps {
  url?: string;
}

export const StatisticsBarChart: FC<StatisticsBarChartProps> = ({ url }) => {
  const logsChartData = useLogsChartData();
  return (
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
  );
};
