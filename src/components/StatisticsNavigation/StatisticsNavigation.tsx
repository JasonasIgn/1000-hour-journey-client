import { FC } from "react";
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const tabs = [
  { path: `/statistics/logs` },
  { path: `/statistics/achievements` },
];

export const StatisticsNavigation: FC = () => {
  const location = useLocation();

  return (
    <Tabs
      height="40px"
      width="full"
      defaultIndex={0}
      index={tabs.findIndex((item) => location.pathname === item.path)}
      bg="brand.800"
    >
      <TabList>
        <Tab as={RouterLink} to={`/statistics/logs`}>
          Logs
        </Tab>
        <Tab as={RouterLink} to={`/statistics/achievements`}>
          Achievements
        </Tab>
      </TabList>
    </Tabs>
  );
};
