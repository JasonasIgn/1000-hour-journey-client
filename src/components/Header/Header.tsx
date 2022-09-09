import { Flex, Image, Link, Tab, TabList, Tabs } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Logo from "resources/logo.png";

export const Header = () => {
  return (
    <Flex height="60px" padding={2.5} alignItems="center">
      <Link as={RouterLink} to="/" height="100%">
        <Image src={Logo} alt="1000 hour journeys logo" height="100%" />
      </Link>
      <Flex ml={4}>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>
              <RouterLink to="/dashboard">Dashboard</RouterLink>
            </Tab>
            <Tab>
              <RouterLink to="/journeys">Journeys</RouterLink>
            </Tab>
          </TabList>
        </Tabs>
      </Flex>
    </Flex>
  );
};
