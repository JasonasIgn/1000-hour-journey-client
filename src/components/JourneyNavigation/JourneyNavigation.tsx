import { FC, useMemo } from "react";
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface JourneyNavigationProps {
  journeyId?: string;
}

const getTabs = (id: string) => [
  { path: `/journeys/${id}` },
  { path: `/journeys/${id}/activities` },
];

export const JourneyNavigation: FC<JourneyNavigationProps> = ({
  journeyId,
}) => {
  const location = useLocation();
  const tabs = useMemo(() => getTabs(journeyId || ""), [journeyId]);

  return (
    <Tabs
      height="40px"
      width="full"
      defaultIndex={tabs.findIndex((item) => location.pathname === item.path)}
      bg="brand.800"
    >
      <TabList>
        <Tab as={RouterLink} to={`/journeys/${journeyId}`}>
          Main
        </Tab>
        <Tab as={RouterLink} to={`/journeys/${journeyId}/activities`}>
          Activities
        </Tab>
      </TabList>
    </Tabs>
  );
};
