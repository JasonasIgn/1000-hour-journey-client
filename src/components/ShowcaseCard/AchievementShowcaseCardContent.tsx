import { Box, Flex, FlexProps, Heading, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import format from "date-fns/format";
import { Achievement } from "store/features/journeys/types";
import { dateFormats } from "utils/constants";

interface AchievementShowcaseCardContentProps extends FlexProps {
  achievement: Achievement;
}

export const AchievementShowcaseCardContent: FC<
  AchievementShowcaseCardContentProps
> = ({ achievement, ...rest }) => {
  return (
    <>
      <Flex flexDirection="column" {...rest}>
        <Flex justifyContent="space-between">
          <Box textAlign="center">
            <Heading>Achievement</Heading>
          </Box>
          <Box textAlign="center">
            <Heading>
              {format(new Date(achievement.loggedOnDate), dateFormats.standart)}
            </Heading>
          </Box>
          <Box textAlign="center">
            <Text>At journey hour</Text>
            <Heading>{achievement.loggedAtHour}</Heading>
          </Box>
        </Flex>
        <Flex>
          <Text>{achievement.description}</Text>
        </Flex>
      </Flex>

      {achievement?.mediaUrl && (
        <Flex height="80%" flex="1 1 auto" justifyContent="center">
          <Image
            src={`${achievement.mediaUrl}?${achievement.updatedAt.toString()}`} // prevent caching
            alt={`${achievement.id} media`}
          />
        </Flex>
      )}
    </>
  );
};
