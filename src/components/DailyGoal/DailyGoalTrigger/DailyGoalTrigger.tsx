import { FC } from "react";
import { forwardRef, Icon, IconButton, PopoverTrigger } from "@chakra-ui/react";
import { ReactComponent as QuestIcon } from "resources/quest.svg";

export interface DailyGoalTriggerProps {
  completed?: boolean;
}

export const DailyGoalTrigger: FC<DailyGoalTriggerProps> = forwardRef(
  ({ completed }, ref) => (
    <PopoverTrigger>
      <IconButton
        aria-label="daily goal"
        variant="sideMenuNotRiactive"
        size="lg"
        width="32px"
        height="32px"
        minWidth="32px"
      >
        <Icon
          border="1px solid"
          borderRadius="50%"
          p={1}
          as={QuestIcon}
          color="yellow.200"
          _hover={{
            color: "yellow.100",
          }}
          transition="color 0.1s"
          w="32px"
          h="32px"
          cursor="pointer"
          userSelect="none"
        />
      </IconButton>
    </PopoverTrigger>
  )
);
