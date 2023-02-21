import { FC } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { Badge, Flex, FlexProps, Heading, Text, Icon } from "@chakra-ui/react";
import format from "date-fns/format";
import { Achievement } from "store/features/journeys/types";
import { dateFormats } from "utils/constants";

interface AchievementShowcaseCardContentProps extends FlexProps {
  achievement: Achievement;
  onEditClick: () => void;
}

export const AchievementShowcaseCardContent: FC<
  AchievementShowcaseCardContentProps
> = ({ achievement, onEditClick, ...rest }) => {
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
          <Icon
            as={EditIcon}
            position="absolute"
            top={0}
            right={0}
            cursor="pointer"
            width="22px"
            height="22px"
            color="gray.400"
            _hover={{
              color: "gray.100",
            }}
            onClick={onEditClick}
          />
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
