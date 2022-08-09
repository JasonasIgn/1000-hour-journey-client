import { Box, Flex, FlexProps, Heading, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import format from "date-fns/format";
import { Achievement } from "../../store/features/journeys/types";

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
              {format(new Date(achievement.loggedOnDate), "yyyy-MM-dd")}
            </Heading>
          </Box>
          <Box textAlign="center">
            At journey hour
            <Heading>{achievement.loggedAtHour}</Heading>
          </Box>
        </Flex>
        <Flex>
          <Text>{achievement.description}</Text>
        </Flex>
      </Flex>

      {achievement?.mediaUrl && (
        <Flex height="80%" flex="1 1 auto" justifyContent="center">
          <Image src={achievement.mediaUrl} alt={`${achievement.id} media`} />
        </Flex>
      )}
    </>
  );
};
