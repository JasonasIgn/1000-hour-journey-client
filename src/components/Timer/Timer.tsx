import {
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  Text,
} from "@chakra-ui/react";
import { ReactComponent as PlayIcon } from "resources/play_icon.svg";
import { ReactComponent as PauseIcon } from "resources/pause_icon.svg";
import { ReactComponent as StopIcon } from "resources/stop.svg";
import { useStopwatch } from "react-timer-hook";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  getTimerShouldPause,
  getTimerShouldReset,
} from "store/features/timer/selectors";
import { useEffect } from "react";
import {
  pauseTimerCompleted,
  resetTimerCompleted,
} from "store/features/timer/slice";
import { TimerTrigger } from "./TimerTrigger/TimerTrigger";

export const Timer = () => {
  const dispatch = useAppDispatch();
  const shouldPause = useAppSelector(getTimerShouldPause);
  const shouldReset = useAppSelector(getTimerShouldReset);

  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  useEffect(() => {
    if (shouldPause) {
      pause();
      dispatch(pauseTimerCompleted({ hours, minutes }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldPause]);

  useEffect(() => {
    if (shouldReset) {
      reset(undefined, false);
      dispatch(resetTimerCompleted());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReset]);
  return (
    <Popover
      placement="bottom-start"
      arrowShadowColor="brand.100"
      closeOnBlur={false}
      arrowSize={10}
    >
      <TimerTrigger isRunning={isRunning} />
      <PopoverContent bg="brand.700" borderColor="brand.400">
        <PopoverCloseButton />
        <PopoverBody>
          <Text fontSize="4xl" textAlign="center" color="gray.200">
            {hours.toString().padStart(2, "0")}:
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </Text>
        </PopoverBody>
        <PopoverArrow
          bgColor="brand.700"
          borderTop="1px solid"
          borderLeft="1px solid"
          borderColor="brand.400"
        />
        <PopoverFooter
          border="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          pb={4}
        >
          <IconButton
            borderRadius="full"
            icon={
              <Icon as={isRunning ? PauseIcon : PlayIcon} fill="gray.100" />
            }
            aria-label="Start/Pause Stopwatch"
            onClick={() => {
              if (isRunning) {
                pause();
              } else {
                start();
              }
            }}
          />
          <IconButton
            ml={2}
            borderRadius="full"
            icon={<Icon as={StopIcon} fill="gray.100" />}
            aria-label="Reset Stopwatch"
            disabled={isRunning}
            onClick={() => {
              reset(undefined, false);
            }}
          />
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
