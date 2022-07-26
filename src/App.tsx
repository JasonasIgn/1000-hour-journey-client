import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { JourneysView } from "./views/JourneysView";

const App = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<JourneysView />} />
      </Routes>
    </Box>
  );
};

export default App;
