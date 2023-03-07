import { Text, Flex, Divider } from "@chakra-ui/react";
import { FC } from "react";
import { JourneyTask as JourneyTaskType } from "store/features/dailyGoal/types";
import { Link as RouterLink } from "react-router-dom";

interface JourneyTaskProps {
  journeyTask: JourneyTaskType;
}

export const JourneyTask: FC<JourneyTaskProps> = ({ journeyTask }) => {
  const isJourneyTaskCompleted =
    journeyTask.activityTasks.findIndex(
      (task) => task.hoursSpent < task.hoursToLog
    ) === -1;
  return (
    <Flex justifyContent="center" direction="column">
      <Divider mt={1} />
      <Flex alignItems="center">
        <Text
          fontSize="2xl"
          color={isJourneyTaskCompleted ? "green.400" : "yellow.500"}
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          as={RouterLink}
          to={`/journeys/${journeyTask.journey.id}`}
          _hover={{
            color: isJourneyTaskCompleted ? "green.300" : "yellow.400",
          }}
        >
          {journeyTask.journey.title}
        </Text>
        <Text
          ml="auto"
          pl={4}
          color={isJourneyTaskCompleted ? "green.400" : "yellow.500"}
          fontSize="xl"
        >
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
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            color={
              activityTask.hoursSpent < activityTask.hoursToLog
                ? "yellow.600"
                : "green.500"
            }
          >
            - {activityTask.activity.name}
          </Text>
          <Text
            ml="auto"
            pl={2}
            color={
              activityTask.hoursSpent < activityTask.hoursToLog
                ? "yellow.600"
                : "green.500"
            }
          >
            {activityTask.hoursSpent}/{activityTask.hoursToLog}h
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};
