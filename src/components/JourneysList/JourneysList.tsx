import { FC, Dispatch, SetStateAction } from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { JourneyListItem } from "store/features/journeys/types";
import { JourneysListItem } from "components";

interface JourneysListProps {
  journeys: JourneyListItem[];
  rootBoxProps?: BoxProps;
  openEditJourneyDialog: Dispatch<SetStateAction<JourneyListItem | null>>;
}

export const JourneysList: FC<JourneysListProps> = ({
  journeys,
  rootBoxProps,
  openEditJourneyDialog,
}) => {
  return (
    <Box {...rootBoxProps}>
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
