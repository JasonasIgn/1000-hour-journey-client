import { FC, useMemo } from "react";
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { routes } from "config";

interface JourneyNavigationProps {
  journeyId?: string;
}

const getTabs = (id: string) => [
  { path: routes.journey.replace(":journeyId", id), name: "Main" },
  {
    path: routes.journeyActivities.replace(":journeyId", id),
    name: "Activities",
  },
  { path: routes.journeySettings.replace(":journeyId", id), name: "Settings" },
];

export const JourneyNavigation: FC<JourneyNavigationProps> = ({
  journeyId = "",
}) => {
  const location = useLocation();
  const tabs = useMemo(() => getTabs(journeyId), [journeyId]);

  return (
    <Tabs
      height="40px"
      width="full"
      defaultIndex={tabs.findIndex((item) => location.pathname === item.path)}
      bg="brand.800"
      index={tabs.findIndex((item) => location.pathname === item.path)}
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
