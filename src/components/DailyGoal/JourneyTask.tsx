import { Text, Flex, Divider } from "@chakra-ui/react";
import { FC } from "react";
import { JourneyTask as JourneyTaskType } from "store/features/dailyGoal/types";
import { Link as RouterLink } from "react-router-dom";
import { routes } from "config";

interface JourneyTaskProps {
  journeyTask: JourneyTaskType;
}

export const JourneyTask: FC<JourneyTaskProps> = ({ journeyTask }) => {
  const isJourneyTaskCompleted =
    journeyTask.hoursSpent >= journeyTask.hoursToLog &&
    journeyTask.activityTasks.findIndex(
      (task) => task.hoursSpent < task.hoursToLog
    ) === -1;

  return (
    <Flex justifyContent="center" direction="column">
      <Divider mt={1} borderColor="gray.400" />
      <Flex alignItems="center">
        <Text
          fontSize="2xl"
          color={isJourneyTaskCompleted ? "green.400" : "yellow.600"}
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          as={RouterLink}
          to={routes.journey.replace(
            ":journeyId",
            journeyTask.journey.id.toString()
          )}
          transition="transform 100ms"
          _hover={{
            color: isJourneyTaskCompleted ? "green.300" : "yellow.500",
            transform: "scale(1.01)",
          }}
        >
          {journeyTask.journey.title}
        </Text>
        <Text
          ml="auto"
          pl={4}
          color={isJourneyTaskCompleted ? "green.400" : "yellow.600"}
          fontSize="xl"
        >
          {journeyTask.hoursSpent}/{journeyTask.hoursToLog}h
        </Text>
      </Flex>
      {journeyTask.activityTasks.map((activityTask) => {
        const isActivityTaskCompleted =
          activityTask.hoursSpent >= activityTask.hoursToLog;
        return (
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
              transition="transform 100ms"
              as={RouterLink}
              to={routes.journey
                .replace(":journeyId", journeyTask.journey.id.toString())
                .concat(`?prefillActivityId=${activityTask.activityId}`)}
              color={isActivityTaskCompleted ? "green.500" : "yellow.700"}
              _hover={{
                color: isActivityTaskCompleted ? "green.400" : "yellow.600",
                transform: "scale(1.01)",
              }}
            >
              - {activityTask.activity.name}
            </Text>
            <Text
              ml="auto"
              pl={2}
              color={isActivityTaskCompleted ? "green.500" : "yellow.700"}
            >
              {activityTask.hoursSpent}/{activityTask.hoursToLog}h
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
};
