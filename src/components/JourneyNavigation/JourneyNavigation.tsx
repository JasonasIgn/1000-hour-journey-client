import { FC } from "react";
import { Heading, Tab, TabList, Tabs } from "@chakra-ui/react";

interface JourneyNavigationProps {}

export const JourneyNavigation: FC<JourneyNavigationProps> = () => {
  return (
    <Tabs height="40px" width="full" borderTop="1px solid">
      <TabList>
        <Tab>Home</Tab>
        <Tab>Activities</Tab>
      </TabList>

      {/* <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels> */}
    </Tabs>
  );
};
