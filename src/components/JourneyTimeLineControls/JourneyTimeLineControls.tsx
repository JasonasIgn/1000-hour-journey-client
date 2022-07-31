import { FlexProps, IconButton, Flex, useInterval } from "@chakra-ui/react";
import { ReactComponent as PlayIcon } from "../../resources/play_icon.svg";
import { ReactComponent as PauseIcon } from "../../resources/pause_icon.svg";
import { FC, useEffect } from "react";
import { LogExtended } from "../../store/features/journeys/types";
import { getTickSpeedByLogHours } from "./utils";

interface JourneyTimeLineControlsProps extends FlexProps {
  currentHour: number;
  setCurrentHour: (value: number) => void;
  activeLog?: LogExtended;
  setIsPlaying: (playing: boolean) => void;
  isPlaying: boolean;
}

export const JourneyTimeLineControls: FC<JourneyTimeLineControlsProps> = ({
  currentHour,
  setCurrentHour,
  activeLog,
  setIsPlaying,
  isPlaying,
  ...rest
}) => {
  useInterval(
    () => {
      setCurrentHour(Math.round((currentHour + 0.1) * 10) / 10);
    },
    isPlaying && activeLog ? getTickSpeedByLogHours(activeLog) : null
  );

  useEffect(() => {
    if (!activeLog && isPlaying) {
      setIsPlaying(false);
    }
  }, [activeLog, isPlaying, setIsPlaying]);
  return (
    <Flex {...rest} alignItems="center" width="100%" justifyContent="center">
      <IconButton
        icon={isPlaying ? <PauseIcon width={20} height={20} /> : <PlayIcon />}
        aria-label="Play Journey"
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
      >
        Play
      </IconButton>
    </Flex>
  );
};
