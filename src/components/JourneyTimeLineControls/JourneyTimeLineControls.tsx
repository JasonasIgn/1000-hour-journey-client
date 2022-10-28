import { FC, MouseEvent } from "react";
import { FlexProps, IconButton, Flex, Icon } from "@chakra-ui/react";
import { ReactComponent as AchievementIcon } from "resources/achievement.svg";
import { ReactComponent as PageIcon } from "resources/page.svg";
import { ReactComponent as RightArrowIcon } from "resources/right-arrow.svg";
import { Achievement, LogExtended } from "store/features/journeys/types";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { IdsHourMap } from "views/JourneyView/types";

interface JourneyTimeLineControlsProps extends FlexProps {
  currentHour: number;
  setCurrentHour: (value: number) => void;
  activeLog?: LogExtended;
  activeAchievement?: Achievement;
  totalHours: number;
  openAddLogModal: (e: MouseEvent) => void;
  openAddAchievementModal: (e: MouseEvent) => void;
  centerZoomOnThumb: (hour: number) => void;
  logBegginingsMap: IdsHourMap;
}

export const JourneyTimeLineControls: FC<JourneyTimeLineControlsProps> = ({
  currentHour,
  setCurrentHour,
  activeLog,
  totalHours,
  activeAchievement,
  openAddLogModal,
  openAddAchievementModal,
  centerZoomOnThumb,
  logBegginingsMap,
  ...rest
}) => {
  const onGoToPreviousClick = () => {
    const orderedLogIds = Object.keys(logBegginingsMap);
    const currentOrderLogId = orderedLogIds.findIndex(
      (logId) => logId === activeLog?.id.toString()
    );
    if (currentOrderLogId > 0) {
      const previousLogId = orderedLogIds[currentOrderLogId - 1];
      const hour = logBegginingsMap[Number(previousLogId)];
      setCurrentHour(hour);
      centerZoomOnThumb(hour + 0.1);
    }
  };

  const onGoToNextClick = () => {
    const orderedLogIds = Object.keys(logBegginingsMap);
    const currentOrderLogId = orderedLogIds.findIndex(
      (logId) => logId === activeLog?.id.toString()
    );
    const nextLogId = orderedLogIds[currentOrderLogId + 1];
    if (nextLogId) {
      const hour = logBegginingsMap[Number(nextLogId)];
      setCurrentHour(hour);
      centerZoomOnThumb(hour + 0.1);
    }
  };

  const onRewindClick = () => {
    setCurrentHour(0);
    centerZoomOnThumb(0.1);
  };

  const onSkipClick = () => {
    setCurrentHour(totalHours - 0.1);
    centerZoomOnThumb(totalHours - 0.1);
  };

  return (
    <Flex
      {...rest}
      alignItems="center"
      width="100%"
      justifyContent="space-between"
    >
      <Flex width="88px" />
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
      <Flex>
        <IconButton
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
        <IconButton
          ml={2}
          icon={<Icon as={PageIcon} width={22} height={22} fill="gray.300" />}
          aria-label="Add log"
          onClick={openAddLogModal}
        />
      </Flex>
    </Flex>
  );
};
