import {
  Divider,
  Icon,
  IconButton,
  Tooltip,
  Image,
  Text,
} from "@chakra-ui/react";
import { FC, useEffect, useState, ReactNode } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { logoutEffect } from "store/features/auth/effects";
import { useAppDispatch } from "store/hooks";
import Logo from "resources/logo.png";
import { ReactComponent as LogOutIcon } from "resources/log-out.svg";
import { ReactComponent as HomeIcon } from "resources/home.svg";
import { ReactComponent as GraphIcon } from "resources/graph.svg";
import { ReactComponent as ShopIcon } from "resources/shop.svg";
import { ReactComponent as AchievementIcon } from "resources/achievement.svg";
import { Timer } from "components/Timer";
import { Paper } from "components/Paper";
import { routes } from "config";
import { version } from "version";

interface NavigationItem {
  path: string;
  name: string;
  icon: ReactNode;
}

export const SIDEMENU_WIDTH_PX = 70;

const navigationItems: NavigationItem[] = [
  {
    path: routes.journeys,
    name: "Journeys",
    icon: <Icon as={HomeIcon} width="30px" height="30px" />,
  },
  {
    path: routes.statistics,
    name: "Logs",
    icon: <Icon as={GraphIcon} width="24px" height="24px" />,
  },
  {
    path: routes.shop,
    name: "Shop",
    icon: <Icon as={ShopIcon} width="24px" height="24px" />,
  },
  {
    path: routes.myAchievements,
    name: "My Achievements",
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
    <Paper
      width={`${SIDEMENU_WIDTH_PX}px`}
      minWidth={`${SIDEMENU_WIDTH_PX}px`}
      height="100vh"
      flexDirection="column"
      alignItems="center"
      sx={{
        borderRadius: 0,
        borderBottom: "none",
        borderLeft: "none",
        borderTop: "none",
      }}
    >
      <Image
        src={Logo}
        width="40px"
        height="40px"
        mb="50px"
        mt="5px"
        p="5px"
        boxSizing="content-box"
      />

      {navigationItems.map((item, index) => (
        <Tooltip
          key={item.name}
          label={item.name}
          placement="right"
          openDelay={500}
          offset={[0, 9]}
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
      <Text fontSize="xs" color="gray.500" mb="10px">
        v{version}
      </Text>
    </Paper>
  );
};
