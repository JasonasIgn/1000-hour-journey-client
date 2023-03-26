import { FC } from "react";
import { forwardRef, Icon, IconButton, PopoverTrigger } from "@chakra-ui/react";
import { ReactComponent as QuestIcon } from "resources/quest.svg";
import { ReactComponent as CompletedIcon } from "resources/checkmark.svg";
import { getColor } from "./utils";

export interface DailyGoalTriggerProps {
  completed?: boolean;
  isOpen: boolean;
}

export const DailyGoalTrigger: FC<DailyGoalTriggerProps> = forwardRef(
  ({ completed, isOpen }, ref) => (
    <PopoverTrigger>
      <IconButton
        aria-label="daily goal"
        variant="sideMenuNotRiactive"
        size="lg"
        width="28px"
        height="28px"
        minWidth="28px"
      >
        <Icon
          border="1px solid"
          borderRadius="50%"
          p={1}
          as={completed ? CompletedIcon : QuestIcon}
          color={getColor(isOpen, completed)}
          _hover={{
            color: completed ? "green.100" : "yellow.500",
          }}
          transition="color 0.1s"
          w="28px"
          h="28px"
          cursor="pointer"
          userSelect="none"
        />
      </IconButton>
    </PopoverTrigger>
  )
);
