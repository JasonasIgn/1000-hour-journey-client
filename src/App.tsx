import { Box, Flex } from "@chakra-ui/react";
import { Header, AuthRoutes, GuestRoutes } from "components";
import { useInitialization } from "utils/hooks";
import { useAppSelector } from "store/hooks";
import { getIsLoggedIn } from "store/features/auth/selectors";
import { SideMenu } from "components/SideMenu";

const App = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const isInitializing = useInitialization();

  if (isInitializing) {
    return (
      <Box bgColor="brand.900" minHeight="100vh">
        Initializing...
      </Box>
    );
  }

  return (
    <Flex width="100%" height="100vh" overflow="hidden">
      {isLoggedIn && <SideMenu />}
      <Flex
        bgColor="brand.900"
        minHeight="100vh"
        flexDirection="column"
        flexGrow={1}
        overflow="auto"
      >
        <Header />
        {isLoggedIn && <AuthRoutes />}
        {!isLoggedIn && <GuestRoutes />}
      </Flex>
    </Flex>
  );
};

export default App;
