import { FC } from "react";
import { Tab, TabList, Tabs } from "@chakra-ui/react";

interface JourneyNavigationProps {}

export const JourneyNavigation: FC<JourneyNavigationProps> = () => {
  return (
    <Tabs height="40px" width="full">
      <TabList>
        <Tab>Home</Tab>
        <Tab>Activities</Tab>
      </TabList>
    </Tabs>
  );
};
