import { FC, useState } from "react";
import {
  Flex,
  Heading,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Progress,
  Text,
  Tooltip,
  Icon,
  Button,
} from "@chakra-ui/react";
import Logo from "resources/logo.png";
import { ReactComponent as CoinIcon } from "resources/coin.svg";
import { getImageSrc } from "utils/helpers";
import { UserAchievementProgress } from "store/features/myAchievements/types";
import { Paper } from "components/Paper";

interface MyAchievementsListItemProps {
  onClaimReward: (levelId: number) => Promise<void>;
  userAchievementProgress: UserAchievementProgress;
}

export const MyAchievementsListItem: FC<MyAchievementsListItemProps> = ({
  onClaimReward,
  userAchievementProgress,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const { achievement, meta, progress } = userAchievementProgress;
  const { currentLevel } = meta;
  const [loading, setLoading] = useState(false);
  const shouldOpenPopover =
    currentLevel.progress.completed && !currentLevel.progress.rewardClaimed;

  const isAchievementFullyCompleted =
    currentLevel.progress.completed && currentLevel.progress.rewardClaimed;

  const handleOnClaimClick = async () => {
    setLoading(true);
    await onClaimReward(currentLevel.progress.id);
    setLoading(false);
  };

  const handleOnOpen = () => {
    if (shouldOpenPopover) {
      setShowPopover(true);
    }
  };

  return (
    <Popover
      placement="right"
      isOpen={showPopover && shouldOpenPopover}
      onOpen={handleOnOpen}
      onClose={() => setShowPopover(false)}
      arrowShadowColor="brand.100"
    >
      <PopoverTrigger>
        <Paper
          height="270px"
          variant="dark"
          direction="column"
          alignItems="center"
          width="20%"
          py={2}
          px={4}
          m={2}
          minWidth="215px"
          transition="background 0.1s"
          _hover={{
            cursor: shouldOpenPopover ? "pointer" : "default",
          }}
          sx={{
            "@keyframes pulse-animation": {
              "0%": {
                boxShadow: "0 0 1px 1px var(--chakra-colors-brand-600)",
              },
              "50%": {
                boxShadow: "0 0 5px 5px var(--chakra-colors-brand-400)",
              },
              "100%": {
                boxShadow: "0 0 1px 1px var(--chakra-colors-brand-600)",
              },
            },
            animation: shouldOpenPopover
              ? "pulse-animation 2s infinite"
              : "none",
          }}
        >
          <Image
            borderRadius="20px"
            height="58%"
            filter="brightness(0.8)"
            src={
              achievement?.mediaUrl
                ? `${getImageSrc(
                    achievement.mediaUrl
                  )}?${achievement.updatedAt.toString()}` // Prevent caching
                : Logo
            }
          />
          <Flex direction="column" alignItems="center" w="full">
            <Heading
              size="lg"
              lineHeight={1}
              mb={1}
              color={isAchievementFullyCompleted ? "brand.50" : "gray.300"}
            >
              {achievement.title}
            </Heading>
            <Text
              textTransform="uppercase"
              fontWeight={900}
              fontSize="xs"
              mb={1}
              letterSpacing="1.7px"
            >
              Level {currentLevel.level.level}
            </Text>
            <Tooltip label={currentLevel.level.description} placement="right">
              <Text fontSize="xs" mb={0.5}>
                {currentLevel.level.description}
              </Text>
            </Tooltip>
            <Flex width="full" position="relative" mt={1}>
              <Progress
                value={(progress / currentLevel.level.progressRequired) * 100}
                size="lg"
                width="100%"
              />
              <Text
                position="absolute"
                fontSize="xs"
                left={0}
                right={0}
                textAlign="center"
                lineHeight="15px"
                color="gray.200"
              >
                {progress} / {currentLevel.level.progressRequired}
              </Text>
            </Flex>
          </Flex>
        </Paper>
      </PopoverTrigger>
      <PopoverContent
        bg="brand.800"
        boxShadow="inset 0px 0px 15px 0px var(--chakra-colors-brand-700)"
        borderColor="brand.600"
      >
        <PopoverArrow
          bgColor="brand.800"
          borderBottom="1px solid"
          borderLeft="1px solid"
          borderColor="brand.600"
        />
        <PopoverHeader textAlign="center" borderColor="gray.500">
          Advance to next level
        </PopoverHeader>
        <PopoverBody>
          <Flex w="full" direction="column">
            <Flex mb={2}>
              <Text fontSize="xl" fontWeight={500} color="gray.300">
                Reward
              </Text>
              <Flex alignItems="center" ml="auto">
                <Text fontSize="xl" fontWeight={500}>
                  {currentLevel.level.rewardPoints}
                </Text>
                <Icon as={CoinIcon} ml={2} width="24px" height="24px" />
              </Flex>
            </Flex>
            <Button onClick={handleOnClaimClick} isDisabled={loading}>
              Claim & Advance
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
