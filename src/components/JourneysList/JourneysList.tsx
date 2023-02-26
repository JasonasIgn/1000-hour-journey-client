import { FC, Dispatch, SetStateAction } from "react";
import { Box } from "@chakra-ui/react";
import { JourneyListItem } from "store/features/journeys/types";
import { JourneysListItem } from "components";

interface JourneysListProps {
  journeys: JourneyListItem[];
  openEditJourneyDialog: Dispatch<SetStateAction<JourneyListItem | null>>;
}

export const JourneysList: FC<JourneysListProps> = ({
  journeys,
  openEditJourneyDialog,
}) => {
  return (
    <Box mt={5}>
      {journeys?.map((item) => (
        <JourneysListItem
          journey={item}
          key={item.id}
          rootBoxProps={{ mb: 6 }}
          onEditClick={() => openEditJourneyDialog(item)}
        />
      ))}
    </Box>
  );
};
