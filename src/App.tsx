import { Box } from "@chakra-ui/react";
import { Header } from "components";
import { useInitialization } from "utils/hooks";
import { useAppSelector } from "store/hooks";
import { getIsLoggedIn } from "store/features/auth/selectors";
import { AuthRoutes } from "components/Routes/AuthRoutes";
import { GuestRoutes } from "components/Routes/GuestRoutes";

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
    <Box bgColor="brand.900" minHeight="100vh">
      <Header isLoggedIn={isLoggedIn} />
      {isLoggedIn && <AuthRoutes />}
      {!isLoggedIn && <GuestRoutes />}
    </Box>
  );
};

export default App;
