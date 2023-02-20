import { FC } from "react";
import { Badge, Flex, FlexProps, Heading, Text } from "@chakra-ui/react";
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
    <Flex w="full" height="full" direction="column">
      <Flex
        direction="column"
        pb={3}
        mb={3}
        borderBottom="1px solid"
        borderColor="brand.600"
        {...rest}
      >
        <Flex alignItems="center" direction="column" position="relative">
          <Heading>Achievement</Heading>
          <Heading size="sm" mt={2}>
            {format(new Date(achievement.loggedOnDate), dateFormats.standart)}
          </Heading>
        </Flex>
      </Flex>
      <Text wordBreak="break-word" whiteSpace="pre-line">
        {achievement.description}
      </Text>
      <Flex mt="auto" justifyContent="center">
        <Badge
          variant="solid"
          colorScheme="brand"
          fontSize="16px"
          px={3}
          color="gray.300"
          borderRadius={4}
        >
          {achievement.loggedAtHour} hours into the journey
        </Badge>
      </Flex>
    </Flex>
  );
};
