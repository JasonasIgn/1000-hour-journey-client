import { Flex, Image, Link, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Logo from "resources/logo.png";

interface RouteTab {
  path: string;
  name: string;
}

const tabs: RouteTab[] = [
  { path: "/journeys", name: "Journeys" },
  { path: "/dashboard", name: "Dashboard" },
];

export const Header = () => {
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    setTabIndex(tabs.findIndex((tab) => location.pathname.includes(tab.path)));
  }, [location]);

  return (
    <Flex height="60px" padding={2.5} alignItems="center">
      <Link as={RouterLink} to="/" height="100%">
        <Image src={Logo} alt="1000 hour journeys logo" height="100%" />
      </Link>
      <Flex ml={4}>
        <Tabs
          variant="soft-rounded"
          index={tabIndex}
          onChange={handleTabsChange}
        >
          <TabList>
            {tabs.map((tab) => (
              <Tab as={RouterLink} to={tab.path} key={tab.name}>
                {tab.name}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </Flex>
    </Flex>
  );
};
