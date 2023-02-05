import { FC } from "react";
import { Box, Flex, FlexProps, Heading, Text } from "@chakra-ui/react";
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
      <Flex
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="brand.300"
        pb={3}
        mb={3}
        {...rest}
      >
        <Box textAlign="left">
          <Text>Achievement</Text>
          <Heading> </Heading>
        </Box>
        <Box textAlign="left">
          <Text>Date</Text>
          <Heading>
            {format(new Date(achievement.loggedOnDate), dateFormats.standart)}
          </Heading>
        </Box>
        <Box textAlign="center">
          <Text>At journey hour</Text>
          <Heading>{achievement.loggedAtHour}</Heading>
        </Box>
      </Flex>
      <Flex height="84%" width="100%">
        <Flex flex="1 1 40%">
          <Text wordBreak="break-word" whiteSpace="pre-line">
            {achievement.description}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
