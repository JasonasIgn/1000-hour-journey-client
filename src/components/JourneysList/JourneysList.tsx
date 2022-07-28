import { Box } from "@chakra-ui/react";
import { Journey } from "../../store/features/journeys/types";
import { JourneysListItem } from "../JourneysListItem/JourneysListItem";

interface JourneysListProps {
  journeys: Journey[];
}

export const JourneysList: React.FC<JourneysListProps> = ({ journeys }) => {
  return (
    <Box>
      {journeys.map((item) => (
        <JourneysListItem journey={item} />
      ))}
    </Box>
  );
};
