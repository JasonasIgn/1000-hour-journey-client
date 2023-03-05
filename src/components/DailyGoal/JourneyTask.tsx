import { Text, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { JourneyTask as JourneyTaskType } from "store/features/dailyGoal/types";

interface JourneyTaskProps {
  journeyTask: JourneyTaskType;
}

export const JourneyTask: FC<JourneyTaskProps> = ({ journeyTask }) => {
  return (
    <Flex justifyContent="center" direction="column">
      <Flex alignItems="center">
        <Text fontSize="2xl" color="gray.100">
          {journeyTask.journey.title}
        </Text>
        <Text ml="auto">
          {journeyTask.hoursSpent}/{journeyTask.hoursToLog}h
        </Text>
      </Flex>
      {journeyTask.activityTasks.map((activityTask) => (
        <Flex alignItems="center">
          <Text fontSize="lg" color="gray.300">
            {activityTask.activity.name}
          </Text>
          <Text ml="auto">
            {activityTask.hoursSpent}/{activityTask.hoursToLog}h
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};
