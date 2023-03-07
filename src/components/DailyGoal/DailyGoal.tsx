import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  Text,
} from "@chakra-ui/react";
import { getDailyGoal } from "store/features/dailyGoal/selectors";
import { getDailyGoalOpen } from "store/features/journey/selectors";
import { setDailyGoalOpen } from "store/features/journey/slice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { DailyGoalTrigger } from "./DailyGoalTrigger/DailyGoalTrigger";
import { JourneyTask } from "./JourneyTask";

export const DailyGoal = () => {
  const dispatch = useAppDispatch();
  const dailyGoal = useAppSelector(getDailyGoal);
  const dailyGoalOpen = useAppSelector(getDailyGoalOpen);

  return (
    <Popover
      placement="bottom"
      arrowShadowColor="brand.100"
      closeOnBlur={false}
      arrowSize={10}
      isOpen={dailyGoalOpen}
      offset={[0, 10]}
      onClose={() => dispatch(setDailyGoalOpen(false))}
      onOpen={() => dispatch(setDailyGoalOpen(true))}
    >
      <DailyGoalTrigger completed={dailyGoal?.completed} />
      <PopoverContent bg="brand.700" borderColor="brand.400">
        <PopoverCloseButton />
        <PopoverBody>
          <Text
            fontSize="2xl"
            textAlign="center"
            color="gray.200"
            userSelect="none"
          >
            Daily goal
          </Text>
          {(dailyGoal?.journeyTasks || []).map((journeyTask) => (
            <JourneyTask
              journeyTask={journeyTask}
              key={`journey-task-${journeyTask.id}`}
            />
          ))}
        </PopoverBody>
        <PopoverArrow
          bgColor="brand.700"
          borderTop="1px solid"
          borderLeft="1px solid"
          borderColor="brand.400"
        />
      </PopoverContent>
    </Popover>
  );
};
