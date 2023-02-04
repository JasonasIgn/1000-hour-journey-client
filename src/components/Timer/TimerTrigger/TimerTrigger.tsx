import { FC } from "react";
import { forwardRef, Icon, PopoverTrigger } from "@chakra-ui/react";
import { ReactComponent as TimerIconComponent } from "resources/timer.svg";

interface TimerTriggerProps {
  isRunning: boolean;
}

export const TimerTrigger: FC<TimerTriggerProps> = forwardRef(
  ({ isRunning }, ref) => (
    <PopoverTrigger>
      <Icon
        as={TimerIconComponent}
        fill="brand.100"
        w={10}
        h={10}
        cursor="pointer"
        userSelect="none"
        sx={{
          transition: "transform 100ms",
          "&:hover": {
            transform: "scale(1.03)",
          },
          "&:active": {
            transform: "scale(0.98)",
          },
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
    </PopoverTrigger>
  )
);
