import { Box } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { JourneysView } from "./views/JourneysView";
import { JourneyView } from "./views/JourneyView";

const App = () => {
  return (
    <Box>
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
