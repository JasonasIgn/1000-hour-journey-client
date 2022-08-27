import { FC, useEffect, MouseEvent } from "react";
import {
  FlexProps,
  IconButton,
  Flex,
  useInterval,
  chakra,
} from "@chakra-ui/react";
import { ReactComponent as PlayIconComponent } from "resources/play_icon.svg";
import { ReactComponent as PauseIconComponent } from "resources/pause_icon.svg";
import { ReactComponent as AchievementIconComponent } from "resources/achievement.svg";
import { ReactComponent as PageIconComponent } from "resources/page.svg";
import { Achievement, LogExtended } from "store/features/journeys/types";
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
  openAddLogModal: (e: MouseEvent) => void;
  openAddAchievementModal: (e: MouseEvent) => void;
  centerZoomOnThumb: (currentHourOverride?: number) => void;
}

const PageIcon = chakra(PageIconComponent);
const AchievementIcon = chakra(AchievementIconComponent);
const PauseIcon = chakra(PauseIconComponent);
const PlayIcon = chakra(PlayIconComponent);

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
  centerZoomOnThumb,
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
          aria-label="Rewind to beggining"
          onClick={() => {
            setCurrentHour(0);
            centerZoomOnThumb(0.1);
          }}
        />
        <IconButton
          icon={
            isPlaying ? (
              <PauseIcon width="20px" height="20px" fill="gray.300" />
            ) : (
              <PlayIcon fill="gray.300" />
            )
          }
          aria-label="Play Journey"
          onClick={() => {
            setIsPlaying(!isPlaying);
          }}
          mx={2}
        />
        <IconButton
          icon={<ArrowRightIcon />}
          aria-label="Skip to end"
          onClick={() => {
            setCurrentHour(totalHours - 0.1);
            centerZoomOnThumb(totalHours - 0.1);
          }}
        />
      </Flex>
      <Flex>
        <IconButton
          icon={<AchievementIcon width={22} height={22} stroke="gray.300" />}
          aria-label="Add achievement"
          onClick={openAddAchievementModal}
          disabled={!activeLog}
        />
        <IconButton
          ml={2}
          icon={<PageIcon width={22} height={22} fill="gray.300" />}
          aria-label="Add log"
          onClick={openAddLogModal}
        />
      </Flex>
    </Flex>
  );
};
