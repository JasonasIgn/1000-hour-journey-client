import { Box, BoxProps } from "@chakra-ui/react";
import { JourneyListItem } from "store/features/journeys/types";
import { JourneysListItem } from "components/JourneysListItem/JourneysListItem";

interface JourneysListProps {
  journeys: JourneyListItem[];
  rootBoxProps?: BoxProps;
}

export const JourneysList: React.FC<JourneysListProps> = ({
  journeys,
  rootBoxProps,
}) => {
  return (
    <Box {...rootBoxProps}>
      {journeys.map((item) => (
        <JourneysListItem
          journey={item}
          key={item.id}
          rootBoxProps={{ mb: 6 }}
        />
      ))}
    </Box>
  );
};
