import { FC } from "react";
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { routes } from "config";

const tabs = [
  { path: routes.statisticsLogs, name: "Logs" },
  { path: routes.statisticsAchievements, name: "Achievements" },
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
        {tabs.map((tab) => (
          <Tab as={RouterLink} to={tab.path} key={tab.path}>
            {tab.name}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};
