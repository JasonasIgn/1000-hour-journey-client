import { FC, MouseEvent } from "react";
import { FlexProps, IconButton, Flex, Icon } from "@chakra-ui/react";
import { ReactComponent as AchievementIcon } from "resources/achievement.svg";
import { ReactComponent as PageIcon } from "resources/page.svg";
import { ReactComponent as RightArrowIcon } from "resources/right-arrow.svg";
import {
  Achievement,
  Journey,
  LogExtended,
} from "store/features/journeys/types";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { IdsHourMap } from "views/JourneyView/types";

interface JourneyTimeLineControlsProps extends FlexProps {
  activeLog?: LogExtended;
  activeAchievement?: Achievement;
  openAddLogModal: (e: MouseEvent) => void;
  openAddAchievementModal: (e: MouseEvent) => void;
  logBegginingsMap: IdsHourMap;
  setActiveLogById: (id: number) => void;
  journey: Journey;
}

export const JourneyTimeLineControls: FC<JourneyTimeLineControlsProps> = ({
  activeLog,
  activeAchievement,
  openAddLogModal,
  openAddAchievementModal,
  logBegginingsMap,
  setActiveLogById,
  journey,
  ...rest
}) => {
  const onGoToPreviousClick = () => {
    const orderedLogIds = Object.keys(logBegginingsMap);
    const currentOrderLogId = orderedLogIds.findIndex(
      (logId) => logId === activeLog?.id.toString()
    );
    if (currentOrderLogId > 0) {
      const previousLogId = orderedLogIds[currentOrderLogId - 1];
      setActiveLogById(Number(previousLogId));
    }
  };

  const onGoToNextClick = () => {
    const orderedLogIds = Object.keys(logBegginingsMap);
    const currentOrderLogId = orderedLogIds.findIndex(
      (logId) => logId === activeLog?.id.toString()
    );
    const nextLogId = orderedLogIds[currentOrderLogId + 1];
    if (nextLogId) {
      setActiveLogById(Number(nextLogId));
    }
  };

  const onRewindClick = () => {
    const firstLogId = journey.logs[0].id;
    if (firstLogId) {
      setActiveLogById(firstLogId);
    }
  };

  const onSkipClick = () => {
    const lastLogId = journey.logs[journey.logs.length - 1].id;
    if (lastLogId) {
      setActiveLogById(lastLogId);
    }
  };

  return (
    <Flex
      {...rest}
      alignItems="center"
      width="100%"
      justifyContent="space-between"
    >
      <Flex>
        <IconButton
          icon={<Icon as={PageIcon} width={22} height={22} fill="gray.300" />}
          aria-label="Add log"
          onClick={openAddLogModal}
        />
        <IconButton
          ml={2}
          icon={
            <Icon
              as={AchievementIcon}
              width={22}
              height={22}
              stroke="gray.300"
            />
          }
          aria-label="Add achievement"
          onClick={openAddAchievementModal}
          disabled={!activeLog}
        />
      </Flex>
      <Flex>
        <IconButton
          icon={<ArrowLeftIcon />}
          aria-label="Rewind to beggining"
          onClick={onRewindClick}
        />
        <IconButton
          ml={2}
          mr={2}
          icon={
            <Icon
              as={RightArrowIcon}
              fill="gray.300"
              transform="rotate(180deg)"
            />
          }
          aria-label="Go to previous log"
          onClick={onGoToPreviousClick}
        />
        <IconButton
          mr={2}
          icon={<Icon as={RightArrowIcon} fill="gray.300" />}
          aria-label="Go to next log"
          onClick={onGoToNextClick}
        />
        <IconButton
          icon={<ArrowRightIcon />}
          aria-label="Skip to end"
          onClick={onSkipClick}
        />
      </Flex>
      <Flex width="88px" />
    </Flex>
  );
};
