import { FC } from "react";
import { FlexProps, IconButton, Flex, Icon } from "@chakra-ui/react";
import { ReactComponent as RightArrowIcon } from "resources/right-arrow.svg";
import { Achievement, Journey } from "store/features/journeys/types";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { IdsHourMap } from "views/JourneyView/types";
import { ShiftDirection } from "types";

interface JourneyTimeLineControlsProps extends FlexProps {
  activeLogId?: number;
  activeAchievement?: Achievement;
  logBegginingsMap: IdsHourMap;
  setActiveLogId: (id: number) => void;
  journey: Journey;
  setShiftDirection: (direction: ShiftDirection) => void;
}

export const JourneyTimeLineControls: FC<JourneyTimeLineControlsProps> = ({
  activeLogId,
  activeAchievement,
  logBegginingsMap,
  setActiveLogId,
  journey,
  setShiftDirection,
  ...rest
}) => {
  const onGoToPreviousClick = () => {
    setShiftDirection("right");
    const orderedLogIds = Object.keys(logBegginingsMap);
    const currentOrderLogId = orderedLogIds.findIndex(
      (logId) => logId === activeLogId?.toString()
    );
    if (currentOrderLogId > 0) {
      const previousLogId = orderedLogIds[currentOrderLogId - 1];
      setActiveLogId(Number(previousLogId));
    }
  };

  const onGoToNextClick = () => {
    setShiftDirection("left");
    const orderedLogIds = Object.keys(logBegginingsMap);
    const currentOrderLogId = orderedLogIds.findIndex(
      (logId) => logId === activeLogId?.toString()
    );
    const nextLogId = orderedLogIds[currentOrderLogId + 1];
    if (nextLogId) {
      setActiveLogId(Number(nextLogId));
    }
  };

  const onRewindClick = () => {
    const firstLogId = journey.logs[0].id;
    setShiftDirection("right");
    if (firstLogId) {
      setActiveLogId(firstLogId);
    }
  };

  const onSkipClick = () => {
    const lastLogId = journey.logs[journey.logs.length - 1].id;
    setShiftDirection("left");
    if (lastLogId) {
      setActiveLogId(lastLogId);
    }
  };

  return (
    <Flex {...rest} alignItems="center" width="100%" justifyContent="center">
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
  );
};
