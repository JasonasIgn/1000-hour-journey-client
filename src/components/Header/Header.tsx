import {
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { Timer } from "components";
import { FC, useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { logoutEffect } from "store/features/auth/effects";
import { useAppDispatch } from "store/hooks";
import Logo from "resources/logo.png";

interface RouteTab {
  path: string;
  name: string;
  paths?: RouteTab[];
}

const tabs: RouteTab[] = [
  { path: "/journeys", name: "Journeys" },
  {
    path: "/dashboard",
    name: "Dashboard",
    paths: [
      { path: "/logs", name: "Logs" },
      { path: "/achievements", name: "Achievements" },
    ],
  },
];

interface HeaderProps {
  isLoggedIn: boolean;
}

export const HEADER_HEIGHT_PX = 60;

export const Header: FC<HeaderProps> = ({ isLoggedIn }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    setTabIndex(tabs.findIndex((tab) => location.pathname.includes(tab.path)));
  }, [location]);

  return (
    <Flex
      position="fixed"
      width="100%"
      backdropFilter="blur(4px)"
      top={0}
      height={`${HEADER_HEIGHT_PX}px`}
      padding={2.5}
      alignItems="center"
      justifyContent="space-between"
      zIndex={10000}
    >
      <Flex height="full">
        <Link as={RouterLink} to="/" height="100%">
          <Image src={Logo} alt="1000 hour journeys logo" height="100%" />
        </Link>
        <Flex ml={4}>
          {isLoggedIn && (
            <Tabs variant="soft-rounded" index={tabIndex}>
              <TabList>
                {tabs.map((tab) => {
                  if (tab.paths) {
                    return (
                      <Tab key={tab.name} as={Flex}>
                        <Menu>
                          <MenuButton>{tab.name}</MenuButton>
                          <MenuList>
                            {tab.paths.map((nestedPath) => (
                              <MenuItem
                                key={nestedPath.path}
                                as={RouterLink}
                                to={`${tab.path}${nestedPath.path}`}
                              >
                                {nestedPath.name}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Menu>
                      </Tab>
                    );
                  }
                  return (
                    <Tab as={RouterLink} to={tab.path} key={tab.name}>
                      {tab.name}
                    </Tab>
                  );
                })}
              </TabList>
            </Tabs>
          )}
        </Flex>
      </Flex>
      {isLoggedIn && (
        <Flex alignItems="center">
          <Timer />
          <Link
            ml={3}
            color="brand.50"
            userSelect="none"
            onClick={() => {
              dispatch(logoutEffect());
            }}
          >
            Log out
          </Link>
        </Flex>
      )}
    </Flex>
  );
};
