import { Box } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "components";
import { JourneysView } from "views/JourneysView/JourneysView";
import { JourneyView } from "views/JourneyView/JourneyView";

const App = () => {
  return (
    <Box bgColor="brand.900" minHeight="100vh">
      <Header />
      <Routes>
        <Route path="/journeys">
          <Route path=":journeyId" element={<JourneyView />} />
          <Route index element={<JourneysView />} />
        </Route>
        <Route path="/" element={<Navigate to="/journeys" replace={true} />} />
      </Routes>
    </Box>
  );
};

export default App;
