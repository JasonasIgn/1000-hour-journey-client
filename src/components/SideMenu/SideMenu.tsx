import { Divider, Flex, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { FC, useEffect, useState, ReactNode } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { logoutEffect } from "store/features/auth/effects";
import { useAppDispatch } from "store/hooks";
import { ReactComponent as BurgerMenuClosedIcon } from "resources/burger-menu-closed.svg";
import { ReactComponent as LogOutIcon } from "resources/log-out.svg";
import { ReactComponent as HomeIcon } from "resources/home.svg";
import { ReactComponent as AchievementIcon } from "resources/achievement.svg";
import { ReactComponent as LogIcon } from "resources/page.svg";
import { Timer } from "components/Timer";

interface NavigationItem {
  path: string;
  name: string;
  icon: ReactNode;
}

const navigationItems: NavigationItem[] = [
  {
    path: "/journeys",
    name: "Journeys",
    icon: <Icon as={HomeIcon} width="30px" height="30px" />,
  },
  {
    path: "/dashboard/logs",
    name: "Logs",
    icon: <Icon as={LogIcon} width="24px" height="24px" />,
  },
  {
    path: "/dashboard/achievements",
    name: "Achievements",
    icon: <Icon as={AchievementIcon} width="24px" height="24px" />,
  },
];

export const SideMenu: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    setTabIndex(
      navigationItems.findIndex((item) => location.pathname.includes(item.path))
    );
  }, [location]);

  return (
    <Flex
      width="70px"
      height="100vh"
      border="1px solid white"
      bg="brand.900"
      flexDirection="column"
      alignItems="center"
    >
      <IconButton
        aria-label="open menu"
        size="lg"
        variant="sideMenuNotReactive"
        mb="10vh"
      >
        <Icon as={BurgerMenuClosedIcon} width="30px" height="30px" />
      </IconButton>

      {navigationItems.map((item, index) => (
        <Tooltip
          key={item.name}
          label={item.name}
          placement="right"
          bg="white"
          color="black"
          openDelay={500}
          offset={[0, 10]}
        >
          <IconButton
            aria-label={item.name}
            size="lg"
            variant="sideMenu"
            mb={2}
            isActive={tabIndex === index}
            as={RouterLink}
            to={item.path}
          >
            {item.icon}
          </IconButton>
        </Tooltip>
      ))}
      <Divider width="50px" />
      <Timer />
      <IconButton
        aria-label="log out"
        size="lg"
        variant="sideMenuNotReactive"
        mt="auto"
        onClick={() => {
          dispatch(logoutEffect());
        }}
      >
        <Icon as={LogOutIcon} width="32px" height="32px" />
      </IconButton>
    </Flex>
  );
};
