import { FC, Dispatch, SetStateAction } from "react";
import { Flex } from "@chakra-ui/react";
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
    <Flex px={10} py={5} direction="column" overflow="overlay">
      {journeys?.map((item) => (
        <JourneysListItem
          journey={item}
          key={item.id}
          rootBoxProps={{ mb: 6 }}
          onEditClick={() => openEditJourneyDialog(item)}
        />
      ))}
    </Flex>
  );
};
