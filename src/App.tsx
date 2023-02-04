import { Box, Flex } from "@chakra-ui/react";
import { Header, HEADER_HEIGHT_PX, AuthRoutes, GuestRoutes } from "components";
import { useInitialization } from "utils/hooks";
import { useAppSelector } from "store/hooks";
import { getIsLoggedIn } from "store/features/auth/selectors";

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
    <Flex
      bgColor="brand.900"
      minHeight="100vh"
      flexDirection="column"
      paddingTop={`${HEADER_HEIGHT_PX}px`}
    >
      <Header isLoggedIn={isLoggedIn} />
      {isLoggedIn && <AuthRoutes />}
      {!isLoggedIn && <GuestRoutes />}
    </Flex>
  );
};

export default App;
