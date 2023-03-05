import { Text, Flex, Divider } from "@chakra-ui/react";
import { FC } from "react";
import { JourneyTask as JourneyTaskType } from "store/features/dailyGoal/types";

interface JourneyTaskProps {
  journeyTask: JourneyTaskType;
}

export const JourneyTask: FC<JourneyTaskProps> = ({ journeyTask }) => {
  return (
    <Flex justifyContent="center" direction="column">
      <Divider mt={1} />
      <Flex alignItems="center">
        <Text
          fontSize="2xl"
          color="gray.100"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {journeyTask.journey.title}
        </Text>
        <Text ml="auto" pl={4} color="gray.300" fontSize="xl">
          {journeyTask.hoursSpent}/{journeyTask.hoursToLog}h
        </Text>
      </Flex>
      {journeyTask.activityTasks.map((activityTask) => (
        <Flex
          alignItems="center"
          key={`activity-task-${activityTask.id}`}
          ml={2}
        >
          <Text
            fontSize="lg"
            color="gray.300"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            - {activityTask.activity.name}
          </Text>
          <Text ml="auto" pl={2}>
            {activityTask.hoursSpent}/{activityTask.hoursToLog}h
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};
