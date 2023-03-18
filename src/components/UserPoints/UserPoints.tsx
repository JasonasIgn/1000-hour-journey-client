import { FC } from "react";
import {
  Flex,
  Text,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import { ReactComponent as CoinIcon } from "resources/coin.svg";
import { ReactComponent as TimeIcon } from "resources/time.svg";
import { getUserPoints, getUserReward } from "store/features/user/selectors";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setDailyGoalOpen } from "store/features/journey/slice";
import { usePointsNotifications } from "./hooks";

export const UserPoints: FC = () => {
  const dispatch = useAppDispatch();
  const points = useAppSelector(getUserPoints);
  const reward = useAppSelector(getUserReward);
  const rewardProgress = Math.round(
    ((reward?.hoursLoggedForReward || 0) / (reward?.hoursToLogForReward || 1)) *
      100
  );

  usePointsNotifications();

  return (
    <Popover
      arrowShadowColor="brand.100"
      placement="bottom-end"
      size="sm"
      onOpen={() => dispatch(setDailyGoalOpen(false))}
    >
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <Flex
              as="button"
              borderRadius={4}
              height="32px"
              border="1px solid"
              borderColor="brand.200"
              py={1}
              px={3}
              alignItems="center"
              mr={3}
              transition="background 50ms"
              bg={isOpen ? "brand.600" : "transparent"}
              _hover={{
                bg: "brand.600",
              }}
            >
              <Text fontWeight={500} color="gray.300">
                {points === undefined ? "-" : points}
              </Text>
              <Icon as={CoinIcon} ml={3} />
            </Flex>
          </PopoverTrigger>
          <PopoverContent
            bg="brand.800"
            boxShadow="inset 0px 0px 15px 0px var(--chakra-colors-brand-700)"
            borderColor="brand.600"
          >
            <PopoverArrow
              bgColor="brand.800"
              borderTop="1px solid"
              borderLeft="1px solid"
              borderColor="brand.600"
            />
            <PopoverHeader borderColor="gray.400">
              {reward && (
                <Flex direction="column">
                  <Text textAlign="center" color="gray.300">
                    Reward for logged time
                  </Text>
                  <Divider mt={2} />
                  <Flex mt={2} justifyContent="center">
                    <Flex>
                      <CircularProgress value={rewardProgress} size="80px">
                        <Tooltip
                          placement="left"
                          label={`${
                            Math.round(
                              (reward.hoursToLogForReward -
                                reward.hoursLoggedForReward) *
                                10
                            ) / 10
                          }h left to log`}
                        >
                          <CircularProgressLabel>
                            {rewardProgress}%
                          </CircularProgressLabel>
                        </Tooltip>
                      </CircularProgress>
                    </Flex>
                    <Flex direction="column" ml={2} justifyContent="center">
                      <Flex alignItems="center">
                        <Icon as={TimeIcon} mr={1} height="24px" width="24px" />
                        <Text color="gray.300">
                          <b>{reward.hoursToLogForReward}</b> h
                        </Text>
                      </Flex>
                      <Flex alignItems="center" mt={1} height="24px">
                        <Icon
                          as={CoinIcon}
                          mr={1}
                          ml="2px"
                          height="24px"
                          width="20px"
                        />
                        <Text color="gray.300">
                          <b>{reward.pointsForReward}</b>
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              )}
            </PopoverHeader>
            <PopoverBody textAlign="center">
              <Button onClick={() => {}} size="sm">
                Go to shop
              </Button>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};
