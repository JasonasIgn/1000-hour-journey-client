import {
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { ReactComponent as PlayIcon } from "resources/play_icon.svg";
import { ReactComponent as PauseIcon } from "resources/pause_icon.svg";
import { ReactComponent as StopIcon } from "resources/stop.svg";
import { ReactComponent as TimerIcon } from "resources/timer.svg";
import { useStopwatch } from "react-timer-hook";

export const Timer = () => {
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });
  return (
    <Popover
      placement="bottom-start"
      arrowShadowColor="brand.100"
      arrowSize={10}
    >
      <PopoverTrigger>
        <Icon as={TimerIcon} fill="brand.100" w={10} h={10} cursor="pointer" />
      </PopoverTrigger>
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
              console.log("clicked");
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