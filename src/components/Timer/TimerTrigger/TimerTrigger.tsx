import { FC } from "react";
import { forwardRef, Icon, IconButton, PopoverTrigger } from "@chakra-ui/react";
import { ReactComponent as TimerIcon } from "resources/timer.svg";

interface TimerTriggerProps {
  isRunning: boolean;
}

export const TimerTrigger: FC<TimerTriggerProps> = forwardRef(
  ({ isRunning }, ref) => (
    <PopoverTrigger>
      <IconButton
        aria-label="timer"
        variant="sideMenuNotRiactive"
        size="lg"
        mt={2}
      >
        <Icon
          as={TimerIcon}
          fill="gray.400"
          _hover={{
            fill: "gray.100",
          }}
          transition="fill 0.1s"
          w="28px"
          h="28px"
          cursor="pointer"
          userSelect="none"
          sx={{
            ".timer-arrow": {
              animationPlayState: isRunning ? "running" : "paused",
              animationDuration: "2s",
              animationName: "rotate",
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
              transformOrigin: "256px 285px",
              "@keyframes rotate": {
                "0%": {
                  transform: "rotate(0deg)",
                },
                "100%": {
                  transform: "rotate(360deg)",
                },
              },
            },
          }}
        />
      </IconButton>
    </PopoverTrigger>
  )
);
