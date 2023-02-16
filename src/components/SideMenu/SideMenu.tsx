import { Divider, Icon, IconButton, Tooltip, Image } from "@chakra-ui/react";
import { FC, useEffect, useState, ReactNode } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { logoutEffect } from "store/features/auth/effects";
import { useAppDispatch } from "store/hooks";
import Logo from "resources/logo.png";
import { ReactComponent as LogOutIcon } from "resources/log-out.svg";
import { ReactComponent as HomeIcon } from "resources/home.svg";
import { ReactComponent as AchievementIcon } from "resources/achievement.svg";
import { ReactComponent as LogIcon } from "resources/page.svg";
import { Timer } from "components/Timer";
import { Paper } from "components/Paper";

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
      navigationItems.findIndex((item) => location.pathname === item.path)
    );
  }, [location]);

  return (
    <Paper
      width="70px"
      minW="70px"
      height="100vh"
      borderColor="gray.500"
      bg="brand.700"
      flexDirection="column"
      alignItems="center"
      sx={{
        borderRadius: 0,
        borderLeft: "none",
        borderTop: "none",
        borderBottom: "none",
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
    </Paper>
  );
};
