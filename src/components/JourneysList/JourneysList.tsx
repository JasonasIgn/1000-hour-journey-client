import { FC, Dispatch, SetStateAction, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { JourneyListItem } from "store/features/journeys/types";
import { JourneysListItem, Loader } from "components";
import { useAppSelector } from "store/hooks";
import { getDailyGoal } from "store/features/dailyGoal/selectors";
import { getDailyGoalOpen } from "store/features/journey/selectors";
import { getDailyGoalJourneyTasksIds } from "./utils";

interface JourneysListProps {
  journeys: JourneyListItem[];
  openEditJourneyDialog: Dispatch<SetStateAction<JourneyListItem | null>>;
  isLoading: boolean;
}

export const JourneysList: FC<JourneysListProps> = ({
  journeys = [],
  openEditJourneyDialog,
  isLoading,
}) => {
  const dailyGoal = useAppSelector(getDailyGoal);
  const isDailyGoalOpen = useAppSelector(getDailyGoalOpen);

  const journeyTaskIds = useMemo(
    () => getDailyGoalJourneyTasksIds(dailyGoal),
    [dailyGoal]
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box mt={5}>
      {journeys.map((item) => (
        <JourneysListItem
          journey={item}
          key={item.id}
          rootBoxProps={{ mb: 6 }}
          onEditClick={() => openEditJourneyDialog(item)}
          isGoalHighlight={isDailyGoalOpen && journeyTaskIds.includes(item.id)}
        />
      ))}
    </Box>
  );
};
