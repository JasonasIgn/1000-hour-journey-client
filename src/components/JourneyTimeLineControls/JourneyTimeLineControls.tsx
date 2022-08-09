import {
  FlexProps,
  IconButton,
  Flex,
  useInterval,
  Image,
} from "@chakra-ui/react";
import { ReactComponent as PlayIcon } from "../../resources/play_icon.svg";
import { ReactComponent as PauseIcon } from "../../resources/pause_icon.svg";
import AchievementIcon from "../../resources/achievement.png";
import PageIcon from "../../resources/page.png";
import { FC, useEffect } from "react";
import { Achievement, LogExtended } from "../../store/features/journeys/types";
import { getTickSpeed } from "./utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

interface JourneyTimeLineControlsProps extends FlexProps {
  currentHour: number;
  setCurrentHour: (value: number) => void;
  activeLog?: LogExtended;
  activeAchievement?: Achievement;
  setIsPlaying: (playing: boolean) => void;
  isPlaying: boolean;
  totalHours: number;
  openAddLogModal: (e: React.MouseEvent) => void;
  openAddAchievementModal: (e: React.MouseEvent) => void;
}

export const JourneyTimeLineControls: FC<JourneyTimeLineControlsProps> = ({
  currentHour,
  setCurrentHour,
  activeLog,
  setIsPlaying,
  isPlaying,
  totalHours,
  activeAchievement,
  openAddLogModal,
  openAddAchievementModal,
  ...rest
}) => {
  useInterval(
    () => {
      setCurrentHour(Math.round((currentHour + 0.1) * 10) / 10);
    },
    isPlaying ? getTickSpeed(activeLog, activeAchievement) : null
  );

  useEffect(() => {
    if (!activeLog && isPlaying) {
      setIsPlaying(false);
    }
  }, [activeLog, isPlaying, setIsPlaying]);
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
          aria-label="Skip to end"
          onClick={() => {
            setCurrentHour(0);
          }}
        />
        <IconButton
          icon={isPlaying ? <PauseIcon width={20} height={20} /> : <PlayIcon />}
          aria-label="Play Journey"
          onClick={() => {
            setIsPlaying(!isPlaying);
          }}
          mx={2}
        />
        <IconButton
          icon={<ArrowRightIcon />}
          aria-label="Rewind to beggining"
          onClick={() => {
            setCurrentHour(totalHours - 0.1);
          }}
        />
      </Flex>
      <Flex>
        <IconButton
          icon={
            <Image src={AchievementIcon} alt="Achievement icon" width="24px" />
          }
          aria-label="Add achievement"
          onClick={openAddAchievementModal}
          disabled={!activeLog}
        />
        <IconButton
          ml={2}
          icon={<Image src={PageIcon} alt="Page icon" width="24px" />}
          aria-label="Add log"
          onClick={openAddLogModal}
        />
      </Flex>
    </Flex>
  );
};
