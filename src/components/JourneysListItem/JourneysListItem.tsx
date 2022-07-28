import { Box } from "@chakra-ui/react";
import { Journey } from "../../store/features/journeys/types";

interface JourneysListItemProps {
  journey: Journey;
}

export const JourneysListItem: React.FC<JourneysListItemProps> = ({
  journey,
}) => {
  return <Box>{journey.id}</Box>;
};
